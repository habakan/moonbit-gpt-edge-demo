import { useRef, useState, type ReactNode, type CSSProperties, type RefObject } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox, type ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface FloatingPanelProps {
  id: string;
  title: ReactNode;
  visible: boolean;
  defaultPos?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  width?: number;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  children: ReactNode;
}

export function FloatingPanel({
  title, visible, defaultPos, defaultSize, width, onClose, onFocus, zIndex, children,
}: FloatingPanelProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const initW = defaultSize?.width ?? width ?? 380;
  const initH = defaultSize?.height ?? 400;
  const [size, setSize] = useState({ width: initW, height: initH });

  const style: CSSProperties = {
    visibility: visible ? 'visible' : 'hidden',
    pointerEvents: visible ? 'auto' : 'none',
    zIndex,
    width: size.width,
  };

  return (
    <Draggable
      handle=".panel-header"
      defaultPosition={defaultPos ?? { x: 20, y: 56 }}
      nodeRef={nodeRef as unknown as RefObject<HTMLElement>}
    >
      <div
        ref={nodeRef}
        className="panel"
        style={style}
        onMouseDown={onFocus}
      >
        <div className="panel-header">
          <span className="panel-title">{title}</span>
          <button className="panel-close" onClick={onClose}>×</button>
        </div>
        <ResizableBox
          width={size.width}
          height={size.height}
          onResize={(_e: React.SyntheticEvent, { size: s }: ResizeCallbackData) => setSize(s)}
          minConstraints={[200, 80]}
          maxConstraints={[1400, 1000]}
          resizeHandles={['se', 's', 'e']}
        >
          <div className="panel-body" style={{ width: '100%', height: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
            {children}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}
