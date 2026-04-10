// Browser entry point (wasm-gc target).
// pub fn は wasm エクスポートになる。
// String / Array[Double] はバッファ + インデックスアクセスで JS に渡す。

// ---------------------------------------------------------------------------
// String / Array バッファ（JS 側が読み出す共有バッファ）
// ---------------------------------------------------------------------------

let g_str_buf : Ref[String] = { val: "" }
let g_arr_buf : Ref[Array[Double]] = { val: [] }

// 現在の文字列バッファの長さ
pub fn mbt_str_len() -> Int {
  g_str_buf.val.length()
}

// 文字列バッファの i 番目の文字コードを返す
pub fn mbt_str_char(i : Int) -> Int {
  g_str_buf.val[i].to_int()
}

// 現在の浮動小数バッファの長さ
pub fn mbt_arr_len() -> Int {
  g_arr_buf.val.length()
}

// 浮動小数バッファの i 番目の値を返す
pub fn mbt_arr_at(i : Int) -> Double {
  g_arr_buf.val[i]
}

// ---------------------------------------------------------------------------
// 直接エクスポート（プリミティブ型のみ）
// ---------------------------------------------------------------------------

pub fn mbt_init() -> Unit {
  @gpt.init_model()
}

pub fn mbt_train_step() -> Double {
  @gpt.train_step()
}

// JS 側が入力文字列をセットする: 1 文字ずつ push
let g_in_chars : Ref[Array[Int]] = { val: [] }

pub fn mbt_in_str_clear() -> Unit {
  g_in_chars.val = []
}

pub fn mbt_in_str_push(c : Int) -> Unit {
  g_in_chars.val.push(c)
}

fn consume_in_str() -> String {
  let buf = StringBuilder::new()
  for code in g_in_chars.val {
    buf.write_char(Int::unsafe_to_char(code))
  }
  g_in_chars.val = []
  buf.to_string()
}

// generate(src_phrase, temperature) -> String
// 呼び出し前: mbt_in_str_clear + mbt_in_str_push* で src_phrase をセット
// 呼び出し後: mbt_str_len / mbt_str_char で結果文字列を読む
pub fn mbt_generate(temperature : Double) -> Unit {
  let phrase = consume_in_str()
  g_str_buf.val = @gpt.generate(phrase, temperature)
}

pub fn mbt_get_step() -> Int {
  @gpt.get_step()
}

pub fn mbt_get_num_steps() -> Int {
  @gpt.get_num_steps()
}

// run_attn_viz(phrase)
// 呼び出し前: mbt_in_str_clear + mbt_in_str_push* で phrase をセット
pub fn mbt_run_attn_viz() -> Unit {
  let phrase = consume_in_str()
  @gpt.run_attn_viz(phrase)
}

pub fn mbt_get_viz_seq_len() -> Int {
  @gpt.get_viz_seq_len()
}

// get_viz_tokens() -> String (バッファ経由)
pub fn mbt_get_viz_tokens() -> Unit {
  g_str_buf.val = @gpt.get_viz_tokens()
}

// get_viz_attn_flat() -> Array[Double] (バッファ経由)
pub fn mbt_get_viz_attn_flat() -> Unit {
  g_arr_buf.val = @gpt.get_viz_attn_flat()
}

pub fn mbt_get_embedding_similarity() -> Unit {
  g_arr_buf.val = @gpt.get_embedding_similarity()
}

pub fn mbt_get_vocab_string() -> Unit {
  g_str_buf.val = @gpt.get_vocab_string()
}

pub fn mbt_get_viz_hidden_flat() -> Unit {
  g_arr_buf.val = @gpt.get_viz_hidden_flat()
}

pub fn mbt_get_viz_mlp_acts_flat() -> Unit {
  g_arr_buf.val = @gpt.get_viz_mlp_acts_flat()
}

pub fn mbt_get_viz_logits_flat() -> Unit {
  g_arr_buf.val = @gpt.get_viz_logits_flat()
}

// run_network_viz(phrase, dec_pos)
// 呼び出し前: mbt_in_str_clear + mbt_in_str_push* で phrase をセット
pub fn mbt_run_network_viz(dec_pos : Int) -> Unit {
  let phrase = consume_in_str()
  @gpt.run_network_viz(phrase, dec_pos)
}

pub fn mbt_get_network_viz_flat() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_flat()
}

pub fn mbt_get_network_viz_attn() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_attn()
}

pub fn mbt_get_network_viz_seq() -> Int {
  @gpt.get_network_viz_seq()
}

pub fn mbt_get_network_viz_pos() -> Int {
  @gpt.get_network_viz_pos()
}

pub fn mbt_get_network_viz_enc_flat() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_enc_flat()
}

pub fn mbt_get_network_viz_dec_flat() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_dec_flat()
}

pub fn mbt_get_network_viz_enc_self_attn() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_enc_self_attn()
}

pub fn mbt_get_network_viz_dec_self_attn() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_dec_self_attn()
}

pub fn mbt_get_network_viz_cross_attn() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_cross_attn()
}

pub fn mbt_get_network_viz_src_len() -> Int {
  @gpt.get_network_viz_src_len()
}

pub fn mbt_get_network_viz_tgt_len() -> Int {
  @gpt.get_network_viz_tgt_len()
}

pub fn mbt_get_network_viz_src_tokens() -> Unit {
  g_str_buf.val = @gpt.get_network_viz_src_tokens()
}

pub fn mbt_get_network_viz_tgt_tokens() -> Unit {
  g_str_buf.val = @gpt.get_network_viz_tgt_tokens()
}

pub fn mbt_get_network_viz_enc_q_flat() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_enc_q_flat()
}

pub fn mbt_get_network_viz_enc_k_flat() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_enc_k_flat()
}

pub fn mbt_get_network_viz_enc_v_flat() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_enc_v_flat()
}

pub fn mbt_get_network_viz_dec_q_flat() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_dec_q_flat()
}

pub fn mbt_get_network_viz_dec_k_flat() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_dec_k_flat()
}

pub fn mbt_get_network_viz_dec_v_flat() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_dec_v_flat()
}

pub fn mbt_get_network_viz_enc_ho_flat() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_enc_ho_flat()
}

pub fn mbt_get_network_viz_dec_ho_flat() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_dec_ho_flat()
}

pub fn mbt_get_network_viz_cross_ho_flat() -> Unit {
  g_arr_buf.val = @gpt.get_network_viz_cross_ho_flat()
}

// draw_loss_chart / draw_loss_chart_modal
// MoonBit がコマンドリストを生成 → g_arr_buf に書き込む → JS が実行
pub fn mbt_draw_loss_chart(w : Double, h : Double, dpr : Double) -> Unit {
  g_arr_buf.val = @gpt.draw_loss_chart(w, h, dpr)
}

pub fn mbt_draw_loss_chart_modal(w : Double, h : Double, dpr : Double) -> Unit {
  g_arr_buf.val = @gpt.draw_loss_chart_modal(w, h, dpr)
}

pub fn mbt_draw_attn_head(h : Int, dpr : Double) -> Unit {
  g_arr_buf.val = @gpt.draw_attn_head(h, dpr)
}

pub fn mbt_draw_legend_attn(w : Double, h : Double) -> Unit {
  g_arr_buf.val = @gpt.draw_legend_attn(w, h)
}

pub fn mbt_draw_hidden(stage : Int, dpr : Double) -> Unit {
  g_arr_buf.val = @gpt.draw_hidden(stage, dpr)
}

pub fn mbt_draw_legend_div(w : Double, h : Double) -> Unit {
  g_arr_buf.val = @gpt.draw_legend_div(w, h)
}

pub fn mbt_draw_mlp(dpr : Double) -> Unit {
  g_arr_buf.val = @gpt.draw_mlp(dpr)
}

pub fn mbt_draw_legend_green(w : Double, h : Double) -> Unit {
  g_arr_buf.val = @gpt.draw_legend_green(w, h)
}

pub fn mbt_draw_emb_sim(dpr : Double) -> Unit {
  g_arr_buf.val = @gpt.draw_emb_sim(dpr)
}

pub fn mbt_draw_legend_sim(w : Double, h : Double) -> Unit {
  g_arr_buf.val = @gpt.draw_legend_sim(w, h)
}

pub fn mbt_draw_arch_diagram(
  show_skip : Bool,
  show_pos_emb : Bool,
  show_attn : Bool,
  dpr : Double
) -> Unit {
  g_arr_buf.val = @gpt.draw_arch_diagram(show_skip, show_pos_emb, show_attn, dpr)
}

pub fn mbt_draw_emb_pca(dpr : Double) -> Unit {
  g_arr_buf.val = @gpt.draw_emb_pca(dpr)
}

pub fn mbt_compute_pca() -> Unit {
  @gpt.compute_pca()
}

pub fn mbt_tick_pca(w : Double, h : Double, dpr : Double) -> Unit {
  g_arr_buf.val = @gpt.tick_pca(w, h, dpr)
}

pub fn mbt_pca_pointer(type_ : Int, x : Double, y : Double) -> Unit {
  @gpt.pca_pointer(type_, x, y)
}

pub fn mbt_run_residual_viz() -> Unit {
  let phrase = consume_in_str()
  @gpt.run_residual_viz(phrase)
}

pub fn mbt_draw_residual_pca(w : Double, h : Double, dpr : Double) -> Unit {
  g_arr_buf.val = @gpt.draw_residual_pca(w, h, dpr)
}

pub fn mbt_clear_raw_docs() -> Unit {
  @gpt.clear_raw_docs()
}

pub fn mbt_push_raw_doc() -> Unit {
  let phrase = consume_in_str()
  @gpt.push_raw_doc(phrase)
}

pub fn mbt_get_docs_string() -> Unit {
  g_str_buf.val = @gpt.get_docs_string()
}

pub fn mbt_add_custom_doc() -> Bool {
  let phrase = consume_in_str()
  @gpt.add_custom_doc(phrase)
}

pub fn mbt_set_gpt_mode(v : Bool) -> Unit {
  @gpt.set_gpt_mode(v)
}

pub fn mbt_get_gpt_mode() -> Bool {
  @gpt.get_gpt_mode()
}

pub fn mbt_set_use_skip(v : Bool) -> Unit {
  @gpt.set_use_skip(v)
}

pub fn mbt_get_use_skip() -> Bool {
  @gpt.get_use_skip()
}

pub fn mbt_set_use_pos_emb(v : Bool) -> Unit {
  @gpt.set_use_pos_emb(v)
}

pub fn mbt_get_use_pos_emb() -> Bool {
  @gpt.get_use_pos_emb()
}

pub fn mbt_set_use_attn(v : Bool) -> Unit {
  @gpt.set_use_attn(v)
}

pub fn mbt_get_use_attn() -> Bool {
  @gpt.get_use_attn()
}

fn main {
  // wasm-gc: pub fn でエクスポート済み。main は is-main: true に必要。
}
