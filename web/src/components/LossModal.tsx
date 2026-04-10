import { useRef, useEffect } from 'react';
import { drawLossModalChart } from '../canvas/drawLossChart';

interface LossModalProps {
  losses: number[];
  visible: boolean;
  onClose: () => void;
}

export function LossModal({ losses, visible, onClose }: LossModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const lastLoss = losses.length > 0 ? losses[losses.length - 1] : -1;
  const lossValText = lastLoss >= 0 ? lastLoss.toFixed(4) : '–';

  useEffect(() => {
    if (!visible || !canvasRef.current || losses.length < 2) return;
    let minL = Infinity, maxL = -Infinity;
    for (const l of losses) { if (l < minL) minL = l; if (l > maxL) maxL = l; }
    const rng = maxL - minL || 1;
    const last = losses[losses.length - 1];
    drawLossModalChart(canvasRef.current, losses, minL, maxL, rng, last);
  }, [losses, visible]);

  return (
    <div id="loss-modal" className={visible ? 'visible' : ''}>
      <div id="loss-modal-header">
        <span>Loss</span>
        <span id="loss-modal-val" style={{fontFamily:'monospace',color:'var(--accent)'}}>{lossValText}</span>
        <button id="loss-modal-close" title="close" onClick={onClose}>✕</button>
      </div>
      <canvas id="loss-modal-canvas" ref={canvasRef}></canvas>
    </div>
  );
}
