// =====================================================================
// Constants
// =====================================================================
const N_HEAD = 4;

// =====================================================================
// Panel management
// =====================================================================
function togglePanel(id, btn) {
  const panel = document.getElementById(id);
  const willShow = panel.classList.contains('hidden');
  panel.classList.toggle('hidden');
  btn.classList.toggle('active', willShow);
  if (willShow) bringToFront(panel);
}

function closePanel(panelId, btnId) {
  document.getElementById(panelId).classList.add('hidden');
  document.getElementById(btnId).classList.remove('active');
}

function bringToFront(panel) {
  document.querySelectorAll('.panel').forEach(p => { p.style.zIndex = 400; });
  panel.style.zIndex = 401;
}

function makeDraggable(el) {
  const header = el.querySelector('.panel-header');
  header.addEventListener('mousedown', e => {
    if (e.target.classList.contains('panel-close')) return;
    e.preventDefault();
    bringToFront(el);
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - rect.left;
    const dy = e.clientY - rect.top;
    function onMove(e) {
      el.style.left = Math.max(0, e.clientX - dx) + 'px';
      el.style.top  = Math.max(0, e.clientY - dy) + 'px';
      el.style.right = 'auto';
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
  el.addEventListener('mousedown', () => bringToFront(el));
}

document.querySelectorAll('.panel').forEach(makeDraggable);

// =====================================================================
// Loss chart
// =====================================================================
const lossChart = document.getElementById('chart');
const lossCtx = lossChart.getContext('2d');
const losses = [];

function drawLossChart() {
  const dpr = devicePixelRatio;
  lossChart.width = lossChart.offsetWidth * dpr;
  lossChart.height = lossChart.offsetHeight * dpr;
  const W = lossChart.width, H = lossChart.height;
  lossCtx.clearRect(0, 0, W, H);
  if (losses.length < 2) return;
  const pad = { t: 14, b: 20, l: 6, r: 6 };
  const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;
  let minL = Infinity, maxL = -Infinity;
  for (const l of losses) { if (l < minL) minL = l; if (l > maxL) maxL = l; }
  const rng = maxL - minL || 1;
  lossCtx.strokeStyle = '#21262d'; lossCtx.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = pad.t + (ch * i) / 3;
    lossCtx.beginPath(); lossCtx.moveTo(pad.l, y); lossCtx.lineTo(W - pad.r, y); lossCtx.stroke();
  }
  lossCtx.beginPath(); lossCtx.strokeStyle = '#58a6ff';
  lossCtx.lineWidth = 1.5 * dpr; lossCtx.lineJoin = 'round';
  for (let i = 0; i < losses.length; i++) {
    const x = pad.l + (i / (losses.length - 1)) * cw;
    const y = pad.t + (1 - (losses[i] - minL) / rng) * ch;
    i === 0 ? lossCtx.moveTo(x, y) : lossCtx.lineTo(x, y);
  }
  lossCtx.stroke();
  const last = losses[losses.length - 1];
  const lx = pad.l + cw, ly = pad.t + (1 - (last - minL) / rng) * ch;
  lossCtx.fillStyle = '#58a6ff';
  lossCtx.font = `${9 * dpr}px monospace`;
  lossCtx.fillText(last.toFixed(3), lx - 32 * dpr, ly - 4 * dpr);

  // modal canvas
  drawLossModalChart(losses, minL, maxL, rng, last);
}

const lossModal = document.getElementById('loss-modal');
const lossModalCanvas = document.getElementById('loss-modal-canvas');
const lossModalVal = document.getElementById('loss-modal-val');
const lossModalCtx = lossModalCanvas.getContext('2d');
document.getElementById('loss-modal-close').addEventListener('click', () => {
  lossModal.classList.remove('visible');
});

function drawLossModalChart(losses, minL, maxL, rng, last) {
  lossModalVal.textContent = last.toFixed(4);
  const dpr = devicePixelRatio;
  lossModalCanvas.width  = lossModalCanvas.offsetWidth  * dpr;
  lossModalCanvas.height = lossModalCanvas.offsetHeight * dpr;
  const W = lossModalCanvas.width, H = lossModalCanvas.height;
  lossModalCtx.clearRect(0, 0, W, H);
  if (losses.length < 2) return;
  const pad = { t: 10, b: 18, l: 8, r: 8 };
  const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;
  lossModalCtx.strokeStyle = '#21262d'; lossModalCtx.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = pad.t + (ch * i) / 3;
    lossModalCtx.beginPath(); lossModalCtx.moveTo(pad.l, y); lossModalCtx.lineTo(W - pad.r, y); lossModalCtx.stroke();
  }
  // step labels on x axis
  lossModalCtx.fillStyle = '#555'; lossModalCtx.font = `${8 * dpr}px monospace`;
  lossModalCtx.textAlign = 'center'; lossModalCtx.textBaseline = 'top';
  lossModalCtx.fillText('0', pad.l, H - pad.b + 3);
  lossModalCtx.fillText(String(losses.length - 1), pad.l + cw, H - pad.b + 3);
  // loss line
  lossModalCtx.beginPath(); lossModalCtx.strokeStyle = '#58a6ff';
  lossModalCtx.lineWidth = 1.5 * dpr; lossModalCtx.lineJoin = 'round';
  for (let i = 0; i < losses.length; i++) {
    const x = pad.l + (i / (losses.length - 1)) * cw;
    const y = pad.t + (1 - (losses[i] - minL) / rng) * ch;
    i === 0 ? lossModalCtx.moveTo(x, y) : lossModalCtx.lineTo(x, y);
  }
  lossModalCtx.stroke();
  // y axis labels
  lossModalCtx.fillStyle = '#555'; lossModalCtx.font = `${8 * dpr}px monospace`;
  lossModalCtx.textAlign = 'left'; lossModalCtx.textBaseline = 'middle';
  lossModalCtx.fillText(maxL.toFixed(2), 1, pad.t);
  lossModalCtx.fillText(minL.toFixed(2), 1, pad.t + ch);
}

// =====================================================================
// Training
// =====================================================================
let initialized = false;
let running = false;
let currentGPT = false;
const numSteps = 2000;
let lastPhrase = 'boil water in a pot';
const VIZ_INTERVAL = 5;

const btnStart   = document.getElementById('btn-start');
const btnPause   = document.getElementById('btn-pause');
const btnReset   = document.getElementById('btn-reset');
const btnGen     = document.getElementById('btn-gen');
const btnModeEnc = document.getElementById('btn-mode-enc');
const btnModeGpt = document.getElementById('btn-mode-gpt');
const dotEl      = document.getElementById('dot');
const statusEl   = document.getElementById('status-text');
const infoEl     = document.getElementById('info');

function setStatus(text, state) {
  statusEl.textContent = text;
  dotEl.className = 'dot ' + (state || '');
}

function setStepLoss(step, loss) {
  const stepTxt = `${step} / ${numSteps}`;
  document.getElementById('step').textContent   = stepTxt;
  document.getElementById('step-p').textContent = stepTxt;
  const lossTxt = loss >= 0 ? loss.toFixed(4) : '–';
  document.getElementById('loss').textContent   = lossTxt;
  document.getElementById('loss-p').textContent = lossTxt;
  const pct = `${(step / numSteps) * 100}%`;
  document.getElementById('progress').style.width   = pct;
  document.getElementById('progress-p').style.width = pct;
}

function setBtnsState(isRunning) {
  btnStart.disabled = isRunning;
  btnPause.disabled = !isRunning;
  btnReset.disabled = false;
}

function ensureInit() {
  if (!initialized) {
    window._mbt_init();
    initialized = true;
    infoEl.textContent =
      (currentGPT ? 'Mode: GPT (Decoder-only)' : 'Mode: Encoder-Decoder Transformer') + '\n' +
      'Params: ~4 200  |  n_layer=1  n_embd=32  n_head=4  block_size=8\n' +
      'Optimizer: Adam (lr=0.01, β1=0.85, β2=0.99)\n' +
      'Dataset: 50 English recipe sentences\n' +
      'Runtime: MoonBit → JS (edge)';
    // show initial architecture with random weights
    setTimeout(() => { try { runNetworkViz(); } catch(e) { console.error('viz error:', e); alert('viz error: ' + e.message); } }, 0);
  }
}

function doStep() {
  const loss = window._mbt_train_step();
  const step = window._mbt_get_step();
  if (loss >= 0) { losses.push(loss); drawLossChart(); }
  setStepLoss(step, loss);

  if (step > 0 && step % VIZ_INTERVAL === 0) {
    try {
      const phrase = document.getElementById('attn-name').value || lastPhrase;
      runAllViz(phrase);
      runEmbViz();
    } catch(e) { console.error('viz error:', e); }
  }

  if (step >= numSteps || loss < 0) {
    running = false; stop();
    setStatus('Training complete', 'done');
    btnGen.disabled = false;
    const phrase = document.getElementById('attn-name').value || lastPhrase;
    runAllViz(phrase);
    runEmbViz();
  }
}

function trainLoop() { if (!running) return; doStep(); requestAnimationFrame(trainLoop); }

function setLiveIndicators(on) {
  ['attn-live', 'emb-live', 'hidden-live', 'mlp-live', 'pred-live', 'netflow-live'].forEach(id => {
    document.getElementById(id).style.display = on ? '' : 'none';
  });
}

function start() {
  ensureInit();
  if (running) return;
  running = true;
  setBtnsState(true);
  setStatus('Training...', 'running');
  setLiveIndicators(true);
  lossModal.classList.add('visible');
  requestAnimationFrame(trainLoop);
}

function stop() {
  running = false;
  setBtnsState(false);
  setLiveIndicators(false);
  if (!statusEl.textContent.startsWith('Training complete')) setStatus('Paused', '');
}

function reset() {
  running = false; stop(); setLiveIndicators(false);
  losses.length = 0; initialized = false;
  setStepLoss(0, -1);
  document.getElementById('step').textContent   = `0 / ${numSteps}`;
  document.getElementById('step-p').textContent = `0 / ${numSteps}`;
  document.getElementById('loss').textContent   = '–';
  document.getElementById('loss-p').textContent = '–';
  document.getElementById('samples').innerHTML = '<span style="color:var(--muted);font-size:.78rem">Train first, then generate</span>';
  infoEl.textContent = 'Reset. Press Start to train again.';
  [btnReset, btnResetP].forEach(b => { b.disabled = true; });
  btnGen.disabled = true;
  lossCtx.clearRect(0, 0, lossChart.width, lossChart.height);
  lossModal.classList.remove('visible');
  lossModalVal.textContent = '–';
  setStatus('Ready', '');
}

btnStart.addEventListener('click', start);
btnPause.addEventListener('click', stop);
btnReset.addEventListener('click', reset);

function switchMode(useGPT) {
  currentGPT = useGPT;
  window._mbt_set_gpt_mode(useGPT);
  btnModeEnc.classList.toggle('primary', !useGPT);
  btnModeGpt.classList.toggle('primary',  useGPT);
  const ph = useGPT ? 'prompt phrase (GPT continuation)' : 'source phrase (encoder input)';
  document.getElementById('attn-name').placeholder = ph;
  reset();
  ensureInit();
}
btnModeEnc.addEventListener('click', () => switchMode(false));
btnModeGpt.addEventListener('click', () => switchMode(true));

// =====================================================================
// Inference
// =====================================================================
document.getElementById('temperature').addEventListener('input', e => {
  document.getElementById('temp-val').textContent = e.target.value;
});

btnGen.disabled = true;
btnGen.addEventListener('click', () => {
  const temp = parseFloat(document.getElementById('temperature').value);
  const srcPhrase = (document.getElementById('attn-name').value || 'mix flour and water').trim().toLowerCase();
  const samplesEl = document.getElementById('samples');
  samplesEl.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const phrase = window._mbt_generate(srcPhrase, temp);
    const tag = document.createElement('span');
    tag.className = 'sample-tag';
    tag.title = 'src: ' + srcPhrase;
    tag.textContent = phrase || '(empty)';
    samplesEl.appendChild(tag);
  }
  runAllViz(srcPhrase);
});

// =====================================================================
// Attention heatmap
// =====================================================================
function colorAttn(v) {
  const r = Math.round(v * 255);
  const g = Math.round(v * 200);
  const b = Math.round((1 - v) * 80);
  return [r, g, b, 255];
}

function drawAttnHead(canvasId, flat, h, seq, tokens) {
  const canvas = document.getElementById(canvasId);
  const LABEL_W = 52;
  const LABEL_H = 44;
  const CELL = Math.max(24, Math.floor(160 / seq));
  const matW = seq * CELL;
  const matH = seq * CELL;
  const W = LABEL_W + matW;
  const H = LABEL_H + matH;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, W, H);

  const offset = h * seq * seq;
  for (let qi = 0; qi < seq; qi++) {
    for (let ki = 0; ki < seq; ki++) {
      const w = flat[offset + qi * seq + ki];
      const [r, g, b] = colorAttn(w);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(LABEL_W + ki * CELL, LABEL_H + qi * CELL, CELL, CELL);
    }
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= seq; i++) {
    ctx.beginPath();
    ctx.moveTo(LABEL_W + i * CELL, LABEL_H);
    ctx.lineTo(LABEL_W + i * CELL, LABEL_H + matH);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(LABEL_W, LABEL_H + i * CELL);
    ctx.lineTo(LABEL_W + matW, LABEL_H + i * CELL);
    ctx.stroke();
  }

  const fontSize = Math.min(10, CELL - 2);
  ctx.font = `${fontSize}px monospace`;
  ctx.textBaseline = 'middle';

  for (let i = 0; i < seq; i++) {
    const label = tokens[i] || '';
    const cx = LABEL_W + i * CELL + CELL / 2;
    const cy = LABEL_H + i * CELL + CELL / 2;

    ctx.save();
    ctx.translate(cx, LABEL_H - 4);
    ctx.rotate(-Math.PI / 4);
    ctx.fillStyle = '#8b949e';
    ctx.textAlign = 'left';
    ctx.fillText(label, 0, 0);
    ctx.restore();

    ctx.fillStyle = '#8b949e';
    ctx.textAlign = 'right';
    ctx.fillText(label, LABEL_W - 4, cy);
  }

  if (CELL >= 28) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.max(7, CELL / 4)}px monospace`;
    for (let qi = 0; qi < seq; qi++) {
      for (let ki = 0; ki < seq; ki++) {
        const w = flat[offset + qi * seq + ki];
        if (w > 0.05) {
          ctx.fillStyle = w > 0.5 ? '#000' : '#ccc';
          ctx.fillText(w.toFixed(2), LABEL_W + ki * CELL + CELL / 2, LABEL_H + qi * CELL + CELL / 2);
        }
      }
    }
  }
}

function drawAttnLegend() {
  const c = document.getElementById('attn-legend');
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;
  for (let x = 0; x < W; x++) {
    const v = x / (W - 1);
    const [r, g, b] = colorAttn(v);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, 0, 1, H);
  }
}

function runAttnViz(phrase) {
  if (!initialized) return;
  phrase = phrase.trim().toLowerCase();
  if (!phrase) return;
  window._mbt_run_attn_viz(phrase);
  const seq = window._mbt_get_viz_seq_len();
  if (seq === 0) { document.getElementById('attn-info').textContent = currentGPT ? '(GPT mode: attn panel N/A)' : '(no known words)'; return; }
  const flat = window._mbt_get_viz_attn_flat();
  const tokens = window._mbt_get_viz_tokens().split('|');
  document.getElementById('attn-info').textContent = `${seq} tokens: ${tokens.join(' → ')}`;
  for (let h = 0; h < N_HEAD; h++) {
    drawAttnHead(`attn-h${h}`, flat, h, seq, tokens);
  }
  drawAttnLegend();
}

// =====================================================================
// Embedding similarity heatmap
// =====================================================================

function colorSim(v) {
  if (v >= 0) {
    const t = v;
    return [Math.round(220 * t), Math.round(30 * t), Math.round(30 * t), 255];
  } else {
    const t = -v;
    return [Math.round(30 * t), Math.round(30 * t), Math.round(220 * t), 255];
  }
}

function runEmbViz() {
  if (!initialized) return;
  const simFlat = window._mbt_get_embedding_similarity();
  const vocab = window._mbt_get_vocab_string().split('|');
  const vs = vocab.length;

  const CELL = Math.max(3, Math.floor(300 / vs));
  const LABEL_H = 60;
  const LABEL_W = 60;
  const matSz = vs * CELL;
  const W = LABEL_W + matSz;
  const H = LABEL_H + matSz;

  const canvas = document.getElementById('emb-canvas');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < vs; i++) {
    for (let j = 0; j < vs; j++) {
      const v = simFlat[i * vs + j];
      const [r, g, b] = colorSim(v);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(LABEL_W + j * CELL, LABEL_H + i * CELL, CELL, CELL);
    }
  }

  const step = Math.max(1, Math.ceil(8 / CELL));
  const fontSize = Math.min(9, CELL * 2);
  if (fontSize >= 6) {
    ctx.font = `${fontSize}px monospace`;
    for (let i = 0; i < vs; i += step) {
      const label = vocab[i];
      const ci = LABEL_W + i * CELL + CELL / 2;
      const ri = LABEL_H + i * CELL + CELL / 2;

      ctx.save();
      ctx.translate(ci, LABEL_H - 4);
      ctx.rotate(-Math.PI / 2.5);
      ctx.fillStyle = '#8b949e';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, 0, 0);
      ctx.restore();

      ctx.fillStyle = '#8b949e';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, LABEL_W - 4, ri);
    }
  }

  const lc = document.getElementById('emb-legend');
  const lctx = lc.getContext('2d');
  for (let x = 0; x < lc.width; x++) {
    const v = (x / (lc.width - 1)) * 2 - 1;
    const [r, g, b] = colorSim(v);
    lctx.fillStyle = `rgb(${r},${g},${b})`;
    lctx.fillRect(x, 0, 1, lc.height);
  }
}

document.getElementById('btn-emb').addEventListener('click', runEmbViz);

// =====================================================================
// Hidden state / MLP / logit viz state
// =====================================================================
let hiddenStage = 0;
let lastVizTokens = [];
let predPos = 0;

function colorDiv(v, scale) {
  const t = Math.min(1, Math.abs(v) / (scale || 0.01));
  if (v >= 0) return [Math.round(220 * t), Math.round(40 * t), Math.round(40 * t)];
  return [Math.round(30 * t), Math.round(30 * t), Math.round(220 * t)];
}

function colorGreen(v, scale) {
  const t = Math.min(1, v / (scale || 0.01));
  return [Math.round(30 * t), Math.round(200 * t), Math.round(80 * t)];
}

function drawHeatmap(canvas, flat, rows, cols, rowLabels, colorFn, cellW, cellH) {
  const LABEL_W = 52;
  const W = LABEL_W + cols * cellW;
  const H = rows * cellH;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, W, H);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const [rv, gv, bv] = colorFn(flat[r * cols + c]);
      ctx.fillStyle = `rgb(${rv},${gv},${bv})`;
      ctx.fillRect(LABEL_W + c * cellW, r * cellH, cellW, cellH);
    }
  }
  const fontSize = Math.min(10, cellH - 2);
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#8b949e';
  for (let r = 0; r < rows; r++) {
    ctx.fillText(rowLabels[r] || '', LABEL_W - 4, r * cellH + cellH / 2);
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 0.5;
  for (let r = 0; r <= rows; r++) {
    ctx.beginPath(); ctx.moveTo(LABEL_W, r * cellH); ctx.lineTo(W, r * cellH); ctx.stroke();
  }
}

function runHiddenViz() {
  if (!initialized) return;
  const flat = window._mbt_get_viz_hidden_flat();
  const seq = window._mbt_get_viz_seq_len();
  if (!flat || seq === 0 || flat.length === 0) return;
  const N_EMBD = 32;
  const stageFlat = flat.slice(hiddenStage * seq * N_EMBD, (hiddenStage + 1) * seq * N_EMBD);
  let maxAbs = 0.01;
  for (const v of stageFlat) if (Math.abs(v) > maxAbs) maxAbs = Math.abs(v);
  const cellW = Math.max(4, Math.floor(260 / N_EMBD));
  const cellH = Math.max(18, Math.floor(120 / seq));
  drawHeatmap(document.getElementById('hidden-canvas'), stageFlat, seq, N_EMBD,
    lastVizTokens, v => colorDiv(v, maxAbs), cellW, cellH);
  const lc = document.getElementById('hidden-legend'), lctx = lc.getContext('2d');
  for (let x = 0; x < lc.width; x++) {
    const [r, g, b] = colorDiv((x / (lc.width - 1)) * 2 - 1, 1);
    lctx.fillStyle = `rgb(${r},${g},${b})`; lctx.fillRect(x, 0, 1, lc.height);
  }
}

function runMlpViz() {
  if (!initialized) return;
  const flat = window._mbt_get_viz_mlp_acts_flat();
  const seq = window._mbt_get_viz_seq_len();
  if (!flat || seq === 0 || flat.length === 0) return;
  const MLP_DIM = flat.length / seq;
  let maxVal = 0.01;
  for (const v of flat) if (v > maxVal) maxVal = v;
  const cellW = Math.max(3, Math.floor(260 / MLP_DIM));
  const cellH = Math.max(18, Math.floor(120 / seq));
  drawHeatmap(document.getElementById('mlp-canvas'), flat, seq, MLP_DIM,
    lastVizTokens, v => colorGreen(v, maxVal), cellW, cellH);
  const lc = document.getElementById('mlp-legend'), lctx = lc.getContext('2d');
  for (let x = 0; x < lc.width; x++) {
    const [r, g, b] = colorGreen(x / (lc.width - 1), 1);
    lctx.fillStyle = `rgb(${r},${g},${b})`; lctx.fillRect(x, 0, 1, lc.height);
  }
}

function runLogitsViz(pos) {
  if (!initialized) return;
  const flat = window._mbt_get_viz_logits_flat();
  const seq = window._mbt_get_viz_seq_len();
  if (!flat || seq === 0 || flat.length === 0) return;
  pos = Math.min(pos, seq - 1);
  const vocab = window._mbt_get_vocab_string().split('|');
  const vs = vocab.length;
  const logits = flat.slice(pos * vs, (pos + 1) * vs);
  let maxL = -Infinity;
  for (const v of logits) if (v > maxL) maxL = v;
  const exps = logits.map(v => Math.exp(v - maxL));
  const sum = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map(v => v / sum);
  const pairs = vocab.map((w, i) => ({ w, p: probs[i] }));
  pairs.sort((a, b) => b.p - a.p);
  const container = document.getElementById('pred-bars');
  container.innerHTML = '';
  for (const { w, p } of pairs.slice(0, 15)) {
    const row = document.createElement('div');
    row.className = 'pred-bar-row';
    row.innerHTML = `<span class="pred-bar-label">${w}</span>` +
      `<div class="pred-bar-bg"><div class="pred-bar-fill" style="width:${(p * 100).toFixed(1)}%"></div></div>` +
      `<span class="pred-bar-val">${(p * 100).toFixed(1)}%</span>`;
    container.appendChild(row);
  }
  const ctxLabel = document.getElementById('pred-ctx-label');
  ctxLabel.textContent = lastVizTokens[pos] ? `after "${lastVizTokens[pos]}"` : '';
}

function runAllViz(phrase) {
  if (!initialized) return;
  phrase = (phrase || '').trim().toLowerCase();
  if (!phrase) return;
  window._mbt_run_attn_viz(phrase);
  const seq = window._mbt_get_viz_seq_len();
  if (seq === 0) { document.getElementById('attn-info').textContent = currentGPT ? '(GPT mode: attn panel N/A)' : '(no known words)'; runNetworkViz(); return; }
  lastVizTokens = window._mbt_get_viz_tokens().split('|');
  const flat = window._mbt_get_viz_attn_flat();
  document.getElementById('attn-info').textContent = `${seq} tokens: ${lastVizTokens.join(' → ')}`;
  for (let h = 0; h < N_HEAD; h++) drawAttnHead(`attn-h${h}`, flat, h, seq, lastVizTokens);
  drawAttnLegend();
  runHiddenViz();
  runMlpViz();
  const slider = document.getElementById('pos-slider');
  slider.max = seq - 1;
  predPos = Math.min(predPos, seq - 1);
  slider.value = predPos;
  document.getElementById('pos-val').textContent = predPos;
  runLogitsViz(predPos);
  runNetworkViz();
}

document.getElementById('btn-attn').addEventListener('click', () => {
  const phrase = document.getElementById('attn-name').value;
  if (phrase) lastPhrase = phrase;
  runAllViz(phrase);
});

document.getElementById('pos-slider').addEventListener('input', e => {
  predPos = parseInt(e.target.value);
  document.getElementById('pos-val').textContent = predPos;
  runLogitsViz(predPos);
});

document.querySelectorAll('#hidden-tabs .tab').forEach(btn => {
  btn.addEventListener('click', () => {
    hiddenStage = parseInt(btn.dataset.stage);
    document.querySelectorAll('#hidden-tabs .tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    runHiddenViz();
  });
});

// =====================================================================
// Architecture Diagram — Encoder-Decoder
// =====================================================================

function runNetworkViz() {
  if (!initialized) return;
  const srcPhrase = (document.getElementById('attn-name').value || 'mix flour and water').trim().toLowerCase();
  try { window._mbt_run_network_viz(srcPhrase, 0); } catch(e) { console.error('run_network_viz error:', e); alert('run_network_viz error: '+e.message); return; }
  const vocab   = window._mbt_get_vocab_string().split('|');
  const VS      = vocab.length;
  const NE      = 32;
  const src_len = window._mbt_get_network_viz_src_len();
  const tgt_len = window._mbt_get_network_viz_tgt_len();
  if (tgt_len === 0) return;
  const isGPT = src_len === 0;

  // Show predicted output text in toolbar
  const predToks = window._mbt_get_network_viz_tgt_tokens().split('|').filter(t => t && t !== '<BOS>' && t !== '<EOS>');
  const predText = predToks.join(' ');
  const predEl = document.getElementById('net-pred-out');
  if (predEl) { predEl.textContent = predText || '(empty)'; predEl.title = 'predicted output'; }

  const encFlat   = Array.from(window._mbt_get_network_viz_enc_flat());
  const decFlat   = Array.from(window._mbt_get_network_viz_dec_flat());
  const encSA     = Array.from(window._mbt_get_network_viz_enc_self_attn());
  const decSA     = Array.from(window._mbt_get_network_viz_dec_self_attn());
  const crossA    = Array.from(window._mbt_get_network_viz_cross_attn());
  const srcToks   = window._mbt_get_network_viz_src_tokens().split('|');
  const tgtToks   = window._mbt_get_network_viz_tgt_tokens().split('|');
  const encQFlat  = Array.from(window._mbt_get_network_viz_enc_q_flat());
  const encKFlat  = Array.from(window._mbt_get_network_viz_enc_k_flat());
  const encVFlat  = Array.from(window._mbt_get_network_viz_enc_v_flat());
  const decQFlat  = Array.from(window._mbt_get_network_viz_dec_q_flat());
  const decKFlat  = Array.from(window._mbt_get_network_viz_dec_k_flat());
  const decVFlat  = Array.from(window._mbt_get_network_viz_dec_v_flat());
  const encHoFlat   = Array.from(window._mbt_get_network_viz_enc_ho_flat());
  const decHoFlat   = Array.from(window._mbt_get_network_viz_dec_ho_flat());
  if (typeof window._mbt_get_network_viz_cross_ho_flat !== 'function') { console.error('cross_ho_flat not defined'); alert('_mbt_get_network_viz_cross_ho_flat is not a function'); return; }
  const crossHoFlat = Array.from(window._mbt_get_network_viz_cross_ho_flat());

  const encD = [];
  for (let p = 0; p < src_len; p++) {
    let o = p * 5 * NE;
    const t = n => { const a = encFlat.slice(o, o+n); o += n; return a; };
    encD.push({ tok_emb:t(NE), pos_emb:t(NE), x_init:t(NE), x_post_attn:t(NE), x_post_mlp:t(NE) });
  }
  const DEC_STEP = 6*NE + VS;
  const decD = [];
  for (let p = 0; p < tgt_len; p++) {
    let o = p * DEC_STEP;
    const t = n => { const a = decFlat.slice(o, o+n); o += n; return a; };
    decD.push({ tok_emb:t(NE), pos_emb:t(NE), x_init:t(NE),
                x_post_sattn:t(NE), x_post_xattn:t(NE), x_post_mlp:t(NE), logits:t(VS) });
  }
  try {
    drawArchDiagram(document.getElementById('net-canvas'),
      encD, decD, encSA, decSA, crossA,
      encQFlat, encKFlat, encVFlat, decQFlat, decKFlat, decVFlat,
      encHoFlat, decHoFlat, crossHoFlat,
      src_len, tgt_len, srcToks, tgtToks, vocab);
  } catch(e) { console.error('drawArchDiagram error:', e); alert('drawArchDiagram: ' + e.message); }
}

function drawArchDiagram(canvas, encD, decD, encSA, decSA, crossA,
                          encQFlat, encKFlat, encVFlat, decQFlat, decKFlat, decVFlat,
                          encHoFlat, decHoFlat, crossHoFlat,
                          src_len, tgt_len, srcToks, tgtToks, vocab) {
  const VS   = vocab.length;
  const NE   = 32;
  const COL  = 320;
  const GAP  = 56;
  const TOK_H = 26;
  const ENC_SECT_H = 560; // encoder section height
  const VGAP = 56;        // vertical gap between encoder and decoder
  const isGPT = src_len === 0;
  const decY0 = isGPT ? 0 : ENC_SECT_H + VGAP;
  const encW  = GAP + src_len*(COL+GAP);
  const decW  = GAP + tgt_len*(COL+GAP);
  const W     = Math.max(isGPT ? 0 : encW, decW);
  const TH    = decY0 + 940;
  const dpr   = window.devicePixelRatio || 1;
  canvas.width  = W*dpr; canvas.height = TH*dpr;
  canvas.style.width = W+'px'; canvas.style.height = TH+'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,W,TH);

  // ── shared helpers ────────────────────────────────────────────────
  function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();}
  function strip(data,cfn,x,y,w,h){let mx=1e-4;for(const v of data)if(Math.abs(v)>mx)mx=Math.abs(v);const cw=w/data.length;for(let i=0;i<data.length;i++){const[r,g,b]=cfn(data[i],mx);ctx.fillStyle=`rgb(${r},${g},${b})`;ctx.fillRect(x+i*cw,y,Math.max(1,cw),h);}}
  function cdiv(v,mx){const t=Math.min(1,Math.abs(v)/(mx||1e-4));return v>=0?[Math.round(255-t*200),Math.round(255-t*200),255]:[255,Math.round(255-t*200),Math.round(255-t*200)];}
  function cgreen(v,mx){const t=Math.min(1,v/(mx||1e-4));return[Math.round(255-t*200),255,Math.round(255-t*200)];}
  function arrowDown(cx,yFrom,yTo){ctx.strokeStyle='#444';ctx.lineWidth=1.2;ctx.setLineDash([]);ctx.beginPath();ctx.moveTo(cx,yFrom);ctx.lineTo(cx,yTo-5);ctx.stroke();ctx.fillStyle='#444';ctx.beginPath();ctx.moveTo(cx,yTo);ctx.lineTo(cx-3,yTo-6);ctx.lineTo(cx+3,yTo-6);ctx.fill();}
  function addCirc(cx,cy){const R=8;ctx.strokeStyle='#444';ctx.lineWidth=1.4;ctx.setLineDash([]);ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(cx-R+2,cy);ctx.lineTo(cx+R-2,cy);ctx.stroke();ctx.beginPath();ctx.moveTo(cx,cy-R+2);ctx.lineTo(cx,cy+R-2);ctx.stroke();}
  function sineWave(cx,cy,colW,BX,BW){const SW_X=cx+12,SW_W=Math.min(48,BX+BW-SW_X-4);ctx.strokeStyle='#e57373';ctx.lineWidth=1.2;ctx.setLineDash([]);ctx.beginPath();for(let i=0;i<=SW_W;i++){const sx=SW_X+i,sy=cy-4*Math.sin(i/SW_W*Math.PI*3.5);i===0?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);}ctx.stroke();ctx.fillStyle='#888';ctx.font='8px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';ctx.fillText('Pos Enc',SW_X+SW_W/2,cy+9);ctx.strokeStyle='#444';ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(SW_X,cy);ctx.lineTo(cx+10,cy);ctx.stroke();ctx.fillStyle='#444';ctx.beginPath();ctx.moveTo(cx+9,cy);ctx.lineTo(cx+15,cy-3);ctx.lineTo(cx+15,cy+3);ctx.fill();}
  function skipDown(BX,BW,SK,yStart,yEnd){
    const SC='#7c3aed';
    const SKL=BX-14; // left routing channel (14px left of content box)
    ctx.strokeStyle=SC;ctx.lineWidth=1.5;ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(BX+BW/2,yStart); // branch from main flow center
    ctx.lineTo(SKL,yStart);      // go left
    ctx.lineTo(SKL,yEnd);        // go down
    ctx.lineTo(BX-1,yEnd);       // go right to box left edge
    ctx.stroke();
    ctx.fillStyle=SC;
    ctx.beginPath();
    ctx.moveTo(BX,yEnd);ctx.lineTo(BX-7,yEnd-3);ctx.lineTo(BX-7,yEnd+3);ctx.fill();
  }
  function box(label,by,bh,fill,BX,BW,CX){rr(BX,by,BW,bh,4);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle='#555';ctx.lineWidth=1;ctx.stroke();ctx.fillStyle='#111';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,CX,by+10);}
  function stripBox(label,sub,data,cfn,by,bh,fill,BX,BW,CX,SH){rr(BX,by,BW,bh,4);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle='#555';ctx.lineWidth=1;ctx.stroke();ctx.fillStyle='#111';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,CX,by+10);if(sub){ctx.fillStyle='#888';ctx.font='8px monospace';ctx.fillText(sub,CX,by+20);}if(data&&data.length){const sy=by+bh-SH-3;strip(data,cfn,BX+3,sy,BW-6,SH);}}

  let encOutY = 0, crossAttnY = 0, maskedAttnMidY = 0, outputProbsY = 0; // for connection arrows

  // ── Section labels + horizontal divider ───────────────────────────
  function drawSectionLabels() {
    ctx.fillStyle='#999';ctx.font='bold 9px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
    if (isGPT) {
      ctx.fillText('GPT DECODER', W/2, 2);
    } else {
      ctx.fillText('ENCODER', W/2, 2);
      ctx.fillText('DECODER', W/2, decY0+2);
      ctx.strokeStyle='#ddd';ctx.lineWidth=1;ctx.setLineDash([4,3]);
      ctx.beginPath();ctx.moveTo(0,ENC_SECT_H+VGAP/2);ctx.lineTo(W,ENC_SECT_H+VGAP/2);ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // ── Encoder columns ───────────────────────────────────────────────
  function drawEncoderColumn(p) {
    const ox = GAP + p*(COL+GAP);
    const BW = COL-40, CX = ox+COL/2, BX = ox+(COL-BW)/2, SK = BX+BW+18;
    const SH = 10, G = 30;
    const HE=38, HMH=180, HAN=34, HFF=34;

    // header
    ctx.fillStyle='#ffcdd2';ctx.fillRect(ox+2,14,COL-4,TOK_H);
    ctx.strokeStyle='#666';ctx.lineWidth=1;ctx.strokeRect(ox+2,14,COL-4,TOK_H);
    ctx.fillStyle='#111';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText((srcToks[p]||'').slice(0,9),ox+COL/2,14+TOK_H/2);
    ctx.fillStyle='#888';ctx.font='8px monospace';ctx.textBaseline='top';ctx.fillText('enc '+p,ox+COL/2,15);

    let y = 44;
    // context chips
    const cW=Math.max(18,Math.floor((BW-4)/Math.max(1,src_len)));
    const cTot=cW*src_len, cX0=BX+(BW-cTot)/2;
    for(let t=0;t<src_len;t++){const cx=cX0+t*cW;rr(cx,y,cW-2,14,2);ctx.fillStyle=t===p?'#dc2626':'#9ca3af';ctx.fill();ctx.fillStyle='#fff';ctx.font='8px monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText((srcToks[t]||'').slice(0,3),cx+(cW-2)/2,y+7);}
    y += 18;
    arrowDown(CX,y,y+G); y+=G;

    // Input Embedding (tok⊕pos inside box; x_init shown outside)
    { const sw2=Math.floor((BW-6-20)/2);
      const tokX=BX+3, posX=BX+3+sw2+20;
      const plusCX=BX+3+sw2+10;
      stripBox('Input Embedding',null,null,cdiv,y,HE,'#ffcdd2',BX,BW,CX,SH);
      ctx.fillStyle='#888';ctx.font='9px monospace';ctx.textAlign='center';ctx.textBaseline='bottom';
      ctx.fillText('token_embedding',tokX+sw2/2,y+22);
      ctx.fillText('positional_embedding',posX+sw2/2,y+22);
      strip(encD[p].tok_emb,cdiv,tokX,y+23,sw2,SH);
      strip(encD[p].pos_emb,cdiv,posX,y+23,sw2,SH);
      ctx.strokeStyle='#444';ctx.lineWidth=1.2;ctx.setLineDash([]);
      ctx.beginPath();ctx.arc(plusCX,y+28,6,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(plusCX-4,y+28);ctx.lineTo(plusCX+4,y+28);ctx.stroke();
      ctx.beginPath();ctx.moveTo(plusCX,y+24);ctx.lineTo(plusCX,y+32);ctx.stroke();
    }
    y+=HE; arrowDown(CX,y,y+6); y+=6;
    strip(encD[p].x_init,cdiv,BX+3,y,BW-6,SH);
    ctx.fillStyle='#888';ctx.font='9px monospace';ctx.textAlign='right';ctx.textBaseline='middle';

    y+=SH; arrowDown(CX,y,y+G); y+=G;

    // Encoder Block
    const BLK_T=y, SKIP1=y-G/2;
    box('Multi-Head Self-Attention',y,HMH,'#ffe6cc',BX,BW,CX);
    { const dh=NE/N_HEAD, secW=Math.floor((BW-4)/N_HEAD);
      const hCol=['rgba(253,224,71,.35)','rgba(96,165,250,.35)','rgba(52,211,153,.35)','rgba(167,139,250,.35)'];
      ctx.fillStyle='#888';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';
      for(let h=0;h<N_HEAD;h++){
        const sx=BX+2+h*secW;
        ctx.fillStyle=hCol[h];ctx.fillRect(sx,y+19,secW-1,8);
        strip(encD[p].x_init.slice(h*dh,(h+1)*dh),cdiv,sx,y+19,secW-1,8);
      }
      const headW=Math.floor(BW/N_HEAD);
      ctx.setLineDash([]);
      for(let h=0;h<N_HEAD;h++){
        const scx=BX+2+(h+0.5)*secW, hcx=BX+h*headW+headW/2;
        ctx.strokeStyle='#bbb';ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(scx,y+27);ctx.lineTo(hcx,y+35);ctx.stroke();
      }
      ctx.fillStyle='#bbb';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.textBaseline='middle';
      ctx.fillText('×Wq,k,v',BX+BW-2,y+31);
      // head columns with Q/K/V strips + full attention matrix
      const cellSize=Math.min(9,Math.max(4,Math.floor((headW-6)/src_len)));
      const matH=src_len*cellSize;
      const diagLabelH=Math.round(Math.min(20,src_len*cellSize*0.7+4));
      const qkvH=7; // Q,K,V strip height per head
      const HEAD_DIM=NE/N_HEAD;
      for(let h=0;h<N_HEAD;h++){
        const hx=BX+h*headW, hcx=hx+headW/2;
        const sw=headW-6, sx=hx+3;
        if(h>0){ctx.strokeStyle='#e0e0e0';ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(hx,y+35);ctx.lineTo(hx,y+97+matH+18+diagLabelH);ctx.stroke();}
        ctx.fillStyle=hCol[h];ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillText('h'+h,hcx,y+39);
        ctx.fillStyle='#aaa';ctx.font='9px monospace';ctx.fillText('d='+dh,hcx,y+46);
        // Q strip
        ctx.fillStyle='#c084fc';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';
        ctx.fillText('Q',sx,y+52);
        { const qv=[];for(let j=0;j<HEAD_DIM;j++)qv.push(encQFlat[h*src_len*HEAD_DIM+p*HEAD_DIM+j]||0);
          strip(qv,cdiv,sx+7,y+49,sw-7,qkvH); }
        // K strip
        ctx.fillStyle='#60a5fa';ctx.fillText('K',sx,y+62);
        { const kv=[];for(let j=0;j<HEAD_DIM;j++)kv.push(encKFlat[h*src_len*HEAD_DIM+p*HEAD_DIM+j]||0);
          strip(kv,cdiv,sx+7,y+59,sw-7,qkvH); }
        // V strip
        ctx.fillStyle='#34d399';ctx.fillText('V',sx,y+72);
        { const vv=[];for(let j=0;j<HEAD_DIM;j++)vv.push(encVFlat[h*src_len*HEAD_DIM+p*HEAD_DIM+j]||0);
          strip(vv,cdiv,sx+7,y+69,sw-7,qkvH); }
        // full attention matrix
        const matW=cellSize*src_len, matX0=Math.round(hcx-matW/2);
        ctx.fillStyle='#777';ctx.font='6px monospace';ctx.textAlign='right';ctx.textBaseline='middle';
        for(let r=0;r<src_len;r++) ctx.fillText((srcToks[r]||'').slice(0,5),matX0-2,y+87+r*cellSize+cellSize/2);
        for(let r=0;r<src_len;r++){
          for(let t=0;t<src_len;t++){
            const w=encSA[h*src_len*src_len+r*src_len+t]||0;
            ctx.fillStyle=`rgb(${Math.round(255-w*168)},${Math.round(255-w*120)},${Math.round(255-w*50)})`;
            ctx.fillRect(matX0+t*cellSize,y+87+r*cellSize,cellSize-0.5,cellSize-0.5);
          }
        }
        ctx.strokeStyle='rgba(220,38,38,0.7)';ctx.lineWidth=0.8;
        ctx.strokeRect(matX0,y+87+p*cellSize,matW,cellSize);
        // column labels (diagonal)
        ctx.save();
        ctx.fillStyle='#555';ctx.font='7px monospace';ctx.textAlign='left';ctx.textBaseline='middle';
        for(let t=0;t<src_len;t++){
          const lx=matX0+t*cellSize+cellSize/2-4, ly=y+87+matH+10;
          ctx.save();ctx.translate(lx,ly);ctx.rotate(-Math.PI/4);
          ctx.fillText((srcToks[t]||'').slice(0,5),0,0);
          ctx.restore();
        }
        ctx.restore();
        // A×V head output strip
        const axvY=y+87+matH+diagLabelH+4;
        ctx.fillStyle='#f97316';ctx.font='8px sans-serif';ctx.textAlign='left';ctx.textBaseline='bottom';
        ctx.fillText('A×V',sx,axvY);
        { const hv=[];for(let j=0;j<HEAD_DIM;j++)hv.push(encHoFlat[h*src_len*HEAD_DIM+p*HEAD_DIM+j]||0);
          strip(hv,cdiv,sx,axvY,sw,6); }
        ctx.strokeStyle='#bbb';ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(hcx,axvY+8);ctx.lineTo(CX,axvY+16);ctx.stroke();
      }
      ctx.fillStyle='#888';ctx.font='8px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText('concat + linear  [d='+NE+']',CX,y+87+matH+diagLabelH+20);
    }
    strip(encD[p].x_post_attn,cdiv,BX+3,y+HMH-SH-3,BW-6,SH);
    y+=HMH; arrowDown(CX,y,y+G); y+=G;

    const AN1_Y=y; stripBox('Add & Norm',null,null,cdiv,AN1_Y,HAN,'#d5e8d4',BX,BW,CX,SH);
    skipDown(BX,BW,SK,SKIP1,AN1_Y+HAN/2);
    y+=HAN; arrowDown(CX,y,y+G); y+=G;

    const SKIP2=y-G/2;
    stripBox('Feed Forward',null,null,cdiv,y,HFF,'#dae8fc',BX,BW,CX,SH);
    strip(encD[p].x_post_mlp,cdiv,BX+3,y+HFF-SH-3,BW-6,SH);
    y+=HFF; arrowDown(CX,y,y+G); y+=G;

    const AN2_Y=y; stripBox('Add & Norm',null,encD[p].x_post_mlp,cdiv,AN2_Y,HAN,'#d5e8d4',BX,BW,CX,SH);
    skipDown(BX,BW,SK,SKIP2,AN2_Y+HAN/2);
    y+=HAN;

    ctx.strokeStyle='#bbb';ctx.lineWidth=1;ctx.setLineDash([4,3]);
    ctx.strokeRect(BX-9,BLK_T-4,BW+18,y-BLK_T+8);ctx.setLineDash([]);
    ctx.fillStyle='#999';ctx.font='8px sans-serif';ctx.textAlign='left';ctx.textBaseline='bottom';
    ctx.fillText('Encoder Block',BX-7,BLK_T-6);

    y+=8;
    ctx.fillStyle='#888';ctx.font='bold 7px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText('Encoder Output',CX,y+7);
    if (p === 0) encOutY = y + 7; // record for K,V arrow
  }

  // ── Decoder columns ───────────────────────────────────────────────
  function drawDecoderColumn(p) {
    const ox = GAP + p*(COL+GAP);
    const BW = COL-40, CX = ox+COL/2, BX = ox+(COL-BW)/2, SK = BX+BW+18;
    const SH = 10, G = 30;
    const HE=38, HMH=180, HAN=34, HXA=150, HFF=34, HLM=32, HR=15;

    // header
    ctx.fillStyle='#dae8fc';ctx.fillRect(ox+2,decY0+14,COL-4,TOK_H);
    ctx.strokeStyle='#666';ctx.lineWidth=1;ctx.strokeRect(ox+2,decY0+14,COL-4,TOK_H);
    ctx.fillStyle='#111';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText((tgtToks[p]||'').slice(0,9),ox+COL/2,decY0+14+TOK_H/2);
    ctx.fillStyle='#888';ctx.font='8px monospace';ctx.textBaseline='top';ctx.fillText('dec '+p,ox+COL/2,decY0+15);

    let y = decY0 + 44;
    const tLen = p+1;
    // context chips (decoded tokens so far)
    const cW=Math.max(18,Math.floor((BW-4)/Math.max(1,tLen)));
    const cTot=cW*tLen, cX0=BX+(BW-cTot)/2;
    for(let t=0;t<tLen;t++){const cx=cX0+t*cW;rr(cx,y,cW-2,14,2);ctx.fillStyle=t===p?'#1d4ed8':'#6b7280';ctx.fill();ctx.fillStyle='#fff';ctx.font='8px monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText((tgtToks[t]||'').slice(0,3),cx+(cW-2)/2,y+7);}
    y+=18; arrowDown(CX,y,y+G); y+=G;

    // Output Embedding (tok⊕pos inside box; x_init shown outside)
    { const sw2=Math.floor((BW-6-20)/2);
      const tokX=BX+3, posX=BX+3+sw2+20;
      const plusCX=BX+3+sw2+10;
      stripBox('Output Embedding',null,null,cdiv,y,HE,'#ffcdd2',BX,BW,CX,SH);
      ctx.fillStyle='#888';ctx.font='9px monospace';ctx.textAlign='center';ctx.textBaseline='bottom';
      ctx.fillText('token_embedding',tokX+sw2/2,y+22);
      ctx.fillText('positional_embedding',posX+sw2/2,y+22);
      strip(decD[p].tok_emb,cdiv,tokX,y+23,sw2,SH);
      strip(decD[p].pos_emb,cdiv,posX,y+23,sw2,SH);
      ctx.strokeStyle='#444';ctx.lineWidth=1.2;ctx.setLineDash([]);
      ctx.beginPath();ctx.arc(plusCX,y+28,6,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(plusCX-4,y+28);ctx.lineTo(plusCX+4,y+28);ctx.stroke();
      ctx.beginPath();ctx.moveTo(plusCX,y+24);ctx.lineTo(plusCX,y+32);ctx.stroke();
    }
    y+=HE; arrowDown(CX,y,y+6); y+=6;
    strip(decD[p].x_init,cdiv,BX+3,y,BW-6,SH);
    ctx.fillStyle='#888';ctx.font='9px monospace';ctx.textAlign='right';ctx.textBaseline='middle';

    y+=SH; arrowDown(CX,y,y+G); y+=G;

    // Decoder Block
    const BLK_T=y, SKIP1=y-G/2;
    if (p === 0) maskedAttnMidY = y + HMH/2; // mid of Masked Self-Attn box
    box('Masked Multi-Head Self-Attention',y,HMH,'#ffe6cc',BX,BW,CX);
    { const dh=NE/N_HEAD, secW=Math.floor((BW-4)/N_HEAD);
      const hCol=['rgba(253,224,71,.35)','rgba(96,165,250,.35)','rgba(52,211,153,.35)','rgba(167,139,250,.35)'];
      ctx.fillStyle='#888';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';
      for(let h=0;h<N_HEAD;h++){
        const sx=BX+2+h*secW;
        ctx.fillStyle=hCol[h];ctx.fillRect(sx,y+19,secW-1,8);
        strip(decD[p].x_init.slice(h*dh,(h+1)*dh),cdiv,sx,y+19,secW-1,8);
      }
      const headW=Math.floor(BW/N_HEAD);
      ctx.setLineDash([]);
      for(let h=0;h<N_HEAD;h++){
        const scx=BX+2+(h+0.5)*secW, hcx=BX+h*headW+headW/2;
        ctx.strokeStyle='#bbb';ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(scx,y+27);ctx.lineTo(hcx,y+35);ctx.stroke();
      }
      ctx.fillStyle='#bbb';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.textBaseline='middle';
      ctx.fillText('×Wq,k,v',BX+BW-2,y+31);
      // head columns with Q/K/V strips + full attention matrix (causal)
      const cellSize=Math.min(9,Math.max(4,Math.floor((headW-6)/tgt_len)));
      const matH=tLen*cellSize;
      const diagLabelH=Math.round(Math.min(20,tLen*cellSize*0.7+4));
      const qkvH=7;
      const HEAD_DIM=NE/N_HEAD;
      for(let h=0;h<N_HEAD;h++){
        const hx=BX+h*headW, hcx=hx+headW/2;
        const sw=headW-6, sx=hx+3;
        if(h>0){ctx.strokeStyle='#e0e0e0';ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(hx,y+35);ctx.lineTo(hx,y+97+matH+18+diagLabelH);ctx.stroke();}
        ctx.fillStyle=hCol[h];ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillText('h'+h,hcx,y+39);
        ctx.fillStyle='#aaa';ctx.font='9px monospace';ctx.fillText('d='+dh,hcx,y+46);
        // Q strip
        ctx.fillStyle='#c084fc';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';
        ctx.fillText('Q',sx,y+52);
        { const qv=[];for(let j=0;j<HEAD_DIM;j++)qv.push(decQFlat[h*tgt_len*HEAD_DIM+p*HEAD_DIM+j]||0);
          strip(qv,cdiv,sx+7,y+49,sw-7,qkvH); }
        // K strip
        ctx.fillStyle='#60a5fa';ctx.fillText('K',sx,y+62);
        { const kv=[];for(let j=0;j<HEAD_DIM;j++)kv.push(decKFlat[h*tgt_len*HEAD_DIM+p*HEAD_DIM+j]||0);
          strip(kv,cdiv,sx+7,y+59,sw-7,qkvH); }
        // V strip
        ctx.fillStyle='#34d399';ctx.fillText('V',sx,y+72);
        { const vv=[];for(let j=0;j<HEAD_DIM;j++)vv.push(decVFlat[h*tgt_len*HEAD_DIM+p*HEAD_DIM+j]||0);
          strip(vv,cdiv,sx+7,y+69,sw-7,qkvH); }
        // full attention matrix (masked: upper triangle = 0)
        const matW=cellSize*tLen, matX0=Math.round(hcx-matW/2);
        ctx.fillStyle='#777';ctx.font='6px monospace';ctx.textAlign='right';ctx.textBaseline='middle';
        for(let r=0;r<tLen;r++) ctx.fillText((tgtToks[r]||'').slice(0,5),matX0-2,y+87+r*cellSize+cellSize/2);
        for(let r=0;r<tLen;r++){
          for(let t=0;t<tLen;t++){
            const w=decSA[h*tgt_len*tgt_len+r*tgt_len+t]||0;
            ctx.fillStyle=`rgb(${Math.round(255-w*168)},${Math.round(255-w*120)},${Math.round(255-w*50)})`;
            ctx.fillRect(matX0+t*cellSize,y+87+r*cellSize,cellSize-0.5,cellSize-0.5);
          }
        }
        ctx.strokeStyle='rgba(29,78,216,0.7)';ctx.lineWidth=0.8;
        ctx.strokeRect(matX0,y+87+p*cellSize,matW,cellSize);
        // column labels (diagonal)
        ctx.save();
        ctx.fillStyle='#555';ctx.font='7px monospace';ctx.textAlign='left';ctx.textBaseline='middle';
        for(let t=0;t<tLen;t++){
          const lx=matX0+t*cellSize+cellSize/2-4, ly=y+87+matH+10;
          ctx.save();ctx.translate(lx,ly);ctx.rotate(-Math.PI/4);
          ctx.fillText((tgtToks[t]||'').slice(0,5),0,0);
          ctx.restore();
        }
        ctx.restore();
        // A×V head output strip
        const axvY=y+87+matH+diagLabelH+4;
        ctx.fillStyle='#f97316';ctx.font='8px sans-serif';ctx.textAlign='left';ctx.textBaseline='bottom';
        ctx.fillText('A×V',sx,axvY);
        { const hv=[];for(let j=0;j<HEAD_DIM;j++)hv.push(decHoFlat[h*tgt_len*HEAD_DIM+p*HEAD_DIM+j]||0);
          strip(hv,cdiv,sx,axvY,sw,6); }
        ctx.strokeStyle='#bbb';ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(hcx,axvY+8);ctx.lineTo(CX,axvY+16);ctx.stroke();
      }
      ctx.fillStyle='#888';ctx.font='8px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText('concat + linear  [d='+NE+']',CX,y+87+matH+diagLabelH+20);
    }
    strip(decD[p].x_post_sattn,cdiv,BX+3,y+HMH-SH-3,BW-6,SH);
    y+=HMH; arrowDown(CX,y,y+G); y+=G;

    const AN1_Y=y; stripBox('Add & Norm',null,null,cdiv,AN1_Y,HAN,'#d5e8d4',BX,BW,CX,SH);
    skipDown(BX,BW,SK,SKIP1,AN1_Y+HAN/2);
    y+=HAN;
    if (!isGPT) {
      arrowDown(CX,y,y+G);
      // "Q" label on this arrow — decoder hidden state feeds query
      ctx.fillStyle='#1d4ed8';ctx.font='bold 7px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';
      ctx.fillText('Q',CX+4,y+G/2);
      y+=G;

      // Cross-Attention (per-head matrix)
      const SKIP2=y-G/2;
      if (p === 0) crossAttnY = y;
      rr(BX,y,BW,HXA,4);ctx.fillStyle='#ffe6cc';ctx.fill();ctx.strokeStyle='#d97706';ctx.lineWidth=1.5;ctx.stroke();
      ctx.fillStyle='#111';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText('Cross-Attention',CX,y+9);
      // Q strip
      ctx.fillStyle='#1d4ed8';ctx.font='bold 8px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';
      ctx.fillText('Q:',BX+3,y+18);
      strip(decD[p].x_post_sattn,cdiv,BX+18,y+14,BW-21,7);
      // K,V label
      ctx.fillStyle='#d97706';ctx.font='bold 8px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';
      ctx.fillText('K,V (enc, shared):',BX+3,y+28);
      ctx.fillStyle='#bbb';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.textBaseline='middle';
      ctx.fillText('×Wq,k,v',BX+BW-2,y+28);
      // fan-out to heads
      { const xHeadW=Math.floor(BW/N_HEAD), xSecW=Math.floor((BW-4)/N_HEAD);
        for(let h=0;h<N_HEAD;h++){
          const scx=BX+2+(h+0.5)*xSecW, hcx=BX+h*xHeadW+xHeadW/2;
          ctx.strokeStyle='#bbb';ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(scx,y+33);ctx.lineTo(hcx,y+38);ctx.stroke();
        }
        const hCol=['rgba(253,224,71,.35)','rgba(96,165,250,.35)','rgba(52,211,153,.35)','rgba(167,139,250,.35)'];
        const xcellX=Math.min(9,Math.max(4,Math.floor((xHeadW-6)/src_len)));
        const xcellY=Math.min(9,Math.max(4,Math.floor((xHeadW-6)/Math.max(tLen,src_len))));
        const xmatH=tLen*xcellY, xmatW=src_len*xcellX;
        const XMAT_TOP=y+42;
        for(let h=0;h<N_HEAD;h++){
          const hx=BX+h*xHeadW, hcx=hx+xHeadW/2;
          const matX0=Math.round(hcx-xmatW/2);
          if(h>0){ctx.strokeStyle='#e0e0e0';ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(hx,y+35);ctx.lineTo(hx,XMAT_TOP+xmatH+14);ctx.stroke();}
          ctx.fillStyle=hCol[h];ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
          ctx.fillText('h'+h,hcx,y+39);
          // row labels
          ctx.fillStyle='#777';ctx.font='6px monospace';ctx.textAlign='right';ctx.textBaseline='middle';
          for(let r=0;r<tLen;r++) ctx.fillText((tgtToks[r]||'').slice(0,5),matX0-2,XMAT_TOP+r*xcellY+xcellY/2);
          // matrix
          for(let r=0;r<tLen;r++){
            for(let s=0;s<src_len;s++){
              const w=crossA[h*tgt_len*src_len+r*src_len+s]||0;
              ctx.fillStyle=`rgb(${Math.round(255-w*168)},${Math.round(255-w*120)},${Math.round(255-w*50)})`;
              ctx.fillRect(matX0+s*xcellX,XMAT_TOP+r*xcellY,xcellX-0.5,xcellY-0.5);
            }
          }
          ctx.strokeStyle='rgba(217,119,6,0.8)';ctx.lineWidth=0.8;
          ctx.strokeRect(matX0,XMAT_TOP+p*xcellY,xmatW,xcellY);
          // src token labels (diagonal)
          ctx.save();
          ctx.fillStyle='#555';ctx.font='7px monospace';ctx.textAlign='left';ctx.textBaseline='middle';
          for(let s=0;s<src_len;s++){
            const lx=matX0+s*xcellX+xcellX/2-4, ly=XMAT_TOP+xmatH+10;
            ctx.save();ctx.translate(lx,ly);ctx.rotate(-Math.PI/4);
            ctx.fillText((srcToks[s]||'').slice(0,5),0,0);
            ctx.restore();
          }
          ctx.restore();
          // A×V head output strip
          const diagLabelH=Math.round(Math.min(20,src_len*xcellX*0.7+4));
          const xhoBase=XMAT_TOP+xmatH+diagLabelH+4;
          ctx.fillStyle='#f97316';ctx.font='7px sans-serif';ctx.textAlign='left';ctx.textBaseline='bottom';
          ctx.fillText('A\u00d7V',matX0,xhoBase);
          { const HEAD_DIM_X=NE/N_HEAD;
            const hv=[];for(let j=0;j<HEAD_DIM_X;j++)hv.push(crossHoFlat[h*tgt_len*HEAD_DIM_X+p*HEAD_DIM_X+j]||0);
            strip(hv,cdiv,matX0,xhoBase,xmatW,6); }
          // merge line
          ctx.strokeStyle='#bbb';ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(hcx,xhoBase+8);ctx.lineTo(CX,xhoBase+16);ctx.stroke();
        }
        const concatLabelH=Math.round(Math.min(20,src_len*Math.min(9,Math.max(4,Math.floor((Math.floor(BW/N_HEAD)-6)/Math.max(tLen,src_len))))*0.7+4));
        const concatY=XMAT_TOP+xmatH+concatLabelH+24;
        ctx.fillStyle='#888';ctx.font='8px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillText('concat + linear  [d='+NE+']',CX,concatY);
      }
      // Output strip
      strip(decD[p].x_post_xattn,cdiv,BX+3,y+HXA-8-3,BW-6,8);
      y+=HXA; arrowDown(CX,y,y+G); y+=G;

      const AN2_Y=y; stripBox('Add & Norm',null,null,cdiv,AN2_Y,HAN,'#d5e8d4',BX,BW,CX,SH);
      skipDown(BX,BW,SK,SKIP2,AN2_Y+HAN/2);
      y+=HAN; arrowDown(CX,y,y+G); y+=G;
    } else {
      arrowDown(CX,y,y+G); y+=G;
    }

    const SKIP3=y-G/2;
    stripBox('Feed Forward',null,null,cdiv,y,HFF,'#dae8fc',BX,BW,CX,SH);
    strip(decD[p].x_post_mlp,cdiv,BX+3,y+HFF-SH-3,BW-6,SH);
    y+=HFF; arrowDown(CX,y,y+G); y+=G;

    const AN3_Y=y; stripBox('Add & Norm',null,decD[p].x_post_mlp,cdiv,AN3_Y,HAN,'#d5e8d4',BX,BW,CX,SH);
    skipDown(BX,BW,SK,SKIP3,AN3_Y+HAN/2);
    y+=HAN;

    ctx.strokeStyle='#bbb';ctx.lineWidth=1;ctx.setLineDash([4,3]);
    ctx.strokeRect(BX-9,BLK_T-4,BW+18,y-BLK_T+8);ctx.setLineDash([]);
    ctx.fillStyle='#999';ctx.font='8px sans-serif';ctx.textAlign='left';ctx.textBaseline='bottom';
    ctx.fillText('Decoder Block',BX-7,BLK_T-6);

    y+=8; arrowDown(CX,y,y+G); y+=G;

    // Linear LM Head
    stripBox('Linear (LM Head)',`vocab=${VS}`,null,cdiv,y,HLM,'#e1d5e7',BX,BW,CX,SH);
    y+=HLM; arrowDown(CX,y,y+G); y+=G;

    // Output Probabilities
    if (p === 0) outputProbsY = y; // track for autoregressive arrow
    ctx.fillStyle='#888';ctx.font='bold 7px sans-serif';ctx.textAlign='center';ctx.textBaseline='bottom';
    ctx.fillText('Output Probabilities',CX,y-1);
    const lg=decD[p].logits;
    let mxL=-Infinity; for(const v of lg)if(v>mxL)mxL=v;
    let smL=0; const exL=lg.map(v=>{const e=Math.exp(v-mxL);smL+=e;return e;});
    const ranked=Array.from({length:VS},(_,i)=>i).sort((a,b)=>exL[b]-exL[a]).slice(0,3);
    rr(BX,y,BW,3*HR,3);ctx.fillStyle='#f0fff4';ctx.fill();ctx.strokeStyle='#555';ctx.lineWidth=1;ctx.stroke();
    for(let k=0;k<3;k++){
      const prob=exL[ranked[k]]/smL;
      const py=y+k*HR;
      const bw=Math.max(1,(BW-4)*Math.min(1,prob*3));
      ctx.fillStyle=k===0?'#16a34a':k===1?'#86efac':'#bbf7d0';
      ctx.fillRect(BX+2,py+1,bw,HR-3);
      ctx.fillStyle=bw>(BW-4)*0.45&&k===0?'#fff':'#111';
      ctx.font=(k===0?'bold ':'')+'7px monospace';ctx.textAlign='left';ctx.textBaseline='middle';
      ctx.fillText((vocab[ranked[k]]||'').slice(0,7),BX+4,py+HR/2);
      ctx.fillStyle='#888';ctx.font='9px monospace';ctx.textAlign='right';
      ctx.fillText((prob*100).toFixed(1)+'%',BX+BW-3,py+HR/2);
    }
  }

  // ── K,V connection: Encoder Output → VGAP bridge → Decoder Cross-Attention ──
  function drawKVBridge() {
    if (!(encOutY > 0 && crossAttnY > 0 && src_len > 0 && tgt_len > 0)) return;
    const crossMidY = crossAttnY + 28; // K,V row inside cross-attn box
    const decBX  = p => GAP + p*(COL+GAP) + 11;
    const decBXR = p => GAP + p*(COL+GAP) + COL - 11;
    const gatherY  = encOutY + 18;
    const bridgeY  = ENC_SECT_H + 6;
    const bridgeH  = VGAP - 14;
    const bridgeX  = GAP, bridgeW = W - 2*GAP;

    ctx.save();
    ctx.strokeStyle = '#d97706';
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';

    // 1. Short drops from each encoder column → gather bar
    ctx.setLineDash([3, 2]); ctx.lineWidth = 1.2;
    for (let p = 0; p < src_len; p++) {
      const cx = GAP + p*(COL+GAP) + COL/2;
      ctx.beginPath(); ctx.moveTo(cx, encOutY+7); ctx.lineTo(cx, gatherY); ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(GAP+COL/2, gatherY);
    ctx.lineTo(GAP+(src_len-1)*(COL+GAP)+COL/2, gatherY);
    ctx.stroke();

    // 2. Arrows from gather bar → bridge top
    ctx.setLineDash([5, 3]); ctx.lineWidth = 1.5;
    for (let p = 0; p < src_len; p++) {
      const cx = GAP + p*(COL+GAP) + COL/2;
      ctx.beginPath(); ctx.moveTo(cx, gatherY); ctx.lineTo(cx, bridgeY); ctx.stroke();
    }
    ctx.setLineDash([]);

    // 3. K,V bridge box in VGAP
    rr(bridgeX, bridgeY, bridgeW, bridgeH, 4);
    ctx.fillStyle = '#fff3e0'; ctx.fill();
    ctx.strokeStyle = '#d97706'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#d97706'; ctx.font = 'bold 7px sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('K, V  —  Encoder Output (shared across all decoder Cross-Attentions)', W/2, bridgeY+bridgeH/2);

    // 4. Vertical pipes: bridge bottom → left margin of each decoder column → cross-attn entry
    ctx.setLineDash([5, 3]); ctx.lineWidth = 1.8;
    for (let p = 0; p < tgt_len; p++) {
      const pipeX = p*(COL+GAP) + GAP/2; // center of gap to the left of column p
      ctx.beginPath();
      ctx.moveTo(pipeX, bridgeY+bridgeH);
      ctx.lineTo(pipeX, crossMidY);
      ctx.lineTo(decBX(p), crossMidY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.moveTo(decBX(p), crossMidY);
      ctx.lineTo(decBX(p)-8, crossMidY-4);
      ctx.lineTo(decBX(p)-8, crossMidY+4);
      ctx.fill();
      ctx.setLineDash([5, 3]);
    }
    ctx.setLineDash([]);
    ctx.restore();
  }

  // ── Decoder KV cache: each dec col feeds next col's Masked Self-Attn ──
  // dec_p's x_init (after embedding+pe) is cached as K,V for dec_{p+1..}
  function drawKVCacheArrows() {
    if (!(maskedAttnMidY > 0 && tgt_len > 1)) return;
    // BX = ox+11, BW = COL-22 = 198, so BXR = ox+209
    const dBX  = p => GAP + p*(COL+GAP) + 11;    // block outline left (arrow entry)
    const dBXR = p => GAP + p*(COL+GAP) + COL;   // right boundary of column p (gap start)
    const kvY = maskedAttnMidY; // Y level: mid of Masked Self-Attn box

    ctx.save();
    ctx.strokeStyle = '#6366f1'; // indigo — distinct from orange encoder K,V
    ctx.lineWidth = 1.8;
    ctx.lineJoin = 'round';
    ctx.lineCap  = 'round';
    ctx.setLineDash([4, 3]);

    for (let p = 1; p < tgt_len; p++) {
      // segment through inter-column gap (32px): decBXR(p-1) → decBX(p)
      ctx.beginPath();
      ctx.moveTo(dBXR(p-1), kvY);
      ctx.lineTo(dBX(p),    kvY);
      ctx.stroke();
      // arrowhead into dec_p Masked Self-Attn from left
      ctx.setLineDash([]);
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.moveTo(dBX(p),    kvY);
      ctx.lineTo(dBX(p)-8,  kvY-4);
      ctx.lineTo(dBX(p)-8,  kvY+4);
      ctx.fill();
      ctx.setLineDash([4, 3]);
    }
    ctx.setLineDash([]);

    // Label on first segment (between dec0 and dec1)
    const segMidX = (dBXR(0) + dBX(1)) / 2;
    ctx.fillStyle = '#eff0ff';
    ctx.fillRect(segMidX - 16, kvY - 7, 32, 14);
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('KV cache', segMidX, kvY);

    ctx.restore();
  }

  // ── Autoregressive feedback: dec_p output → dec_{p+1} input ──────────
  // Inference: argmax(output probs at dec_p) becomes input token for dec_{p+1}
  // Solid green line to distinguish from dashed orange/indigo arrows
  function drawAutoregressiveArrows() {
    if (!(outputProbsY > 0 && tgt_len > 1)) return;
    const HR_V = 15; // HR value (must match decoder loop)
    const probsMidY  = outputProbsY + Math.round(3 * HR_V / 2); // mid of output probs box
    const hdrMidY    = decY0 + 27; // mid of token header (decY0+14 to decY0+40)
    // vx: just past right edge of each decoder column
    const vx = p => GAP + p*(COL+GAP) + COL;
    const hdrLeft = p => GAP + p*(COL+GAP) + 2; // token header rect left edge

    ctx.save();
    ctx.strokeStyle = '#16a34a'; // green
    ctx.lineWidth   = 1.5;
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    ctx.setLineDash([]);

    for (let p = 0; p < tgt_len - 1; p++) {
      const bxr = GAP + p*(COL+GAP) + COL - 20; // content box right = BX+BW, avoids block outline at COL-11
      ctx.beginPath();
      ctx.moveTo(bxr,          probsMidY); // depart from output probs right edge
      ctx.lineTo(vx(p),        probsMidY); // right into column margin
      ctx.lineTo(vx(p),        hdrMidY);   // UP to header level (solid, crosses other arrows)
      ctx.lineTo(hdrLeft(p+1), hdrMidY);   // right to dec_{p+1} header left
      ctx.stroke();
      // arrowhead entering dec_{p+1} header from left
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.moveTo(hdrLeft(p+1),   hdrMidY);
      ctx.lineTo(hdrLeft(p+1)-8, hdrMidY-4);
      ctx.lineTo(hdrLeft(p+1)-8, hdrMidY+4);
      ctx.fill();
    }

    // Label near first vertical pipe (dec0 right margin, just above output probs)
    const lx = vx(0) + 3;
    ctx.fillStyle = '#dcfce7';
    ctx.fillRect(lx, outputProbsY - 16, 44, 14);
    ctx.fillStyle = '#16a34a';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('argmax →', lx + 2, outputProbsY - 9);
    ctx.fillText('next input', lx + 2, outputProbsY - 2);

    ctx.restore();
  }

  drawSectionLabels();
  if (!isGPT) for (let p = 0; p < src_len; p++) drawEncoderColumn(p);
  for (let p = 0; p < tgt_len; p++) drawDecoderColumn(p);
  drawKVBridge();
  drawKVCacheArrows();
  drawAutoregressiveArrows();
}


// =====================================================================
// Toolbar height sync — keeps --toolbar-h in sync with actual height
// =====================================================================
function syncToolbarHeight() {
  const h = document.getElementById('toolbar').offsetHeight;
  document.documentElement.style.setProperty('--toolbar-h', h + 'px');
}
syncToolbarHeight();
window.addEventListener('resize', syncToolbarHeight);

// =====================================================================
// Init check
// =====================================================================
if (typeof window._mbt_train_step === 'function') {
  infoEl.textContent = 'MoonBit runtime ready. Press "Start" to begin.';
  ensureInit(); // show initial architecture with random weights before training
} else {
  infoEl.textContent = 'Error: MoonBit runtime not loaded. Check console.';
}

// ── Canvas zoom (ctrl+scroll / pinch) ─────────────────────────────────
let netZoom = 1.0;
const MIN_ZOOM = 0.2, MAX_ZOOM = 5.0;

function applyZoom() {
  const canvas = document.getElementById('net-canvas');
  const wrap   = document.getElementById('canvas-zoom-wrap');
  canvas.style.transform = `scale(${netZoom})`;
  const cw = parseInt(canvas.style.width)  || canvas.width;
  const ch = parseInt(canvas.style.height) || canvas.height;
  wrap.style.width  = Math.round(cw * netZoom) + 'px';
  wrap.style.height = Math.round(ch * netZoom) + 'px';
}

const archArea = document.getElementById('arch-area');

function zoomAround(factor, pivotX, pivotY) {
  // pivotX/Y: position relative to archArea viewport
  const oldZoom = netZoom;
  netZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, netZoom * factor));
  applyZoom();
  // keep canvas point under pivot fixed
  const cx = (archArea.scrollLeft + pivotX) / oldZoom;
  const cy = (archArea.scrollTop  + pivotY) / oldZoom;
  archArea.scrollLeft = cx * netZoom - pivotX;
  archArea.scrollTop  = cy * netZoom - pivotY;
}

// ctrl+scroll zoom
archArea.addEventListener('wheel', (e) => {
  if (!e.ctrlKey) return;
  e.preventDefault();
  const rect = archArea.getBoundingClientRect();
  zoomAround(e.deltaY < 0 ? 1.02 : 0.98, e.clientX - rect.left, e.clientY - rect.top);
}, { passive: false });

// pinch zoom
let lastPinchDist = null;
let lastPinchMid = null;
archArea.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    lastPinchDist = Math.hypot(dx, dy);
    const rect = archArea.getBoundingClientRect();
    lastPinchMid = {
      x: (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left,
      y: (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top,
    };
  }
}, { passive: true });
archArea.addEventListener('touchmove', (e) => {
  if (e.touches.length !== 2 || lastPinchDist === null) return;
  e.preventDefault();
  const dx = e.touches[0].clientX - e.touches[1].clientX;
  const dy = e.touches[0].clientY - e.touches[1].clientY;
  const dist = Math.hypot(dx, dy);
  const damped = 1 + (dist / lastPinchDist - 1) * 0.25;
  lastPinchDist = dist;
  zoomAround(damped, lastPinchMid.x, lastPinchMid.y);
}, { passive: false });
archArea.addEventListener('touchend', () => { lastPinchDist = null; }, { passive: true });

// drag to pan
let dragStart = null;
let scrollStart = null;
archArea.addEventListener('mousedown', (e) => {
  if (e.button !== 0) return;
  dragStart = { x: e.clientX, y: e.clientY };
  scrollStart = { left: archArea.scrollLeft, top: archArea.scrollTop };
  archArea.style.cursor = 'grabbing';
  e.preventDefault();
});
window.addEventListener('mousemove', (e) => {
  if (!dragStart) return;
  archArea.scrollLeft = scrollStart.left - (e.clientX - dragStart.x);
  archArea.scrollTop  = scrollStart.top  - (e.clientY - dragStart.y);
});
window.addEventListener('mouseup', () => {
  dragStart = null;
  archArea.style.cursor = '';
});
