import { RefObject, useEffect, useRef } from 'react';
import { mbt, isMbtReady } from '../mbt/ffi';
import { executeDisplayList } from '../canvas/displayList';

export function usePcaCanvas(
  embPcaCanvasRef: RefObject<HTMLCanvasElement>,
  residualPcaCanvasRef: RefObject<HTMLCanvasElement>
): void {
  const pcaRafRef = useRef<number>(0);

  useEffect(() => {
    const drawCanvas = (canvas: HTMLCanvasElement, drawFn: (w: number, h: number, dpr: number) => number[]) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      try {
        const dpr = window.devicePixelRatio || 1;
        const parent = canvas.parentElement;
        const w = parent ? parent.clientWidth : canvas.offsetWidth;
        const h = parent ? parent.clientHeight : canvas.offsetHeight;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        const cmds = drawFn(w, h, dpr);
        if (cmds.length > 0) executeDisplayList(ctx, cmds);
      } catch (_) { /* ignore before wasm is ready */ }
    };

    const loop = () => {
      if (isMbtReady()) {
        if (embPcaCanvasRef.current)
          drawCanvas(embPcaCanvasRef.current, (w, h, dpr) => mbt.tickPca(w, h, dpr));
        if (residualPcaCanvasRef.current)
          drawCanvas(residualPcaCanvasRef.current, (w, h, dpr) => mbt.drawResidualPca(w, h, dpr));
      }
      pcaRafRef.current = requestAnimationFrame(loop);
    };
    pcaRafRef.current = requestAnimationFrame(loop);

    // share wheel zoom with residual canvas
    const residualCanvas = residualPcaCanvasRef.current;
    const onResidualWheel = (e: WheelEvent) => { e.preventDefault(); mbt.pcaPointer(3, e.deltaY, 0); };
    if (residualCanvas) {
      residualCanvas.addEventListener('wheel', onResidualWheel, { passive: false });
    }

    // Mouse / wheel events — CSS pixel coordinates
    const canvas = embPcaCanvasRef.current;
    if (canvas) {
      const getPos = (e: MouseEvent) => {
        const r = canvas.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
      };
      // left drag: rotate
      const onDown  = (e: MouseEvent) => { if (e.button !== 0) return; const p = getPos(e); mbt.pcaPointer(0, p.x, p.y); };
      const onMove  = (e: MouseEvent) => { const p = getPos(e); mbt.pcaPointer(1, p.x, p.y); if (e.buttons === 2) mbt.pcaPointer(5, p.x, p.y); };
      const onUp    = (e: MouseEvent) => { if (e.button !== 0) return; const p = getPos(e); mbt.pcaPointer(2, p.x, p.y); };
      // right drag: pan
      const onRDown = (e: MouseEvent) => { if (e.button !== 2) return; e.preventDefault(); const p = getPos(e); mbt.pcaPointer(4, p.x, p.y); };
      const onRUp   = (e: MouseEvent) => { if (e.button !== 2) return; mbt.pcaPointer(6, 0, 0); };
      // scroll: zoom
      const onWheel = (e: WheelEvent) => { e.preventDefault(); mbt.pcaPointer(3, e.deltaY, 0); };
      canvas.addEventListener('mousedown', onDown);
      canvas.addEventListener('mousedown', onRDown);
      canvas.addEventListener('contextmenu', e => e.preventDefault());
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('mouseup', onRUp);
      canvas.addEventListener('wheel', onWheel, { passive: false });
      return () => {
        cancelAnimationFrame(pcaRafRef.current);
        canvas.removeEventListener('mousedown', onDown);
        canvas.removeEventListener('mousedown', onRDown);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('mouseup', onRUp);
        canvas.removeEventListener('wheel', onWheel);
        residualCanvas?.removeEventListener('wheel', onResidualWheel);
      };
    }
    return () => {
      cancelAnimationFrame(pcaRafRef.current);
      residualCanvas?.removeEventListener('wheel', onResidualWheel);
    };
  }, []);
}
