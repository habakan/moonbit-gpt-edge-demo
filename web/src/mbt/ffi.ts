// wasm-gc loader
// Instantiates moonbit.wasm and calls exported pub fn functions.
// The external interface (mbt.init() etc.) is kept stable.

type WasmExports = {
  mbt_str_len: () => number;
  mbt_str_char: (i: number) => number;
  mbt_arr_len: () => number;
  mbt_arr_at: (i: number) => number;
  mbt_init: () => void;
  mbt_train_step: () => number;
  mbt_in_str_clear: () => void;
  mbt_in_str_push: (c: number) => void;
  mbt_generate: (temperature: number) => void;
  mbt_get_step: () => number;
  mbt_get_num_steps: () => number;
  mbt_run_attn_viz: () => void;
  mbt_get_viz_seq_len: () => number;
  mbt_get_viz_tokens: () => void;
  mbt_get_viz_attn_flat: () => void;
  mbt_get_embedding_similarity: () => void;
  mbt_get_vocab_string: () => void;
  mbt_get_viz_hidden_flat: () => void;
  mbt_get_viz_mlp_acts_flat: () => void;
  mbt_get_viz_logits_flat: () => void;
  mbt_run_network_viz: (decPos: number) => void;
  mbt_get_network_viz_flat: () => void;
  mbt_get_network_viz_attn: () => void;
  mbt_get_network_viz_seq: () => number;
  mbt_get_network_viz_pos: () => number;
  mbt_get_network_viz_enc_flat: () => void;
  mbt_get_network_viz_dec_flat: () => void;
  mbt_get_network_viz_enc_self_attn: () => void;
  mbt_get_network_viz_dec_self_attn: () => void;
  mbt_get_network_viz_cross_attn: () => void;
  mbt_get_network_viz_src_len: () => number;
  mbt_get_network_viz_tgt_len: () => number;
  mbt_get_network_viz_src_tokens: () => void;
  mbt_get_network_viz_tgt_tokens: () => void;
  mbt_get_network_viz_enc_q_flat: () => void;
  mbt_get_network_viz_enc_k_flat: () => void;
  mbt_get_network_viz_enc_v_flat: () => void;
  mbt_get_network_viz_dec_q_flat: () => void;
  mbt_get_network_viz_dec_k_flat: () => void;
  mbt_get_network_viz_dec_v_flat: () => void;
  mbt_get_network_viz_enc_ho_flat: () => void;
  mbt_get_network_viz_dec_ho_flat: () => void;
  mbt_get_network_viz_cross_ho_flat: () => void;
  mbt_set_gpt_mode: (v: number) => void;
  mbt_get_gpt_mode: () => number;
  mbt_set_use_skip: (v: number) => void;
  mbt_get_use_skip: () => number;
  mbt_set_use_pos_emb: (v: number) => void;
  mbt_get_use_pos_emb: () => number;
  mbt_set_use_attn: (v: number) => void;
  mbt_get_use_attn: () => number;
  mbt_get_docs_string: () => void;
  mbt_add_custom_doc: () => number;
  mbt_clear_raw_docs: () => void;
  mbt_push_raw_doc: () => void;
  mbt_draw_loss_chart: (w: number, h: number, dpr: number) => void;
  mbt_draw_loss_chart_modal: (w: number, h: number, dpr: number) => void;
  mbt_draw_attn_head: (h: number, dpr: number) => void;
  mbt_draw_legend_attn: (w: number, h: number) => void;
  mbt_draw_hidden: (stage: number, dpr: number) => void;
  mbt_draw_legend_div: (w: number, h: number) => void;
  mbt_draw_mlp: (dpr: number) => void;
  mbt_draw_legend_green: (w: number, h: number) => void;
  mbt_draw_emb_sim: (dpr: number) => void;
  mbt_draw_legend_sim: (w: number, h: number) => void;
  mbt_draw_arch_diagram: (showSkip: number, showPosEmb: number, showAttn: number, dpr: number) => void;
  mbt_draw_emb_pca: (dpr: number) => void;
  mbt_compute_pca: () => void;
  mbt_tick_pca: (w: number, h: number, dpr: number) => void;
  mbt_pca_pointer: (type: number, x: number, y: number) => void;
  mbt_run_residual_viz: () => void;
  mbt_draw_residual_pca: (w: number, h: number, dpr: number) => void;
};

let _exports: WasmExports | null = null;

// Load the wasm module. Call loadMoonbit() and await before checking isMbtReady().
export async function loadMoonbit(): Promise<void> {
  const result = await WebAssembly.instantiateStreaming(
    fetch('/moonbit.wasm'),
    {}
  );
  _exports = result.instance.exports as unknown as WasmExports;
}

export function isMbtReady(): boolean {
  return _exports !== null;
}

// ---------------------------------------------------------------------------
// Buffer read helpers
// ---------------------------------------------------------------------------

function readString(ex: WasmExports): string {
  const len = ex.mbt_str_len();
  // MoonBit wasm-gc strings are UTF-16 (i16 array)
  const codes = new Uint16Array(len);
  for (let i = 0; i < len; i++) {
    codes[i] = ex.mbt_str_char(i);
  }
  return String.fromCharCode(...codes);
}

function readFloatArray(ex: WasmExports): number[] {
  const len = ex.mbt_arr_len();
  const arr = new Array<number>(len);
  for (let i = 0; i < len; i++) {
    arr[i] = ex.mbt_arr_at(i);
  }
  return arr;
}

function pushString(ex: WasmExports, s: string): void {
  ex.mbt_in_str_clear();
  for (let i = 0; i < s.length; i++) {
    ex.mbt_in_str_push(s.charCodeAt(i));
  }
}

function getEx(): WasmExports {
  if (!_exports) throw new Error('MoonBit wasm not loaded');
  return _exports;
}

function makeArrayGetter(fn: keyof WasmExports): () => number[] {
  return () => { const ex = getEx(); (ex[fn] as () => void)(); return readFloatArray(ex); };
}

function makeStringGetter(fn: keyof WasmExports): () => string {
  return () => { const ex = getEx(); (ex[fn] as () => void)(); return readString(ex); };
}

// ---------------------------------------------------------------------------
// Public interface (call convention kept stable for App.tsx etc.)
// ---------------------------------------------------------------------------

export const mbt = {
  init: () => {
    getEx().mbt_init();
  },
  trainStep: () => {
    return getEx().mbt_train_step();
  },
  getStep: () => getEx().mbt_get_step(),
  generate: (phrase: string, temp: number): string => {
    const ex = getEx();
    pushString(ex, phrase);
    ex.mbt_generate(temp);
    return readString(ex);
  },
  setGptMode: (useGPT: boolean) => {
    getEx().mbt_set_gpt_mode(useGPT ? 1 : 0);
  },
  setUseSkip: (v: boolean) => {
    getEx().mbt_set_use_skip(v ? 1 : 0);
  },
  getUseSkip: (): boolean => getEx().mbt_get_use_skip() !== 0,
  setUsePosEmb: (v: boolean) => {
    getEx().mbt_set_use_pos_emb(v ? 1 : 0);
  },
  getUsePosEmb: (): boolean => getEx().mbt_get_use_pos_emb() !== 0,
  setUseAttn: (v: boolean) => {
    getEx().mbt_set_use_attn(v ? 1 : 0);
  },
  getUseAttn: (): boolean => getEx().mbt_get_use_attn() !== 0,
  getDocsString: makeStringGetter('mbt_get_docs_string'),
  clearRawDocs: () => {
    getEx().mbt_clear_raw_docs();
  },
  pushRawDoc: (phrase: string) => {
    const ex = getEx();
    pushString(ex, phrase);
    ex.mbt_push_raw_doc();
  },
  addCustomDoc: (phrase: string): boolean => {
    const ex = getEx();
    pushString(ex, phrase);
    return ex.mbt_add_custom_doc() !== 0;
  },
  runAttnViz: (phrase: string) => {
    const ex = getEx();
    pushString(ex, phrase);
    ex.mbt_run_attn_viz();
  },
  getVizSeqLen: () => getEx().mbt_get_viz_seq_len(),
  getVizTokens: makeStringGetter('mbt_get_viz_tokens'),
  getVizAttnFlat: makeArrayGetter('mbt_get_viz_attn_flat'),
  getEmbeddingSimilarity: makeArrayGetter('mbt_get_embedding_similarity'),
  getVocabString: makeStringGetter('mbt_get_vocab_string'),
  getVizHiddenFlat: makeArrayGetter('mbt_get_viz_hidden_flat'),
  getVizMlpActsFlat: makeArrayGetter('mbt_get_viz_mlp_acts_flat'),
  getVizLogitsFlat: makeArrayGetter('mbt_get_viz_logits_flat'),
  runNetworkViz: (phrase: string, mode: number) => {
    const ex = getEx();
    pushString(ex, phrase);
    ex.mbt_run_network_viz(mode);
  },
  getNetworkVizSrcLen: () => getEx().mbt_get_network_viz_src_len(),
  getNetworkVizTgtLen: () => getEx().mbt_get_network_viz_tgt_len(),
  getNetworkVizSrcTokens: makeStringGetter('mbt_get_network_viz_src_tokens'),
  getNetworkVizTgtTokens: makeStringGetter('mbt_get_network_viz_tgt_tokens'),
  getNetworkVizEncFlat: makeArrayGetter('mbt_get_network_viz_enc_flat'),
  getNetworkVizDecFlat: makeArrayGetter('mbt_get_network_viz_dec_flat'),
  getNetworkVizEncSelfAttn: makeArrayGetter('mbt_get_network_viz_enc_self_attn'),
  getNetworkVizDecSelfAttn: makeArrayGetter('mbt_get_network_viz_dec_self_attn'),
  getNetworkVizCrossAttn: makeArrayGetter('mbt_get_network_viz_cross_attn'),
  getNetworkVizEncQFlat: makeArrayGetter('mbt_get_network_viz_enc_q_flat'),
  getNetworkVizEncKFlat: makeArrayGetter('mbt_get_network_viz_enc_k_flat'),
  getNetworkVizEncVFlat: makeArrayGetter('mbt_get_network_viz_enc_v_flat'),
  getNetworkVizDecQFlat: makeArrayGetter('mbt_get_network_viz_dec_q_flat'),
  getNetworkVizDecKFlat: makeArrayGetter('mbt_get_network_viz_dec_k_flat'),
  getNetworkVizDecVFlat: makeArrayGetter('mbt_get_network_viz_dec_v_flat'),
  getNetworkVizEncHoFlat: makeArrayGetter('mbt_get_network_viz_enc_ho_flat'),
  getNetworkVizDecHoFlat: makeArrayGetter('mbt_get_network_viz_dec_ho_flat'),
  getNetworkVizCrossHoFlat: makeArrayGetter('mbt_get_network_viz_cross_ho_flat'),
  // Display-list based chart rendering (MoonBit generates commands, JS executes)
  drawLossChart: (w: number, h: number, dpr: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_loss_chart(w, h, dpr);
    return readFloatArray(ex);
  },
  drawLossChartModal: (w: number, h: number, dpr: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_loss_chart_modal(w, h, dpr);
    return readFloatArray(ex);
  },
  drawAttnHead: (h: number, dpr: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_attn_head(h, dpr);
    return readFloatArray(ex);
  },
  drawLegendAttn: (w: number, h: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_legend_attn(w, h);
    return readFloatArray(ex);
  },
  drawHidden: (stage: number, dpr: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_hidden(stage, dpr);
    return readFloatArray(ex);
  },
  drawLegendDiv: (w: number, h: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_legend_div(w, h);
    return readFloatArray(ex);
  },
  drawMlp: (dpr: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_mlp(dpr);
    return readFloatArray(ex);
  },
  drawLegendGreen: (w: number, h: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_legend_green(w, h);
    return readFloatArray(ex);
  },
  drawEmbSim: (dpr: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_emb_sim(dpr);
    return readFloatArray(ex);
  },
  drawLegendSim: (w: number, h: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_legend_sim(w, h);
    return readFloatArray(ex);
  },
  drawArchDiagram: (showSkip: boolean, showPosEmb: boolean, showAttn: boolean, dpr: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_arch_diagram(showSkip ? 1 : 0, showPosEmb ? 1 : 0, showAttn ? 1 : 0, dpr);
    return readFloatArray(ex);
  },
  drawEmbPca: (dpr: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_emb_pca(dpr);
    return readFloatArray(ex);
  },
  computePca: (): void => {
    getEx().mbt_compute_pca();
  },
  tickPca: (w: number, h: number, dpr: number): number[] => {
    const ex = getEx();
    ex.mbt_tick_pca(w, h, dpr);
    return readFloatArray(ex);
  },
  pcaPointer: (type: number, x: number, y: number): void => {
    getEx().mbt_pca_pointer(type, x, y);
  },
  runResidualViz: (phrase: string): void => {
    const ex = getEx();
    pushString(ex, phrase);
    ex.mbt_run_residual_viz();
  },
  drawResidualPca: (w: number, h: number, dpr: number): number[] => {
    const ex = getEx();
    ex.mbt_draw_residual_pca(w, h, dpr);
    return readFloatArray(ex);
  },
};
