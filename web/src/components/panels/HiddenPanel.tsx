import { useRef, useEffect, useState } from 'react';
import { runHiddenViz } from '../../canvas/drawAttn';

interface HiddenPanelProps {
  hiddenFlat: number[];
  seq: number;
  tokens: string[];
  visible: boolean;
  running: boolean;
}

export function HiddenPanel({ hiddenFlat, seq, tokens, visible, running }: HiddenPanelProps) {
  const [stage, setStage] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const legendRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!visible || !canvasRef.current || !legendRef.current || seq === 0) return;
    runHiddenViz(canvasRef.current, legendRef.current, hiddenFlat, seq, stage, tokens);
  }, [hiddenFlat, seq, tokens, stage, visible]);

  const STAGE_LABELS = ['Raw Embed', 'After Attn', 'After MLP'];

  return (
    <>
      <div className="tab-row">
        {STAGE_LABELS.map((label, i) => (
          <button
            key={i}
            className={'tab' + (stage === i ? ' active' : '')}
            onClick={() => setStage(i)}
          >{label}</button>
        ))}
      </div>
      <canvas
        ref={canvasRef}
        style={{imageRendering:'pixelated',borderRadius:4,display:'block',maxWidth:'100%'}}
      ></canvas>
      <div className="legend">
        <span>–</span>
        <canvas className="legend-bar" ref={legendRef} width={200} height={10}></canvas>
        <span>+</span>
      </div>
      {running && <span style={{fontSize:'0.65rem',color:'var(--green)',fontWeight:'normal'}}>live</span>}
    </>
  );
}
