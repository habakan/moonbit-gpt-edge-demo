// Shared display list executor for MoonBit canvas rendering protocol.
// Supports command IDs 1–36.

const CMD = {
  CLEAR_RECT:       1,
  STROKE_STYLE:     2,
  LINE_WIDTH:       3,
  BEGIN_PATH:       4,
  MOVE_TO:          5,
  LINE_TO:          6,
  STROKE:           7,
  FILL_STYLE:       8,
  FONT_MONO:        9,
  FILL_NUM:         10,
  LINE_JOIN_ROUND:  11,
  TEXT_ALIGN_R:     12,
  TEXT_ALIGN_L:     13,
  TEXT_ALIGN_C:     14,
  TEXT_BASE_TOP:    15,
  TEXT_BASE_MID:    16,
  SAVE:             17,
  RESTORE:          18,
  TRANSLATE:        19,
  ROTATE:           20,
  FILL_RECT:        21,
  FILL_STR:         22,
  STROKE_STYLE_A:   23,
  RESIZE_CANVAS:    24,
  ARC_TO:           25,
  ARC:              26,
  CLOSE_PATH:       27,
  FILL:             28,
  SET_DASH:         29,
  CLEAR_DASH:       30,
  STROKE_RECT:      31,
  FONT_SANS:        32,
  FONT_BOLD_SANS:   33,
  TEXT_BASE_BOT:    34,
  FILL_STYLE_A:     35,
  FONT_BOLD_MONO:   36,
} as const;

export function executeDisplayList(ctx: CanvasRenderingContext2D, cmds: number[]): void {
  let i = 0;
  while (i < cmds.length) {
    const cmd = cmds[i++];
    switch (cmd) {
      case CMD.CLEAR_RECT: ctx.clearRect(cmds[i++], cmds[i++], cmds[i++], cmds[i++]); break;
      case CMD.STROKE_STYLE: { const r = cmds[i++], g = cmds[i++], b = cmds[i++]; ctx.strokeStyle = `rgb(${r},${g},${b})`; break; }
      case CMD.LINE_WIDTH: ctx.lineWidth = cmds[i++]; break;
      case CMD.BEGIN_PATH: ctx.beginPath(); break;
      case CMD.MOVE_TO: ctx.moveTo(cmds[i++], cmds[i++]); break;
      case CMD.LINE_TO: ctx.lineTo(cmds[i++], cmds[i++]); break;
      case CMD.STROKE: ctx.stroke(); break;
      case CMD.FILL_STYLE: { const r = cmds[i++], g = cmds[i++], b = cmds[i++]; ctx.fillStyle = `rgb(${r},${g},${b})`; break; }
      case CMD.FONT_MONO: ctx.font = `${cmds[i++]}px monospace`; break;
      case CMD.FILL_NUM: { const val = cmds[i++], dec = cmds[i++], x = cmds[i++], y = cmds[i++]; ctx.fillText(val.toFixed(dec), x, y); break; }
      case CMD.LINE_JOIN_ROUND: ctx.lineJoin = 'round'; break;
      case CMD.TEXT_ALIGN_R: ctx.textAlign = 'right'; break;
      case CMD.TEXT_ALIGN_L: ctx.textAlign = 'left'; break;
      case CMD.TEXT_ALIGN_C: ctx.textAlign = 'center'; break;
      case CMD.TEXT_BASE_TOP: ctx.textBaseline = 'top'; break;
      case CMD.TEXT_BASE_MID: ctx.textBaseline = 'middle'; break;
      case CMD.SAVE: ctx.save(); break;
      case CMD.RESTORE: ctx.restore(); break;
      case CMD.TRANSLATE: ctx.translate(cmds[i++], cmds[i++]); break;
      case CMD.ROTATE: ctx.rotate(cmds[i++]); break;
      case CMD.FILL_RECT: ctx.fillRect(cmds[i++], cmds[i++], cmds[i++], cmds[i++]); break;
      case CMD.FILL_STR: {
        const n = cmds[i++];
        let s = '';
        for (let j = 0; j < n; j++) s += String.fromCharCode(cmds[i++]);
        ctx.fillText(s, cmds[i++], cmds[i++]);
        break;
      }
      case CMD.STROKE_STYLE_A: { const r = cmds[i++], g = cmds[i++], b = cmds[i++], a = cmds[i++]; ctx.strokeStyle = `rgba(${r},${g},${b},${(a / 255).toFixed(3)})`; break; }
      case CMD.RESIZE_CANVAS: {
        const cssW = cmds[i++], cssH = cmds[i++], dpr = cmds[i++];
        const canv = ctx.canvas as HTMLCanvasElement;
        canv.width = Math.round(cssW * dpr);
        canv.height = Math.round(cssH * dpr);
        canv.style.width = cssW + 'px';
        canv.style.height = cssH + 'px';
        ctx.scale(dpr, dpr);
        break;
      }
      case CMD.ARC_TO: { const x1=cmds[i++],y1=cmds[i++],x2=cmds[i++],y2=cmds[i++],r=cmds[i++]; ctx.arcTo(x1,y1,x2,y2,r); break; }
      case CMD.ARC: { const cx=cmds[i++],cy=cmds[i++],r=cmds[i++],sa=cmds[i++],ea=cmds[i++]; ctx.arc(cx,cy,r,sa,ea); break; }
      case CMD.CLOSE_PATH: ctx.closePath(); break;
      case CMD.FILL: ctx.fill(); break;
      case CMD.SET_DASH: { const n=cmds[i++]; const arr: number[]=[]; for(let k=0;k<n;k++) arr.push(cmds[i++]); ctx.setLineDash(arr); break; }
      case CMD.CLEAR_DASH: ctx.setLineDash([]); break;
      case CMD.STROKE_RECT: { const x=cmds[i++],y=cmds[i++],w=cmds[i++],h=cmds[i++]; ctx.strokeRect(x,y,w,h); break; }
      case CMD.FONT_SANS: { const sz=cmds[i++]; ctx.font=`${sz}px sans-serif`; break; }
      case CMD.FONT_BOLD_SANS: { const sz=cmds[i++]; ctx.font=`bold ${sz}px sans-serif`; break; }
      case CMD.TEXT_BASE_BOT: ctx.textBaseline='bottom'; break;
      case CMD.FILL_STYLE_A: { const r=cmds[i++],g=cmds[i++],b=cmds[i++],a=cmds[i++]; ctx.fillStyle=`rgba(${r},${g},${b},${(a/255).toFixed(3)})`; break; }
      case CMD.FONT_BOLD_MONO: { const sz=cmds[i++]; ctx.font=`bold ${sz}px monospace`; break; }
    }
  }
}
