import React from 'react';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function EmbPcaPanel({ canvasRef }: Props) {
  return (
    <div style={{ background: '#0d1117', width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
      />
    </div>
  );
}
