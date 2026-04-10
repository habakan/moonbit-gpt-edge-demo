import { mbt } from '../mbt/ffi';
import { executeDisplayList } from './displayList';

const N_HEAD = 4;

export function drawAttnHead(
  canvas: HTMLCanvasElement,
  _flat: number[],
  h: number,
  _seq: number,
  _tokens: string[]
): void {
  const dpr = window.devicePixelRatio || 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const cmds = mbt.drawAttnHead(h, dpr);
  executeDisplayList(ctx, cmds);
}

export function drawAttnLegend(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const cmds = mbt.drawLegendAttn(canvas.width, canvas.height);
  executeDisplayList(ctx, cmds);
}

export function runAttnViz(
  canvases: HTMLCanvasElement[],
  legendCanvas: HTMLCanvasElement,
  flat: number[],
  seq: number,
  tokens: string[]
): void {
  for (let h = 0; h < N_HEAD; h++) drawAttnHead(canvases[h], flat, h, seq, tokens);
  drawAttnLegend(legendCanvas);
}

export function runEmbViz(
  canvas: HTMLCanvasElement,
  legendCanvas: HTMLCanvasElement,
  _simFlat: number[],
  _vocab: string[]
): void {
  const dpr = window.devicePixelRatio || 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const cmds = mbt.drawEmbSim(dpr);
  executeDisplayList(ctx, cmds);

  const lctx = legendCanvas.getContext('2d');
  if (!lctx) return;
  const lcmds = mbt.drawLegendSim(legendCanvas.width, legendCanvas.height);
  executeDisplayList(lctx, lcmds);
}

export function runHiddenViz(
  canvas: HTMLCanvasElement,
  legendCanvas: HTMLCanvasElement,
  _flat: number[],
  _seq: number,
  stage: number,
  _tokens: string[]
): void {
  const dpr = window.devicePixelRatio || 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const cmds = mbt.drawHidden(stage, dpr);
  executeDisplayList(ctx, cmds);
  const lctx = legendCanvas.getContext('2d');
  if (!lctx) return;
  const lcmds = mbt.drawLegendDiv(legendCanvas.width, legendCanvas.height);
  executeDisplayList(lctx, lcmds);
}

export function runMlpViz(
  canvas: HTMLCanvasElement,
  legendCanvas: HTMLCanvasElement,
  _flat: number[],
  _seq: number,
  _tokens: string[]
): void {
  const dpr = window.devicePixelRatio || 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const cmds = mbt.drawMlp(dpr);
  executeDisplayList(ctx, cmds);
  const lctx = legendCanvas.getContext('2d');
  if (!lctx) return;
  const lcmds = mbt.drawLegendGreen(legendCanvas.width, legendCanvas.height);
  executeDisplayList(lctx, lcmds);
}

export function runLogitsViz(
  container: HTMLElement,
  ctxLabelEl: HTMLElement,
  flat: number[],
  seq: number,
  vocab: string[],
  pos: number,
  tokens: string[]
): void {
  if (!flat || seq === 0 || flat.length === 0) return;
  const vs = vocab.length;
  const clampedPos = Math.min(pos, seq - 1);
  const logits = flat.slice(clampedPos * vs, (clampedPos + 1) * vs);
  let maxL = -Infinity;
  for (const v of logits) if (v > maxL) maxL = v;
  const exps = logits.map(v => Math.exp(v - maxL));
  const sum = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map(v => v / sum);
  const pairs = vocab.map((w, i) => ({ w, p: probs[i] }));
  pairs.sort((a, b) => b.p - a.p);
  container.innerHTML = '';
  for (const { w, p } of pairs.slice(0, 15)) {
    const row = document.createElement('div');
    row.className = 'pred-bar-row';

    const label = document.createElement('span');
    label.className = 'pred-bar-label';
    label.textContent = w;

    const barBg = document.createElement('div');
    barBg.className = 'pred-bar-bg';
    const barFill = document.createElement('div');
    barFill.className = 'pred-bar-fill';
    barFill.style.width = `${(p * 100).toFixed(1)}%`;
    barBg.appendChild(barFill);

    const val = document.createElement('span');
    val.className = 'pred-bar-val';
    val.textContent = `${(p * 100).toFixed(1)}%`;

    row.appendChild(label);
    row.appendChild(barBg);
    row.appendChild(val);
    container.appendChild(row);
  }
  ctxLabelEl.textContent = tokens[clampedPos] ? `after "${tokens[clampedPos]}"` : '';
}
