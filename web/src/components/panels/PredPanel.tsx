import { useRef, useEffect, useState } from 'react';
import { runLogitsViz } from '../../canvas/drawAttn';

interface PredPanelProps {
  logitsFlat: number[];
  seq: number;
  vocab: string[];
  tokens: string[];
  visible: boolean;
  running: boolean;
}

export function PredPanel({ logitsFlat, seq, vocab, tokens, visible, running }: PredPanelProps) {
  const [pos, setPos] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!visible || !containerRef.current || !ctxLabelRef.current || seq === 0) return;
    runLogitsViz(containerRef.current, ctxLabelRef.current, logitsFlat, seq, vocab, pos, tokens);
  }, [logitsFlat, seq, vocab, tokens, pos, visible]);

  const clampedPos = Math.min(pos, Math.max(0, seq - 1));

  return (
    <>
      <div className="controls" style={{marginBottom:'0.4rem'}}>
        <label>Position: <span>{clampedPos}</span>
          <input
            type="range"
            min={0}
            max={Math.max(0, seq - 1)}
            step={1}
            value={clampedPos}
            style={{width:120,verticalAlign:'middle',marginLeft:'0.3rem'}}
            onChange={e => setPos(parseInt(e.target.value))}
          />
        </label>
        <span ref={ctxLabelRef} style={{fontSize:'0.78rem',color:'var(--accent)',fontFamily:'monospace'}}></span>
      </div>
      <div className="pred-bar-wrap" ref={containerRef}></div>
      {running && <span style={{fontSize:'0.65rem',color:'var(--green)',fontWeight:'normal'}}>live</span>}
    </>
  );
}
