import { useRef, useEffect } from 'react';
import { drawLossChart } from '../../canvas/drawLossChart';

interface TrainingPanelProps {
  step: number;
  loss: number;
  losses: number[];
  numSteps: number;
  initialized: boolean;
  currentGPT: boolean;
  visible: boolean;
}

export function TrainingPanel({ step, loss, losses, numSteps, initialized, currentGPT, visible }: TrainingPanelProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const stepTxt = `${step} / ${numSteps}`;
  const lossTxt = loss >= 0 ? loss.toFixed(4) : '–';
  const pct = `${(step / numSteps) * 100}%`;

  useEffect(() => {
    if (!visible || !chartRef.current) return;
    drawLossChart(chartRef.current, losses);
  }, [losses, visible]);

  const infoText = !initialized
    ? 'MoonBit runtime ready. Press "Start" to begin.'
    : (currentGPT ? 'Mode: GPT (Decoder-only)' : 'Mode: Encoder-Decoder Transformer') + '\n' +
      'Params: ~4 200  |  n_layer=1  n_embd=32  n_head=4  block_size=8\n' +
      'Optimizer: Adam (lr=0.01, β1=0.85, β2=0.99)\n' +
      'Dataset: 50 English recipe sentences\n' +
      'Runtime: MoonBit → JS (edge)';

  return (
    <>
      <div className="stat-row">
        <div className="stat"><span className="stat-label">Step</span><span className="stat-value">{stepTxt}</span></div>
        <div className="stat"><span className="stat-label">Loss</span><span className="stat-value">{lossTxt}</span></div>
      </div>
      <div className="progress-wrap"><div className="progress-bar" style={{width: pct}}></div></div>
      <canvas className="loss-chart" ref={chartRef}></canvas>
      <div className="log" style={{marginTop:'0.5rem'}}>{infoText}</div>
    </>
  );
}
