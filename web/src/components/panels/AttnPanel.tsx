import { useRef, useEffect, type RefObject } from 'react';
import { drawAttnHead, drawAttnLegend } from '../../canvas/drawAttn';

const N_HEAD = 4;

interface AttnPanelProps {
  attnFlat: number[];
  seq: number;
  tokens: string[];
  currentGPT: boolean;
  visible: boolean;
  running: boolean;
}

export function AttnPanel({ attnFlat, seq, tokens, currentGPT, visible, running }: AttnPanelProps) {
  const canvas0 = useRef<HTMLCanvasElement>(null);
  const canvas1 = useRef<HTMLCanvasElement>(null);
  const canvas2 = useRef<HTMLCanvasElement>(null);
  const canvas3 = useRef<HTMLCanvasElement>(null);
  const legendRef = useRef<HTMLCanvasElement>(null);

  const infoText = seq === 0
    ? (currentGPT ? '(GPT mode: attn panel N/A)' : '(no known words)')
    : `${seq} tokens: ${tokens.join(' → ')}`;

  useEffect(() => {
    if (!visible || seq === 0 || attnFlat.length === 0) return;
    const refs = [canvas0, canvas1, canvas2, canvas3];
    for (let h = 0; h < N_HEAD; h++) {
      const c = refs[h].current;
      if (c) drawAttnHead(c, attnFlat, h, seq, tokens);
    }
    const legend = legendRef.current;
    if (legend) drawAttnLegend(legend);
  // canvas refs are stable, intentionally omitted from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attnFlat, seq, tokens, visible]);

  useEffect(() => {
    if (legendRef.current) drawAttnLegend(legendRef.current);
  }, []);

  return (
    <>
      <div style={{fontSize:'0.74rem',color:'var(--muted)',marginBottom:'0.5rem'}}>{infoText}</div>
      <div className="attn-grid">
        {([canvas0, canvas1, canvas2, canvas3] as RefObject<HTMLCanvasElement>[]).map((ref, h) => (
          <div key={h} className="attn-head">
            <div className="attn-head-label">Head {h+1}</div>
            <canvas className="attn-canvas" ref={ref}></canvas>
          </div>
        ))}
      </div>
      <div className="legend">
        <span>0.0</span>
        <canvas className="legend-bar" ref={legendRef} width={200} height={10}></canvas>
        <span>1.0</span>
      </div>
      {running && <span style={{fontSize:'0.65rem',color:'var(--green)',fontWeight:'normal'}}>live</span>}
    </>
  );
}

