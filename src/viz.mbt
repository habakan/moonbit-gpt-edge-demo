// ---------------------------------------------------------------------------
// Attention visualization (encoder self-attention panel)
// ---------------------------------------------------------------------------

pub fn run_attn_viz(phrase : String) -> Unit {
  if g_gpt_mode.val {
    g_viz_seq_len.val = 0
    return
  }
  let bos = g_bos.val
  let w2i = g_word2idx.val

  let src_toks : Array[Int] = [bos]
  let token_words : Array[String] = ["<BOS>"]
  for word in split_words(phrase) {
    match w2i.get(word) {
      Some(idx) => {
        src_toks.push(idx)
        token_words.push(word)
      }
      None => ()
    }
  }

  let seq = if block_size < src_toks.length() {
    block_size
  } else {
    src_toks.length()
  }
  if seq <= 0 {
    g_viz_seq_len.val = 0
    return
  }
  let src_toks_clamped = src_toks[0:seq].to_array()

  let label_buf = StringBuilder::new()
  for i in 0..<seq {
    if i > 0 {
      label_buf.write_char('|')
    }
    if i < token_words.length() {
      label_buf.write_string(token_words[i])
    }
  }
  g_viz_tokens_str.val = label_buf.to_string()
  g_viz_seq_len.val = seq

  let (enc_out, self_attn) = encoder_forward_f(src_toks_clamped)

  // Flatten self_attn: [n_head × seq × seq]
  let flat : Array[Double] = []
  for h in 0..<n_head {
    for qi in 0..<seq {
      for ki in 0..<seq {
        if h < self_attn.length() && qi < self_attn[h].length() {
          flat.push(self_attn[h][qi][ki])
        } else {
          flat.push(0.0)
        }
      }
    }
  }
  g_viz_attn_flat.val = flat

  // Encoder hidden: flatten enc_out as [seq × n_embd]
  let hidden_flat : Array[Double] = []
  for pos_vec in enc_out {
    for v in pos_vec {
      hidden_flat.push(v)
    }
  }
  g_viz_hidden.val = hidden_flat
  g_viz_mlp_acts.val = []
  g_viz_logits.val = []
}

pub fn get_viz_seq_len() -> Int { g_viz_seq_len.val }
pub fn get_viz_tokens() -> String { g_viz_tokens_str.val }
pub fn get_viz_attn_flat() -> Array[Double] { g_viz_attn_flat.val }
pub fn get_viz_hidden_flat() -> Array[Double] { g_viz_hidden.val }
pub fn get_viz_mlp_acts_flat() -> Array[Double] { g_viz_mlp_acts.val }
pub fn get_viz_logits_flat() -> Array[Double] { g_viz_logits.val }

// ---------------------------------------------------------------------------
// Residual stream capture: 各サブレイヤー通過後の中間状態を記録
// n_steps = 1 + 2*n_layer : [input, +attn_L0, +mlp_L0, ...]
// Layout: [n_steps × seq × n_embd]
// ---------------------------------------------------------------------------

// pos emb path viz: save token IDs for the current phrase (enc-dec: with BOS, GPT: no BOS)
pub fn run_residual_viz(phrase : String) -> Unit {
  let w2i = g_word2idx.val
  let toks : Array[Int] = []
  if not(g_gpt_mode.val) {
    toks.push(g_bos.val)
  }
  for word in split_words(phrase) {
    match w2i.get(word) {
      Some(idx) => toks.push(idx)
      None => ()
    }
  }
  let seq = if block_size < toks.length() { block_size } else { toks.length() }
  g_viz_src_toks.val = toks[0:seq].to_array()
}

// ---------------------------------------------------------------------------
// Network flow visualization: full encoder-decoder pass
//
// Encoder flat per position [enc_seq × (5 × n_embd)]:
//   tok_emb(ne), pos_emb(ne), x_init(ne), x_post_attn(ne), x_post_mlp(ne)
//
// Decoder flat per position [dec_seq × (6 × n_embd + vocab_size)]:
//   tok_emb(ne), pos_emb(ne), x_init(ne),
//   x_post_sattn(ne), x_post_xattn(ne), x_post_mlp(ne), logits(VS)
//
// Encoder self-attn: [n_head × enc_seq × enc_seq]
// Decoder self-attn: [n_head × dec_seq × dec_seq]
// Cross-attn:        [n_head × dec_seq × enc_seq]
// ---------------------------------------------------------------------------

pub fn run_network_viz(src_phrase : String, dec_pos : Int) -> Unit {
  if g_gpt_mode.val {
    run_network_viz_gpt(src_phrase, dec_pos)
    return
  }
  let w2i = g_word2idx.val
  let bos = g_bos.val
  let vocab = g_vocab.val

  // Tokenize src phrase
  let src_toks : Array[Int] = []
  let src_words : Array[String] = []
  for word in split_words(src_phrase) {
    match w2i.get(word) {
      Some(idx) => {
        src_toks.push(idx)
        src_words.push(word)
      }
      None => ()
    }
  }
  let enc_len = if src_toks.length() > block_size {
    block_size
  } else {
    src_toks.length()
  }
  if enc_len == 0 {
    g_net_src_len.val = 0
    g_net_tgt_len.val = 0
    return
  }
  let src_toks_clamped = src_toks[0:enc_len].to_array()

  // Encoder forward (float)
  let (enc_out, enc_self_attn) = encoder_forward_f(src_toks_clamped)

  // Precompute cross-attn K, V (float)
  let cross_k_f : Array[Array[Array[Double]]] = []
  let cross_v_f : Array[Array[Array[Double]]] = []
  for li in 0..<n_layer {
    let ck : Array[Array[Double]] = []
    let cv : Array[Array[Double]] = []
    for t in 0..<enc_len {
      ck.push(linear_f(enc_out[t], g_dec_xk.val[li]))
      cv.push(linear_f(enc_out[t], g_dec_xv.val[li]))
    }
    cross_k_f.push(ck)
    cross_v_f.push(cv)
  }

  // Decoder: autoregressive from BOS, collect up to dec_pos+1 steps
  let max_dec = block_size
  let dec_keys_f : Array[Array[Array[Double]]] = []
  let dec_vals_f : Array[Array[Array[Double]]] = []
  for _ in 0..<n_layer {
    dec_keys_f.push([])
    dec_vals_f.push([])
  }

  let dec_tok_ids : Array[Int] = []
  let dec_words : Array[String] = []
  let mut cur_tok = bos
  dec_words.push("<BOS>")
  dec_tok_ids.push(bos)

  let dec_post_sattn : Array[Array[Double]] = []
  let dec_post_xattn : Array[Array[Double]] = []
  let dec_post_mlp : Array[Array[Double]] = []
  let dec_logits_all : Array[Array[Double]] = []
  // self_attn per dec step: [dec_seq][n_head][t_len]
  let dec_self_attn_steps : Array[Array[Array[Double]]] = []
  // cross_attn per dec step: [dec_seq][n_head][enc_seq]
  let dec_cross_attn_steps : Array[Array[Array[Double]]] = []

  for pos_id in 0..<max_dec {
    let token_id = cur_tok
    let (ps, px, pm, lg, sa, ca) = decoder_step_f(
      token_id, pos_id,
      dec_keys_f, dec_vals_f, cross_k_f, cross_v_f
    )
    dec_post_sattn.push(ps)
    dec_post_xattn.push(px)
    dec_post_mlp.push(pm)
    dec_logits_all.push(lg)
    dec_self_attn_steps.push(sa)
    dec_cross_attn_steps.push(ca)

    // Pick top-1 for next token
    let probs = softmax_f(lg)
    let mut best = 0
    for k in 1..<g_vocab_size.val {
      if probs[k] > probs[best] { best = k }
    }
    cur_tok = best
    if best == bos { break }
    if best < vocab.length() {
      dec_words.push(vocab[best])
      dec_tok_ids.push(best)
    }
  }
  let dec_len = dec_post_sattn.length()

  // Build source token string
  let src_buf = StringBuilder::new()
  for i in 0..<enc_len {
    if i > 0 { src_buf.write_char('|') }
    if i < src_words.length() { src_buf.write_string(src_words[i]) }
  }
  g_net_src_tokens_str.val = src_buf.to_string()

  // Build decoder token string
  let tgt_buf = StringBuilder::new()
  for i in 0..<dec_words.length() {
    if i > 0 { tgt_buf.write_char('|') }
    tgt_buf.write_string(dec_words[i])
  }
  g_net_tgt_tokens_str.val = tgt_buf.to_string()

  g_net_src_len.val = enc_len
  g_net_tgt_len.val = dec_len

  // Encoder flat: [enc_len × 5 × n_embd]
  let enc_flat : Array[Double] = []
  for pos in 0..<enc_len {
    // tok_emb
    for d in 0..<n_embd {
      enc_flat.push(g_wte.val[src_toks_clamped[pos]][d].data)
    }
    // pos_emb
    for d in 0..<n_embd {
      enc_flat.push(g_wpe_enc.val[pos][d].data)
    }
    // x_init (tok+pos before norm)
    let tok_emb_v = g_wte.val[src_toks_clamped[pos]]
    let pos_emb_v = g_wpe_enc.val[pos]
    for d in 0..<n_embd {
      enc_flat.push(tok_emb_v[d].data + pos_emb_v[d].data)
    }
    // x_post_attn, x_post_mlp — use enc_out (post all layers)
    for d in 0..<n_embd {
      enc_flat.push(enc_out[pos][d])
    }
    for d in 0..<n_embd {
      enc_flat.push(enc_out[pos][d])
    }
  }
  g_net_enc_flat.val = enc_flat

  // Decoder flat: [dec_len × (6×n_embd + VS)]
  let vs = g_vocab_size.val
  let dec_flat : Array[Double] = []
  for pos in 0..<dec_len {
    let token_id = dec_tok_ids[pos]
    // tok_emb
    for d in 0..<n_embd {
      dec_flat.push(g_wte.val[token_id][d].data)
    }
    // pos_emb
    for d in 0..<n_embd {
      dec_flat.push(g_wpe_dec.val[pos][d].data)
    }
    // x_init
    for d in 0..<n_embd {
      dec_flat.push(g_wte.val[token_id][d].data + g_wpe_dec.val[pos][d].data)
    }
    // x_post_sattn
    for d in 0..<n_embd { dec_flat.push(dec_post_sattn[pos][d]) }
    // x_post_xattn
    for d in 0..<n_embd { dec_flat.push(dec_post_xattn[pos][d]) }
    // x_post_mlp
    for d in 0..<n_embd { dec_flat.push(dec_post_mlp[pos][d]) }
    // logits
    for d in 0..<vs { dec_flat.push(dec_logits_all[pos][d]) }
  }
  g_net_dec_flat.val = dec_flat

  // Encoder Q, K, V: [n_head × enc_len × head_dim] each
  let all_eq : Array[Array[Double]] = []
  let all_ek : Array[Array[Double]] = []
  let all_ev : Array[Array[Double]] = []
  for pos in 0..<enc_len {
    let te = g_wte.val[src_toks_clamped[pos]]
    let pe = g_wpe_enc.val[pos]
    let xi : Array[Double] = []
    for d in 0..<n_embd { xi.push(te[d].data + pe[d].data) }
    let xn = rmsnorm_f(xi)
    all_eq.push(linear_f(xn, g_enc_wq.val[0]))
    all_ek.push(linear_f(xn, g_enc_wk.val[0]))
    all_ev.push(linear_f(xn, g_enc_wv.val[0]))
  }
  let enc_q_flat : Array[Double] = []
  let enc_k_flat : Array[Double] = []
  let enc_v_flat : Array[Double] = []
  for h in 0..<n_head {
    let hs = h * head_dim
    for pos in 0..<enc_len {
      for j in 0..<head_dim {
        enc_q_flat.push(all_eq[pos][hs + j])
        enc_k_flat.push(all_ek[pos][hs + j])
        enc_v_flat.push(all_ev[pos][hs + j])
      }
    }
  }
  g_net_enc_q_flat.val = enc_q_flat
  g_net_enc_k_flat.val = enc_k_flat
  g_net_enc_v_flat.val = enc_v_flat

  // Decoder Q, K, V: [n_head × dec_len × head_dim] each
  let all_dq : Array[Array[Double]] = []
  let all_dk : Array[Array[Double]] = []
  let all_dv : Array[Array[Double]] = []
  for pos in 0..<dec_len {
    let token_id = dec_tok_ids[pos]
    let te = g_wte.val[token_id]
    let pe = g_wpe_dec.val[pos]
    let xi : Array[Double] = []
    for d in 0..<n_embd { xi.push(te[d].data + pe[d].data) }
    let xn = rmsnorm_f(xi)
    all_dq.push(linear_f(xn, g_dec_wq.val[0]))
    all_dk.push(linear_f(xn, g_dec_wk.val[0]))
    all_dv.push(linear_f(xn, g_dec_wv.val[0]))
  }
  let dec_q_flat : Array[Double] = []
  let dec_k_flat : Array[Double] = []
  let dec_v_flat : Array[Double] = []
  for h in 0..<n_head {
    let hs = h * head_dim
    for pos in 0..<dec_len {
      for j in 0..<head_dim {
        dec_q_flat.push(all_dq[pos][hs + j])
        dec_k_flat.push(all_dk[pos][hs + j])
        dec_v_flat.push(all_dv[pos][hs + j])
      }
    }
  }
  g_net_dec_q_flat.val = dec_q_flat
  g_net_dec_k_flat.val = dec_k_flat
  g_net_dec_v_flat.val = dec_v_flat

  // Encoder head outputs: A×V per head, [n_head × enc_len × head_dim]
  let attn_scale = @math.pow(head_dim.to_double(), -0.5)
  let enc_ho_flat : Array[Double] = []
  for h in 0..<n_head {
    let hs = h * head_dim
    for pos2 in 0..<enc_len {
      let q_h = all_eq[pos2][hs:hs + head_dim].to_array()
      let logits : Array[Double] = []
      for t in 0..<enc_len {
        let k_h = all_ek[t][hs:hs + head_dim].to_array()
        let mut dot = 0.0
        for j in 0..<head_dim { dot += q_h[j] * k_h[j] }
        logits.push(dot * attn_scale)
      }
      let aw = softmax_f(logits)
      for j in 0..<head_dim {
        let mut acc = 0.0
        for t in 0..<enc_len {
          acc += aw[t] * all_ev[t][hs + j]
        }
        enc_ho_flat.push(acc)
      }
    }
  }
  g_net_enc_ho_flat.val = enc_ho_flat

  // Decoder head outputs: causal A×V, [n_head × dec_len × head_dim]
  let dec_ho_flat : Array[Double] = []
  for h in 0..<n_head {
    let hs = h * head_dim
    for pos2 in 0..<dec_len {
      let q_h = all_dq[pos2][hs:hs + head_dim].to_array()
      let logits : Array[Double] = []
      for t in 0..<dec_len {
        if t <= pos2 {
          let k_h = all_dk[t][hs:hs + head_dim].to_array()
          let mut dot = 0.0
          for j in 0..<head_dim { dot += q_h[j] * k_h[j] }
          logits.push(dot * attn_scale)
        } else {
          logits.push(-1.0e9)
        }
      }
      let aw = softmax_f(logits)
      for j in 0..<head_dim {
        let mut acc = 0.0
        for t in 0..<dec_len {
          acc += aw[t] * all_dv[t][hs + j]
        }
        dec_ho_flat.push(acc)
      }
    }
  }
  g_net_dec_ho_flat.val = dec_ho_flat

  // Encoder self-attn: [n_head × enc_seq × enc_seq]
  let enc_sa_flat : Array[Double] = []
  for h in 0..<n_head {
    for qi in 0..<enc_len {
      for ki in 0..<enc_len {
        if h < enc_self_attn.length() && qi < enc_self_attn[h].length() {
          enc_sa_flat.push(enc_self_attn[h][qi][ki])
        } else {
          enc_sa_flat.push(0.0)
        }
      }
    }
  }
  g_net_enc_self_attn.val = enc_sa_flat

  // Decoder self-attn: [n_head × dec_len × dec_len] (causal, pad with 0)
  let dec_sa_flat : Array[Double] = []
  for h in 0..<n_head {
    for qi in 0..<dec_len {
      let sa = dec_self_attn_steps[qi]
      for ki in 0..<dec_len {
        if h < sa.length() && ki < sa[h].length() {
          dec_sa_flat.push(sa[h][ki])
        } else {
          dec_sa_flat.push(0.0)
        }
      }
    }
  }
  g_net_dec_self_attn.val = dec_sa_flat

  // Cross-attn: [n_head × dec_len × enc_len]
  let ca_flat : Array[Double] = []
  for h in 0..<n_head {
    for qi in 0..<dec_len {
      let ca = dec_cross_attn_steps[qi]
      for ki in 0..<enc_len {
        if h < ca.length() && ki < ca[h].length() {
          ca_flat.push(ca[h][ki])
        } else {
          ca_flat.push(0.0)
        }
      }
    }
  }
  g_net_cross_attn.val = ca_flat

  // Cross-attention head outputs: A×V_enc, [n_head × dec_len × head_dim]
  let cross_ho_flat : Array[Double] = []
  for h in 0..<n_head {
    let hs = h * head_dim
    for pos2 in 0..<dec_len {
      let ca_step = dec_cross_attn_steps[pos2]
      if h < ca_step.length() {
        let aw = ca_step[h]
        for j in 0..<head_dim {
          let mut acc = 0.0
          for t in 0..<enc_len {
            acc += aw[t] * cross_v_f[0][t][hs + j]
          }
          cross_ho_flat.push(acc)
        }
      } else {
        for _ in 0..<head_dim {
          cross_ho_flat.push(0.0)
        }
      }
    }
  }
  g_net_cross_ho_flat.val = cross_ho_flat

  // Backward-compat: point old globals to decoder data
  g_net_flat.val = dec_flat
  g_net_attn.val = ca_flat
  g_net_seq.val = dec_len
  g_net_pos.val = if dec_pos < dec_len { dec_pos } else { dec_len - 1 }
}

pub fn get_network_viz_enc_flat() -> Array[Double] { g_net_enc_flat.val }
pub fn get_network_viz_dec_flat() -> Array[Double] { g_net_dec_flat.val }
pub fn get_network_viz_enc_q_flat() -> Array[Double] { g_net_enc_q_flat.val }
pub fn get_network_viz_enc_k_flat() -> Array[Double] { g_net_enc_k_flat.val }
pub fn get_network_viz_enc_v_flat() -> Array[Double] { g_net_enc_v_flat.val }
pub fn get_network_viz_dec_q_flat() -> Array[Double] { g_net_dec_q_flat.val }
pub fn get_network_viz_dec_k_flat() -> Array[Double] { g_net_dec_k_flat.val }
pub fn get_network_viz_dec_v_flat() -> Array[Double] { g_net_dec_v_flat.val }
pub fn get_network_viz_enc_ho_flat() -> Array[Double] { g_net_enc_ho_flat.val }
pub fn get_network_viz_dec_ho_flat() -> Array[Double] { g_net_dec_ho_flat.val }
pub fn get_network_viz_cross_ho_flat() -> Array[Double] { g_net_cross_ho_flat.val }
pub fn get_network_viz_enc_self_attn() -> Array[Double] { g_net_enc_self_attn.val }
pub fn get_network_viz_dec_self_attn() -> Array[Double] { g_net_dec_self_attn.val }
pub fn get_network_viz_cross_attn() -> Array[Double] { g_net_cross_attn.val }
pub fn get_network_viz_src_len() -> Int { g_net_src_len.val }
pub fn get_network_viz_tgt_len() -> Int { g_net_tgt_len.val }
pub fn get_network_viz_src_tokens() -> String { g_net_src_tokens_str.val }
pub fn get_network_viz_tgt_tokens() -> String { g_net_tgt_tokens_str.val }

// Backward-compat getters
pub fn get_network_viz_flat() -> Array[Double] { g_net_flat.val }
pub fn get_network_viz_attn() -> Array[Double] { g_net_attn.val }
pub fn get_network_viz_seq() -> Int { g_net_seq.val }
pub fn get_network_viz_pos() -> Int { g_net_pos.val }

// ---------------------------------------------------------------------------
// GPT mode: network visualization (decoder only)
// ---------------------------------------------------------------------------

fn run_network_viz_gpt(prompt : String, dec_pos : Int) -> Unit {
  let w2i = g_word2idx.val
  let bos = g_bos.val
  let vocab = g_vocab.val

  // Tokenize prompt (BOS + words)
  let prompt_toks : Array[Int] = [bos]
  let prompt_words : Array[String] = ["<BOS>"]
  for word in split_words(prompt) {
    match w2i.get(word) {
      Some(idx) => {
        prompt_toks.push(idx)
        prompt_words.push(word)
      }
      None => ()
    }
  }
  let prompt_len = if prompt_toks.length() > block_size { block_size } else { prompt_toks.length() }
  if prompt_len == 0 {
    g_net_src_len.val = 0
    g_net_tgt_len.val = 0
    return
  }

  // Run decoder autoregressively
  let dec_keys_f : Array[Array[Array[Double]]] = []
  let dec_vals_f : Array[Array[Array[Double]]] = []
  for _ in 0..<n_layer {
    dec_keys_f.push([])
    dec_vals_f.push([])
  }
  let empty : Array[Array[Array[Double]]] = []

  let dec_tok_ids : Array[Int] = []
  let dec_words : Array[String] = []
  let dec_post_sattn : Array[Array[Double]] = []
  let dec_post_xattn : Array[Array[Double]] = []
  let dec_post_mlp : Array[Array[Double]] = []
  let dec_logits_all : Array[Array[Double]] = []
  let dec_self_attn_steps : Array[Array[Array[Double]]] = []

  // Feed prompt tokens
  for i in 0..<prompt_len {
    dec_tok_ids.push(prompt_toks[i])
    dec_words.push(prompt_words[i])
    let (ps, px, pm, lg, sa, _) = decoder_step_f(
      prompt_toks[i], i, dec_keys_f, dec_vals_f, empty, empty
    )
    dec_post_sattn.push(ps)
    dec_post_xattn.push(px)
    dec_post_mlp.push(pm)
    dec_logits_all.push(lg)
    dec_self_attn_steps.push(sa)
  }

  // Continue generating
  let mut cur_tok = {
    let probs = softmax_f(dec_logits_all[prompt_len - 1])
    let mut best = 0
    for k in 1..<g_vocab_size.val {
      if probs[k] > probs[best] { best = k }
    }
    best
  }
  let mut pos = prompt_len
  while pos < block_size && cur_tok != bos {
    dec_tok_ids.push(cur_tok)
    if cur_tok < vocab.length() { dec_words.push(vocab[cur_tok]) } else { dec_words.push("?") }
    let (ps, px, pm, lg, sa, _) = decoder_step_f(
      cur_tok, pos, dec_keys_f, dec_vals_f, empty, empty
    )
    dec_post_sattn.push(ps)
    dec_post_xattn.push(px)
    dec_post_mlp.push(pm)
    dec_logits_all.push(lg)
    dec_self_attn_steps.push(sa)
    let probs = softmax_f(lg)
    let mut best = 0
    for k in 1..<g_vocab_size.val {
      if probs[k] > probs[best] { best = k }
    }
    cur_tok = best
    pos += 1
  }
  let dec_len = dec_post_sattn.length()

  // Token strings
  let tgt_buf = StringBuilder::new()
  for i in 0..<dec_words.length() {
    if i > 0 { tgt_buf.write_char('|') }
    tgt_buf.write_string(dec_words[i])
  }
  g_net_tgt_tokens_str.val = tgt_buf.to_string()
  g_net_src_tokens_str.val = ""
  g_net_src_len.val = 0
  g_net_tgt_len.val = dec_len

  // Encoder flat: empty in GPT mode
  g_net_enc_flat.val = []
  g_net_enc_self_attn.val = []
  g_net_enc_q_flat.val = []
  g_net_enc_k_flat.val = []
  g_net_enc_v_flat.val = []
  g_net_enc_ho_flat.val = []
  g_net_cross_attn.val = []
  g_net_cross_ho_flat.val = []

  // Decoder flat: [dec_len × (6×n_embd + VS)] — x_post_xattn = x_post_sattn in GPT mode
  let vs = g_vocab_size.val
  let dec_flat : Array[Double] = []
  for p in 0..<dec_len {
    let token_id = dec_tok_ids[p]
    for d in 0..<n_embd { dec_flat.push(g_wte.val[token_id][d].data) }
    for d in 0..<n_embd { dec_flat.push(g_wpe_dec.val[p][d].data) }
    for d in 0..<n_embd { dec_flat.push(g_wte.val[token_id][d].data + g_wpe_dec.val[p][d].data) }
    for d in 0..<n_embd { dec_flat.push(dec_post_sattn[p][d]) }
    for d in 0..<n_embd { dec_flat.push(dec_post_xattn[p][d]) }
    for d in 0..<n_embd { dec_flat.push(dec_post_mlp[p][d]) }
    for d in 0..<vs { dec_flat.push(dec_logits_all[p][d]) }
  }
  g_net_dec_flat.val = dec_flat

  // Decoder Q, K, V
  let all_dq : Array[Array[Double]] = []
  let all_dk : Array[Array[Double]] = []
  let all_dv : Array[Array[Double]] = []
  for p in 0..<dec_len {
    let te = g_wte.val[dec_tok_ids[p]]
    let pe = g_wpe_dec.val[p]
    let xi : Array[Double] = []
    for d in 0..<n_embd { xi.push(te[d].data + pe[d].data) }
    let xn = rmsnorm_f(xi)
    all_dq.push(linear_f(xn, g_dec_wq.val[0]))
    all_dk.push(linear_f(xn, g_dec_wk.val[0]))
    all_dv.push(linear_f(xn, g_dec_wv.val[0]))
  }
  let dec_q_flat : Array[Double] = []
  let dec_k_flat : Array[Double] = []
  let dec_v_flat : Array[Double] = []
  for h in 0..<n_head {
    let hs = h * head_dim
    for p in 0..<dec_len {
      for j in 0..<head_dim {
        dec_q_flat.push(all_dq[p][hs + j])
        dec_k_flat.push(all_dk[p][hs + j])
        dec_v_flat.push(all_dv[p][hs + j])
      }
    }
  }
  g_net_dec_q_flat.val = dec_q_flat
  g_net_dec_k_flat.val = dec_k_flat
  g_net_dec_v_flat.val = dec_v_flat

  // Decoder head outputs (causal A×V)
  let attn_scale = @math.pow(head_dim.to_double(), -0.5)
  let dec_ho_flat : Array[Double] = []
  for h in 0..<n_head {
    let hs = h * head_dim
    for pos2 in 0..<dec_len {
      let q_h = all_dq[pos2][hs:hs + head_dim].to_array()
      let logits_h : Array[Double] = []
      for t in 0..<dec_len {
        if t <= pos2 {
          let k_h = all_dk[t][hs:hs + head_dim].to_array()
          let mut dot = 0.0
          for j in 0..<head_dim { dot += q_h[j] * k_h[j] }
          logits_h.push(dot * attn_scale)
        } else {
          logits_h.push(-1.0e9)
        }
      }
      let aw = softmax_f(logits_h)
      for j in 0..<head_dim {
        let mut acc = 0.0
        for t in 0..<dec_len { acc += aw[t] * all_dv[t][hs + j] }
        dec_ho_flat.push(acc)
      }
    }
  }
  g_net_dec_ho_flat.val = dec_ho_flat

  // Decoder self-attn: [n_head × dec_len × dec_len]
  let dec_sa_flat : Array[Double] = []
  for h in 0..<n_head {
    for qi in 0..<dec_len {
      let sa = dec_self_attn_steps[qi]
      for ki in 0..<dec_len {
        if h < sa.length() && ki < sa[h].length() {
          dec_sa_flat.push(sa[h][ki])
        } else {
          dec_sa_flat.push(0.0)
        }
      }
    }
  }
  g_net_dec_self_attn.val = dec_sa_flat

  // Backward-compat
  g_net_flat.val = dec_flat
  g_net_attn.val = []
  g_net_seq.val = dec_len
  g_net_pos.val = if dec_pos < dec_len { dec_pos } else { dec_len - 1 }
}

// ---------------------------------------------------------------------------
// Cosine similarity between token embeddings
// ---------------------------------------------------------------------------

pub fn get_embedding_similarity() -> Array[Double] {
  let wte = g_wte.val
  let vs = g_vocab_size.val
  let norms : Array[Double] = []
  for i in 0..<vs {
    let mut s = 0.0
    for d in wte[i] {
      s += d.data * d.data
    }
    norms.push(@math.pow(s, 0.5))
  }
  let out : Array[Double] = []
  for i in 0..<vs {
    for j in 0..<vs {
      let mut dot = 0.0
      for d in 0..<n_embd {
        dot += wte[i][d].data * wte[j][d].data
      }
      let denom = norms[i] * norms[j]
      out.push(if denom < 1.0e-10 { 0.0 } else { dot / denom })
    }
  }
  out
}

// Returns "|"-delimited vocabulary words (last entry is "<BOS>")
pub fn get_vocab_string() -> String {
  let buf = StringBuilder::new()
  let words = g_vocab.val
  for i in 0..<words.length() {
    if i > 0 {
      buf.write_char('|')
    }
    buf.write_string(words[i])
  }
  buf.write_string("|<BOS>")
  buf.to_string()
}
