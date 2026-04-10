import { useState, useEffect, useRef } from 'react';
import { mbt, isMbtReady } from '../../mbt/ffi';

interface DatasetPanelProps {
  initialized: boolean;
  visible: boolean;
  datasetVersion: number;
  onSetDataset: (phrases: string[]) => void;
}

export function DatasetPanel({ initialized, visible, datasetVersion, onSetDataset }: DatasetPanelProps) {
  const [docs, setDocs] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [lastMsg, setLastMsg] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [showReplace, setShowReplace] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (visible) refresh();
  }, [visible, initialized, datasetVersion]);

  function refresh() {
    if (!isMbtReady()) return;
    try {
      const raw = mbt.getDocsString();
      setDocs(raw ? raw.split('|').filter(s => s.trim() !== '') : []);
    } catch (e) {
      console.error('getDocsString failed:', e);
    }
  }

  function handleAdd() {
    const phrase = input.trim().toLowerCase();
    if (!phrase) return;
    const ok = mbt.addCustomDoc(phrase);
    if (ok) {
      setLastMsg(`Added: "${phrase}"`);
      setInput('');
      refresh();
    } else {
      setLastMsg('Not added — need ≥2 known vocabulary words.');
    }
  }

  function handleSetDataset() {
    const phrases = replaceText
      .split('\n')
      .map(l => l.trim().toLowerCase())
      .filter(l => l.length > 0);
    if (phrases.length === 0) return;
    onSetDataset(phrases);
    setShowReplace(false);
    setReplaceText('');
    setLastMsg(`Dataset replaced with ${phrases.length} phrases. Model re-initialized.`);
  }

  return (
    <>
      <div style={{fontSize:'0.7rem',color:'var(--muted)',marginBottom:'0.4rem'}}>
        Training phrases: <strong style={{color:'var(--fg)'}}>{docs.length}</strong>
        <span style={{marginLeft:'0.5rem',fontSize:'0.65rem'}}>
          (only known vocabulary words are used)
        </span>
      </div>
      <div style={{
        maxHeight: 260, overflowY: 'auto',
        border: '1px solid var(--border)', borderRadius: 4,
        padding: '0.25rem 0.4rem',
        fontSize: '0.72rem', lineHeight: 1.7,
        marginBottom: '0.5rem',
      }}>
        {docs.length === 0
          ? <span style={{color:'var(--muted)'}}>{initialized ? 'No docs loaded' : 'Press Start to initialize the model'}</span>
          : docs.map((d, i) => (
            <div key={i} style={{
              padding: '0.05rem 0',
              borderBottom: i < docs.length - 1 ? '1px solid var(--border)' : 'none',
              color: i >= 60 ? 'var(--green)' : 'var(--fg)',
            }}>
              <span style={{color:'var(--muted)',marginRight:'0.4rem',userSelect:'none',fontSize:'0.62rem'}}>
                {i + 1}
              </span>
              {d}
            </div>
          ))
        }
      </div>
      <div style={{display:'flex',gap:'0.35rem',alignItems:'center'}}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder="add a training phrase…"
          style={{flex:1,fontSize:'0.75rem'}}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
          disabled={!initialized}
        />
        <button onClick={handleAdd} disabled={!initialized || !input.trim()}>Add</button>
      </div>
      {lastMsg && (
        <div style={{fontSize:'0.68rem',marginTop:'0.3rem',color: lastMsg.startsWith('Added') || lastMsg.startsWith('Dataset') ? 'var(--green)' : 'var(--yellow,#e3b341)'}}>
          {lastMsg}
        </div>
      )}
      <div style={{marginTop:'0.6rem',borderTop:'1px solid var(--border)',paddingTop:'0.5rem'}}>
        <button
          style={{fontSize:'0.68rem',padding:'0.15rem 0.5rem',width:'100%',textAlign:'left'}}
          onClick={() => setShowReplace(v => !v)}
        >
          {showReplace ? '▾' : '▸'} Replace entire dataset & reinitialize
        </button>
        {showReplace && (
          <div style={{marginTop:'0.4rem'}}>
            <div style={{fontSize:'0.65rem',color:'var(--muted)',marginBottom:'0.3rem'}}>
              1行1文で入力。プリセットのレシピは完全に破棄され、ここに入力したテキストのみで語彙・モデルを再構築します。
            </div>
            <textarea
              value={replaceText}
              onChange={e => setReplaceText(e.target.value)}
              placeholder={'heat olive oil in a pan\nboil water in a large pot\nadd salt and pepper to taste\n...'}
              style={{
                width: '100%', height: 140, fontSize: '0.72rem',
                background: 'var(--surface)', color: 'var(--fg)',
                border: '1px solid var(--border)', borderRadius: 4,
                padding: '0.3rem', resize: 'vertical', boxSizing: 'border-box',
              }}
            />
            <button
              style={{marginTop:'0.3rem',fontSize:'0.72rem',padding:'0.2rem 0.6rem'}}
              disabled={replaceText.trim() === ''}
              onClick={handleSetDataset}
            >
              Set Dataset & Reinit
            </button>
          </div>
        )}
      </div>
    </>
  );
}
