import { type RefObject, useRef, useEffect, useCallback } from 'react';

interface ArchCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export function ArchCanvas({ canvasRef }: ArchCanvasProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const netZoomRef = useRef(1.0);
  const MIN_ZOOM = 0.2, MAX_ZOOM = 5.0;

  const applyZoom = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const zoom = netZoomRef.current;
    canvas.style.transform = `scale(${zoom})`;
    const cw = parseInt(canvas.style.width) || canvas.width;
    const ch = parseInt(canvas.style.height) || canvas.height;
    wrap.style.width  = Math.round(cw * zoom) + 'px';
    wrap.style.height = Math.round(ch * zoom) + 'px';
  }, [canvasRef]);

  const zoomAround = useCallback((factor: number, pivotX: number, pivotY: number) => {
    const area = areaRef.current;
    if (!area) return;
    const oldZoom = netZoomRef.current;
    netZoomRef.current = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, oldZoom * factor));
    applyZoom();
    const cx = (area.scrollLeft + pivotX) / oldZoom;
    const cy = (area.scrollTop  + pivotY) / oldZoom;
    area.scrollLeft = cx * netZoomRef.current - pivotX;
    area.scrollTop  = cy * netZoomRef.current - pivotY;
  }, [applyZoom]);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const rect = area.getBoundingClientRect();
      zoomAround(e.deltaY < 0 ? 1.02 : 0.98, e.clientX - rect.left, e.clientY - rect.top);
    };

    let lastPinchDist: number | null = null;
    let lastPinchMid: { x: number; y: number } | null = null;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist = Math.hypot(dx, dy);
        const rect = area.getBoundingClientRect();
        lastPinchMid = {
          x: (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left,
          y: (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top,
        };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || lastPinchDist === null || !lastPinchMid) return;
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const damped = 1 + (dist / lastPinchDist - 1) * 0.25;
      lastPinchDist = dist;
      zoomAround(damped, lastPinchMid.x, lastPinchMid.y);
    };
    const onTouchEnd = () => { lastPinchDist = null; };

    let dragStart: { x: number; y: number } | null = null;
    let scrollStart: { left: number; top: number } | null = null;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      dragStart = { x: e.clientX, y: e.clientY };
      scrollStart = { left: area.scrollLeft, top: area.scrollTop };
      area.style.cursor = 'grabbing';
      e.preventDefault();
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!dragStart || !scrollStart) return;
      area.scrollLeft = scrollStart.left - (e.clientX - dragStart.x);
      area.scrollTop  = scrollStart.top  - (e.clientY - dragStart.y);
    };
    const onMouseUp = () => {
      dragStart = null;
      area.style.cursor = '';
    };

    area.addEventListener('wheel', onWheel, { passive: false });
    area.addEventListener('touchstart', onTouchStart, { passive: true });
    area.addEventListener('touchmove', onTouchMove, { passive: false });
    area.addEventListener('touchend', onTouchEnd, { passive: true });
    area.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      area.removeEventListener('wheel', onWheel);
      area.removeEventListener('touchstart', onTouchStart);
      area.removeEventListener('touchmove', onTouchMove);
      area.removeEventListener('touchend', onTouchEnd);
      area.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [zoomAround]);

  return (
    <div id="arch-area" ref={areaRef}>
      <div id="canvas-zoom-wrap" ref={wrapRef}>
        <canvas id="net-canvas" ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
