// ---------------------------------------------------------------------------
// Canvas 2D display list rendering
//
// MoonBit generates a flat Array[Double] of drawing commands.
// JS interprets the list and calls the actual Canvas 2D API.
//
// Command format:  [ CMD_ID, param1, param2, ... ]
// ---------------------------------------------------------------------------

// Command IDs
const DL_CLEAR_RECT         : Double = 1.0
const DL_STROKE_STYLE       : Double = 2.0  // r g b (0–255)
const DL_LINE_WIDTH         : Double = 3.0  // w
const DL_BEGIN_PATH         : Double = 4.0
const DL_MOVE_TO            : Double = 5.0  // x y
const DL_LINE_TO            : Double = 6.0  // x y
const DL_STROKE             : Double = 7.0
const DL_FILL_STYLE         : Double = 8.0  // r g b (0–255)
const DL_FONT_MONO_PX       : Double = 9.0  // size
const DL_FILL_TEXT_FLOAT    : Double = 10.0 // value decimals x y
const DL_LINE_JOIN_ROUND    : Double = 11.0
const DL_TEXT_ALIGN_RIGHT   : Double = 12.0
const DL_TEXT_ALIGN_LEFT    : Double = 13.0
const DL_TEXT_ALIGN_CENTER  : Double = 14.0
const DL_TEXT_BASELINE_TOP  : Double = 15.0
const DL_TEXT_BASELINE_MID  : Double = 16.0

// New command IDs (17–24)
const DL_SAVE           : Double = 17.0
const DL_RESTORE        : Double = 18.0
const DL_TRANSLATE      : Double = 19.0
const DL_ROTATE         : Double = 20.0
const DL_FILL_RECT      : Double = 21.0
const DL_FILL_TEXT_STR  : Double = 22.0
const DL_STROKE_RGBA    : Double = 23.0
const DL_RESIZE_CANVAS  : Double = 24.0

// New command IDs (25–36)
const DL_ARC_TO          : Double = 25.0 // x1 y1 x2 y2 r
const DL_ARC             : Double = 26.0 // cx cy r startAngle endAngle
const DL_CLOSE_PATH      : Double = 27.0
const DL_FILL            : Double = 28.0
const DL_SET_LINE_DASH   : Double = 29.0 // n d1 d2 ...
const DL_CLEAR_LINE_DASH : Double = 30.0
const DL_STROKE_RECT     : Double = 31.0 // x y w h
const DL_FONT_SANS_PX    : Double = 32.0 // size
const DL_FONT_BOLD_SANS  : Double = 33.0 // size
const DL_TEXT_BASELINE_BOT : Double = 34.0
const DL_FILL_STYLE_RGBA : Double = 35.0 // r g b a (0-255)
const DL_FONT_BOLD_MONO  : Double = 36.0 // size

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

fn loss_min_max_rng(losses : Array[Double]) -> (Double, Double, Double) {
  let mut mn = losses[0]
  let mut mx = losses[0]
  for l in losses {
    if l < mn {
      mn = l
    }
    if l > mx {
      mx = l
    }
  }
  let rng = if mx - mn > 0.0 { mx - mn } else { 1.0 }
  (mn, mx, rng)
}

fn push_grid_lines(
  cmds : Array[Double],
  pad_t : Double,
  pad_l : Double,
  ch : Double,
  right_x : Double
) -> Unit {
  cmds.push(DL_STROKE_STYLE)
  cmds.push(33.0)
  cmds.push(38.0)
  cmds.push(45.0)
  cmds.push(DL_LINE_WIDTH)
  cmds.push(1.0)
  for i in 0..<4 {
    let y = pad_t + ch * i.to_double() / 3.0
    cmds.push(DL_BEGIN_PATH)
    cmds.push(DL_MOVE_TO)
    cmds.push(pad_l)
    cmds.push(y)
    cmds.push(DL_LINE_TO)
    cmds.push(right_x)
    cmds.push(y)
    cmds.push(DL_STROKE)
  }
}

fn push_loss_curve(
  cmds : Array[Double],
  losses : Array[Double],
  pad_t : Double,
  pad_l : Double,
  cw : Double,
  ch : Double,
  mn : Double,
  rng : Double,
  dpr : Double
) -> Unit {
  let n = losses.length()
  cmds.push(DL_STROKE_STYLE)
  cmds.push(88.0)
  cmds.push(166.0)
  cmds.push(255.0)
  cmds.push(DL_LINE_WIDTH)
  cmds.push(1.5 * dpr)
  cmds.push(DL_LINE_JOIN_ROUND)
  cmds.push(DL_BEGIN_PATH)
  for i in 0..<n {
    let x = pad_l + i.to_double() / (n - 1).to_double() * cw
    let y = pad_t + (1.0 - (losses[i] - mn) / rng) * ch
    if i == 0 {
      cmds.push(DL_MOVE_TO)
      cmds.push(x)
      cmds.push(y)
    } else {
      cmds.push(DL_LINE_TO)
      cmds.push(x)
      cmds.push(y)
    }
  }
  cmds.push(DL_STROKE)
}

// ---------------------------------------------------------------------------
// Loss chart (panel — small)
// Mirrors drawLossChart() in drawLossChart.ts
// ---------------------------------------------------------------------------

pub fn draw_loss_chart(w : Double, h : Double, dpr : Double) -> Array[Double] {
  let losses = g_loss_history.val
  let cmds : Array[Double] = []
  if losses.length() < 2 {
    return cmds
  }
  let pad_t = 14.0
  let pad_b = 20.0
  let pad_l = 6.0
  let pad_r = 6.0
  let cw = w - pad_l - pad_r
  let ch = h - pad_t - pad_b
  let (mn, _, rng) = loss_min_max_rng(losses)

  // Clear
  cmds.push(DL_CLEAR_RECT)
  cmds.push(0.0)
  cmds.push(0.0)
  cmds.push(w)
  cmds.push(h)

  // Grid
  push_grid_lines(cmds, pad_t, pad_l, ch, w - pad_r)

  // Curve
  push_loss_curve(cmds, losses, pad_t, pad_l, cw, ch, mn, rng, dpr)

  // Last-value label (top-right of the curve end)
  let n = losses.length()
  let last = losses[n - 1]
  let lx = pad_l + cw
  let ly = pad_t + (1.0 - (last - mn) / rng) * ch
  cmds.push(DL_FILL_STYLE)
  cmds.push(88.0)
  cmds.push(166.0)
  cmds.push(255.0)
  cmds.push(DL_FONT_MONO_PX)
  cmds.push(9.0 * dpr)
  cmds.push(DL_TEXT_ALIGN_RIGHT)
  cmds.push(DL_FILL_TEXT_FLOAT)
  cmds.push(last)
  cmds.push(3.0)
  cmds.push(lx - 32.0 * dpr)
  cmds.push(ly - 4.0 * dpr)

  cmds
}

// ---------------------------------------------------------------------------
// Loss chart (modal — full width with axis labels)
// Mirrors drawLossModalChart() in drawLossChart.ts
// ---------------------------------------------------------------------------

pub fn draw_loss_chart_modal(w : Double, h : Double, dpr : Double) -> Array[Double] {
  let losses = g_loss_history.val
  let cmds : Array[Double] = []
  if losses.length() < 2 {
    return cmds
  }
  let pad_t = 10.0
  let pad_b = 18.0
  let pad_l = 8.0
  let pad_r = 8.0
  let cw = w - pad_l - pad_r
  let ch = h - pad_t - pad_b
  let n = losses.length()
  let (mn, mx, rng) = loss_min_max_rng(losses)

  // Clear
  cmds.push(DL_CLEAR_RECT)
  cmds.push(0.0)
  cmds.push(0.0)
  cmds.push(w)
  cmds.push(h)

  // Grid
  push_grid_lines(cmds, pad_t, pad_l, ch, w - pad_r)

  // X-axis labels: "0" at left, "n-1" at right
  cmds.push(DL_FILL_STYLE)
  cmds.push(85.0)
  cmds.push(85.0)
  cmds.push(85.0)
  cmds.push(DL_FONT_MONO_PX)
  cmds.push(8.0 * dpr)
  cmds.push(DL_TEXT_ALIGN_CENTER)
  cmds.push(DL_TEXT_BASELINE_TOP)
  cmds.push(DL_FILL_TEXT_FLOAT)
  cmds.push(0.0)
  cmds.push(0.0)
  cmds.push(pad_l)
  cmds.push(h - pad_b + 3.0)
  cmds.push(DL_FILL_TEXT_FLOAT)
  cmds.push((n - 1).to_double())
  cmds.push(0.0)
  cmds.push(pad_l + cw)
  cmds.push(h - pad_b + 3.0)

  // Curve
  push_loss_curve(cmds, losses, pad_t, pad_l, cw, ch, mn, rng, dpr)

  // Y-axis labels: max at top, min at bottom
  cmds.push(DL_FILL_STYLE)
  cmds.push(85.0)
  cmds.push(85.0)
  cmds.push(85.0)
  cmds.push(DL_FONT_MONO_PX)
  cmds.push(8.0 * dpr)
  cmds.push(DL_TEXT_ALIGN_LEFT)
  cmds.push(DL_TEXT_BASELINE_MID)
  cmds.push(DL_FILL_TEXT_FLOAT)
  cmds.push(mx)
  cmds.push(2.0)
  cmds.push(1.0)
  cmds.push(pad_t)
  cmds.push(DL_FILL_TEXT_FLOAT)
  cmds.push(mn)
  cmds.push(2.0)
  cmds.push(1.0)
  cmds.push(pad_t + ch)

  cmds
}

// ---------------------------------------------------------------------------
// Helpers for attention visualization
// ---------------------------------------------------------------------------

fn push_fill_rect(
  cmds : Array[Double],
  x : Double,
  y : Double,
  w : Double,
  h : Double
) -> Unit {
  cmds.push(DL_FILL_RECT)
  cmds.push(x)
  cmds.push(y)
  cmds.push(w)
  cmds.push(h)
}

fn push_fill_str(
  cmds : Array[Double],
  s : String,
  x : Double,
  y : Double
) -> Unit {
  cmds.push(DL_FILL_TEXT_STR)
  cmds.push(s.length().to_double())
  for i in 0..<s.length() {
    cmds.push(s[i].to_int().to_double())
  }
  cmds.push(x)
  cmds.push(y)
}

fn split_by_pipe(s : String) -> Array[String] {
  let parts : Array[String] = []
  let buf = StringBuilder::new()
  for ch in s.iter() {
    if ch == '|' {
      parts.push(buf.to_string())
      buf.reset()
    } else {
      buf.write_char(ch)
    }
  }
  parts.push(buf.to_string())
  parts
}

fn color_attn(v : Double) -> (Int, Int, Int) {
  let r = (v * 255.0).to_int()
  let g = (v * 200.0).to_int()
  let b = ((1.0 - v) * 80.0).to_int()
  (r, g, b)
}

fn color_div(v : Double, mx : Double) -> (Int, Int, Int) {
  let denom = if mx < 0.01 { 0.01 } else { mx }
  let abs_v = if v >= 0.0 { v } else { -v }
  let t_raw = abs_v / denom
  let t = if t_raw > 1.0 { 1.0 } else { t_raw }
  if v >= 0.0 {
    ((220.0 * t).to_int(), (40.0 * t).to_int(), (40.0 * t).to_int())
  } else {
    ((30.0 * t).to_int(), (30.0 * t).to_int(), (220.0 * t).to_int())
  }
}

fn color_green(v : Double, scale : Double) -> (Int, Int, Int) {
  let denom = if scale < 0.01 { 0.01 } else { scale }
  let t_raw = v / denom
  let t = if t_raw > 1.0 { 1.0 } else { t_raw }
  ((30.0 * t).to_int(), (200.0 * t).to_int(), (80.0 * t).to_int())
}

// ---------------------------------------------------------------------------
// draw_attn_head: attention heatmap for one head
// ---------------------------------------------------------------------------

pub fn draw_attn_head(h : Int, dpr : Double) -> Array[Double] {
  let cmds : Array[Double] = []
  let flat = g_viz_attn_flat.val
  let seq = g_viz_seq_len.val
  let tokens_str = g_viz_tokens_str.val
  if seq <= 0 || flat.length() == 0 {
    return cmds
  }
  let tokens = split_by_pipe(tokens_str)

  let label_w = 52
  let label_h = 44
  let cell = if 24 > 160 / seq { 24 } else { 160 / seq }
  let mat_w = seq * cell
  let mat_h = seq * cell
  let css_w = (label_w + mat_w).to_double()
  let css_h = (label_h + mat_h).to_double()

  // Resize canvas
  cmds.push(DL_RESIZE_CANVAS)
  cmds.push(css_w)
  cmds.push(css_h)
  cmds.push(dpr)

  // Background
  cmds.push(DL_FILL_STYLE)
  cmds.push(13.0)
  cmds.push(17.0)
  cmds.push(23.0)
  push_fill_rect(cmds, 0.0, 0.0, css_w, css_h)

  // Heatmap cells
  let offset = h * seq * seq
  for qi in 0..<seq {
    for ki in 0..<seq {
      let idx = offset + qi * seq + ki
      let w = if idx < flat.length() { flat[idx] } else { 0.0 }
      let (r, g, b) = color_attn(w)
      cmds.push(DL_FILL_STYLE)
      cmds.push(r.to_double())
      cmds.push(g.to_double())
      cmds.push(b.to_double())
      push_fill_rect(
        cmds,
        (label_w + ki * cell).to_double(),
        (label_h + qi * cell).to_double(),
        cell.to_double(),
        cell.to_double(),
      )
    }
  }

  // Grid lines
  cmds.push(DL_STROKE_RGBA)
  cmds.push(255.0)
  cmds.push(255.0)
  cmds.push(255.0)
  cmds.push(15.0) // 0.06 * 255 ≈ 15
  cmds.push(DL_LINE_WIDTH)
  cmds.push(0.5)
  for i in 0..<(seq + 1) {
    cmds.push(DL_BEGIN_PATH)
    cmds.push(DL_MOVE_TO)
    cmds.push((label_w + i * cell).to_double())
    cmds.push(label_h.to_double())
    cmds.push(DL_LINE_TO)
    cmds.push((label_w + i * cell).to_double())
    cmds.push((label_h + mat_h).to_double())
    cmds.push(DL_STROKE)
    cmds.push(DL_BEGIN_PATH)
    cmds.push(DL_MOVE_TO)
    cmds.push(label_w.to_double())
    cmds.push((label_h + i * cell).to_double())
    cmds.push(DL_LINE_TO)
    cmds.push((label_w + mat_w).to_double())
    cmds.push((label_h + i * cell).to_double())
    cmds.push(DL_STROKE)
  }

  // Token labels
  let font_size = if 10 < cell - 2 { 10 } else { cell - 2 }
  cmds.push(DL_FONT_MONO_PX)
  cmds.push(font_size.to_double())
  cmds.push(DL_TEXT_BASELINE_MID)

  for i in 0..<seq {
    let label = if i < tokens.length() { tokens[i] } else { "" }
    let cx = (label_w + i * cell).to_double() + cell.to_double() / 2.0
    let cy = (label_h + i * cell).to_double() + cell.to_double() / 2.0

    // Top (rotated) label
    cmds.push(DL_SAVE)
    cmds.push(DL_TRANSLATE)
    cmds.push(cx)
    cmds.push((label_h - 4).to_double())
    cmds.push(DL_ROTATE)
    cmds.push(-@math.PI / 4.0)
    cmds.push(DL_FILL_STYLE)
    cmds.push(139.0)
    cmds.push(148.0)
    cmds.push(158.0)
    cmds.push(DL_TEXT_ALIGN_LEFT)
    push_fill_str(cmds, label, 0.0, 0.0)
    cmds.push(DL_RESTORE)

    // Left label
    cmds.push(DL_FILL_STYLE)
    cmds.push(139.0)
    cmds.push(148.0)
    cmds.push(158.0)
    cmds.push(DL_TEXT_ALIGN_RIGHT)
    push_fill_str(cmds, label, (label_w - 4).to_double(), cy)
  }

  // Cell values (when cell >= 28)
  if cell >= 28 {
    let num_font = if 7 > cell / 4 { 7 } else { cell / 4 }
    cmds.push(DL_TEXT_ALIGN_CENTER)
    cmds.push(DL_TEXT_BASELINE_MID)
    cmds.push(DL_FONT_MONO_PX)
    cmds.push(num_font.to_double())
    for qi in 0..<seq {
      for ki in 0..<seq {
        let idx = offset + qi * seq + ki
        let w = if idx < flat.length() { flat[idx] } else { 0.0 }
        if w > 0.05 {
          if w > 0.5 {
            cmds.push(DL_FILL_STYLE)
            cmds.push(0.0)
            cmds.push(0.0)
            cmds.push(0.0)
          } else {
            cmds.push(DL_FILL_STYLE)
            cmds.push(204.0)
            cmds.push(204.0)
            cmds.push(204.0)
          }
          cmds.push(DL_FILL_TEXT_FLOAT)
          cmds.push(w)
          cmds.push(2.0)
          cmds.push(
            (label_w + ki * cell).to_double() + cell.to_double() / 2.0,
          )
          cmds.push(
            (label_h + qi * cell).to_double() + cell.to_double() / 2.0,
          )
        }
      }
    }
  }

  cmds
}

// ---------------------------------------------------------------------------
// draw_legend_attn: attention color legend (physical pixel coords)
// ---------------------------------------------------------------------------

pub fn draw_legend_attn(w : Double, h : Double) -> Array[Double] {
  let cmds : Array[Double] = []
  let wi = w.to_int()
  for x in 0..<wi {
    let v = if wi <= 1 {
      0.0
    } else {
      x.to_double() / (w - 1.0)
    }
    let (r, g, b) = color_attn(v)
    cmds.push(DL_FILL_STYLE)
    cmds.push(r.to_double())
    cmds.push(g.to_double())
    cmds.push(b.to_double())
    push_fill_rect(cmds, x.to_double(), 0.0, 1.0, h)
  }
  cmds
}

// ---------------------------------------------------------------------------
// draw_hidden: hidden state heatmap
// ---------------------------------------------------------------------------

pub fn draw_hidden(stage : Int, dpr : Double) -> Array[Double] {
  let cmds : Array[Double] = []
  let flat = g_viz_hidden.val
  let seq = g_viz_seq_len.val
  let tokens_str = g_viz_tokens_str.val
  if seq <= 0 || flat.length() == 0 {
    return cmds
  }
  let n_embd = 32
  let stage_start = stage * seq * n_embd
  let stage_end = (stage + 1) * seq * n_embd
  if stage_start >= flat.length() || stage_end > flat.length() {
    return cmds
  }

  let tokens = split_by_pipe(tokens_str)
  let label_w = 52
  let cell_w = if 4 > 260 / n_embd { 4 } else { 260 / n_embd }
  let cell_h = if 18 > 120 / seq { 18 } else { 120 / seq }
  let css_w = (label_w + n_embd * cell_w).to_double()
  let css_h = (seq * cell_h).to_double()

  // Resize canvas
  cmds.push(DL_RESIZE_CANVAS)
  cmds.push(css_w)
  cmds.push(css_h)
  cmds.push(dpr)

  // Background
  cmds.push(DL_FILL_STYLE)
  cmds.push(13.0)
  cmds.push(17.0)
  cmds.push(23.0)
  push_fill_rect(cmds, 0.0, 0.0, css_w, css_h)

  // Compute maxAbs for color normalization
  let mut max_abs = 0.01
  for i in stage_start..<stage_end {
    let v = flat[i]
    let av = if v >= 0.0 { v } else { -v }
    if av > max_abs {
      max_abs = av
    }
  }

  // Heatmap cells
  for r in 0..<seq {
    for c in 0..<n_embd {
      let idx = stage_start + r * n_embd + c
      let v = flat[idx]
      let (rv, gv, bv) = color_div(v, max_abs)
      cmds.push(DL_FILL_STYLE)
      cmds.push(rv.to_double())
      cmds.push(gv.to_double())
      cmds.push(bv.to_double())
      push_fill_rect(
        cmds,
        (label_w + c * cell_w).to_double(),
        (r * cell_h).to_double(),
        cell_w.to_double(),
        cell_h.to_double(),
      )
    }
  }

  // Row labels
  let font_size = if 10 < cell_h - 2 { 10 } else { cell_h - 2 }
  cmds.push(DL_FONT_MONO_PX)
  cmds.push(font_size.to_double())
  cmds.push(DL_TEXT_ALIGN_RIGHT)
  cmds.push(DL_TEXT_BASELINE_MID)
  cmds.push(DL_FILL_STYLE)
  cmds.push(139.0)
  cmds.push(148.0)
  cmds.push(158.0)
  for r in 0..<seq {
    let label = if r < tokens.length() { tokens[r] } else { "" }
    push_fill_str(
      cmds,
      label,
      (label_w - 4).to_double(),
      (r * cell_h).to_double() + cell_h.to_double() / 2.0,
    )
  }

  // Grid lines
  cmds.push(DL_STROKE_RGBA)
  cmds.push(255.0)
  cmds.push(255.0)
  cmds.push(255.0)
  cmds.push(13.0) // 0.05 * 255 ≈ 13
  cmds.push(DL_LINE_WIDTH)
  cmds.push(0.5)
  for r in 0..<(seq + 1) {
    cmds.push(DL_BEGIN_PATH)
    cmds.push(DL_MOVE_TO)
    cmds.push(label_w.to_double())
    cmds.push((r * cell_h).to_double())
    cmds.push(DL_LINE_TO)
    cmds.push(css_w)
    cmds.push((r * cell_h).to_double())
    cmds.push(DL_STROKE)
  }

  cmds
}

// ---------------------------------------------------------------------------
// draw_legend_div: diverging color legend (physical pixel coords)
// ---------------------------------------------------------------------------

pub fn draw_legend_div(w : Double, h : Double) -> Array[Double] {
  let cmds : Array[Double] = []
  let wi = w.to_int()
  for x in 0..<wi {
    let v = if wi <= 1 {
      0.0
    } else {
      x.to_double() / (w - 1.0) * 2.0 - 1.0
    }
    let (r, g, b) = color_div(v, 1.0)
    cmds.push(DL_FILL_STYLE)
    cmds.push(r.to_double())
    cmds.push(g.to_double())
    cmds.push(b.to_double())
    push_fill_rect(cmds, x.to_double(), 0.0, 1.0, h)
  }
  cmds
}

// ---------------------------------------------------------------------------
// draw_mlp: MLP activations heatmap
// ---------------------------------------------------------------------------

pub fn draw_mlp(dpr : Double) -> Array[Double] {
  let cmds : Array[Double] = []
  let flat = g_viz_mlp_acts.val
  let seq = g_viz_seq_len.val
  let tokens_str = g_viz_tokens_str.val
  if seq <= 0 || flat.length() == 0 {
    return cmds
  }
  let mlp_dim = flat.length() / seq
  if mlp_dim <= 0 {
    return cmds
  }

  let tokens = split_by_pipe(tokens_str)
  let label_w = 52
  let cell_w = if 3 > 260 / mlp_dim { 3 } else { 260 / mlp_dim }
  let cell_h = if 18 > 120 / seq { 18 } else { 120 / seq }
  let css_w = (label_w + mlp_dim * cell_w).to_double()
  let css_h = (seq * cell_h).to_double()

  // Resize canvas
  cmds.push(DL_RESIZE_CANVAS)
  cmds.push(css_w)
  cmds.push(css_h)
  cmds.push(dpr)

  // Background
  cmds.push(DL_FILL_STYLE)
  cmds.push(13.0)
  cmds.push(17.0)
  cmds.push(23.0)
  push_fill_rect(cmds, 0.0, 0.0, css_w, css_h)

  // Compute maxVal for color normalization
  let mut max_val = 0.01
  for v in flat {
    if v > max_val {
      max_val = v
    }
  }

  // Heatmap cells
  for r in 0..<seq {
    for c in 0..<mlp_dim {
      let idx = r * mlp_dim + c
      let v = if idx < flat.length() { flat[idx] } else { 0.0 }
      let (rv, gv, bv) = color_green(v, max_val)
      cmds.push(DL_FILL_STYLE)
      cmds.push(rv.to_double())
      cmds.push(gv.to_double())
      cmds.push(bv.to_double())
      push_fill_rect(
        cmds,
        (label_w + c * cell_w).to_double(),
        (r * cell_h).to_double(),
        cell_w.to_double(),
        cell_h.to_double(),
      )
    }
  }

  // Row labels
  let font_size = if 10 < cell_h - 2 { 10 } else { cell_h - 2 }
  cmds.push(DL_FONT_MONO_PX)
  cmds.push(font_size.to_double())
  cmds.push(DL_TEXT_ALIGN_RIGHT)
  cmds.push(DL_TEXT_BASELINE_MID)
  cmds.push(DL_FILL_STYLE)
  cmds.push(139.0)
  cmds.push(148.0)
  cmds.push(158.0)
  for r in 0..<seq {
    let label = if r < tokens.length() { tokens[r] } else { "" }
    push_fill_str(
      cmds,
      label,
      (label_w - 4).to_double(),
      (r * cell_h).to_double() + cell_h.to_double() / 2.0,
    )
  }

  // Grid lines
  cmds.push(DL_STROKE_RGBA)
  cmds.push(255.0)
  cmds.push(255.0)
  cmds.push(255.0)
  cmds.push(13.0)
  cmds.push(DL_LINE_WIDTH)
  cmds.push(0.5)
  for r in 0..<(seq + 1) {
    cmds.push(DL_BEGIN_PATH)
    cmds.push(DL_MOVE_TO)
    cmds.push(label_w.to_double())
    cmds.push((r * cell_h).to_double())
    cmds.push(DL_LINE_TO)
    cmds.push(css_w)
    cmds.push((r * cell_h).to_double())
    cmds.push(DL_STROKE)
  }

  cmds
}

// ---------------------------------------------------------------------------
// draw_legend_green: green color legend (physical pixel coords)
// ---------------------------------------------------------------------------

pub fn draw_legend_green(w : Double, h : Double) -> Array[Double] {
  let cmds : Array[Double] = []
  let wi = w.to_int()
  for x in 0..<wi {
    let v = if wi <= 1 {
      0.0
    } else {
      x.to_double() / (w - 1.0)
    }
    let (r, g, b) = color_green(v, 1.0)
    cmds.push(DL_FILL_STYLE)
    cmds.push(r.to_double())
    cmds.push(g.to_double())
    cmds.push(b.to_double())
    push_fill_rect(cmds, x.to_double(), 0.0, 1.0, h)
  }
  cmds
}

// ---------------------------------------------------------------------------
// color_sim: red for positive, blue for negative (embedding similarity)
// ---------------------------------------------------------------------------

fn color_sim(v : Double) -> (Int, Int, Int) {
  if v >= 0.0 {
    let t = v
    ((220.0 * t).to_int(), (30.0 * t).to_int(), (30.0 * t).to_int())
  } else {
    let t = -v
    ((30.0 * t).to_int(), (30.0 * t).to_int(), (220.0 * t).to_int())
  }
}

// ---------------------------------------------------------------------------
// draw_emb_sim: embedding cosine-similarity heatmap
// Reads g_wte for weights, g_vocab for labels, g_bos for BOS index.
// ---------------------------------------------------------------------------

pub fn draw_emb_sim(dpr : Double) -> Array[Double] {
  let cmds : Array[Double] = []
  let wte = g_wte.val
  let vocab = g_vocab.val
  let vs = vocab.length()
  if vs == 0 {
    return cmds
  }
  let ne = 32

  // Compute cosine similarities
  // norms[i] = ||wte[i]||
  let norms : Array[Double] = []
  for i in 0..<vs {
    let mut s = 0.0
    for d in 0..<ne {
      let v = wte[i][d].data
      s += v * v
    }
    norms.push(@math.pow(s, 0.5))
  }

  // sim_flat[i*vs+j] = cosine(wte[i], wte[j])
  let sim_flat : Array[Double] = []
  for i in 0..<vs {
    for j in 0..<vs {
      let mut dot = 0.0
      for d in 0..<ne {
        dot += wte[i][d].data * wte[j][d].data
      }
      let denom = norms[i] * norms[j]
      let sim = if denom < 1.0e-8 { 0.0 } else { dot / denom }
      sim_flat.push(sim)
    }
  }

  // Layout
  let cell_f = 300.0 / vs.to_double()
  let cell = if cell_f < 3.0 { 3 } else { cell_f.to_int() }
  let label_h = 60
  let label_w = 60
  let mat_sz = vs * cell
  let css_w = (label_w + mat_sz).to_double()
  let css_h = (label_h + mat_sz).to_double()

  // Resize canvas
  cmds.push(DL_RESIZE_CANVAS)
  cmds.push(css_w)
  cmds.push(css_h)
  cmds.push(dpr)

  // Background
  cmds.push(DL_FILL_STYLE)
  cmds.push(13.0)
  cmds.push(17.0)
  cmds.push(23.0)
  push_fill_rect(cmds, 0.0, 0.0, css_w, css_h)

  // Heatmap cells
  for i in 0..<vs {
    for j in 0..<vs {
      let v = sim_flat[i * vs + j]
      let (r, g, b) = color_sim(v)
      cmds.push(DL_FILL_STYLE)
      cmds.push(r.to_double())
      cmds.push(g.to_double())
      cmds.push(b.to_double())
      push_fill_rect(
        cmds,
        (label_w + j * cell).to_double(),
        (label_h + i * cell).to_double(),
        cell.to_double(),
        cell.to_double(),
      )
    }
  }

  // Labels (step through vocabulary)
  let step_f = 8.0 / cell.to_double()
  let step = if step_f < 1.0 {
    1
  } else {
    let si = step_f.to_int()
    if si < 1 { 1 } else { si }
  }
  let font_size_f = if cell.to_double() * 2.0 < 9.0 {
    cell.to_double() * 2.0
  } else {
    9.0
  }
  let font_size = font_size_f.to_int()
  if font_size >= 6 {
    cmds.push(DL_FONT_MONO_PX)
    cmds.push(font_size.to_double())
    let mut i = 0
    while i < vs {
      let label = vocab[i]
      let ci = (label_w + i * cell).to_double() + cell.to_double() / 2.0
      let ri = (label_h + i * cell).to_double() + cell.to_double() / 2.0

      // Top rotated label: translate to (ci, label_h-4), rotate -PI/2.5
      cmds.push(DL_SAVE)
      cmds.push(DL_TRANSLATE)
      cmds.push(ci)
      cmds.push((label_h - 4).to_double())
      cmds.push(DL_ROTATE)
      cmds.push(-@math.PI / 2.5)
      cmds.push(DL_FILL_STYLE)
      cmds.push(139.0)
      cmds.push(148.0)
      cmds.push(158.0)
      cmds.push(DL_TEXT_ALIGN_LEFT)
      cmds.push(DL_TEXT_BASELINE_MID)
      push_fill_str(cmds, label, 0.0, 0.0)
      cmds.push(DL_RESTORE)

      // Right-aligned row label
      cmds.push(DL_FILL_STYLE)
      cmds.push(139.0)
      cmds.push(148.0)
      cmds.push(158.0)
      cmds.push(DL_TEXT_ALIGN_RIGHT)
      cmds.push(DL_TEXT_BASELINE_MID)
      push_fill_str(cmds, label, (label_w - 4).to_double(), ri)

      i += step
    }
  }

  cmds
}

// ---------------------------------------------------------------------------
// draw_legend_sim: -1 to +1 similarity color gradient legend
// ---------------------------------------------------------------------------

pub fn draw_legend_sim(w : Double, h : Double) -> Array[Double] {
  let cmds : Array[Double] = []
  let wi = w.to_int()
  for x in 0..<wi {
    let v = if wi <= 1 {
      0.0
    } else {
      x.to_double() / (w - 1.0) * 2.0 - 1.0
    }
    let (r, g, b) = color_sim(v)
    cmds.push(DL_FILL_STYLE)
    cmds.push(r.to_double())
    cmds.push(g.to_double())
    cmds.push(b.to_double())
    push_fill_rect(cmds, x.to_double(), 0.0, 1.0, h)
  }
  cmds
}

// ---------------------------------------------------------------------------
// Helpers for arch diagram
// ---------------------------------------------------------------------------

fn push_rr(
  cmds : Array[Double],
  x : Double,
  y : Double,
  w : Double,
  h : Double,
  r : Double
) -> Unit {
  cmds.push(DL_BEGIN_PATH)
  cmds.push(DL_MOVE_TO)
  cmds.push(x + r)
  cmds.push(y)
  cmds.push(DL_LINE_TO)
  cmds.push(x + w - r)
  cmds.push(y)
  cmds.push(DL_ARC_TO)
  cmds.push(x + w)
  cmds.push(y)
  cmds.push(x + w)
  cmds.push(y + r)
  cmds.push(r)
  cmds.push(DL_LINE_TO)
  cmds.push(x + w)
  cmds.push(y + h - r)
  cmds.push(DL_ARC_TO)
  cmds.push(x + w)
  cmds.push(y + h)
  cmds.push(x + w - r)
  cmds.push(y + h)
  cmds.push(r)
  cmds.push(DL_LINE_TO)
  cmds.push(x + r)
  cmds.push(y + h)
  cmds.push(DL_ARC_TO)
  cmds.push(x)
  cmds.push(y + h)
  cmds.push(x)
  cmds.push(y + h - r)
  cmds.push(r)
  cmds.push(DL_LINE_TO)
  cmds.push(x)
  cmds.push(y + r)
  cmds.push(DL_ARC_TO)
  cmds.push(x)
  cmds.push(y)
  cmds.push(x + r)
  cmds.push(y)
  cmds.push(r)
  cmds.push(DL_CLOSE_PATH)
}

fn push_arc(
  cmds : Array[Double],
  cx : Double,
  cy : Double,
  r : Double,
  start : Double,
  end_angle : Double
) -> Unit {
  cmds.push(DL_ARC)
  cmds.push(cx)
  cmds.push(cy)
  cmds.push(r)
  cmds.push(start)
  cmds.push(end_angle)
}

fn cdiv_color(v : Double, mx : Double) -> (Int, Int, Int) {
  let denom = if mx < 0.0001 { 0.0001 } else { mx }
  let abs_v = if v >= 0.0 { v } else { -v }
  let t_raw = abs_v / denom
  let t = if t_raw > 1.0 { 1.0 } else { t_raw }
  if v >= 0.0 {
    (
      (255.0 - t * 200.0).to_int(),
      (255.0 - t * 200.0).to_int(),
      255,
    )
  } else {
    (
      255,
      (255.0 - t * 200.0).to_int(),
      (255.0 - t * 200.0).to_int(),
    )
  }
}

fn push_stroke_rect(
  cmds : Array[Double],
  x : Double,
  y : Double,
  w : Double,
  h : Double
) -> Unit {
  cmds.push(DL_STROKE_RECT)
  cmds.push(x)
  cmds.push(y)
  cmds.push(w)
  cmds.push(h)
}

// strip: draw colored mini-bars for data visualization
fn push_strip(
  cmds : Array[Double],
  data : Array[Double],
  x : Double,
  y : Double,
  w : Double,
  h : Double
) -> Unit {
  let n = data.length()
  if n == 0 {
    return
  }
  let mut mx = 0.0001
  for v in data {
    let av = if v >= 0.0 { v } else { -v }
    if av > mx {
      mx = av
    }
  }
  let cw = w / n.to_double()
  for i in 0..<n {
    let (r, g, b) = cdiv_color(data[i], mx)
    cmds.push(DL_FILL_STYLE)
    cmds.push(r.to_double())
    cmds.push(g.to_double())
    cmds.push(b.to_double())
    let bar_w = if cw < 1.0 { 1.0 } else { cw }
    push_fill_rect(cmds, x + i.to_double() * cw, y, bar_w, h)
  }
}

// attn_color: attention weight → rgb (warm white to amber)
fn attn_weight_color(w : Double) -> (Int, Int, Int) {
  (
    (255.0 - w * 168.0).to_int(),
    (255.0 - w * 120.0).to_int(),
    (255.0 - w * 50.0).to_int(),
  )
}

// arrow_down: solid downward arrow
fn push_arrow_down(
  cmds : Array[Double],
  cx : Double,
  y_from : Double,
  y_to : Double
) -> Unit {
  cmds.push(DL_STROKE_STYLE)
  cmds.push(68.0)
  cmds.push(68.0)
  cmds.push(68.0)
  cmds.push(DL_LINE_WIDTH)
  cmds.push(1.2)
  cmds.push(DL_CLEAR_LINE_DASH)
  cmds.push(DL_BEGIN_PATH)
  cmds.push(DL_MOVE_TO)
  cmds.push(cx)
  cmds.push(y_from)
  cmds.push(DL_LINE_TO)
  cmds.push(cx)
  cmds.push(y_to - 5.0)
  cmds.push(DL_STROKE)
  // arrowhead
  cmds.push(DL_FILL_STYLE)
  cmds.push(68.0)
  cmds.push(68.0)
  cmds.push(68.0)
  cmds.push(DL_BEGIN_PATH)
  cmds.push(DL_MOVE_TO)
  cmds.push(cx)
  cmds.push(y_to)
  cmds.push(DL_LINE_TO)
  cmds.push(cx - 3.0)
  cmds.push(y_to - 6.0)
  cmds.push(DL_LINE_TO)
  cmds.push(cx + 3.0)
  cmds.push(y_to - 6.0)
  cmds.push(DL_CLOSE_PATH)
  cmds.push(DL_FILL)
}

// skip_down: purple residual skip connection arrow
fn push_skip_down(
  cmds : Array[Double],
  bx : Double,
  bw : Double,
  y_start : Double,
  y_end : Double
) -> Unit {
  // Purple #7c3aed = 124,58,237
  let skl = bx - 14.0
  cmds.push(DL_STROKE_STYLE)
  cmds.push(124.0)
  cmds.push(58.0)
  cmds.push(237.0)
  cmds.push(DL_LINE_WIDTH)
  cmds.push(1.5)
  cmds.push(DL_CLEAR_LINE_DASH)
  cmds.push(DL_BEGIN_PATH)
  cmds.push(DL_MOVE_TO)
  cmds.push(bx + bw / 2.0)
  cmds.push(y_start)
  cmds.push(DL_LINE_TO)
  cmds.push(skl)
  cmds.push(y_start)
  cmds.push(DL_LINE_TO)
  cmds.push(skl)
  cmds.push(y_end)
  cmds.push(DL_LINE_TO)
  cmds.push(bx - 1.0)
  cmds.push(y_end)
  cmds.push(DL_STROKE)
  // arrowhead pointing right
  cmds.push(DL_FILL_STYLE)
  cmds.push(124.0)
  cmds.push(58.0)
  cmds.push(237.0)
  cmds.push(DL_BEGIN_PATH)
  cmds.push(DL_MOVE_TO)
  cmds.push(bx)
  cmds.push(y_end)
  cmds.push(DL_LINE_TO)
  cmds.push(bx - 7.0)
  cmds.push(y_end - 3.0)
  cmds.push(DL_LINE_TO)
  cmds.push(bx - 7.0)
  cmds.push(y_end + 3.0)
  cmds.push(DL_CLOSE_PATH)
  cmds.push(DL_FILL)
}

// box: filled rounded-rect with bold label centered at top
fn push_box(
  cmds : Array[Double],
  label : String,
  by : Double,
  bh : Double,
  fill_r : Int,
  fill_g : Int,
  fill_b : Int,
  bx : Double,
  bw : Double,
  cx : Double
) -> Unit {
  push_rr(cmds, bx, by, bw, bh, 4.0)
  cmds.push(DL_FILL_STYLE)
  cmds.push(fill_r.to_double())
  cmds.push(fill_g.to_double())
  cmds.push(fill_b.to_double())
  cmds.push(DL_FILL)
  cmds.push(DL_STROKE_STYLE)
  cmds.push(85.0)
  cmds.push(85.0)
  cmds.push(85.0)
  cmds.push(DL_LINE_WIDTH)
  cmds.push(1.0)
  cmds.push(DL_STROKE)
  cmds.push(DL_FILL_STYLE)
  cmds.push(17.0)
  cmds.push(17.0)
  cmds.push(17.0)
  cmds.push(DL_FONT_BOLD_SANS)
  cmds.push(10.0)
  cmds.push(DL_TEXT_ALIGN_CENTER)
  cmds.push(DL_TEXT_BASELINE_MID)
  push_fill_str(cmds, label, cx, by + 10.0)
}

// strip_box: box + optional sub label + optional strip at bottom
fn push_strip_box(
  cmds : Array[Double],
  label : String,
  sub : String,  // empty = no sub
  data : Array[Double], // empty = no strip
  by : Double,
  bh : Double,
  fill_r : Int,
  fill_g : Int,
  fill_b : Int,
  bx : Double,
  bw : Double,
  cx : Double,
  sh : Double
) -> Unit {
  push_rr(cmds, bx, by, bw, bh, 4.0)
  cmds.push(DL_FILL_STYLE)
  cmds.push(fill_r.to_double())
  cmds.push(fill_g.to_double())
  cmds.push(fill_b.to_double())
  cmds.push(DL_FILL)
  cmds.push(DL_STROKE_STYLE)
  cmds.push(85.0)
  cmds.push(85.0)
  cmds.push(85.0)
  cmds.push(DL_LINE_WIDTH)
  cmds.push(1.0)
  cmds.push(DL_STROKE)
  cmds.push(DL_FILL_STYLE)
  cmds.push(17.0)
  cmds.push(17.0)
  cmds.push(17.0)
  cmds.push(DL_FONT_BOLD_SANS)
  cmds.push(10.0)
  cmds.push(DL_TEXT_ALIGN_CENTER)
  cmds.push(DL_TEXT_BASELINE_MID)
  push_fill_str(cmds, label, cx, by + 10.0)
  if sub.length() > 0 {
    cmds.push(DL_FILL_STYLE)
    cmds.push(136.0)
    cmds.push(136.0)
    cmds.push(136.0)
    cmds.push(DL_FONT_MONO_PX)
    cmds.push(8.0)
    push_fill_str(cmds, sub, cx, by + 20.0)
  }
  if data.length() > 0 {
    push_strip(cmds, data, bx + 3.0, by + bh - sh - 3.0, bw - 6.0, sh)
  }
}

// head_rgba_colors: returns (r,g,b,a) for 4 attention head colors
// rgba(253,224,71,.35), rgba(96,165,250,.35), rgba(52,211,153,.35), rgba(167,139,250,.35)
fn head_rgba(h : Int) -> (Int, Int, Int, Int) {
  if h == 0 {
    (253, 224, 71, 89)   // .35 * 255 ≈ 89
  } else if h == 1 {
    (96, 165, 250, 89)
  } else if h == 2 {
    (52, 211, 153, 89)
  } else {
    (167, 139, 250, 89)
  }
}

// ---------------------------------------------------------------------------
// draw_arch_diagram: full encoder-decoder / GPT architecture diagram
// Mirrors drawArchDiagram() in drawArchDiagram.ts
// ---------------------------------------------------------------------------

pub fn draw_arch_diagram(
  show_skip : Bool,
  show_pos_emb : Bool,
  show_attn : Bool,
  dpr : Double
) -> Array[Double] {
  let cmds : Array[Double] = []
  let enc_flat = g_net_enc_flat.val
  let dec_flat = g_net_dec_flat.val
  let enc_sa = g_net_enc_self_attn.val
  let dec_sa = g_net_dec_self_attn.val
  let cross_a = g_net_cross_attn.val
  let enc_q_flat = g_net_enc_q_flat.val
  let enc_k_flat = g_net_enc_k_flat.val
  let enc_v_flat = g_net_enc_v_flat.val
  let dec_q_flat = g_net_dec_q_flat.val
  let dec_k_flat = g_net_dec_k_flat.val
  let dec_v_flat = g_net_dec_v_flat.val
  let enc_ho_flat = g_net_enc_ho_flat.val
  let dec_ho_flat = g_net_dec_ho_flat.val
  let cross_ho_flat = g_net_cross_ho_flat.val
  let src_len = g_net_src_len.val
  let tgt_len = g_net_tgt_len.val
  let src_toks = split_by_pipe(g_net_src_tokens_str.val)
  let tgt_toks = split_by_pipe(g_net_tgt_tokens_str.val)
  let vocab = g_vocab.val
  let vs = vocab.length()

  if tgt_len == 0 {
    return cmds
  }

  let ne = 32
  let n_head = 4
  let head_dim = ne / n_head // 8
  let col = 320
  let gap = 56
  let tok_h = 26
  let enc_sect_h = 560
  let vgap = 56
  let is_gpt = src_len == 0
  let dec_y0 = if is_gpt { 0 } else { enc_sect_h + vgap }
  let enc_w = gap + src_len * (col + gap)
  let dec_w = gap + tgt_len * (col + gap)
  let canvas_w = if is_gpt {
    dec_w
  } else if enc_w > dec_w {
    enc_w
  } else {
    dec_w
  }
  let total_h = dec_y0 + 940

  // Resize canvas
  cmds.push(DL_RESIZE_CANVAS)
  cmds.push(canvas_w.to_double())
  cmds.push(total_h.to_double())
  cmds.push(dpr)

  // White background
  cmds.push(DL_FILL_STYLE)
  cmds.push(255.0)
  cmds.push(255.0)
  cmds.push(255.0)
  push_fill_rect(cmds, 0.0, 0.0, canvas_w.to_double(), total_h.to_double())

  // Helpers to read enc_flat per position
  // enc_flat: [enc_len × 5 × ne]
  // Offsets per position p: 0=tok_emb, 1=pos_emb, 2=x_init, 3=x_post_attn, 4=x_post_mlp
  let enc_stride = 5 * ne
  let dec_stride = 6 * ne + vs

  fn enc_slice(p : Int, field : Int) -> Array[Double] {
    let base = p * enc_stride + field * ne
    let out : Array[Double] = []
    for d in 0..<ne {
      if base + d < enc_flat.length() {
        out.push(enc_flat[base + d])
      } else {
        out.push(0.0)
      }
    }
    out
  }

  fn dec_slice(p : Int, field : Int) -> Array[Double] {
    let base = p * dec_stride + field * ne
    let out : Array[Double] = []
    for d in 0..<ne {
      if base + d < dec_flat.length() {
        out.push(dec_flat[base + d])
      } else {
        out.push(0.0)
      }
    }
    out
  }

  fn dec_logits(p : Int) -> Array[Double] {
    // Both GPT and seq2seq store 6*ne+vs per position (in GPT, x_post_xattn = x_post_sattn)
    let logit_off = p * dec_stride + 6 * ne
    let out : Array[Double] = []
    for d in 0..<vs {
      if logit_off + d < dec_flat.length() {
        out.push(dec_flat[logit_off + d])
      } else {
        out.push(0.0)
      }
    }
    out
  }

  // Section labels
  cmds.push(DL_FILL_STYLE)
  cmds.push(153.0)
  cmds.push(153.0)
  cmds.push(153.0)
  cmds.push(DL_FONT_BOLD_SANS)
  cmds.push(9.0)
  cmds.push(DL_TEXT_ALIGN_CENTER)
  cmds.push(DL_TEXT_BASELINE_TOP)
  if is_gpt {
    push_fill_str(cmds, "GPT DECODER", canvas_w.to_double() / 2.0, 2.0)
  } else {
    push_fill_str(cmds, "ENCODER", canvas_w.to_double() / 2.0, 2.0)
    push_fill_str(cmds, "DECODER", canvas_w.to_double() / 2.0, (dec_y0 + 2).to_double())
    // Dashed divider line
    cmds.push(DL_STROKE_STYLE)
    cmds.push(221.0)
    cmds.push(221.0)
    cmds.push(221.0)
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.0)
    cmds.push(DL_SET_LINE_DASH)
    cmds.push(2.0)
    cmds.push(4.0)
    cmds.push(3.0)
    cmds.push(DL_BEGIN_PATH)
    cmds.push(DL_MOVE_TO)
    cmds.push(0.0)
    cmds.push((enc_sect_h + vgap / 2).to_double())
    cmds.push(DL_LINE_TO)
    cmds.push(canvas_w.to_double())
    cmds.push((enc_sect_h + vgap / 2).to_double())
    cmds.push(DL_STROKE)
    cmds.push(DL_CLEAR_LINE_DASH)
  }

  // track cross-attention and other Y positions for connectors
  let mut enc_out_y = 0.0
  let mut cross_attn_y = 0.0
  let mut masked_attn_mid_y = 0.0
  let mut output_probs_y = 0.0

  // -------------------------------------------------------------------------
  // drawEncoderColumn
  // -------------------------------------------------------------------------
  fn draw_enc_col(p : Int) -> Unit {
    let ox = gap + p * (col + gap)
    let bw = col - 40
    let cx_f = (ox + col / 2).to_double()
    let bx = (ox + (col - bw) / 2).to_double()
    let bw_f = bw.to_double()
    let sh = 10.0
    let g_gap = 30.0
    let he = 38.0
    let hmh = 180.0
    let han = 34.0
    let hff = 34.0

    // Token header row (pink background)
    cmds.push(DL_FILL_STYLE)
    cmds.push(255.0)
    cmds.push(205.0)
    cmds.push(210.0) // #ffcdd2
    push_fill_rect(
      cmds,
      (ox + 2).to_double(),
      14.0,
      (col - 4).to_double(),
      tok_h.to_double(),
    )
    cmds.push(DL_STROKE_STYLE)
    cmds.push(102.0)
    cmds.push(102.0)
    cmds.push(102.0)
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.0)
    push_stroke_rect(
      cmds,
      (ox + 2).to_double(),
      14.0,
      (col - 4).to_double(),
      tok_h.to_double(),
    )
    cmds.push(DL_FILL_STYLE)
    cmds.push(17.0)
    cmds.push(17.0)
    cmds.push(17.0)
    cmds.push(DL_FONT_BOLD_SANS)
    cmds.push(10.0)
    cmds.push(DL_TEXT_ALIGN_CENTER)
    cmds.push(DL_TEXT_BASELINE_MID)
    let tok_label = if p < src_toks.length() {
      let t = src_toks[p]
      if t.length() > 9 { t[:9].to_string() } else { t }
    } else {
      ""
    }
    push_fill_str(
      cmds,
      tok_label,
      cx_f,
      (14 + tok_h / 2).to_double(),
    )
    // "enc p" sub-label
    cmds.push(DL_FILL_STYLE)
    cmds.push(136.0)
    cmds.push(136.0)
    cmds.push(136.0)
    cmds.push(DL_FONT_MONO_PX)
    cmds.push(8.0)
    cmds.push(DL_TEXT_BASELINE_TOP)
    // Build "enc N" string
    let enc_label = "enc " + p.to_string()
    push_fill_str(cmds, enc_label, cx_f, 15.0)

    // Token context mini-tiles
    let mut y = 44.0
    let c_w_raw = if bw / (if src_len > 0 { src_len } else { 1 }) > 18 {
      bw / (if src_len > 0 { src_len } else { 1 })
    } else {
      18
    }
    let c_w = c_w_raw
    let c_tot = c_w * src_len
    let c_x0 = (bx + (bw_f - c_tot.to_double()) / 2.0).to_int()
    for t in 0..<src_len {
      let cx_t = c_x0 + t * c_w
      push_rr(
        cmds,
        cx_t.to_double(),
        y,
        (c_w - 2).to_double(),
        14.0,
        2.0,
      )
      if t == p {
        cmds.push(DL_FILL_STYLE)
        cmds.push(220.0)
        cmds.push(38.0)
        cmds.push(38.0)
      } else {
        cmds.push(DL_FILL_STYLE)
        cmds.push(156.0)
        cmds.push(163.0)
        cmds.push(175.0)
      }
      cmds.push(DL_FILL)
      cmds.push(DL_FILL_STYLE)
      cmds.push(255.0)
      cmds.push(255.0)
      cmds.push(255.0)
      cmds.push(DL_FONT_MONO_PX)
      cmds.push(8.0)
      cmds.push(DL_TEXT_ALIGN_CENTER)
      cmds.push(DL_TEXT_BASELINE_MID)
      let tl = if t < src_toks.length() {
        let s = src_toks[t]
        if s.length() > 3 { s[:3].to_string() } else { s }
      } else {
        ""
      }
      push_fill_str(
        cmds,
        tl,
        (cx_t + (c_w - 2) / 2).to_double(),
        y + 7.0,
      )
    }
    y += 18.0
    push_arrow_down(cmds, cx_f, y, y + g_gap)
    y += g_gap

    // Input Embedding box
    let tok_emb = enc_slice(p, 0)
    let pos_emb_d = enc_slice(p, 1)
    push_rr(cmds, bx, y, bw_f, he, 4.0)
    cmds.push(DL_FILL_STYLE)
    cmds.push(255.0)
    cmds.push(205.0)
    cmds.push(210.0)
    cmds.push(DL_FILL)
    cmds.push(DL_STROKE_STYLE)
    cmds.push(85.0)
    cmds.push(85.0)
    cmds.push(85.0)
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.0)
    cmds.push(DL_STROKE)
    cmds.push(DL_FILL_STYLE)
    cmds.push(17.0)
    cmds.push(17.0)
    cmds.push(17.0)
    cmds.push(DL_FONT_BOLD_SANS)
    cmds.push(10.0)
    cmds.push(DL_TEXT_ALIGN_CENTER)
    cmds.push(DL_TEXT_BASELINE_MID)
    push_fill_str(cmds, "Input Embedding", cx_f, y + 10.0)

    if show_pos_emb {
      let sw2 = ((bw_f - 6.0 - 20.0) / 2.0).to_int()
      let tok_x = bx + 3.0
      let pos_x = bx + 3.0 + sw2.to_double() + 20.0
      let plus_cx = bx + 3.0 + sw2.to_double() + 10.0
      cmds.push(DL_FILL_STYLE)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(DL_FONT_MONO_PX)
      cmds.push(9.0)
      cmds.push(DL_TEXT_ALIGN_CENTER)
      cmds.push(DL_TEXT_BASELINE_BOT)
      push_fill_str(cmds, "token_embedding", tok_x + sw2.to_double() / 2.0, y + 22.0)
      push_fill_str(cmds, "positional_embedding", pos_x + sw2.to_double() / 2.0, y + 22.0)
      push_strip(cmds, tok_emb, tok_x, y + 23.0, sw2.to_double(), sh)
      push_strip(cmds, pos_emb_d, pos_x, y + 23.0, sw2.to_double(), sh)
      // Plus circle
      cmds.push(DL_STROKE_STYLE)
      cmds.push(68.0)
      cmds.push(68.0)
      cmds.push(68.0)
      cmds.push(DL_LINE_WIDTH)
      cmds.push(1.2)
      cmds.push(DL_CLEAR_LINE_DASH)
      cmds.push(DL_BEGIN_PATH)
      push_arc(cmds, plus_cx, y + 28.0, 6.0, 0.0, @math.PI * 2.0)
      cmds.push(DL_STROKE)
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(plus_cx - 4.0)
      cmds.push(y + 28.0)
      cmds.push(DL_LINE_TO)
      cmds.push(plus_cx + 4.0)
      cmds.push(y + 28.0)
      cmds.push(DL_STROKE)
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(plus_cx)
      cmds.push(y + 24.0)
      cmds.push(DL_LINE_TO)
      cmds.push(plus_cx)
      cmds.push(y + 32.0)
      cmds.push(DL_STROKE)
    } else {
      cmds.push(DL_FILL_STYLE)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(DL_FONT_MONO_PX)
      cmds.push(9.0)
      cmds.push(DL_TEXT_ALIGN_CENTER)
      cmds.push(DL_TEXT_BASELINE_BOT)
      push_fill_str(cmds, "token_embedding (no pos emb)", cx_f, y + 22.0)
      push_strip(cmds, tok_emb, bx + 3.0, y + 23.0, bw_f - 6.0, sh)
    }
    y += he
    push_arrow_down(cmds, cx_f, y, y + 6.0)
    y += 6.0
    // x_init strip
    push_strip(cmds, enc_slice(p, 2), bx + 3.0, y, bw_f - 6.0, sh)
    y += sh
    push_arrow_down(cmds, cx_f, y, y + g_gap)
    y += g_gap

    let blk_t = y
    let skip1 = y - g_gap / 2.0

    // Multi-Head Self-Attention block
    if not(show_attn) {
      push_rr(cmds, bx, y, bw_f, hmh, 4.0)
      cmds.push(DL_FILL_STYLE)
      cmds.push(245.0)
      cmds.push(245.0)
      cmds.push(245.0)
      cmds.push(DL_FILL)
      cmds.push(DL_STROKE_STYLE)
      cmds.push(204.0)
      cmds.push(204.0)
      cmds.push(204.0)
      cmds.push(DL_LINE_WIDTH)
      cmds.push(1.0)
      cmds.push(DL_SET_LINE_DASH)
      cmds.push(2.0)
      cmds.push(4.0)
      cmds.push(3.0)
      cmds.push(DL_STROKE)
      cmds.push(DL_CLEAR_LINE_DASH)
      cmds.push(DL_FILL_STYLE)
      cmds.push(170.0)
      cmds.push(170.0)
      cmds.push(170.0)
      cmds.push(DL_FONT_BOLD_SANS)
      cmds.push(10.0)
      cmds.push(DL_TEXT_ALIGN_CENTER)
      cmds.push(DL_TEXT_BASELINE_MID)
      push_fill_str(cmds, "Multi-Head Self-Attention (disabled)", cx_f, y + hmh / 2.0)
      push_strip(cmds, enc_slice(p, 3), bx + 3.0, y + hmh - sh - 3.0, bw_f - 6.0, sh)
    } else {
      push_box(cmds, "Multi-Head Self-Attention", y, hmh, 255, 230, 204, bx, bw_f, cx_f)
      // Head strips
      let dh = ne / n_head
      let sec_w = (bw - 4) / n_head
      for h in 0..<n_head {
        let sx = bx + 2.0 + h.to_double() * sec_w.to_double()
        let (hr, hg, hb, ha) = head_rgba(h)
        cmds.push(DL_FILL_STYLE_RGBA)
        cmds.push(hr.to_double())
        cmds.push(hg.to_double())
        cmds.push(hb.to_double())
        cmds.push(ha.to_double())
        push_fill_rect(cmds, sx, y + 19.0, sec_w.to_double() - 1.0, 8.0)
        let head_data = enc_slice(p, 2)
        let sub_data : Array[Double] = []
        for dd in 0..<dh {
          if h * dh + dd < head_data.length() {
            sub_data.push(head_data[h * dh + dd])
          } else {
            sub_data.push(0.0)
          }
        }
        push_strip(cmds, sub_data, sx, y + 19.0, sec_w.to_double() - 1.0, 8.0)
      }
      let head_w = bw / n_head
      cmds.push(DL_CLEAR_LINE_DASH)
      // connector lines from header to head columns
      for h in 0..<n_head {
        let scx = bx + 2.0 + (h.to_double() + 0.5) * sec_w.to_double()
        let hcx2 = bx + h.to_double() * head_w.to_double() + head_w.to_double() / 2.0
        cmds.push(DL_STROKE_STYLE)
        cmds.push(187.0)
        cmds.push(187.0)
        cmds.push(187.0)
        cmds.push(DL_LINE_WIDTH)
        cmds.push(0.8)
        cmds.push(DL_BEGIN_PATH)
        cmds.push(DL_MOVE_TO)
        cmds.push(scx)
        cmds.push(y + 27.0)
        cmds.push(DL_LINE_TO)
        cmds.push(hcx2)
        cmds.push(y + 35.0)
        cmds.push(DL_STROKE)
      }
      // "×Wq,k,v" label
      cmds.push(DL_FILL_STYLE)
      cmds.push(187.0)
      cmds.push(187.0)
      cmds.push(187.0)
      cmds.push(DL_FONT_SANS_PX)
      cmds.push(9.0)
      cmds.push(DL_TEXT_ALIGN_RIGHT)
      cmds.push(DL_TEXT_BASELINE_MID)
      push_fill_str(cmds, "\u00d7Wq,k,v", bx + bw_f - 2.0, y + 31.0)
      let cell_size_raw = if 9 < (head_w - 6) / (if src_len > 0 { src_len } else { 1 }) {
        9
      } else {
        (head_w - 6) / (if src_len > 0 { src_len } else { 1 })
      }
      let cell_size = if cell_size_raw < 4 { 4 } else { cell_size_raw }
      let mat_h = src_len * cell_size
      let diag_label_h_f = if 20.0 < src_len.to_double() * cell_size.to_double() * 0.7 + 4.0 {
        20.0
      } else {
        src_len.to_double() * cell_size.to_double() * 0.7 + 4.0
      }
      let diag_label_h = diag_label_h_f.to_int()
      let qkv_h = 7.0

      for h in 0..<n_head {
        let hx = bx + h.to_double() * head_w.to_double()
        let hcx2 = hx + head_w.to_double() / 2.0
        let sw = head_w - 6
        let sx = hx + 3.0
        // vertical separator
        if h > 0 {
          cmds.push(DL_STROKE_STYLE)
          cmds.push(224.0)
          cmds.push(224.0)
          cmds.push(224.0)
          cmds.push(DL_LINE_WIDTH)
          cmds.push(0.5)
          cmds.push(DL_BEGIN_PATH)
          cmds.push(DL_MOVE_TO)
          cmds.push(hx)
          cmds.push(y + 35.0)
          cmds.push(DL_LINE_TO)
          cmds.push(hx)
          cmds.push(y + 97.0 + mat_h.to_double() + 18.0 + diag_label_h.to_double())
          cmds.push(DL_STROKE)
        }
        // head label
        let (hr, hg, hb, _ha) = head_rgba(h)
        cmds.push(DL_FILL_STYLE)
        cmds.push(hr.to_double())
        cmds.push(hg.to_double())
        cmds.push(hb.to_double())
        cmds.push(DL_FONT_BOLD_SANS)
        cmds.push(8.0)
        cmds.push(DL_TEXT_ALIGN_CENTER)
        cmds.push(DL_TEXT_BASELINE_MID)
        push_fill_str(cmds, "h" + h.to_string(), hcx2, y + 39.0)
        // d= label
        cmds.push(DL_FILL_STYLE)
        cmds.push(170.0)
        cmds.push(170.0)
        cmds.push(170.0)
        cmds.push(DL_FONT_MONO_PX)
        cmds.push(9.0)
        push_fill_str(cmds, "d=" + dh.to_string(), hcx2, y + 46.0)

        // Q strip
        cmds.push(DL_FILL_STYLE)
        cmds.push(192.0)
        cmds.push(132.0)
        cmds.push(252.0) // #c084fc
        cmds.push(DL_FONT_SANS_PX)
        cmds.push(9.0)
        cmds.push(DL_TEXT_ALIGN_LEFT)
        cmds.push(DL_TEXT_BASELINE_MID)
        push_fill_str(cmds, "Q", sx, y + 52.0)
        let qv : Array[Double] = []
        for j in 0..<head_dim {
          let idx = h * src_len * head_dim + p * head_dim + j
          qv.push(if idx < enc_q_flat.length() { enc_q_flat[idx] } else { 0.0 })
        }
        push_strip(cmds, qv, sx + 7.0, y + 49.0, sw.to_double() - 7.0, qkv_h)

        // K strip
        cmds.push(DL_FILL_STYLE)
        cmds.push(96.0)
        cmds.push(165.0)
        cmds.push(250.0) // #60a5fa
        push_fill_str(cmds, "K", sx, y + 62.0)
        let kv : Array[Double] = []
        for j in 0..<head_dim {
          let idx = h * src_len * head_dim + p * head_dim + j
          kv.push(if idx < enc_k_flat.length() { enc_k_flat[idx] } else { 0.0 })
        }
        push_strip(cmds, kv, sx + 7.0, y + 59.0, sw.to_double() - 7.0, qkv_h)

        // V strip
        cmds.push(DL_FILL_STYLE)
        cmds.push(52.0)
        cmds.push(211.0)
        cmds.push(153.0) // #34d399
        push_fill_str(cmds, "V", sx, y + 72.0)
        let vv : Array[Double] = []
        for j in 0..<head_dim {
          let idx = h * src_len * head_dim + p * head_dim + j
          vv.push(if idx < enc_v_flat.length() { enc_v_flat[idx] } else { 0.0 })
        }
        push_strip(cmds, vv, sx + 7.0, y + 69.0, sw.to_double() - 7.0, qkv_h)

        // Attention matrix
        let mat_w = cell_size * src_len
        let mat_x0 = (hcx2 - mat_w.to_double() / 2.0).to_int()
        // Row labels (right-aligned)
        cmds.push(DL_FILL_STYLE)
        cmds.push(119.0)
        cmds.push(119.0)
        cmds.push(119.0)
        cmds.push(DL_FONT_MONO_PX)
        cmds.push(6.0)
        cmds.push(DL_TEXT_ALIGN_RIGHT)
        cmds.push(DL_TEXT_BASELINE_MID)
        for r in 0..<src_len {
          let rl = if r < src_toks.length() {
            let s = src_toks[r]
            if s.length() > 5 { s[:5].to_string() } else { s }
          } else {
            ""
          }
          push_fill_str(
            cmds,
            rl,
            mat_x0.to_double() - 2.0,
            y + 87.0 + r.to_double() * cell_size.to_double() + cell_size.to_double() / 2.0,
          )
        }
        // Attn matrix cells
        for r in 0..<src_len {
          for t in 0..<src_len {
            let idx = h * src_len * src_len + r * src_len + t
            let w_val = if idx < enc_sa.length() { enc_sa[idx] } else { 0.0 }
            let (ar, ag, ab) = attn_weight_color(w_val)
            cmds.push(DL_FILL_STYLE)
            cmds.push(ar.to_double())
            cmds.push(ag.to_double())
            cmds.push(ab.to_double())
            push_fill_rect(
              cmds,
              mat_x0.to_double() + t.to_double() * cell_size.to_double(),
              y + 87.0 + r.to_double() * cell_size.to_double(),
              cell_size.to_double() - 0.5,
              cell_size.to_double() - 0.5,
            )
          }
        }
        // Highlight current position row
        cmds.push(DL_STROKE_RGBA)
        cmds.push(220.0)
        cmds.push(38.0)
        cmds.push(38.0)
        cmds.push(178.0) // 0.7*255
        cmds.push(DL_LINE_WIDTH)
        cmds.push(0.8)
        push_stroke_rect(
          cmds,
          mat_x0.to_double(),
          y + 87.0 + p.to_double() * cell_size.to_double(),
          mat_w.to_double(),
          cell_size.to_double(),
        )
        // Diagonal (column) labels
        cmds.push(DL_SAVE)
        cmds.push(DL_FILL_STYLE)
        cmds.push(85.0)
        cmds.push(85.0)
        cmds.push(85.0)
        cmds.push(DL_FONT_MONO_PX)
        cmds.push(7.0)
        cmds.push(DL_TEXT_ALIGN_LEFT)
        cmds.push(DL_TEXT_BASELINE_MID)
        for t in 0..<src_len {
          let lx2 = mat_x0.to_double() + t.to_double() * cell_size.to_double() + cell_size.to_double() / 2.0 - 4.0
          let ly2 = y + 87.0 + mat_h.to_double() + 10.0
          cmds.push(DL_SAVE)
          cmds.push(DL_TRANSLATE)
          cmds.push(lx2)
          cmds.push(ly2)
          cmds.push(DL_ROTATE)
          cmds.push(-@math.PI / 4.0)
          let cl = if t < src_toks.length() {
            let s = src_toks[t]
            if s.length() > 5 { s[:5].to_string() } else { s }
          } else {
            ""
          }
          push_fill_str(cmds, cl, 0.0, 0.0)
          cmds.push(DL_RESTORE)
        }
        cmds.push(DL_RESTORE)

        // A×V output strip
        let axv_y = y + 87.0 + mat_h.to_double() + diag_label_h.to_double() + 4.0
        cmds.push(DL_FILL_STYLE)
        cmds.push(249.0)
        cmds.push(115.0)
        cmds.push(22.0) // #f97316
        cmds.push(DL_FONT_SANS_PX)
        cmds.push(8.0)
        cmds.push(DL_TEXT_ALIGN_LEFT)
        cmds.push(DL_TEXT_BASELINE_BOT)
        push_fill_str(cmds, "A\u00d7V", sx, axv_y)
        let hv : Array[Double] = []
        for j in 0..<head_dim {
          let idx = h * src_len * head_dim + p * head_dim + j
          hv.push(if idx < enc_ho_flat.length() { enc_ho_flat[idx] } else { 0.0 })
        }
        push_strip(cmds, hv, sx, axv_y, sw.to_double(), 6.0)

        // Connector line to output
        cmds.push(DL_STROKE_STYLE)
        cmds.push(187.0)
        cmds.push(187.0)
        cmds.push(187.0)
        cmds.push(DL_LINE_WIDTH)
        cmds.push(0.8)
        cmds.push(DL_BEGIN_PATH)
        cmds.push(DL_MOVE_TO)
        cmds.push(hcx2)
        cmds.push(axv_y + 8.0)
        cmds.push(DL_LINE_TO)
        cmds.push(cx_f)
        cmds.push(axv_y + 16.0)
        cmds.push(DL_STROKE)
      }
      // concat label
      cmds.push(DL_FILL_STYLE)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(DL_FONT_SANS_PX)
      cmds.push(8.0)
      cmds.push(DL_TEXT_ALIGN_CENTER)
      cmds.push(DL_TEXT_BASELINE_MID)
      let diag_lh_f2 = if 20.0 < src_len.to_double() * cell_size.to_double() * 0.7 + 4.0 {
        20.0
      } else {
        src_len.to_double() * cell_size.to_double() * 0.7 + 4.0
      }
      push_fill_str(
        cmds,
        "concat + linear  [d=" + ne.to_string() + "]",
        cx_f,
        y + 87.0 + mat_h.to_double() + diag_lh_f2 + 20.0,
      )
      // x_post_attn strip at bottom of block
      push_strip(cmds, enc_slice(p, 3), bx + 3.0, y + hmh - sh - 3.0, bw_f - 6.0, sh)
    }
    y += hmh
    push_arrow_down(cmds, cx_f, y, y + g_gap)
    y += g_gap

    // Add & Norm 1
    let an1_y = y
    push_strip_box(
      cmds,
      "Add & Norm",
      "",
      [],
      an1_y,
      han,
      213,
      232,
      212, // #d5e8d4
      bx,
      bw_f,
      cx_f,
      sh,
    )
    if show_skip {
      push_skip_down(cmds, bx, bw_f, skip1, an1_y + han / 2.0)
    }
    y += han
    push_arrow_down(cmds, cx_f, y, y + g_gap)
    y += g_gap

    let skip2 = y - g_gap / 2.0
    // Feed Forward
    push_strip_box(
      cmds,
      "Feed Forward",
      "",
      [],
      y,
      hff,
      218,
      232,
      252, // #dae8fc
      bx,
      bw_f,
      cx_f,
      sh,
    )
    push_strip(cmds, enc_slice(p, 4), bx + 3.0, y + hff - sh - 3.0, bw_f - 6.0, sh)
    y += hff
    push_arrow_down(cmds, cx_f, y, y + g_gap)
    y += g_gap

    // Add & Norm 2
    let an2_y = y
    push_strip_box(
      cmds,
      "Add & Norm",
      "",
      enc_slice(p, 4),
      an2_y,
      han,
      213,
      232,
      212,
      bx,
      bw_f,
      cx_f,
      sh,
    )
    if show_skip {
      push_skip_down(cmds, bx, bw_f, skip2, an2_y + han / 2.0)
    }
    y += han

    // Encoder block dashed border
    cmds.push(DL_STROKE_STYLE)
    cmds.push(187.0)
    cmds.push(187.0)
    cmds.push(187.0)
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.0)
    cmds.push(DL_SET_LINE_DASH)
    cmds.push(2.0)
    cmds.push(4.0)
    cmds.push(3.0)
    push_stroke_rect(cmds, bx - 9.0, blk_t - 4.0, bw_f + 18.0, y - blk_t + 8.0)
    cmds.push(DL_CLEAR_LINE_DASH)
    cmds.push(DL_FILL_STYLE)
    cmds.push(153.0)
    cmds.push(153.0)
    cmds.push(153.0)
    cmds.push(DL_FONT_SANS_PX)
    cmds.push(8.0)
    cmds.push(DL_TEXT_ALIGN_LEFT)
    cmds.push(DL_TEXT_BASELINE_BOT)
    push_fill_str(cmds, "Encoder Block", bx - 7.0, blk_t - 6.0)

    y += 8.0
    cmds.push(DL_FILL_STYLE)
    cmds.push(136.0)
    cmds.push(136.0)
    cmds.push(136.0)
    cmds.push(DL_FONT_BOLD_SANS)
    cmds.push(7.0)
    cmds.push(DL_TEXT_ALIGN_CENTER)
    cmds.push(DL_TEXT_BASELINE_MID)
    push_fill_str(cmds, "Encoder Output", cx_f, y + 7.0)
    if p == 0 {
      enc_out_y = y + 7.0
    }
  }

  // -------------------------------------------------------------------------
  // drawDecoderColumn
  // -------------------------------------------------------------------------
  fn draw_dec_col(p : Int) -> Unit {
    let ox = gap + p * (col + gap)
    let bw = col - 40
    let cx_f = (ox + col / 2).to_double()
    let bx = (ox + (col - bw) / 2).to_double()
    let bw_f = bw.to_double()
    let sh = 10.0
    let g_gap = 30.0
    let he = 38.0
    let hmh = 180.0
    let han = 34.0
    let hxa = 150.0
    let hff = 34.0
    let hlm = 32.0
    let hr_h = 15.0

    // Token header (blue tint)
    cmds.push(DL_FILL_STYLE)
    cmds.push(218.0)
    cmds.push(232.0)
    cmds.push(252.0) // #dae8fc
    push_fill_rect(
      cmds,
      (ox + 2).to_double(),
      (dec_y0 + 14).to_double(),
      (col - 4).to_double(),
      tok_h.to_double(),
    )
    cmds.push(DL_STROKE_STYLE)
    cmds.push(102.0)
    cmds.push(102.0)
    cmds.push(102.0)
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.0)
    push_stroke_rect(
      cmds,
      (ox + 2).to_double(),
      (dec_y0 + 14).to_double(),
      (col - 4).to_double(),
      tok_h.to_double(),
    )
    cmds.push(DL_FILL_STYLE)
    cmds.push(17.0)
    cmds.push(17.0)
    cmds.push(17.0)
    cmds.push(DL_FONT_BOLD_SANS)
    cmds.push(10.0)
    cmds.push(DL_TEXT_ALIGN_CENTER)
    cmds.push(DL_TEXT_BASELINE_MID)
    let tok_label = if p < tgt_toks.length() {
      let t = tgt_toks[p]
      if t.length() > 9 { t[:9].to_string() } else { t }
    } else {
      ""
    }
    push_fill_str(
      cmds,
      tok_label,
      cx_f,
      (dec_y0 + 14 + tok_h / 2).to_double(),
    )
    cmds.push(DL_FILL_STYLE)
    cmds.push(136.0)
    cmds.push(136.0)
    cmds.push(136.0)
    cmds.push(DL_FONT_MONO_PX)
    cmds.push(8.0)
    cmds.push(DL_TEXT_BASELINE_TOP)
    push_fill_str(cmds, "dec " + p.to_string(), cx_f, (dec_y0 + 15).to_double())

    let mut y = (dec_y0 + 44).to_double()
    let t_len = p + 1
    let cw_raw = if bw / (if t_len > 0 { t_len } else { 1 }) > 18 {
      bw / t_len
    } else {
      18
    }
    let cw_v = cw_raw
    let c_tot = cw_v * t_len
    let cx0 = (bx + (bw_f - c_tot.to_double()) / 2.0).to_int()
    for t in 0..<t_len {
      let cxt = cx0 + t * cw_v
      push_rr(cmds, cxt.to_double(), y, (cw_v - 2).to_double(), 14.0, 2.0)
      if t == p {
        cmds.push(DL_FILL_STYLE)
        cmds.push(29.0)
        cmds.push(78.0)
        cmds.push(216.0) // #1d4ed8
      } else {
        cmds.push(DL_FILL_STYLE)
        cmds.push(107.0)
        cmds.push(114.0)
        cmds.push(128.0) // #6b7280
      }
      cmds.push(DL_FILL)
      cmds.push(DL_FILL_STYLE)
      cmds.push(255.0)
      cmds.push(255.0)
      cmds.push(255.0)
      cmds.push(DL_FONT_MONO_PX)
      cmds.push(8.0)
      cmds.push(DL_TEXT_ALIGN_CENTER)
      cmds.push(DL_TEXT_BASELINE_MID)
      let tl = if t < tgt_toks.length() {
        let s = tgt_toks[t]
        if s.length() > 3 { s[:3].to_string() } else { s }
      } else {
        ""
      }
      push_fill_str(
        cmds,
        tl,
        (cxt + (cw_v - 2) / 2).to_double(),
        y + 7.0,
      )
    }
    y += 18.0
    push_arrow_down(cmds, cx_f, y, y + g_gap)
    y += g_gap

    // Output Embedding
    // Both GPT and seq2seq store: tok_emb(0), pos_emb(1), x_init(2), x_post_sattn(3), x_post_xattn(4), x_post_mlp(5)
    // In GPT mode x_post_xattn is a copy of x_post_sattn (not displayed separately)
    let tok_emb = dec_slice(p, 0)
    let pos_emb_d = dec_slice(p, 1)
    let x_init_d = dec_slice(p, 2)
    let x_post_sattn = dec_slice(p, 3)
    let x_post_xattn = dec_slice(p, 4)
    let x_post_mlp = dec_slice(p, 5)

    push_rr(cmds, bx, y, bw_f, he, 4.0)
    cmds.push(DL_FILL_STYLE)
    cmds.push(255.0)
    cmds.push(205.0)
    cmds.push(210.0)
    cmds.push(DL_FILL)
    cmds.push(DL_STROKE_STYLE)
    cmds.push(85.0)
    cmds.push(85.0)
    cmds.push(85.0)
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.0)
    cmds.push(DL_STROKE)
    cmds.push(DL_FILL_STYLE)
    cmds.push(17.0)
    cmds.push(17.0)
    cmds.push(17.0)
    cmds.push(DL_FONT_BOLD_SANS)
    cmds.push(10.0)
    cmds.push(DL_TEXT_ALIGN_CENTER)
    cmds.push(DL_TEXT_BASELINE_MID)
    push_fill_str(cmds, "Output Embedding", cx_f, y + 10.0)

    if show_pos_emb {
      let sw2 = ((bw_f - 6.0 - 20.0) / 2.0).to_int()
      let tok_x = bx + 3.0
      let pos_x = bx + 3.0 + sw2.to_double() + 20.0
      let plus_cx = bx + 3.0 + sw2.to_double() + 10.0
      cmds.push(DL_FILL_STYLE)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(DL_FONT_MONO_PX)
      cmds.push(9.0)
      cmds.push(DL_TEXT_ALIGN_CENTER)
      cmds.push(DL_TEXT_BASELINE_BOT)
      push_fill_str(cmds, "token_embedding", tok_x + sw2.to_double() / 2.0, y + 22.0)
      push_fill_str(cmds, "positional_embedding", pos_x + sw2.to_double() / 2.0, y + 22.0)
      push_strip(cmds, tok_emb, tok_x, y + 23.0, sw2.to_double(), sh)
      push_strip(cmds, pos_emb_d, pos_x, y + 23.0, sw2.to_double(), sh)
      cmds.push(DL_STROKE_STYLE)
      cmds.push(68.0)
      cmds.push(68.0)
      cmds.push(68.0)
      cmds.push(DL_LINE_WIDTH)
      cmds.push(1.2)
      cmds.push(DL_CLEAR_LINE_DASH)
      cmds.push(DL_BEGIN_PATH)
      push_arc(cmds, plus_cx, y + 28.0, 6.0, 0.0, @math.PI * 2.0)
      cmds.push(DL_STROKE)
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(plus_cx - 4.0)
      cmds.push(y + 28.0)
      cmds.push(DL_LINE_TO)
      cmds.push(plus_cx + 4.0)
      cmds.push(y + 28.0)
      cmds.push(DL_STROKE)
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(plus_cx)
      cmds.push(y + 24.0)
      cmds.push(DL_LINE_TO)
      cmds.push(plus_cx)
      cmds.push(y + 32.0)
      cmds.push(DL_STROKE)
    } else {
      cmds.push(DL_FILL_STYLE)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(DL_FONT_MONO_PX)
      cmds.push(9.0)
      cmds.push(DL_TEXT_ALIGN_CENTER)
      cmds.push(DL_TEXT_BASELINE_BOT)
      push_fill_str(cmds, "token_embedding (no pos emb)", cx_f, y + 22.0)
      push_strip(cmds, tok_emb, bx + 3.0, y + 23.0, bw_f - 6.0, sh)
    }
    y += he
    push_arrow_down(cmds, cx_f, y, y + 6.0)
    y += 6.0
    push_strip(cmds, x_init_d, bx + 3.0, y, bw_f - 6.0, sh)
    y += sh
    push_arrow_down(cmds, cx_f, y, y + g_gap)
    y += g_gap

    let blk_t = y
    let skip1 = y - g_gap / 2.0
    if p == 0 {
      masked_attn_mid_y = y + hmh / 2.0
    }

    // Masked Multi-Head Self-Attention
    if not(show_attn) {
      push_rr(cmds, bx, y, bw_f, hmh, 4.0)
      cmds.push(DL_FILL_STYLE)
      cmds.push(245.0)
      cmds.push(245.0)
      cmds.push(245.0)
      cmds.push(DL_FILL)
      cmds.push(DL_STROKE_STYLE)
      cmds.push(204.0)
      cmds.push(204.0)
      cmds.push(204.0)
      cmds.push(DL_LINE_WIDTH)
      cmds.push(1.0)
      cmds.push(DL_SET_LINE_DASH)
      cmds.push(2.0)
      cmds.push(4.0)
      cmds.push(3.0)
      cmds.push(DL_STROKE)
      cmds.push(DL_CLEAR_LINE_DASH)
      cmds.push(DL_FILL_STYLE)
      cmds.push(170.0)
      cmds.push(170.0)
      cmds.push(170.0)
      cmds.push(DL_FONT_BOLD_SANS)
      cmds.push(10.0)
      cmds.push(DL_TEXT_ALIGN_CENTER)
      cmds.push(DL_TEXT_BASELINE_MID)
      push_fill_str(cmds, "Masked Multi-Head Self-Attention (disabled)", cx_f, y + hmh / 2.0)
      push_strip(cmds, x_post_sattn, bx + 3.0, y + hmh - sh - 3.0, bw_f - 6.0, sh)
    } else {
      push_box(cmds, "Masked Multi-Head Self-Attention", y, hmh, 255, 230, 204, bx, bw_f, cx_f)
      let dh = ne / n_head
      let sec_w = (bw - 4) / n_head
      for h in 0..<n_head {
        let sx_h = bx + 2.0 + h.to_double() * sec_w.to_double()
        let (hr2, hg2, hb2, ha2) = head_rgba(h)
        cmds.push(DL_FILL_STYLE_RGBA)
        cmds.push(hr2.to_double())
        cmds.push(hg2.to_double())
        cmds.push(hb2.to_double())
        cmds.push(ha2.to_double())
        push_fill_rect(cmds, sx_h, y + 19.0, sec_w.to_double() - 1.0, 8.0)
        let sub_data : Array[Double] = []
        for dd in 0..<dh {
          if h * dh + dd < x_init_d.length() {
            sub_data.push(x_init_d[h * dh + dd])
          } else {
            sub_data.push(0.0)
          }
        }
        push_strip(cmds, sub_data, sx_h, y + 19.0, sec_w.to_double() - 1.0, 8.0)
      }
      let head_w = bw / n_head
      cmds.push(DL_CLEAR_LINE_DASH)
      for h in 0..<n_head {
        let scx = bx + 2.0 + (h.to_double() + 0.5) * sec_w.to_double()
        let hcx2 = bx + h.to_double() * head_w.to_double() + head_w.to_double() / 2.0
        cmds.push(DL_STROKE_STYLE)
        cmds.push(187.0)
        cmds.push(187.0)
        cmds.push(187.0)
        cmds.push(DL_LINE_WIDTH)
        cmds.push(0.8)
        cmds.push(DL_BEGIN_PATH)
        cmds.push(DL_MOVE_TO)
        cmds.push(scx)
        cmds.push(y + 27.0)
        cmds.push(DL_LINE_TO)
        cmds.push(hcx2)
        cmds.push(y + 35.0)
        cmds.push(DL_STROKE)
      }
      cmds.push(DL_FILL_STYLE)
      cmds.push(187.0)
      cmds.push(187.0)
      cmds.push(187.0)
      cmds.push(DL_FONT_SANS_PX)
      cmds.push(9.0)
      cmds.push(DL_TEXT_ALIGN_RIGHT)
      cmds.push(DL_TEXT_BASELINE_MID)
      push_fill_str(cmds, "\u00d7Wq,k,v", bx + bw_f - 2.0, y + 31.0)
      let cell_size_raw = if 9 < (head_w - 6) / (if tgt_len > 0 { tgt_len } else { 1 }) {
        9
      } else {
        (head_w - 6) / (if tgt_len > 0 { tgt_len } else { 1 })
      }
      let cell_size = if cell_size_raw < 4 { 4 } else { cell_size_raw }
      let mat_h = t_len * cell_size
      let diag_label_h_f = if 20.0 < t_len.to_double() * cell_size.to_double() * 0.7 + 4.0 {
        20.0
      } else {
        t_len.to_double() * cell_size.to_double() * 0.7 + 4.0
      }
      let diag_label_h = diag_label_h_f.to_int()
      let qkv_h = 7.0

      for h in 0..<n_head {
        let hx = bx + h.to_double() * head_w.to_double()
        let hcx2 = hx + head_w.to_double() / 2.0
        let sw = head_w - 6
        let sx = hx + 3.0
        if h > 0 {
          cmds.push(DL_STROKE_STYLE)
          cmds.push(224.0)
          cmds.push(224.0)
          cmds.push(224.0)
          cmds.push(DL_LINE_WIDTH)
          cmds.push(0.5)
          cmds.push(DL_BEGIN_PATH)
          cmds.push(DL_MOVE_TO)
          cmds.push(hx)
          cmds.push(y + 35.0)
          cmds.push(DL_LINE_TO)
          cmds.push(hx)
          cmds.push(y + 97.0 + mat_h.to_double() + 18.0 + diag_label_h.to_double())
          cmds.push(DL_STROKE)
        }
        let (hr2, hg2, hb2, _) = head_rgba(h)
        cmds.push(DL_FILL_STYLE)
        cmds.push(hr2.to_double())
        cmds.push(hg2.to_double())
        cmds.push(hb2.to_double())
        cmds.push(DL_FONT_BOLD_SANS)
        cmds.push(8.0)
        cmds.push(DL_TEXT_ALIGN_CENTER)
        cmds.push(DL_TEXT_BASELINE_MID)
        push_fill_str(cmds, "h" + h.to_string(), hcx2, y + 39.0)
        cmds.push(DL_FILL_STYLE)
        cmds.push(170.0)
        cmds.push(170.0)
        cmds.push(170.0)
        cmds.push(DL_FONT_MONO_PX)
        cmds.push(9.0)
        push_fill_str(cmds, "d=" + dh.to_string(), hcx2, y + 46.0)
        cmds.push(DL_FILL_STYLE)
        cmds.push(192.0)
        cmds.push(132.0)
        cmds.push(252.0)
        cmds.push(DL_FONT_SANS_PX)
        cmds.push(9.0)
        cmds.push(DL_TEXT_ALIGN_LEFT)
        cmds.push(DL_TEXT_BASELINE_MID)
        push_fill_str(cmds, "Q", sx, y + 52.0)
        let qv : Array[Double] = []
        for j in 0..<head_dim {
          let idx = h * tgt_len * head_dim + p * head_dim + j
          qv.push(if idx < dec_q_flat.length() { dec_q_flat[idx] } else { 0.0 })
        }
        push_strip(cmds, qv, sx + 7.0, y + 49.0, sw.to_double() - 7.0, qkv_h)
        cmds.push(DL_FILL_STYLE)
        cmds.push(96.0)
        cmds.push(165.0)
        cmds.push(250.0)
        push_fill_str(cmds, "K", sx, y + 62.0)
        let kv : Array[Double] = []
        for j in 0..<head_dim {
          let idx = h * tgt_len * head_dim + p * head_dim + j
          kv.push(if idx < dec_k_flat.length() { dec_k_flat[idx] } else { 0.0 })
        }
        push_strip(cmds, kv, sx + 7.0, y + 59.0, sw.to_double() - 7.0, qkv_h)
        cmds.push(DL_FILL_STYLE)
        cmds.push(52.0)
        cmds.push(211.0)
        cmds.push(153.0)
        push_fill_str(cmds, "V", sx, y + 72.0)
        let vv : Array[Double] = []
        for j in 0..<head_dim {
          let idx = h * tgt_len * head_dim + p * head_dim + j
          vv.push(if idx < dec_v_flat.length() { dec_v_flat[idx] } else { 0.0 })
        }
        push_strip(cmds, vv, sx + 7.0, y + 69.0, sw.to_double() - 7.0, qkv_h)

        let mat_w = cell_size * t_len
        let mat_x0 = (hcx2 - mat_w.to_double() / 2.0).to_int()
        cmds.push(DL_FILL_STYLE)
        cmds.push(119.0)
        cmds.push(119.0)
        cmds.push(119.0)
        cmds.push(DL_FONT_MONO_PX)
        cmds.push(6.0)
        cmds.push(DL_TEXT_ALIGN_RIGHT)
        cmds.push(DL_TEXT_BASELINE_MID)
        for r in 0..<t_len {
          let rl = if r < tgt_toks.length() {
            let s = tgt_toks[r]
            if s.length() > 5 { s[:5].to_string() } else { s }
          } else {
            ""
          }
          push_fill_str(
            cmds,
            rl,
            mat_x0.to_double() - 2.0,
            y + 87.0 + r.to_double() * cell_size.to_double() + cell_size.to_double() / 2.0,
          )
        }
        for r in 0..<t_len {
          for t in 0..<t_len {
            let idx = h * tgt_len * tgt_len + r * tgt_len + t
            let w_val = if idx < dec_sa.length() { dec_sa[idx] } else { 0.0 }
            let (ar, ag, ab) = attn_weight_color(w_val)
            cmds.push(DL_FILL_STYLE)
            cmds.push(ar.to_double())
            cmds.push(ag.to_double())
            cmds.push(ab.to_double())
            push_fill_rect(
              cmds,
              mat_x0.to_double() + t.to_double() * cell_size.to_double(),
              y + 87.0 + r.to_double() * cell_size.to_double(),
              cell_size.to_double() - 0.5,
              cell_size.to_double() - 0.5,
            )
          }
        }
        // Highlight row p
        cmds.push(DL_STROKE_RGBA)
        cmds.push(29.0)
        cmds.push(78.0)
        cmds.push(216.0)
        cmds.push(178.0) // rgba(29,78,216,0.7)
        cmds.push(DL_LINE_WIDTH)
        cmds.push(0.8)
        push_stroke_rect(
          cmds,
          mat_x0.to_double(),
          y + 87.0 + p.to_double() * cell_size.to_double(),
          mat_w.to_double(),
          cell_size.to_double(),
        )
        // Column labels
        cmds.push(DL_SAVE)
        cmds.push(DL_FILL_STYLE)
        cmds.push(85.0)
        cmds.push(85.0)
        cmds.push(85.0)
        cmds.push(DL_FONT_MONO_PX)
        cmds.push(7.0)
        cmds.push(DL_TEXT_ALIGN_LEFT)
        cmds.push(DL_TEXT_BASELINE_MID)
        for t in 0..<t_len {
          let lx2 = mat_x0.to_double() + t.to_double() * cell_size.to_double() + cell_size.to_double() / 2.0 - 4.0
          let ly2 = y + 87.0 + mat_h.to_double() + 10.0
          cmds.push(DL_SAVE)
          cmds.push(DL_TRANSLATE)
          cmds.push(lx2)
          cmds.push(ly2)
          cmds.push(DL_ROTATE)
          cmds.push(-@math.PI / 4.0)
          let cl = if t < tgt_toks.length() {
            let s = tgt_toks[t]
            if s.length() > 5 { s[:5].to_string() } else { s }
          } else {
            ""
          }
          push_fill_str(cmds, cl, 0.0, 0.0)
          cmds.push(DL_RESTORE)
        }
        cmds.push(DL_RESTORE)

        let axv_y = y + 87.0 + mat_h.to_double() + diag_label_h.to_double() + 4.0
        cmds.push(DL_FILL_STYLE)
        cmds.push(249.0)
        cmds.push(115.0)
        cmds.push(22.0)
        cmds.push(DL_FONT_SANS_PX)
        cmds.push(8.0)
        cmds.push(DL_TEXT_ALIGN_LEFT)
        cmds.push(DL_TEXT_BASELINE_BOT)
        push_fill_str(cmds, "A\u00d7V", sx, axv_y)
        let hv : Array[Double] = []
        for j in 0..<head_dim {
          let idx = h * tgt_len * head_dim + p * head_dim + j
          hv.push(if idx < dec_ho_flat.length() { dec_ho_flat[idx] } else { 0.0 })
        }
        push_strip(cmds, hv, sx, axv_y, sw.to_double(), 6.0)
        cmds.push(DL_STROKE_STYLE)
        cmds.push(187.0)
        cmds.push(187.0)
        cmds.push(187.0)
        cmds.push(DL_LINE_WIDTH)
        cmds.push(0.8)
        cmds.push(DL_BEGIN_PATH)
        cmds.push(DL_MOVE_TO)
        cmds.push(hcx2)
        cmds.push(axv_y + 8.0)
        cmds.push(DL_LINE_TO)
        cmds.push(cx_f)
        cmds.push(axv_y + 16.0)
        cmds.push(DL_STROKE)
      }
      cmds.push(DL_FILL_STYLE)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(DL_FONT_SANS_PX)
      cmds.push(8.0)
      cmds.push(DL_TEXT_ALIGN_CENTER)
      cmds.push(DL_TEXT_BASELINE_MID)
      let diag_lh2 = if 20.0 < t_len.to_double() * cell_size.to_double() * 0.7 + 4.0 {
        20.0
      } else {
        t_len.to_double() * cell_size.to_double() * 0.7 + 4.0
      }
      push_fill_str(
        cmds,
        "concat + linear  [d=" + ne.to_string() + "]",
        cx_f,
        y + 87.0 + mat_h.to_double() + diag_lh2 + 20.0,
      )
      push_strip(cmds, x_post_sattn, bx + 3.0, y + hmh - sh - 3.0, bw_f - 6.0, sh)
    }
    y += hmh
    push_arrow_down(cmds, cx_f, y, y + g_gap)
    y += g_gap

    // Add & Norm 1
    let an1_y = y
    push_strip_box(cmds, "Add & Norm", "", [], an1_y, han, 213, 232, 212, bx, bw_f, cx_f, sh)
    if show_skip {
      push_skip_down(cmds, bx, bw_f, skip1, an1_y + han / 2.0)
    }
    y += han

    // Cross-Attention (seq2seq only)
    if not(is_gpt) {
      push_arrow_down(cmds, cx_f, y, y + g_gap)
      // "Q" label
      cmds.push(DL_FILL_STYLE)
      cmds.push(29.0)
      cmds.push(78.0)
      cmds.push(216.0)
      cmds.push(DL_FONT_BOLD_SANS)
      cmds.push(7.0)
      cmds.push(DL_TEXT_ALIGN_LEFT)
      cmds.push(DL_TEXT_BASELINE_MID)
      push_fill_str(cmds, "Q", cx_f + 4.0, y + g_gap / 2.0)
      y += g_gap

      let skip2 = y - g_gap / 2.0
      if p == 0 {
        cross_attn_y = y
      }

      if not(show_attn) {
        push_rr(cmds, bx, y, bw_f, hxa, 4.0)
        cmds.push(DL_FILL_STYLE)
        cmds.push(245.0)
        cmds.push(245.0)
        cmds.push(245.0)
        cmds.push(DL_FILL)
        cmds.push(DL_STROKE_STYLE)
        cmds.push(204.0)
        cmds.push(204.0)
        cmds.push(204.0)
        cmds.push(DL_LINE_WIDTH)
        cmds.push(1.0)
        cmds.push(DL_SET_LINE_DASH)
        cmds.push(2.0)
        cmds.push(4.0)
        cmds.push(3.0)
        cmds.push(DL_STROKE)
        cmds.push(DL_CLEAR_LINE_DASH)
        cmds.push(DL_FILL_STYLE)
        cmds.push(170.0)
        cmds.push(170.0)
        cmds.push(170.0)
        cmds.push(DL_FONT_BOLD_SANS)
        cmds.push(10.0)
        cmds.push(DL_TEXT_ALIGN_CENTER)
        cmds.push(DL_TEXT_BASELINE_MID)
        push_fill_str(cmds, "Cross-Attention (disabled)", cx_f, y + hxa / 2.0)
        push_strip(cmds, x_post_xattn, bx + 3.0, y + hxa - 8.0 - 3.0, bw_f - 6.0, 8.0)
      } else {
        // Cross-Attention box
        push_rr(cmds, bx, y, bw_f, hxa, 4.0)
        cmds.push(DL_FILL_STYLE)
        cmds.push(255.0)
        cmds.push(230.0)
        cmds.push(204.0)
        cmds.push(DL_FILL)
        cmds.push(DL_STROKE_STYLE)
        cmds.push(217.0)
        cmds.push(119.0)
        cmds.push(6.0) // #d97706
        cmds.push(DL_LINE_WIDTH)
        cmds.push(1.5)
        cmds.push(DL_STROKE)
        cmds.push(DL_FILL_STYLE)
        cmds.push(17.0)
        cmds.push(17.0)
        cmds.push(17.0)
        cmds.push(DL_FONT_BOLD_SANS)
        cmds.push(10.0)
        cmds.push(DL_TEXT_ALIGN_CENTER)
        cmds.push(DL_TEXT_BASELINE_MID)
        push_fill_str(cmds, "Cross-Attention", cx_f, y + 9.0)

        // Q source strip
        cmds.push(DL_FILL_STYLE)
        cmds.push(29.0)
        cmds.push(78.0)
        cmds.push(216.0)
        cmds.push(DL_FONT_BOLD_SANS)
        cmds.push(8.0)
        cmds.push(DL_TEXT_ALIGN_LEFT)
        cmds.push(DL_TEXT_BASELINE_MID)
        push_fill_str(cmds, "Q:", bx + 3.0, y + 18.0)
        push_strip(cmds, x_post_sattn, bx + 18.0, y + 14.0, bw_f - 21.0, 7.0)

        // K,V source label
        cmds.push(DL_FILL_STYLE)
        cmds.push(217.0)
        cmds.push(119.0)
        cmds.push(6.0)
        push_fill_str(cmds, "K,V (enc, shared):", bx + 3.0, y + 28.0)
        cmds.push(DL_FILL_STYLE)
        cmds.push(187.0)
        cmds.push(187.0)
        cmds.push(187.0)
        cmds.push(DL_FONT_SANS_PX)
        cmds.push(9.0)
        cmds.push(DL_TEXT_ALIGN_RIGHT)
        cmds.push(DL_TEXT_BASELINE_MID)
        push_fill_str(cmds, "\u00d7Wq,k,v", bx + bw_f - 2.0, y + 28.0)

        let x_head_w = bw / n_head
        let x_sec_w = (bw - 4) / n_head
        for h in 0..<n_head {
          let scx = bx + 2.0 + (h.to_double() + 0.5) * x_sec_w.to_double()
          let hcx2 = bx + h.to_double() * x_head_w.to_double() + x_head_w.to_double() / 2.0
          cmds.push(DL_STROKE_STYLE)
          cmds.push(187.0)
          cmds.push(187.0)
          cmds.push(187.0)
          cmds.push(DL_LINE_WIDTH)
          cmds.push(0.8)
          cmds.push(DL_BEGIN_PATH)
          cmds.push(DL_MOVE_TO)
          cmds.push(scx)
          cmds.push(y + 33.0)
          cmds.push(DL_LINE_TO)
          cmds.push(hcx2)
          cmds.push(y + 38.0)
          cmds.push(DL_STROKE)
        }

        let xcell_x_raw = if 9 < (x_head_w - 6) / (if src_len > 0 { src_len } else { 1 }) {
          9
        } else {
          (x_head_w - 6) / (if src_len > 0 { src_len } else { 1 })
        }
        let xcell_x = if xcell_x_raw < 4 { 4 } else { xcell_x_raw }
        let denom2 = if t_len > src_len { t_len } else { src_len }
        let xcell_y_raw = if 9 < (x_head_w - 6) / (if denom2 > 0 { denom2 } else { 1 }) {
          9
        } else {
          (x_head_w - 6) / (if denom2 > 0 { denom2 } else { 1 })
        }
        let xcell_y = if xcell_y_raw < 4 { 4 } else { xcell_y_raw }
        let xmat_h = t_len * xcell_y
        let xmat_w = src_len * xcell_x
        let xmat_top = y + 42.0

        for h in 0..<n_head {
          let hx = bx + h.to_double() * x_head_w.to_double()
          let hcx2 = hx + x_head_w.to_double() / 2.0
          let mat_x0 = (hcx2 - xmat_w.to_double() / 2.0).to_int()
          if h > 0 {
            cmds.push(DL_STROKE_STYLE)
            cmds.push(224.0)
            cmds.push(224.0)
            cmds.push(224.0)
            cmds.push(DL_LINE_WIDTH)
            cmds.push(0.5)
            cmds.push(DL_BEGIN_PATH)
            cmds.push(DL_MOVE_TO)
            cmds.push(hx)
            cmds.push(y + 35.0)
            cmds.push(DL_LINE_TO)
            cmds.push(hx)
            cmds.push(xmat_top + xmat_h.to_double() + 14.0)
            cmds.push(DL_STROKE)
          }
          let (hr2, hg2, hb2, _) = head_rgba(h)
          cmds.push(DL_FILL_STYLE)
          cmds.push(hr2.to_double())
          cmds.push(hg2.to_double())
          cmds.push(hb2.to_double())
          cmds.push(DL_FONT_BOLD_SANS)
          cmds.push(8.0)
          cmds.push(DL_TEXT_ALIGN_CENTER)
          cmds.push(DL_TEXT_BASELINE_MID)
          push_fill_str(cmds, "h" + h.to_string(), hcx2, y + 39.0)

          // Row labels
          cmds.push(DL_FILL_STYLE)
          cmds.push(119.0)
          cmds.push(119.0)
          cmds.push(119.0)
          cmds.push(DL_FONT_MONO_PX)
          cmds.push(6.0)
          cmds.push(DL_TEXT_ALIGN_RIGHT)
          cmds.push(DL_TEXT_BASELINE_MID)
          for r in 0..<t_len {
            let rl = if r < tgt_toks.length() {
              let s = tgt_toks[r]
              if s.length() > 5 { s[:5].to_string() } else { s }
            } else {
              ""
            }
            push_fill_str(
              cmds,
              rl,
              mat_x0.to_double() - 2.0,
              xmat_top + r.to_double() * xcell_y.to_double() + xcell_y.to_double() / 2.0,
            )
          }
          // Cross-attn matrix cells
          for r in 0..<t_len {
            for s_idx in 0..<src_len {
              let idx = h * tgt_len * src_len + r * src_len + s_idx
              let w_val = if idx < cross_a.length() { cross_a[idx] } else { 0.0 }
              let (ar, ag, ab) = attn_weight_color(w_val)
              cmds.push(DL_FILL_STYLE)
              cmds.push(ar.to_double())
              cmds.push(ag.to_double())
              cmds.push(ab.to_double())
              push_fill_rect(
                cmds,
                mat_x0.to_double() + s_idx.to_double() * xcell_x.to_double(),
                xmat_top + r.to_double() * xcell_y.to_double(),
                xcell_x.to_double() - 0.5,
                xcell_y.to_double() - 0.5,
              )
            }
          }
          // Highlight row p
          cmds.push(DL_STROKE_RGBA)
          cmds.push(217.0)
          cmds.push(119.0)
          cmds.push(6.0)
          cmds.push(204.0) // 0.8*255
          cmds.push(DL_LINE_WIDTH)
          cmds.push(0.8)
          push_stroke_rect(
            cmds,
            mat_x0.to_double(),
            xmat_top + p.to_double() * xcell_y.to_double(),
            xmat_w.to_double(),
            xcell_y.to_double(),
          )
          // Column labels
          cmds.push(DL_SAVE)
          cmds.push(DL_FILL_STYLE)
          cmds.push(85.0)
          cmds.push(85.0)
          cmds.push(85.0)
          cmds.push(DL_FONT_MONO_PX)
          cmds.push(7.0)
          cmds.push(DL_TEXT_ALIGN_LEFT)
          cmds.push(DL_TEXT_BASELINE_MID)
          for s_idx in 0..<src_len {
            let lx2 = mat_x0.to_double() + s_idx.to_double() * xcell_x.to_double() + xcell_x.to_double() / 2.0 - 4.0
            let ly2 = xmat_top + xmat_h.to_double() + 10.0
            cmds.push(DL_SAVE)
            cmds.push(DL_TRANSLATE)
            cmds.push(lx2)
            cmds.push(ly2)
            cmds.push(DL_ROTATE)
            cmds.push(-@math.PI / 4.0)
            let cl = if s_idx < src_toks.length() {
              let s = src_toks[s_idx]
              if s.length() > 5 { s[:5].to_string() } else { s }
            } else {
              ""
            }
            push_fill_str(cmds, cl, 0.0, 0.0)
            cmds.push(DL_RESTORE)
          }
          cmds.push(DL_RESTORE)

          // diagLabelH for cross-attn
          let xdiag_lh_f = if 20.0 < src_len.to_double() * xcell_x.to_double() * 0.7 + 4.0 {
            20.0
          } else {
            src_len.to_double() * xcell_x.to_double() * 0.7 + 4.0
          }
          let xho_base = xmat_top + xmat_h.to_double() + xdiag_lh_f + 4.0
          cmds.push(DL_FILL_STYLE)
          cmds.push(249.0)
          cmds.push(115.0)
          cmds.push(22.0)
          cmds.push(DL_FONT_SANS_PX)
          cmds.push(7.0)
          cmds.push(DL_TEXT_ALIGN_LEFT)
          cmds.push(DL_TEXT_BASELINE_BOT)
          push_fill_str(cmds, "A\u00d7V", mat_x0.to_double(), xho_base)
          let head_dim_x = ne / n_head
          let hv : Array[Double] = []
          for j in 0..<head_dim_x {
            let idx = h * tgt_len * head_dim_x + p * head_dim_x + j
            hv.push(if idx < cross_ho_flat.length() { cross_ho_flat[idx] } else { 0.0 })
          }
          push_strip(cmds, hv, mat_x0.to_double(), xho_base, xmat_w.to_double(), 6.0)
          cmds.push(DL_STROKE_STYLE)
          cmds.push(187.0)
          cmds.push(187.0)
          cmds.push(187.0)
          cmds.push(DL_LINE_WIDTH)
          cmds.push(0.8)
          cmds.push(DL_BEGIN_PATH)
          cmds.push(DL_MOVE_TO)
          cmds.push(hcx2)
          cmds.push(xho_base + 8.0)
          cmds.push(DL_LINE_TO)
          cmds.push(cx_f)
          cmds.push(xho_base + 16.0)
          cmds.push(DL_STROKE)
        }

        // Concat label for cross-attn
        let concat_lh_f = if 20.0 < src_len.to_double() * xcell_x.to_double() * 0.7 + 4.0 {
          20.0
        } else {
          src_len.to_double() * xcell_x.to_double() * 0.7 + 4.0
        }
        let concat_y = xmat_top + xmat_h.to_double() + concat_lh_f + 24.0
        cmds.push(DL_FILL_STYLE)
        cmds.push(136.0)
        cmds.push(136.0)
        cmds.push(136.0)
        cmds.push(DL_FONT_SANS_PX)
        cmds.push(8.0)
        cmds.push(DL_TEXT_ALIGN_CENTER)
        cmds.push(DL_TEXT_BASELINE_MID)
        push_fill_str(
          cmds,
          "concat + linear  [d=" + ne.to_string() + "]",
          cx_f,
          concat_y,
        )
        push_strip(cmds, x_post_xattn, bx + 3.0, y + hxa - 8.0 - 3.0, bw_f - 6.0, 8.0)
      }
      y += hxa
      push_arrow_down(cmds, cx_f, y, y + g_gap)
      y += g_gap

      // Add & Norm 2 (cross-attn)
      let an2_y = y
      push_strip_box(cmds, "Add & Norm", "", [], an2_y, han, 213, 232, 212, bx, bw_f, cx_f, sh)
      if show_skip {
        push_skip_down(cmds, bx, bw_f, skip2, an2_y + han / 2.0)
      }
      y += han
      push_arrow_down(cmds, cx_f, y, y + g_gap)
      y += g_gap
    } else {
      push_arrow_down(cmds, cx_f, y, y + g_gap)
      y += g_gap
    }

    let skip3 = y - g_gap / 2.0
    // Feed Forward
    push_strip_box(cmds, "Feed Forward", "", [], y, hff, 218, 232, 252, bx, bw_f, cx_f, sh)
    push_strip(cmds, x_post_mlp, bx + 3.0, y + hff - sh - 3.0, bw_f - 6.0, sh)
    y += hff
    push_arrow_down(cmds, cx_f, y, y + g_gap)
    y += g_gap

    // Add & Norm 3
    let an3_y = y
    push_strip_box(cmds, "Add & Norm", "", x_post_mlp, an3_y, han, 213, 232, 212, bx, bw_f, cx_f, sh)
    if show_skip {
      push_skip_down(cmds, bx, bw_f, skip3, an3_y + han / 2.0)
    }
    y += han

    // Decoder block border
    cmds.push(DL_STROKE_STYLE)
    cmds.push(187.0)
    cmds.push(187.0)
    cmds.push(187.0)
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.0)
    cmds.push(DL_SET_LINE_DASH)
    cmds.push(2.0)
    cmds.push(4.0)
    cmds.push(3.0)
    push_stroke_rect(cmds, bx - 9.0, blk_t - 4.0, bw_f + 18.0, y - blk_t + 8.0)
    cmds.push(DL_CLEAR_LINE_DASH)
    cmds.push(DL_FILL_STYLE)
    cmds.push(153.0)
    cmds.push(153.0)
    cmds.push(153.0)
    cmds.push(DL_FONT_SANS_PX)
    cmds.push(8.0)
    cmds.push(DL_TEXT_ALIGN_LEFT)
    cmds.push(DL_TEXT_BASELINE_BOT)
    push_fill_str(cmds, "Decoder Block", bx - 7.0, blk_t - 6.0)

    y += 8.0
    push_arrow_down(cmds, cx_f, y, y + g_gap)
    y += g_gap

    // Linear (LM Head)
    let lm_sub = "vocab=" + vs.to_string()
    push_strip_box(cmds, "Linear (LM Head)", lm_sub, [], y, hlm, 225, 213, 231, bx, bw_f, cx_f, sh)
    y += hlm
    push_arrow_down(cmds, cx_f, y, y + g_gap)
    y += g_gap

    if p == 0 {
      output_probs_y = y
    }
    // Output Probabilities label
    cmds.push(DL_FILL_STYLE)
    cmds.push(136.0)
    cmds.push(136.0)
    cmds.push(136.0)
    cmds.push(DL_FONT_BOLD_SANS)
    cmds.push(7.0)
    cmds.push(DL_TEXT_ALIGN_CENTER)
    cmds.push(DL_TEXT_BASELINE_BOT)
    push_fill_str(cmds, "Output Probabilities", cx_f, y - 1.0)

    // Softmax and top-3 bars
    let lg = dec_logits(p)
    let mut mx_l = -1.0e30
    for v in lg {
      if v > mx_l { mx_l = v }
    }
    let mut sm_l = 0.0
    let ex_l : Array[Double] = []
    for v in lg {
      let e = @math.exp(v - mx_l)
      sm_l += e
      ex_l.push(e)
    }
    // top-3 by index
    let ranked : Array[Int] = []
    for i in 0..<vs { ranked.push(i) }
    // simple selection of top 3 (bubble approach)
    let n_rank = if vs < 3 { vs } else { 3 }
    for i in 0..<n_rank {
      for j in (i + 1)..<vs {
        if ex_l[ranked[j]] > ex_l[ranked[i]] {
          let tmp = ranked[i]
          ranked[i] = ranked[j]
          ranked[j] = tmp
        }
      }
    }

    push_rr(cmds, bx, y, bw_f, (3.0 * hr_h), 3.0)
    cmds.push(DL_FILL_STYLE)
    cmds.push(240.0)
    cmds.push(255.0)
    cmds.push(244.0) // #f0fff4
    cmds.push(DL_FILL)
    cmds.push(DL_STROKE_STYLE)
    cmds.push(85.0)
    cmds.push(85.0)
    cmds.push(85.0)
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.0)
    cmds.push(DL_STROKE)

    for k in 0..<n_rank {
      let prob = ex_l[ranked[k]] / sm_l
      let py = y + k.to_double() * hr_h
      let bw_bar = (bw_f - 4.0) * (if prob * 3.0 < 1.0 { prob * 3.0 } else { 1.0 })
      let bw_bar2 = if bw_bar < 1.0 { 1.0 } else { bw_bar }
      if k == 0 {
        cmds.push(DL_FILL_STYLE)
        cmds.push(22.0)
        cmds.push(163.0)
        cmds.push(74.0) // #16a34a
      } else if k == 1 {
        cmds.push(DL_FILL_STYLE)
        cmds.push(134.0)
        cmds.push(239.0)
        cmds.push(172.0) // #86efac
      } else {
        cmds.push(DL_FILL_STYLE)
        cmds.push(187.0)
        cmds.push(247.0)
        cmds.push(208.0) // #bbf7d0
      }
      push_fill_rect(cmds, bx + 2.0, py + 1.0, bw_bar2, hr_h - 3.0)

      // Token label
      let is_white = bw_bar2 > (bw_f - 4.0) * 0.45 && k == 0
      if is_white {
        cmds.push(DL_FILL_STYLE)
        cmds.push(255.0)
        cmds.push(255.0)
        cmds.push(255.0)
      } else {
        cmds.push(DL_FILL_STYLE)
        cmds.push(17.0)
        cmds.push(17.0)
        cmds.push(17.0)
      }
      if k == 0 {
        cmds.push(DL_FONT_BOLD_MONO)
        cmds.push(7.0)
      } else {
        cmds.push(DL_FONT_MONO_PX)
        cmds.push(7.0)
      }
      cmds.push(DL_TEXT_ALIGN_LEFT)
      cmds.push(DL_TEXT_BASELINE_MID)
      let w_label = if ranked[k] < vocab.length() {
        let s = vocab[ranked[k]]
        if s.length() > 7 { s[:7].to_string() } else { s }
      } else {
        ""
      }
      push_fill_str(cmds, w_label, bx + 4.0, py + hr_h / 2.0)

      // Probability percentage
      cmds.push(DL_FILL_STYLE)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(136.0)
      cmds.push(DL_FONT_MONO_PX)
      cmds.push(9.0)
      cmds.push(DL_TEXT_ALIGN_RIGHT)
      // Format prob*100 as "XX.X%"
      let pct = prob * 100.0
      let pct_int = pct.to_int()
      let pct_dec = ((pct - pct_int.to_double()) * 10.0).to_int()
      let pct_str = pct_int.to_string() + "." + pct_dec.to_string() + "%"
      push_fill_str(cmds, pct_str, bx + bw_f - 3.0, py + hr_h / 2.0)
    }
  }

  // -------------------------------------------------------------------------
  // drawKVBridge
  // -------------------------------------------------------------------------
  fn draw_kv_bridge() -> Unit {
    if enc_out_y <= 0.0 || cross_attn_y <= 0.0 || src_len == 0 || tgt_len == 0 {
      return
    }
    let cross_mid_y = cross_attn_y + 28.0
    let gather_y = enc_out_y + 18.0
    let bridge_y = enc_sect_h.to_double() + 6.0
    let bridge_h = (vgap - 14).to_double()
    let bridge_w = canvas_w.to_double() - 2.0 * gap.to_double()

    cmds.push(DL_SAVE)
    cmds.push(DL_STROKE_STYLE)
    cmds.push(217.0)
    cmds.push(119.0)
    cmds.push(6.0) // #d97706
    cmds.push(DL_LINE_JOIN_ROUND)

    // Dashed gather lines from encoder output
    cmds.push(DL_SET_LINE_DASH)
    cmds.push(2.0)
    cmds.push(3.0)
    cmds.push(2.0)
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.2)
    for p2 in 0..<src_len {
      let cx2 = (gap + p2 * (col + gap) + col / 2).to_double()
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(cx2)
      cmds.push(enc_out_y + 7.0)
      cmds.push(DL_LINE_TO)
      cmds.push(cx2)
      cmds.push(gather_y)
      cmds.push(DL_STROKE)
    }
    // Horizontal gather line
    cmds.push(DL_BEGIN_PATH)
    cmds.push(DL_MOVE_TO)
    cmds.push((gap + col / 2).to_double())
    cmds.push(gather_y)
    cmds.push(DL_LINE_TO)
    cmds.push((gap + (src_len - 1) * (col + gap) + col / 2).to_double())
    cmds.push(gather_y)
    cmds.push(DL_STROKE)

    // Dashed lines to bridge
    cmds.push(DL_SET_LINE_DASH)
    cmds.push(2.0)
    cmds.push(5.0)
    cmds.push(3.0)
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.5)
    for p2 in 0..<src_len {
      let cx2 = (gap + p2 * (col + gap) + col / 2).to_double()
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(cx2)
      cmds.push(gather_y)
      cmds.push(DL_LINE_TO)
      cmds.push(cx2)
      cmds.push(bridge_y)
      cmds.push(DL_STROKE)
    }
    cmds.push(DL_CLEAR_LINE_DASH)

    // Bridge rectangle
    push_rr(cmds, gap.to_double(), bridge_y, bridge_w, bridge_h, 4.0)
    cmds.push(DL_FILL_STYLE)
    cmds.push(255.0)
    cmds.push(243.0)
    cmds.push(224.0) // #fff3e0
    cmds.push(DL_FILL)
    cmds.push(DL_STROKE_STYLE)
    cmds.push(217.0)
    cmds.push(119.0)
    cmds.push(6.0)
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.5)
    cmds.push(DL_STROKE)
    cmds.push(DL_FILL_STYLE)
    cmds.push(217.0)
    cmds.push(119.0)
    cmds.push(6.0)
    cmds.push(DL_FONT_BOLD_SANS)
    cmds.push(7.0)
    cmds.push(DL_TEXT_ALIGN_CENTER)
    cmds.push(DL_TEXT_BASELINE_MID)
    push_fill_str(
      cmds,
      "K, V  \u2014  Encoder Output (shared across all decoder Cross-Attentions)",
      canvas_w.to_double() / 2.0,
      bridge_y + bridge_h / 2.0,
    )

    // Lines from bridge to decoder cross-attention
    cmds.push(DL_SET_LINE_DASH)
    cmds.push(2.0)
    cmds.push(5.0)
    cmds.push(3.0)
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.8)
    for p2 in 0..<tgt_len {
      let pipe_x = (p2 * (col + gap) + gap / 2).to_double()
      let dec_bx = (gap + p2 * (col + gap) + 11).to_double()
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(pipe_x)
      cmds.push(bridge_y + bridge_h)
      cmds.push(DL_LINE_TO)
      cmds.push(pipe_x)
      cmds.push(cross_mid_y)
      cmds.push(DL_LINE_TO)
      cmds.push(dec_bx)
      cmds.push(cross_mid_y)
      cmds.push(DL_STROKE)
      cmds.push(DL_CLEAR_LINE_DASH)
      // Arrowhead
      cmds.push(DL_FILL_STYLE)
      cmds.push(217.0)
      cmds.push(119.0)
      cmds.push(6.0)
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(dec_bx)
      cmds.push(cross_mid_y)
      cmds.push(DL_LINE_TO)
      cmds.push(dec_bx - 8.0)
      cmds.push(cross_mid_y - 4.0)
      cmds.push(DL_LINE_TO)
      cmds.push(dec_bx - 8.0)
      cmds.push(cross_mid_y + 4.0)
      cmds.push(DL_CLOSE_PATH)
      cmds.push(DL_FILL)
      cmds.push(DL_SET_LINE_DASH)
      cmds.push(2.0)
      cmds.push(5.0)
      cmds.push(3.0)
    }
    cmds.push(DL_CLEAR_LINE_DASH)
    cmds.push(DL_RESTORE)
  }

  // -------------------------------------------------------------------------
  // drawKVCacheArrows
  // -------------------------------------------------------------------------
  fn draw_kv_cache_arrows() -> Unit {
    if masked_attn_mid_y <= 0.0 || tgt_len <= 1 {
      return
    }
    let kv_y = masked_attn_mid_y

    cmds.push(DL_SAVE)
    cmds.push(DL_STROKE_STYLE)
    cmds.push(99.0)
    cmds.push(102.0)
    cmds.push(241.0) // #6366f1
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.8)
    cmds.push(DL_LINE_JOIN_ROUND)
    cmds.push(DL_SET_LINE_DASH)
    cmds.push(2.0)
    cmds.push(4.0)
    cmds.push(3.0)

    for p2 in 1..<tgt_len {
      let d_bxr = (gap + (p2 - 1) * (col + gap) + col).to_double()
      let d_bx = (gap + p2 * (col + gap) + 11).to_double()
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(d_bxr)
      cmds.push(kv_y)
      cmds.push(DL_LINE_TO)
      cmds.push(d_bx)
      cmds.push(kv_y)
      cmds.push(DL_STROKE)
      cmds.push(DL_CLEAR_LINE_DASH)
      cmds.push(DL_FILL_STYLE)
      cmds.push(99.0)
      cmds.push(102.0)
      cmds.push(241.0)
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(d_bx)
      cmds.push(kv_y)
      cmds.push(DL_LINE_TO)
      cmds.push(d_bx - 8.0)
      cmds.push(kv_y - 4.0)
      cmds.push(DL_LINE_TO)
      cmds.push(d_bx - 8.0)
      cmds.push(kv_y + 4.0)
      cmds.push(DL_CLOSE_PATH)
      cmds.push(DL_FILL)
      cmds.push(DL_SET_LINE_DASH)
      cmds.push(2.0)
      cmds.push(4.0)
      cmds.push(3.0)
    }
    cmds.push(DL_CLEAR_LINE_DASH)

    // "KV cache" label badge
    let seg_mid_x = ((gap + col + gap / 2).to_double() + (gap + col + gap + 11).to_double()) / 2.0
    cmds.push(DL_FILL_STYLE)
    cmds.push(239.0)
    cmds.push(240.0)
    cmds.push(255.0) // #eff0ff
    push_fill_rect(cmds, seg_mid_x - 16.0, kv_y - 7.0, 32.0, 14.0)
    cmds.push(DL_FILL_STYLE)
    cmds.push(99.0)
    cmds.push(102.0)
    cmds.push(241.0)
    cmds.push(DL_FONT_BOLD_SANS)
    cmds.push(8.0)
    cmds.push(DL_TEXT_ALIGN_CENTER)
    cmds.push(DL_TEXT_BASELINE_MID)
    push_fill_str(cmds, "KV cache", seg_mid_x, kv_y)
    cmds.push(DL_RESTORE)
  }

  // -------------------------------------------------------------------------
  // drawAutoregressiveArrows
  // -------------------------------------------------------------------------
  fn draw_autoregressive_arrows() -> Unit {
    if output_probs_y <= 0.0 || tgt_len <= 1 {
      return
    }
    let hr_v = 15.0
    let hdr_mid_y = dec_y0.to_double() + 27.0

    cmds.push(DL_SAVE)
    cmds.push(DL_STROKE_STYLE)
    cmds.push(22.0)
    cmds.push(163.0)
    cmds.push(74.0) // #16a34a
    cmds.push(DL_LINE_WIDTH)
    cmds.push(1.5)
    cmds.push(DL_LINE_JOIN_ROUND)
    cmds.push(DL_CLEAR_LINE_DASH)

    for p2 in 0..<(tgt_len - 1) {
      let bxr_p = (gap + p2 * (col + gap) + col - 20).to_double()
      let vx_p = (gap + p2 * (col + gap) + col).to_double()
      let hdr_left_p1 = (gap + (p2 + 1) * (col + gap) + 2).to_double()
      let probs_mid_y = output_probs_y + (3.0 * hr_v / 2.0).to_int().to_double()
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(bxr_p)
      cmds.push(probs_mid_y)
      cmds.push(DL_LINE_TO)
      cmds.push(vx_p)
      cmds.push(probs_mid_y)
      cmds.push(DL_LINE_TO)
      cmds.push(vx_p)
      cmds.push(hdr_mid_y)
      cmds.push(DL_LINE_TO)
      cmds.push(hdr_left_p1)
      cmds.push(hdr_mid_y)
      cmds.push(DL_STROKE)
      cmds.push(DL_FILL_STYLE)
      cmds.push(22.0)
      cmds.push(163.0)
      cmds.push(74.0)
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(hdr_left_p1)
      cmds.push(hdr_mid_y)
      cmds.push(DL_LINE_TO)
      cmds.push(hdr_left_p1 - 8.0)
      cmds.push(hdr_mid_y - 4.0)
      cmds.push(DL_LINE_TO)
      cmds.push(hdr_left_p1 - 8.0)
      cmds.push(hdr_mid_y + 4.0)
      cmds.push(DL_CLOSE_PATH)
      cmds.push(DL_FILL)
    }

    // "argmax → next input" badge near first column
    let lx_b = (gap + col + 3).to_double()
    cmds.push(DL_FILL_STYLE)
    cmds.push(220.0)
    cmds.push(252.0)
    cmds.push(231.0) // #dcfce7
    push_fill_rect(cmds, lx_b, output_probs_y - 16.0, 44.0, 14.0)
    cmds.push(DL_FILL_STYLE)
    cmds.push(22.0)
    cmds.push(163.0)
    cmds.push(74.0)
    cmds.push(DL_FONT_BOLD_SANS)
    cmds.push(8.0)
    cmds.push(DL_TEXT_ALIGN_LEFT)
    cmds.push(DL_TEXT_BASELINE_MID)
    push_fill_str(cmds, "argmax \u2192", lx_b + 2.0, output_probs_y - 9.0)
    push_fill_str(cmds, "next input", lx_b + 2.0, output_probs_y - 2.0)
    cmds.push(DL_RESTORE)
  }

  // -------------------------------------------------------------------------
  // Main drawing sequence
  // -------------------------------------------------------------------------
  if not(is_gpt) {
    for p in 0..<src_len {
      draw_enc_col(p)
    }
  }
  for p in 0..<tgt_len {
    draw_dec_col(p)
  }
  draw_kv_bridge()
  draw_kv_cache_arrows()
  draw_autoregressive_arrows()

  cmds
}

// ---------------------------------------------------------------------------
// draw_emb_pca: 2D PCA projection of word embeddings
// ---------------------------------------------------------------------------

pub fn draw_emb_pca(dpr : Double) -> Array[Double] {
  let cmds : Array[Double] = []
  let wte = g_wte.val
  let vocab = g_vocab.val
  let vs = vocab.length()
  if vs == 0 {
    return cmds
  }
  let ne = 32

  // Canvas layout
  let css_w = 340.0
  let css_h = 300.0
  let pad = 30.0

  // Resize canvas
  cmds.push(DL_RESIZE_CANVAS)
  cmds.push(css_w)
  cmds.push(css_h)
  cmds.push(dpr)

  // Background
  cmds.push(DL_FILL_STYLE)
  cmds.push(13.0)
  cmds.push(17.0)
  cmds.push(23.0)
  push_fill_rect(cmds, 0.0, 0.0, css_w, css_h)

  // Step 1: Center embeddings per dimension
  let means : Array[Double] = Array::make(ne, 0.0)
  for i in 0..<vs {
    for d in 0..<ne {
      let v = means[d]
      means[d] = v + wte[i][d].data
    }
  }
  for d in 0..<ne {
    let v = means[d]
    means[d] = v / vs.to_double()
  }

  // Centered embedding matrix: centered[i][d]
  let centered : Array[Array[Double]] = []
  for i in 0..<vs {
    let row : Array[Double] = Array::make(ne, 0.0)
    for d in 0..<ne {
      row[d] = wte[i][d].data - means[d]
    }
    centered.push(row)
  }

  // Step 2: Covariance matrix C = X^T X / vs (ne x ne)
  let cov : Array[Double] = Array::make(ne * ne, 0.0)
  for i in 0..<vs {
    for r in 0..<ne {
      for c in 0..<ne {
        let v = cov[r * ne + c]
        cov[r * ne + c] = v + centered[i][r] * centered[i][c]
      }
    }
  }
  let vsf = vs.to_double()
  for idx in 0..<(ne * ne) {
    let v = cov[idx]
    cov[idx] = v / vsf
  }

  // Power iteration helper
  fn power_iter(mat : Array[Double], iters : Int) -> Array[Double] {
    let vv : Array[Double] = Array::make(ne, 0.0)
    vv[0] = 1.0
    for _ in 0..<iters {
      // w = mat * vv
      let w : Array[Double] = Array::make(ne, 0.0)
      for r in 0..<ne {
        let mut s = 0.0
        for c in 0..<ne {
          s = s + mat[r * ne + c] * vv[c]
        }
        w[r] = s
      }
      // norm
      let mut norm_sq = 0.0
      for r in 0..<ne {
        norm_sq = norm_sq + w[r] * w[r]
      }
      let norm = @math.pow(norm_sq, 0.5)
      if norm < 1.0e-12 {
        return vv
      }
      for r in 0..<ne {
        vv[r] = w[r] / norm
      }
    }
    vv
  }

  // PC1
  let pc1 = power_iter(cov, 30)

  // Eigenvalue λ1 = pc1^T C pc1
  let mut lam1 = 0.0
  for r in 0..<ne {
    let mut s = 0.0
    for c in 0..<ne {
      s = s + cov[r * ne + c] * pc1[c]
    }
    lam1 = lam1 + pc1[r] * s
  }

  // Deflate: C2 = C - λ1 * pc1 * pc1^T
  let cov2 : Array[Double] = Array::make(ne * ne, 0.0)
  for r in 0..<ne {
    for c in 0..<ne {
      cov2[r * ne + c] = cov[r * ne + c] - lam1 * pc1[r] * pc1[c]
    }
  }

  // PC2
  let pc2 = power_iter(cov2, 30)

  // Project tokens
  let proj_x : Array[Double] = Array::make(vs, 0.0)
  let proj_y : Array[Double] = Array::make(vs, 0.0)
  for i in 0..<vs {
    let mut px = 0.0
    let mut py = 0.0
    for d in 0..<ne {
      px = px + centered[i][d] * pc1[d]
      py = py + centered[i][d] * pc2[d]
    }
    proj_x[i] = px
    proj_y[i] = py
  }

  // Find min/max
  let mut min_x = proj_x[0]
  let mut max_x = proj_x[0]
  let mut min_y = proj_y[0]
  let mut max_y = proj_y[0]
  for i in 0..<vs {
    if proj_x[i] < min_x { min_x = proj_x[i] }
    if proj_x[i] > max_x { max_x = proj_x[i] }
    if proj_y[i] < min_y { min_y = proj_y[i] }
    if proj_y[i] > max_y { max_y = proj_y[i] }
  }
  let rng_x = if max_x - min_x > 1.0e-8 { max_x - min_x } else { 1.0 }
  let rng_y = if max_y - min_y > 1.0e-8 { max_y - min_y } else { 1.0 }
  let draw_w = css_w - pad * 2.0
  let draw_h = css_h - pad * 2.0

  // Color palette (cycling by index mod 4)
  let palette_r : Array[Int] = [88, 63, 248, 210]
  let palette_g : Array[Int] = [166, 185, 81, 153]
  let palette_b : Array[Int] = [255, 80, 73, 34]

  // Draw each word
  for i in 0..<vs {
    let cx = pad + (proj_x[i] - min_x) / rng_x * draw_w
    let cy = pad + (proj_y[i] - min_y) / rng_y * draw_h
    let ci = i % 4
    cmds.push(DL_FILL_STYLE)
    cmds.push(palette_r[ci].to_double())
    cmds.push(palette_g[ci].to_double())
    cmds.push(palette_b[ci].to_double())
    cmds.push(DL_BEGIN_PATH)
    cmds.push(DL_ARC)
    cmds.push(cx)
    cmds.push(cy)
    cmds.push(3.0)
    cmds.push(0.0)
    cmds.push(6.283185307)
    cmds.push(DL_FILL)

    // Label: truncate to 6 chars
    let word = vocab[i]
    let wlen = word.length()
    let label = if wlen <= 6 { word } else { word[:6].to_string() }
    cmds.push(DL_FILL_STYLE)
    cmds.push(139.0)
    cmds.push(148.0)
    cmds.push(158.0)
    cmds.push(DL_FONT_MONO_PX)
    cmds.push(8.0)
    cmds.push(DL_TEXT_ALIGN_LEFT)
    push_fill_str(cmds, label, cx + 5.0, cy)
  }

  // Title
  cmds.push(DL_FILL_STYLE)
  cmds.push(139.0)
  cmds.push(148.0)
  cmds.push(158.0)
  cmds.push(DL_FONT_SANS_PX)
  cmds.push(9.0)
  cmds.push(DL_TEXT_ALIGN_CENTER)
  push_fill_str(cmds, "Embedding PCA", css_w / 2.0, 10.0)

  // Step counter
  let step_val = g_step.val
  cmds.push(DL_TEXT_ALIGN_RIGHT)
  push_fill_str(cmds, "step: ", css_w - 40.0, css_h - 10.0)
  cmds.push(DL_FILL_TEXT_FLOAT)
  cmds.push(step_val.to_double())
  cmds.push(0.0)
  cmds.push(css_w - 5.0)
  cmds.push(css_h - 10.0)

  cmds
}

// ---------------------------------------------------------------------------
// compute_pca: PCA計算のみ（重い処理）→ g_pca_tgt_xs/ys に正規化座標を保存
// ---------------------------------------------------------------------------

pub fn compute_pca() -> Unit {
  let wte = g_wte.val
  let vocab = g_vocab.val
  let vs = vocab.length()
  if vs == 0 {
    return
  }
  let ne = 32

  // 平均センタリング
  let means : Array[Double] = Array::make(ne, 0.0)
  for i in 0..<vs {
    for d in 0..<ne {
      let v = means[d]
      means[d] = v + wte[i][d].data
    }
  }
  for d in 0..<ne {
    let v = means[d]
    means[d] = v / vs.to_double()
  }

  let centered : Array[Array[Double]] = []
  for i in 0..<vs {
    let row : Array[Double] = Array::make(ne, 0.0)
    for d in 0..<ne {
      row[d] = wte[i][d].data - means[d]
    }
    centered.push(row)
  }

  // 共分散行列 C = X^T X / vs
  let cov : Array[Double] = Array::make(ne * ne, 0.0)
  for i in 0..<vs {
    for r in 0..<ne {
      for c in 0..<ne {
        let v = cov[r * ne + c]
        cov[r * ne + c] = v + centered[i][r] * centered[i][c]
      }
    }
  }
  let vsf = vs.to_double()
  for idx in 0..<(ne * ne) {
    let v = cov[idx]
    cov[idx] = v / vsf
  }

  // べき乗反復法（20回）
  fn piter(mat : Array[Double]) -> Array[Double] {
    let vv : Array[Double] = Array::make(ne, 0.0)
    vv[0] = 1.0
    for _ in 0..<20 {
      let w : Array[Double] = Array::make(ne, 0.0)
      for r in 0..<ne {
        let mut s = 0.0
        for c in 0..<ne {
          s = s + mat[r * ne + c] * vv[c]
        }
        w[r] = s
      }
      let mut nsq = 0.0
      for r in 0..<ne {
        nsq = nsq + w[r] * w[r]
      }
      let n = @math.pow(nsq, 0.5)
      if n < 1.0e-12 {
        return vv
      }
      for r in 0..<ne {
        vv[r] = w[r] / n
      }
    }
    vv
  }

  let pc1 = piter(cov)
  // Sign alignment with previous frame to prevent flipping
  let prev1 = g_pca_pc1.val
  if prev1.length() == ne {
    let mut dot = 0.0
    for d in 0..<ne { dot = dot + pc1[d] * prev1[d] }
    if dot < 0.0 { for d in 0..<ne { pc1[d] = -pc1[d] } }
  }

  // 固有値 λ1 → 収縮
  let mut lam1 = 0.0
  for r in 0..<ne {
    let mut s = 0.0
    for c in 0..<ne {
      s = s + cov[r * ne + c] * pc1[c]
    }
    lam1 = lam1 + pc1[r] * s
  }
  let cov2 : Array[Double] = Array::make(ne * ne, 0.0)
  for r in 0..<ne {
    for c in 0..<ne {
      cov2[r * ne + c] = cov[r * ne + c] - lam1 * pc1[r] * pc1[c]
    }
  }
  let pc2 = piter(cov2)
  let prev2 = g_pca_pc2.val
  if prev2.length() == ne {
    let mut dot = 0.0
    for d in 0..<ne { dot = dot + pc2[d] * prev2[d] }
    if dot < 0.0 { for d in 0..<ne { pc2[d] = -pc2[d] } }
  }

  // 固有値 λ2 → 収縮
  let mut lam2 = 0.0
  for r in 0..<ne {
    let mut s = 0.0
    for c in 0..<ne {
      s = s + cov2[r * ne + c] * pc2[c]
    }
    lam2 = lam2 + pc2[r] * s
  }
  let cov3 : Array[Double] = Array::make(ne * ne, 0.0)
  for r in 0..<ne {
    for c in 0..<ne {
      cov3[r * ne + c] = cov2[r * ne + c] - lam2 * pc2[r] * pc2[c]
    }
  }
  let pc3 = piter(cov3)
  let prev3 = g_pca_pc3.val
  if prev3.length() == ne {
    let mut dot = 0.0
    for d in 0..<ne { dot = dot + pc3[d] * prev3[d] }
    if dot < 0.0 { for d in 0..<ne { pc3[d] = -pc3[d] } }
  }

  // 3D投影
  let mut min_x = 1.0e30
  let mut max_x = -1.0e30
  let mut min_y = 1.0e30
  let mut max_y = -1.0e30
  let mut min_z = 1.0e30
  let mut max_z = -1.0e30
  let raw_x : Array[Double] = Array::make(vs, 0.0)
  let raw_y : Array[Double] = Array::make(vs, 0.0)
  let raw_z : Array[Double] = Array::make(vs, 0.0)
  for i in 0..<vs {
    let mut px = 0.0
    let mut py = 0.0
    let mut pz = 0.0
    for d in 0..<ne {
      px = px + centered[i][d] * pc1[d]
      py = py + centered[i][d] * pc2[d]
      pz = pz + centered[i][d] * pc3[d]
    }
    raw_x[i] = px
    raw_y[i] = py
    raw_z[i] = pz
    if px < min_x { min_x = px }
    if px > max_x { max_x = px }
    if py < min_y { min_y = py }
    if py > max_y { max_y = py }
    if pz < min_z { min_z = pz }
    if pz > max_z { max_z = pz }
  }
  let rng_x = if max_x - min_x > 1.0e-8 { max_x - min_x } else { 1.0 }
  let rng_y = if max_y - min_y > 1.0e-8 { max_y - min_y } else { 1.0 }
  let rng_z = if max_z - min_z > 1.0e-8 { max_z - min_z } else { 1.0 }
  let rng = if rng_x > rng_y {
    if rng_x > rng_z { rng_x } else { rng_z }
  } else {
    if rng_y > rng_z { rng_y } else { rng_z }
  }

  let mean_px = (min_x + max_x) / 2.0
  let mean_py = (min_y + max_y) / 2.0
  let mean_pz = (min_z + max_z) / 2.0

  let tgt_x : Array[Double] = Array::make(vs, 0.0)
  let tgt_y : Array[Double] = Array::make(vs, 0.0)
  let tgt_z : Array[Double] = Array::make(vs, 0.0)
  for i in 0..<vs {
    tgt_x[i] = (raw_x[i] - mean_px) / rng
    tgt_y[i] = (raw_y[i] - mean_py) / rng
    tgt_z[i] = (raw_z[i] - mean_pz) / rng
  }

  g_pca_tgt_xs.val = tgt_x
  g_pca_tgt_ys.val = tgt_y
  g_pca_tgt_zs.val = tgt_z

  // Save eigenvectors and normalization params for trajectory projection
  g_pca_pc1.val = pc1
  g_pca_pc2.val = pc2
  g_pca_pc3.val = pc3
  g_pca_emb_means.val = means
  g_pca_norm_mean_px.val = mean_px
  g_pca_norm_mean_py.val = mean_py
  g_pca_norm_mean_pz.val = mean_pz
  g_pca_norm_rng.val = rng

  // Project hidden states (encoder output) onto PCA space
  let hidden = g_viz_hidden.val
  let seq_len = g_viz_seq_len.val
  if seq_len > 0 && hidden.length() == seq_len * ne {
    let traj_x : Array[Double] = Array::make(seq_len, 0.0)
    let traj_y : Array[Double] = Array::make(seq_len, 0.0)
    let traj_z : Array[Double] = Array::make(seq_len, 0.0)
    for pos in 0..<seq_len {
      let mut px = 0.0
      let mut py = 0.0
      let mut pz = 0.0
      for d in 0..<ne {
        let h = hidden[pos * ne + d] - means[d]
        px = px + h * pc1[d]
        py = py + h * pc2[d]
        pz = pz + h * pc3[d]
      }
      traj_x[pos] = (px - mean_px) / rng
      traj_y[pos] = (py - mean_py) / rng
      traj_z[pos] = (pz - mean_pz) / rng
    }
    g_pca_traj_xs.val = traj_x
    g_pca_traj_ys.val = traj_y
    g_pca_traj_zs.val = traj_z
  } else {
    g_pca_traj_xs.val = []
    g_pca_traj_ys.val = []
    g_pca_traj_zs.val = []
  }

  // 初回: cur を tgt に直接セット（lerpしない）
  if g_pca_cur_xs.val.length() != vs {
    g_pca_cur_xs.val = Array::make(vs, 0.0)
    g_pca_cur_ys.val = Array::make(vs, 0.0)
    g_pca_cur_zs.val = Array::make(vs, 0.0)
    for i in 0..<vs {
      g_pca_cur_xs.val[i] = tgt_x[i]
      g_pca_cur_ys.val[i] = tgt_y[i]
      g_pca_cur_zs.val[i] = tgt_z[i]
    }
    g_pca_selected.val = -1
    g_pca_scr_xs.val = []
    g_pca_scr_ys.val = []
  }
}

// ---------------------------------------------------------------------------
// tick_pca: 毎フレーム呼ぶ（軽い）— cur→tgt にlerp → display list生成
// ---------------------------------------------------------------------------

pub fn tick_pca(w : Double, h : Double, dpr : Double) -> Array[Double] {
  let cmds : Array[Double] = []
  let vocab = g_vocab.val
  let vs = vocab.length()
  let tgt_xs = g_pca_tgt_xs.val
  let tgt_ys = g_pca_tgt_ys.val
  let tgt_zs = g_pca_tgt_zs.val
  let cur_xs = g_pca_cur_xs.val
  let cur_ys = g_pca_cur_ys.val
  let cur_zs = g_pca_cur_zs.val
  if vs == 0 || tgt_xs.length() != vs || cur_xs.length() != vs {
    g_pca_scr_xs.val = []
    g_pca_scr_ys.val = []
    return cmds
  }

  let css_w = if w > 0.0 { w } else { 340.0 }
  let css_h = if h > 0.0 { h } else { 300.0 }
  let alpha = 0.08

  // lerp cur → tgt
  let has_tgt_z = tgt_zs.length() == vs
  let has_cur_z = cur_zs.length() == vs
  for i in 0..<vs {
    cur_xs[i] = cur_xs[i] + alpha * (tgt_xs[i] - cur_xs[i])
    cur_ys[i] = cur_ys[i] + alpha * (tgt_ys[i] - cur_ys[i])
    if has_tgt_z && has_cur_z {
      cur_zs[i] = cur_zs[i] + alpha * (tgt_zs[i] - cur_zs[i])
    }
  }

  // 2D projection (PC1=X, PC2=Y)
  let scale = 120.0 * g_pca_zoom.val
  let cx_screen = css_w / 2.0 + g_pca_pan_x.val
  let cy_screen = css_h / 2.0 + g_pca_pan_y.val

  let scr_xs_arr : Array[Double] = Array::make(vs, 0.0)
  let scr_ys_arr : Array[Double] = Array::make(vs, 0.0)
  let dot_rs : Array[Double] = Array::make(vs, 4.0)

  for i in 0..<vs {
    scr_xs_arr[i] = cx_screen + cur_xs[i] * scale
    scr_ys_arr[i] = cy_screen - cur_ys[i] * scale
  }

  // Store screen positions for click detection
  g_pca_scr_xs.val = scr_xs_arr
  g_pca_scr_ys.val = scr_ys_arr

  // Draw order: index order (no depth sort needed in 2D)
  let order : Array[Int] = []
  for i in 0..<vs {
    order.push(i)
  }

  // キャンバスリサイズ
  cmds.push(DL_RESIZE_CANVAS)
  cmds.push(css_w)
  cmds.push(css_h)
  cmds.push(dpr)

  // 背景
  cmds.push(DL_FILL_STYLE)
  cmds.push(13.0)
  cmds.push(17.0)
  cmds.push(23.0)
  push_fill_rect(cmds, 0.0, 0.0, css_w, css_h)

  let pal_r : Array[Int] = [88, 63, 248, 210]
  let pal_g : Array[Int] = [166, 185, 81, 153]
  let pal_b : Array[Int] = [255, 80, 73, 34]

  let sel = g_pca_selected.val

  // Draw connections for selected word
  if sel >= 0 && sel < vs {
    let sel_sx = scr_xs_arr[sel]
    let sel_sy = scr_ys_arr[sel]
    let sel_cx = cur_xs[sel]
    let sel_cy = cur_ys[sel]
    let sel_cz = if has_cur_z { cur_zs[sel] } else { 0.0 }

    // Find top-5 nearest neighbors by 3D distance
    let nn_dists : Array[Double] = []
    let nn_idxs : Array[Int] = []
    for i in 0..<vs {
      if i == sel {
        continue
      }
      let dx = cur_xs[i] - sel_cx
      let dy = cur_ys[i] - sel_cy
      let dz = if has_cur_z { cur_zs[i] - sel_cz } else { 0.0 }
      let d2 = dx * dx + dy * dy + dz * dz
      nn_dists.push(d2)
      nn_idxs.push(i)
    }
    // Simple selection: find 5 closest
    let num_nn = if nn_idxs.length() < 5 { nn_idxs.length() } else { 5 }
    for _ in 0..<num_nn {
      let mut best_j = 0
      let mut best_d = nn_dists[0]
      for j in 1..<nn_dists.length() {
        if nn_dists[j] < best_d {
          best_d = nn_dists[j]
          best_j = j
        }
      }
      let nb_i = nn_idxs[best_j]
      // Draw line
      cmds.push(DL_STROKE_RGBA)
      cmds.push(200.0)
      cmds.push(200.0)
      cmds.push(255.0)
      cmds.push(100.0)
      cmds.push(DL_LINE_WIDTH)
      cmds.push(1.0)
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO)
      cmds.push(sel_sx)
      cmds.push(sel_sy)
      cmds.push(DL_LINE_TO)
      cmds.push(scr_xs_arr[nb_i])
      cmds.push(scr_ys_arr[nb_i])
      cmds.push(DL_STROKE)
      // Mark as used (set dist to large value)
      nn_dists[best_j] = 1.0e30
    }
  }

  // Draw dots + labels in sorted order
  cmds.push(DL_FONT_MONO_PX)
  cmds.push(8.0)
  cmds.push(DL_TEXT_ALIGN_LEFT)
  for oi in 0..<vs {
    let i = order[oi]
    let sx = scr_xs_arr[i]
    let sy = scr_ys_arr[i]
    let dr = dot_rs[i]
    let is_sel = i == sel
    let radius = if is_sel {
      let r2 = dr * 2.0
      if r2 > 6.0 { r2 } else { 6.0 }
    } else {
      if dr > 2.0 { dr } else { 2.0 }
    }

    if is_sel {
      cmds.push(DL_FILL_STYLE)
      cmds.push(255.0)
      cmds.push(255.0)
      cmds.push(255.0)
    } else {
      let ci = i % 4
      cmds.push(DL_FILL_STYLE)
      cmds.push(pal_r[ci].to_double())
      cmds.push(pal_g[ci].to_double())
      cmds.push(pal_b[ci].to_double())
    }
    cmds.push(DL_BEGIN_PATH)
    cmds.push(DL_ARC)
    cmds.push(sx)
    cmds.push(sy)
    cmds.push(radius)
    cmds.push(0.0)
    cmds.push(6.283185307)
    cmds.push(DL_FILL)

    let word = vocab[i]
    let label = if word.length() <= 6 { word } else { word[:6].to_string() }
    if is_sel {
      cmds.push(DL_FILL_STYLE)
      cmds.push(255.0)
      cmds.push(255.0)
      cmds.push(255.0)
    } else {
      cmds.push(DL_FILL_STYLE)
      cmds.push(139.0)
      cmds.push(148.0)
      cmds.push(158.0)
    }
    push_fill_str(cmds, label, sx + radius + 2.0, sy)
  }

  // タイトル
  cmds.push(DL_FILL_STYLE)
  cmds.push(139.0)
  cmds.push(148.0)
  cmds.push(158.0)
  cmds.push(DL_FONT_SANS_PX)
  cmds.push(9.0)
  cmds.push(DL_TEXT_ALIGN_CENTER)
  cmds.push(DL_TEXT_BASELINE_TOP)
  push_fill_str(cmds, "Embedding PCA", css_w / 2.0, 4.0)

  // ステップ番号
  cmds.push(DL_FILL_STYLE)
  cmds.push(80.0)
  cmds.push(90.0)
  cmds.push(100.0)
  cmds.push(DL_FONT_MONO_PX)
  cmds.push(8.0)
  cmds.push(DL_TEXT_ALIGN_RIGHT)
  cmds.push(DL_TEXT_BASELINE_BOT)
  cmds.push(DL_FILL_TEXT_FLOAT)
  cmds.push(g_step.val.to_double())
  cmds.push(0.0)
  cmds.push(css_w - 4.0)
  cmds.push(css_h - 2.0)

  // Axis indicator (bottom-left) — 2D: PC1→ right, PC2↑ up
  let ax_ox = 20.0
  let ax_oy = css_h - 20.0
  let ax_len = 20.0
  cmds.push(DL_LINE_WIDTH)
  cmds.push(1.5)
  // PC1 (red) →
  cmds.push(DL_STROKE_RGBA)
  cmds.push(220.0); cmds.push(80.0); cmds.push(80.0); cmds.push(200.0)
  cmds.push(DL_BEGIN_PATH)
  cmds.push(DL_MOVE_TO); cmds.push(ax_ox); cmds.push(ax_oy)
  cmds.push(DL_LINE_TO); cmds.push(ax_ox + ax_len); cmds.push(ax_oy)
  cmds.push(DL_STROKE)
  cmds.push(DL_FILL_STYLE_RGBA)
  cmds.push(220.0); cmds.push(80.0); cmds.push(80.0); cmds.push(200.0)
  cmds.push(DL_FONT_SANS_PX); cmds.push(8.0)
  cmds.push(DL_TEXT_ALIGN_LEFT); cmds.push(DL_TEXT_BASELINE_BOT)
  push_fill_str(cmds, "PC1", ax_ox + ax_len + 2.0, ax_oy + 4.0)
  // PC2 (green) ↑
  cmds.push(DL_STROKE_RGBA)
  cmds.push(80.0); cmds.push(200.0); cmds.push(80.0); cmds.push(200.0)
  cmds.push(DL_BEGIN_PATH)
  cmds.push(DL_MOVE_TO); cmds.push(ax_ox); cmds.push(ax_oy)
  cmds.push(DL_LINE_TO); cmds.push(ax_ox); cmds.push(ax_oy - ax_len)
  cmds.push(DL_STROKE)
  cmds.push(DL_FILL_STYLE_RGBA)
  cmds.push(80.0); cmds.push(200.0); cmds.push(80.0); cmds.push(200.0)
  cmds.push(DL_TEXT_ALIGN_LEFT); cmds.push(DL_TEXT_BASELINE_BOT)
  push_fill_str(cmds, "PC2", ax_ox + 3.0, ax_oy - ax_len - 2.0)

  cmds
}

// ---------------------------------------------------------------------------
// draw_residual_pca: 残差ストリームの中間状態を2D PCA空間に描画
// ---------------------------------------------------------------------------

// draw_residual_pca: pos embedding 付加パスの可視化
// - 背景: 全vocab embedding (薄いグレー)
// - 前景: wte[tok] → wte[tok]+wpe[pos] の矢印 (トークンごとに色分け)
pub fn draw_residual_pca(w : Double, h : Double, dpr : Double) -> Array[Double] {
  let cmds : Array[Double] = []

  let pc1 = g_pca_pc1.val
  let pc2 = g_pca_pc2.val
  let means = g_pca_emb_means.val
  let ne = n_embd

  // PCA未計算なら何も描かない
  if pc1.length() != ne || pc2.length() != ne || means.length() != ne {
    return cmds
  }

  let src_toks = g_viz_src_toks.val
  let seq = src_toks.length()
  let vocab = g_vocab.val
  let vs = vocab.length()
  let wte = g_wte.val
  let wpe = if g_gpt_mode.val { g_wpe_dec.val } else { g_wpe_enc.val }

  let mean_px = g_pca_norm_mean_px.val
  let mean_py = g_pca_norm_mean_py.val
  let rng = if g_pca_norm_rng.val > 1.0e-10 { g_pca_norm_rng.val } else { 1.0 }

  let css_w = if w > 0.0 { w } else { 340.0 }
  let css_h = if h > 0.0 { h } else { 300.0 }
  let scale = 120.0 * g_pca_zoom.val
  let cx_screen = css_w / 2.0 + g_pca_pan_x.val
  let cy_screen = css_h / 2.0 + g_pca_pan_y.val

  // wte+wpe のターゲット座標を計算（lerp用）
  if seq > 0 && wpe.length() >= seq {
    let tgt_x : Array[Double] = Array::make(seq, 0.0)
    let tgt_y : Array[Double] = Array::make(seq, 0.0)
    for pos in 0..<seq {
      let tok = src_toks[pos]
      if tok < wte.length() && pos < wpe.length() {
        let mut rx = 0.0
        let mut ry = 0.0
        for d in 0..<ne {
          let hd = wte[tok][d].data + wpe[pos][d].data - means[d]
          rx = rx + hd * pc1[d]
          ry = ry + hd * pc2[d]
        }
        tgt_x[pos] = (rx - mean_px) / rng
        tgt_y[pos] = (ry - mean_py) / rng
      }
    }
    // Lerp cur → tgt (reset on size change)
    if g_res_cur_xs.val.length() != seq {
      g_res_cur_xs.val = tgt_x
      g_res_cur_ys.val = tgt_y
    } else {
      let alpha = 0.08
      for i in 0..<seq {
        g_res_cur_xs.val[i] = g_res_cur_xs.val[i] + alpha * (tgt_x[i] - g_res_cur_xs.val[i])
        g_res_cur_ys.val[i] = g_res_cur_ys.val[i] + alpha * (tgt_y[i] - g_res_cur_ys.val[i])
      }
    }
  }

  // Resize + background
  cmds.push(DL_RESIZE_CANVAS); cmds.push(css_w); cmds.push(css_h); cmds.push(dpr)
  cmds.push(DL_FILL_STYLE); cmds.push(13.0); cmds.push(17.0); cmds.push(23.0)
  push_fill_rect(cmds, 0.0, 0.0, css_w, css_h)

  // 背景: 全vocab を薄いグレーの点で描画 (lerp済みのg_pca_cur_xsを使う)
  let cur_xs = g_pca_cur_xs.val
  let cur_ys = g_pca_cur_ys.val
  if cur_xs.length() == vs && vs > 0 {
    cmds.push(DL_FONT_MONO_PX); cmds.push(8.0)
    cmds.push(DL_TEXT_ALIGN_LEFT)
    for i in 0..<vs {
      let sx = cx_screen + cur_xs[i] * scale
      let sy = cy_screen - cur_ys[i] * scale
      cmds.push(DL_FILL_STYLE_RGBA)
      cmds.push(100.0); cmds.push(100.0); cmds.push(100.0); cmds.push(80.0)
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_ARC); cmds.push(sx); cmds.push(sy); cmds.push(2.5)
      cmds.push(0.0); cmds.push(6.283185307)
      cmds.push(DL_FILL)
      // 薄いラベル
      let word = vocab[i]
      let label = if word.length() <= 5 { word } else { word[:5].to_string() }
      cmds.push(DL_FILL_STYLE_RGBA)
      cmds.push(80.0); cmds.push(80.0); cmds.push(80.0); cmds.push(120.0)
      push_fill_str(cmds, label, sx + 3.5, sy)
    }
  }

  // 前景: 各トークンの wte → wte+wpe パスを描画
  if seq > 0 && g_res_cur_xs.val.length() == seq {
    let pal_r : Array[Int] = [88, 63, 248, 210, 150, 255, 200, 100]
    let pal_g : Array[Int] = [166, 185, 81, 153, 80, 200, 50, 200]
    let pal_b : Array[Int] = [255, 80, 73, 34, 220, 80, 180, 255]
    let traj_labels = split_by_pipe(g_viz_tokens_str.val)

    for pos in 0..<seq {
      let tok = src_toks[pos]
      if tok >= wte.length() { continue }
      let ci = pos % 8
      let cr = pal_r[ci].to_double()
      let cg = pal_g[ci].to_double()
      let cb = pal_b[ci].to_double()

      // wte 位置 (g_pca_cur_xs から取得)
      let wte_sx = if cur_xs.length() > tok { cx_screen + cur_xs[tok] * scale } else { cx_screen }
      let wte_sy = if cur_ys.length() > tok { cy_screen - cur_ys[tok] * scale } else { cy_screen }
      // wte+wpe 位置 (lerp済み)
      let end_sx = cx_screen + g_res_cur_xs.val[pos] * scale
      let end_sy = cy_screen - g_res_cur_ys.val[pos] * scale

      // 矢印ライン
      cmds.push(DL_LINE_WIDTH); cmds.push(1.8)
      cmds.push(DL_STROKE_RGBA); cmds.push(cr); cmds.push(cg); cmds.push(cb); cmds.push(200.0)
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO); cmds.push(wte_sx); cmds.push(wte_sy)
      cmds.push(DL_LINE_TO); cmds.push(end_sx); cmds.push(end_sy)
      cmds.push(DL_STROKE)

      // 始点: 明るい塗り円 (wte)
      cmds.push(DL_FILL_STYLE_RGBA); cmds.push(cr); cmds.push(cg); cmds.push(cb); cmds.push(230.0)
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_ARC); cmds.push(wte_sx); cmds.push(wte_sy); cmds.push(5.0)
      cmds.push(0.0); cmds.push(6.283185307)
      cmds.push(DL_FILL)

      // 終点: ダイヤ (wte+wpe)
      let r = 5.0
      cmds.push(DL_FILL_STYLE_RGBA); cmds.push(cr); cmds.push(cg); cmds.push(cb); cmds.push(230.0)
      cmds.push(DL_BEGIN_PATH)
      cmds.push(DL_MOVE_TO); cmds.push(end_sx); cmds.push(end_sy - r)
      cmds.push(DL_LINE_TO); cmds.push(end_sx + r); cmds.push(end_sy)
      cmds.push(DL_LINE_TO); cmds.push(end_sx); cmds.push(end_sy + r)
      cmds.push(DL_LINE_TO); cmds.push(end_sx - r); cmds.push(end_sy)
      cmds.push(DL_CLOSE_PATH); cmds.push(DL_FILL)

      // ラベル (トークン名 + 位置番号)
      cmds.push(DL_FONT_MONO_PX); cmds.push(8.0)
      cmds.push(DL_TEXT_ALIGN_LEFT)
      let lbl = if pos < traj_labels.length() { traj_labels[pos] } else { "" }
      if lbl.length() > 0 {
        let short = if lbl.length() <= 6 { lbl } else { lbl[:6].to_string() }
        cmds.push(DL_FILL_STYLE_RGBA); cmds.push(cr); cmds.push(cg); cmds.push(cb); cmds.push(255.0)
        push_fill_str(cmds, short, wte_sx + 6.0, wte_sy - 2.0)
      }
      // 位置番号を終点近くに
      cmds.push(DL_FILL_STYLE_RGBA); cmds.push(cr); cmds.push(cg); cmds.push(cb); cmds.push(200.0)
      let pos_label = pos.to_string()
      push_fill_str(cmds, pos_label, end_sx + 6.0, end_sy - 2.0)
    }
  }

  // Title
  cmds.push(DL_FILL_STYLE); cmds.push(139.0); cmds.push(148.0); cmds.push(158.0)
  cmds.push(DL_FONT_SANS_PX); cmds.push(9.0)
  cmds.push(DL_TEXT_ALIGN_CENTER); cmds.push(DL_TEXT_BASELINE_TOP)
  push_fill_str(cmds, "Pos Embedding Path", css_w / 2.0, 4.0)

  // Legend
  cmds.push(DL_FONT_SANS_PX); cmds.push(8.0)
  cmds.push(DL_TEXT_ALIGN_LEFT); cmds.push(DL_TEXT_BASELINE_BOT)
  cmds.push(DL_FILL_STYLE); cmds.push(80.0); cmds.push(90.0); cmds.push(100.0)
  push_fill_str(cmds, "○wte  ◆wte+wpe", 8.0, css_h - 10.0)

  // Step count
  cmds.push(DL_FONT_MONO_PX); cmds.push(8.0)
  cmds.push(DL_TEXT_ALIGN_RIGHT); cmds.push(DL_TEXT_BASELINE_BOT)
  cmds.push(DL_FILL_TEXT_FLOAT); cmds.push(g_step.val.to_double())
  cmds.push(0.0); cmds.push(css_w - 4.0); cmds.push(css_h - 2.0)

  // Axis indicator (bottom-right)
  let ax_ox = css_w - 40.0
  let ax_oy = css_h - 20.0
  let ax_len = 16.0
  cmds.push(DL_LINE_WIDTH); cmds.push(1.5)
  cmds.push(DL_STROKE_RGBA); cmds.push(220.0); cmds.push(80.0); cmds.push(80.0); cmds.push(180.0)
  cmds.push(DL_BEGIN_PATH)
  cmds.push(DL_MOVE_TO); cmds.push(ax_ox); cmds.push(ax_oy)
  cmds.push(DL_LINE_TO); cmds.push(ax_ox + ax_len); cmds.push(ax_oy)
  cmds.push(DL_STROKE)
  cmds.push(DL_FILL_STYLE_RGBA); cmds.push(220.0); cmds.push(80.0); cmds.push(80.0); cmds.push(180.0)
  cmds.push(DL_FONT_SANS_PX); cmds.push(7.0)
  cmds.push(DL_TEXT_ALIGN_LEFT); cmds.push(DL_TEXT_BASELINE_BOT)
  push_fill_str(cmds, "PC1", ax_ox + ax_len + 1.0, ax_oy + 4.0)
  cmds.push(DL_STROKE_RGBA); cmds.push(80.0); cmds.push(200.0); cmds.push(80.0); cmds.push(180.0)
  cmds.push(DL_BEGIN_PATH)
  cmds.push(DL_MOVE_TO); cmds.push(ax_ox); cmds.push(ax_oy)
  cmds.push(DL_LINE_TO); cmds.push(ax_ox); cmds.push(ax_oy - ax_len)
  cmds.push(DL_STROKE)
  cmds.push(DL_FILL_STYLE_RGBA); cmds.push(80.0); cmds.push(200.0); cmds.push(80.0); cmds.push(180.0)
  cmds.push(DL_TEXT_ALIGN_LEFT); cmds.push(DL_TEXT_BASELINE_BOT)
  push_fill_str(cmds, "PC2", ax_ox + 2.0, ax_oy - ax_len - 2.0)

  cmds
}

// ---------------------------------------------------------------------------
// pca_pointer: マウスイベント処理（ドラッグ回転・クリック選択）
// ---------------------------------------------------------------------------

pub fn pca_pointer(type_ : Int, x : Double, y : Double) -> Unit {
  if type_ == 0 {
    // 左ボタン down → パン開始
    g_pca_drag.val = true
    g_pca_drag_sx.val = x
    g_pca_drag_sy.val = y
    g_pca_drag_lx.val = x
    g_pca_drag_ly.val = y
  } else if type_ == 1 {
    // 左ボタン move → パン
    if g_pca_drag.val {
      let dx = x - g_pca_drag_lx.val
      let dy = y - g_pca_drag_ly.val
      g_pca_pan_x.val = g_pca_pan_x.val + dx
      g_pca_pan_y.val = g_pca_pan_y.val + dy
      g_pca_drag_lx.val = x
      g_pca_drag_ly.val = y
    }
  } else if type_ == 2 {
    // 左ボタン up → クリック判定
    g_pca_drag.val = false
    let ddx = x - g_pca_drag_sx.val
    let ddy = y - g_pca_drag_sy.val
    if ddx * ddx + ddy * ddy < 25.0 {
      let scr_xs = g_pca_scr_xs.val
      let scr_ys = g_pca_scr_ys.val
      let vs = scr_xs.length()
      let mut best_i = -1
      let mut best_d = 400.0
      for i in 0..<vs {
        let ex = scr_xs[i] - x
        let ey = scr_ys[i] - y
        let d2 = ex * ex + ey * ey
        if d2 < best_d {
          best_d = d2
          best_i = i
        }
      }
      if best_i >= 0 {
        if g_pca_selected.val == best_i {
          g_pca_selected.val = -1
        } else {
          g_pca_selected.val = best_i
        }
      }
    }
  } else if type_ == 3 {
    // スクロール → ズーム (x = deltaY)
    let factor = if x > 0.0 { 0.9 } else { 1.1 }
    let nz = g_pca_zoom.val * factor
    g_pca_zoom.val = if nz < 0.2 { 0.2 } else if nz > 8.0 { 8.0 } else { nz }
  } else if type_ == 4 {
    // 右ボタン down → パン開始
    g_pca_drag_lx.val = x
    g_pca_drag_ly.val = y
  } else if type_ == 5 {
    // 右ボタン move → パン
    let dx = x - g_pca_drag_lx.val
    let dy = y - g_pca_drag_ly.val
    g_pca_pan_x.val = g_pca_pan_x.val + dx
    g_pca_pan_y.val = g_pca_pan_y.val + dy
    g_pca_drag_lx.val = x
    g_pca_drag_ly.val = y
  }
  // type_ == 6: 右ボタン up (何もしない)
}
