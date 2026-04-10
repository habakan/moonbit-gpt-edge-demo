import { useRef, useEffect } from 'react';
import { runMlpViz } from '../../canvas/drawAttn';

interface MlpPanelProps {
  mlpFlat: number[];
  seq: number;
  tokens: string[];
  visible: boolean;
  running: boolean;
}

export function MlpPanel({ mlpFlat, seq, tokens, visible, running }: MlpPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const legendRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!visible || !canvasRef.current || !legendRef.current || seq === 0) return;
    runMlpViz(canvasRef.current, legendRef.current, mlpFlat, seq, tokens);
  }, [mlpFlat, seq, tokens, visible]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{imageRendering:'pixelated',borderRadius:4,display:'block',maxWidth:'100%'}}
      ></canvas>
      <div className="legend">
        <span>0</span>
        <canvas className="legend-bar" ref={legendRef} width={200} height={10}></canvas>
        <span>+</span>
      </div>
      {running && <span style={{fontSize:'0.65rem',color:'var(--green)',fontWeight:'normal'}}>live</span>}
    </>
  );
}
