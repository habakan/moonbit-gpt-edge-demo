// Loss chart drawing — backed by MoonBit (display list protocol).
// executeDisplayList is shared via displayList.ts.

import { mbt } from '../mbt/ffi';
import { executeDisplayList } from './displayList';

export function drawLossChart(canvas: HTMLCanvasElement, _losses: number[]): void {
  const dpr = devicePixelRatio;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const cmds = mbt.drawLossChart(canvas.width, canvas.height, dpr);
  executeDisplayList(ctx, cmds);
}

export function drawLossModalChart(
  canvas: HTMLCanvasElement,
  _losses: number[],
  _minL: number,
  _maxL: number,
  _rng: number,
  _last: number
): void {
  const dpr = devicePixelRatio;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const cmds = mbt.drawLossChartModal(canvas.width, canvas.height, dpr);
  executeDisplayList(ctx, cmds);
}

export function drawLossChartFull(
  canvas: HTMLCanvasElement,
  modalCanvas: HTMLCanvasElement,
  _losses: number[]
): void {
  drawLossChart(canvas, []);
  drawLossModalChart(modalCanvas, [], 0, 0, 1, 0);
}
