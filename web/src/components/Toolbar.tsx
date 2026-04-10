import { useRef, useEffect } from 'react';

interface ToolbarProps {
  step: number;
  loss: number;
  numSteps: number;
  running: boolean;
  initialized: boolean;
  currentGPT: boolean;
  srcPhrase: string;
  predOutput: string;
  onSrcPhraseChange: (v: string) => void;
  onAnalyze: () => void;
  onModeEnc: () => void;
  onModeGpt: () => void;
  onToolbarHeightChange: (h: number) => void;
}

export function Toolbar({
  step, loss, numSteps, running, initialized, currentGPT,
  srcPhrase, predOutput,
  onSrcPhraseChange, onAnalyze,
  onModeEnc, onModeGpt, onToolbarHeightChange,
}: ToolbarProps) {
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => {
      onToolbarHeightChange(el.offsetHeight);
    });
    obs.observe(el);
    onToolbarHeightChange(el.offsetHeight);
    return () => obs.disconnect();
  }, [onToolbarHeightChange]);

  const stepTxt = `${step} / ${numSteps}`;
  const lossTxt = loss >= 0 ? loss.toFixed(4) : '–';
  const pct = `${(step / numSteps) * 100}%`;

  const dotClass = running ? 'dot running' : step >= numSteps ? 'dot done' : 'dot';
  const statusText = running ? 'Training...' : step >= numSteps ? 'Training complete' : initialized ? 'Paused' : 'Ready';

  const ENC_PRESETS = [
    { label: 'heat olive oil → in a pan',         value: 'heat olive oil' },
    { label: 'boil water in → a large pot',        value: 'boil water in' },
    { label: 'add salt and → pepper to taste',     value: 'add salt and' },
    { label: 'mix flour and → water until smooth', value: 'mix flour and' },
    { label: 'cook pasta until → al dente',        value: 'cook pasta until' },
    { label: 'whisk eggs and → cream together',    value: 'whisk eggs and' },
    { label: 'saute garlic in → butter',           value: 'saute garlic in' },
    { label: 'stir until smooth → and creamy',     value: 'stir until smooth' },
  ];
  const GPT_PRESETS = [
    { label: 'heat olive oil in …',   value: 'heat olive oil in' },
    { label: 'boil water in a …',     value: 'boil water in a' },
    { label: 'add salt and pepper …', value: 'add salt and pepper' },
    { label: 'mix flour and water …', value: 'mix flour and water' },
    { label: 'cook pasta until …',    value: 'cook pasta until' },
    { label: 'whisk eggs and cream …',value: 'whisk eggs and cream' },
    { label: 'saute garlic in …',     value: 'saute garlic in' },
    { label: 'stir until smooth …',   value: 'stir until smooth' },
  ];
  const presets = currentGPT ? GPT_PRESETS : ENC_PRESETS;

  return (
    <>
      <div id="toolbar" ref={toolbarRef}>
        <span className="title">MoonBit GPT</span>
        <div className="sep"></div>
        <div style={{display:'flex',alignItems:'center',gap:'0.25rem',flexShrink:0}}>
          <button
            style={{padding:'0.2rem 0.5rem',fontSize:'0.72rem',fontWeight:600}}
            className={!currentGPT ? 'primary' : ''}
            title="Encoder-Decoder Transformer"
            onClick={onModeEnc}
          >Enc-Dec</button>
          <button
            style={{padding:'0.2rem 0.5rem',fontSize:'0.72rem',fontWeight:600}}
            className={currentGPT ? 'primary' : ''}
            title="GPT (Decoder-only)"
            onClick={onModeGpt}
          >GPT</button>
        </div>
        <div className="sep"></div>
        <span id="toolbar-src-label" style={{fontSize:'0.75rem',color:'#8b949e',whiteSpace:'nowrap'}}>Src:</span>
        <input
          type="text"
          value={srcPhrase}
          maxLength={60}
          placeholder={currentGPT ? 'prompt phrase' : 'source phrase'}
          onChange={e => onSrcPhraseChange(e.target.value)}
        />
        <select
          style={{fontSize:'0.72rem',padding:'0.15rem 0.2rem',background:'var(--surface)',color:'var(--fg)',border:'1px solid var(--border)',borderRadius:4,flexShrink:0,cursor:'pointer'}}
          onChange={e => { if (e.target.value) { onSrcPhraseChange(e.target.value); e.target.value = ''; } }}
        >
          <option value="">preset▾</option>
          {presets.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        <button onClick={onAnalyze}>Analyze</button>
        <div className="toolbar-break"></div>
        <span id="toolbar-arrow" style={{fontSize:'0.75rem',color:'#8b949e',whiteSpace:'nowrap',marginLeft:'0.2rem'}}>→</span>
        <span id="net-pred-out" style={{fontSize:'0.75rem',color:'#3fb950',whiteSpace:'nowrap',width:200,flexShrink:0,overflow:'hidden',textOverflow:'ellipsis',display:'inline-block',cursor:'default'}} title="predicted output">
          {predOutput}
        </span>
        <div className="sep"></div>
        <div className="stat-group">
          <span className="stat-label">Step:</span>
          <span className="stat-value">{stepTxt}</span>
        </div>
        <div className="stat-group">
          <span className="stat-label">Loss:</span>
          <span className="stat-value">{lossTxt}</span>
        </div>
        <div className="status" style={{marginLeft:'0.1rem'}}>
          <div className={dotClass}></div>
          <span>{statusText}</span>
        </div>
        <div className="spacer"></div>
      </div>
      <div id="progress-line">
        <div className="fill" style={{width: pct}}></div>
      </div>
    </>
  );
}

interface SidebarProps {
  running: boolean;
  initialized: boolean;
  step: number;
  openPanels: Set<string>;
  useSkip: boolean;
  usePosEmb: boolean;
  useAttn: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onTogglePanel: (id: string) => void;
  onToggleSkip: (v: boolean) => void;
  onTogglePosEmb: (v: boolean) => void;
  onToggleAttn: (v: boolean) => void;
}

export function PanelSidebar({
  running, initialized, step, openPanels,
  useSkip, usePosEmb, useAttn,
  onStart, onPause, onReset, onTogglePanel,
  onToggleSkip, onTogglePosEmb, onToggleAttn,
}: SidebarProps) {
  const PANELS = [
    { id: 'panel-train',        label: 'Loss' },
    { id: 'panel-data',         label: 'Data' },
    { id: 'panel-emb-pca',      label: 'PCA' },
    { id: 'panel-residual-pca', label: 'PosEmb' },
  ];

  return (
    <div id="panel-sidebar">
      <button className="sb-btn primary" onClick={onStart} disabled={running}>Start</button>
      <button className="sb-btn" onClick={onPause} disabled={!running}>Pause</button>
      <button className="sb-btn" onClick={onReset} disabled={!initialized && step === 0}>Reset</button>
      <div className="sb-sep"></div>
      {PANELS.map(p => (
        <button
          key={p.id}
          className={'sb-btn' + (openPanels.has(p.id) ? ' active' : '')}
          onClick={() => onTogglePanel(p.id)}
        >{p.label}</button>
      ))}
      <div className="sb-sep"></div>
      <div className="sb-ablation">
        <span className="sb-ablation-label">Skip</span>
        <div className="sb-ablation-btns">
          <button className={'sb-btn' + (useSkip ? ' active' : '')} onClick={() => onToggleSkip(true)}>ON</button>
          <button className={'sb-btn' + (!useSkip ? ' active' : '')} onClick={() => onToggleSkip(false)}>OFF</button>
        </div>
        <span className="sb-ablation-label">PosEmb</span>
        <div className="sb-ablation-btns">
          <button className={'sb-btn' + (usePosEmb ? ' active' : '')} onClick={() => onTogglePosEmb(true)}>ON</button>
          <button className={'sb-btn' + (!usePosEmb ? ' active' : '')} onClick={() => onTogglePosEmb(false)}>OFF</button>
        </div>
        <span className="sb-ablation-label">Attn</span>
        <div className="sb-ablation-btns">
          <button className={'sb-btn' + (useAttn ? ' active' : '')} onClick={() => onToggleAttn(true)}>ON</button>
          <button className={'sb-btn' + (!useAttn ? ' active' : '')} onClick={() => onToggleAttn(false)}>OFF</button>
        </div>
      </div>
    </div>
  );
}

