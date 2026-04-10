import { useRef, useEffect, useCallback } from 'react';
import { runEmbViz } from '../../canvas/drawAttn';
import { mbt } from '../../mbt/ffi';

interface EmbPanelProps {
  initialized: boolean;
  triggerCount: number;
  visible: boolean;
}

export function EmbPanel({ initialized, triggerCount, visible }: EmbPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const legendRef = useRef<HTMLCanvasElement>(null);

  const doUpdate = useCallback(() => {
    if (!initialized || !canvasRef.current || !legendRef.current) return;
    const simFlat = mbt.getEmbeddingSimilarity();
    const vocab = mbt.getVocabString().split('|');
    runEmbViz(canvasRef.current, legendRef.current, simFlat, vocab);
  }, [initialized]);

  useEffect(() => {
    if (!visible) return;
    doUpdate();
  }, [triggerCount, visible, doUpdate]);

  return (
    <>
      <div className="controls" style={{marginBottom:'0.4rem'}}>
        <button onClick={doUpdate} disabled={!initialized}>Update</button>
        <span style={{fontSize:'0.74rem',color:'var(--muted)'}}>Cosine similarity</span>
      </div>
      <canvas className="emb-canvas" ref={canvasRef}></canvas>
      <div className="legend">
        <span>–1</span>
        <canvas className="legend-bar" ref={legendRef} width={200} height={10}></canvas>
        <span>+1</span>
      </div>
    </>
  );
}
