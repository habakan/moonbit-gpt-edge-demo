import { useState } from 'react';
import { mbt } from '../../mbt/ffi';

interface GenPanelProps {
  initialized: boolean;
  srcPhrase: string;
  onRunViz: (phrase: string) => void;
}

export function GenPanel({ initialized, srcPhrase, onRunViz }: GenPanelProps) {
  const [temperature, setTemperature] = useState(0.7);
  const [samples, setSamples] = useState<string[]>([]);

  const handleGenerate = () => {
    const phrase = (srcPhrase || 'heat olive oil').trim().toLowerCase();
    const newSamples: string[] = [];
    for (let i = 0; i < 10; i++) {
      const result = mbt.generate(phrase, temperature);
      newSamples.push(result || '(empty)');
    }
    setSamples(newSamples);
    onRunViz(phrase);
  };

  return (
    <>
      <label>Temperature: <span>{temperature.toFixed(2)}</span></label>
      <input
        type="range"
        min={0.1} max={1.5} step={0.05}
        value={temperature}
        onChange={e => setTemperature(parseFloat(e.target.value))}
      />
      <div className="controls" style={{marginTop:'0.5rem'}}>
        <button onClick={handleGenerate} disabled={!initialized}>Generate 10</button>
      </div>
      <div className="samples" style={{marginTop:'0.5rem'}}>
        {samples.length === 0
          ? <span style={{color:'var(--muted)',fontSize:'0.78rem'}}>Train first, then generate</span>
          : samples.map((s, i) => (
            <span key={i} className="sample-tag" title={`src: ${srcPhrase}`}>{s}</span>
          ))
        }
      </div>
    </>
  );
}
