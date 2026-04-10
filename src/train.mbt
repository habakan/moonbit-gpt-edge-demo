// ---------------------------------------------------------------------------
// Training hyperparameters
// ---------------------------------------------------------------------------

let lr : Double = 0.01
let beta1 : Double = 0.85
let beta2 : Double = 0.99
let eps_adam : Double = 1.0e-8
let num_steps : Int = 2000

// ---------------------------------------------------------------------------
// Train step (AdamW)
// ---------------------------------------------------------------------------

pub fn train_step() -> Double {
  let step = g_step.val
  if step >= num_steps {
    return -1.0
  }
  g_next_id.val = 0

  let docs = g_docs.val
  let doc = docs[step % docs.length()]
  let bos = g_bos.val

  let losses : Array[Value] = []

  if g_gpt_mode.val {
    // GPT: LM objective — predict next token at each position
    let n = doc.length()
    if n < 2 {
      g_step.val = step + 1
      return 0.0
    }
    let seq_len = if n > block_size { block_size } else { n }
    let dec_keys : Array[Array[Array[Value]]] = []
    let dec_vals : Array[Array[Array[Value]]] = []
    for _ in 0..<n_layer {
      dec_keys.push([])
      dec_vals.push([])
    }
    let empty : Array[Array[Array[Value]]] = []
    for pos_id in 0..<(seq_len - 1) {
      let token_id = doc[pos_id]
      let target_id = doc[pos_id + 1]
      let logits = decoder_step(token_id, pos_id, dec_keys, dec_vals, empty, empty)
      let probs = softmax(logits)
      losses.push(probs[target_id].v_log().v_neg())
    }
  } else {
    // Encoder-Decoder: split doc at midpoint, encode src, decode tgt
    let total = doc.length()
    if total < 2 {
      g_step.val = step + 1
      return 0.0
    }
    let split = total / 2
    let enc_len = if split > block_size { block_size } else { split }
    let raw_tgt_len = total - split
    let dec_len = if raw_tgt_len > block_size - 1 { block_size - 1 } else { raw_tgt_len }
    if enc_len <= 0 || dec_len <= 0 {
      g_step.val = step + 1
      return 0.0
    }

    let src_toks : Array[Int] = []
    for i in 0..<enc_len {
      src_toks.push(doc[i])
    }
    let tgt_inputs : Array[Int] = [bos]
    let tgt_targets : Array[Int] = []
    for i in 0..<dec_len {
      tgt_inputs.push(doc[split + i])
      tgt_targets.push(doc[split + i])
    }
    tgt_targets.push(bos)

    let enc_out = encoder_forward(src_toks)
    let cross_k : Array[Array[Array[Value]]] = []
    let cross_v : Array[Array[Array[Value]]] = []
    for li in 0..<n_layer {
      let ck : Array[Array[Value]] = []
      let cv : Array[Array[Value]] = []
      for t in 0..<enc_len {
        ck.push(linear(enc_out[t], g_dec_xk.val[li]))
        cv.push(linear(enc_out[t], g_dec_xv.val[li]))
      }
      cross_k.push(ck)
      cross_v.push(cv)
    }

    let dec_keys : Array[Array[Array[Value]]] = []
    let dec_vals : Array[Array[Array[Value]]] = []
    for _ in 0..<n_layer {
      dec_keys.push([])
      dec_vals.push([])
    }

    let n_dec = tgt_targets.length()
    for pos_id in 0..<n_dec {
      let token_id = tgt_inputs[pos_id]
      let target_id = tgt_targets[pos_id]
      let logits = decoder_step(token_id, pos_id, dec_keys, dec_vals, cross_k, cross_v)
      let probs = softmax(logits)
      losses.push(probs[target_id].v_log().v_neg())
    }
  }

  let mut loss = v_leaf(0.0)
  for lt in losses {
    loss = loss + lt
  }
  loss = loss.v_div(v_leaf(losses.length().to_double()))

  v_backward(loss)

  let t = step + 1
  let lr_t = lr * (1.0 - step.to_double() / num_steps.to_double())
  let params = g_params.val
  let np = params.length()
  for i in 0..<np {
    let p = params[i]
    let g = p.grad
    g_adam_m.val[i] = beta1 * g_adam_m.val[i] + (1.0 - beta1) * g
    g_adam_v.val[i] = beta2 * g_adam_v.val[i] + (1.0 - beta2) * g * g
    let m_hat = g_adam_m.val[i] / (1.0 - @math.pow(beta1, t.to_double()))
    let v_hat = g_adam_v.val[i] / (1.0 - @math.pow(beta2, t.to_double()))
    p.data -= lr_t * m_hat / (@math.pow(v_hat, 0.5) + eps_adam)
    p.grad = 0.0
  }

  let loss_val = loss.data
  g_step.val = step + 1
  g_loss_history.val.push(loss_val)
  loss_val
}

// ---------------------------------------------------------------------------
// Generate (autoregressive decode)
// ---------------------------------------------------------------------------

fn sample_token(logits : Array[Value], temperature : Double, vocab_sz : Int, bos : Int) -> Int {
  let scaled : Array[Value] = []
  for l in logits {
    scaled.push(v_leaf(l.data / temperature))
  }
  let probs = softmax(scaled)
  let r = rng_next()
  let mut cumulative = 0.0
  let mut sampled = bos
  for k in 0..<vocab_sz {
    cumulative += probs[k].data
    if r <= cumulative {
      sampled = k
      break
    }
  }
  sampled
}

pub fn generate(src_phrase : String, temperature : Double) -> String {
  g_next_id.val = 0
  let w2i = g_word2idx.val
  let bos = g_bos.val
  let vocab = g_vocab.val
  let vocab_sz = g_vocab_size.val

  let dec_keys : Array[Array[Array[Value]]] = []
  let dec_vals : Array[Array[Array[Value]]] = []
  for _ in 0..<n_layer {
    dec_keys.push([])
    dec_vals.push([])
  }

  let words : Array[String] = []

  if g_gpt_mode.val {
    // GPT: プロンプトをコンテキストとして流し込んでから続きを生成
    let prompt_toks : Array[Int] = [bos]
    for word in split_words(src_phrase) {
      match w2i.get(word) {
        Some(idx) => prompt_toks.push(idx)
        None => ()
      }
    }
    let prompt_len = if prompt_toks.length() > block_size { block_size } else { prompt_toks.length() }
    let empty : Array[Array[Array[Value]]] = []

    // プロンプトを流し込む（KVキャッシュを積む）
    let mut last_logits : Array[Value] = []
    for pos_id in 0..<prompt_len {
      last_logits = decoder_step(prompt_toks[pos_id], pos_id, dec_keys, dec_vals, empty, empty)
    }

    // プロンプトの最後のトークンに続く単語を生成
    let mut token_id = sample_token(last_logits, temperature, vocab_sz, bos)
    for pos_id in prompt_len..<block_size {
      if token_id == bos { break }
      words.push(vocab[token_id])
      let logits = decoder_step(token_id, pos_id, dec_keys, dec_vals, empty, empty)
      token_id = sample_token(logits, temperature, vocab_sz, bos)
    }
  } else {
    // Encoder-Decoder: src をエンコードしてデコード
    let src_toks : Array[Int] = []
    for word in split_words(src_phrase) {
      match w2i.get(word) {
        Some(idx) => src_toks.push(idx)
        None => ()
      }
    }
    let enc_len = if src_toks.length() > block_size { block_size } else { src_toks.length() }
    if enc_len == 0 {
      return ""
    }
    let src_toks_clamped = src_toks[0:enc_len].to_array()
    let enc_out = encoder_forward(src_toks_clamped)

    let cross_k : Array[Array[Array[Value]]] = []
    let cross_v : Array[Array[Array[Value]]] = []
    for li in 0..<n_layer {
      let ck : Array[Array[Value]] = []
      let cv : Array[Array[Value]] = []
      for t in 0..<enc_len {
        ck.push(linear(enc_out[t], g_dec_xk.val[li]))
        cv.push(linear(enc_out[t], g_dec_xv.val[li]))
      }
      cross_k.push(ck)
      cross_v.push(cv)
    }

    let mut token_id = bos
    for pos_id in 0..<block_size {
      let logits = decoder_step(token_id, pos_id, dec_keys, dec_vals, cross_k, cross_v)
      token_id = sample_token(logits, temperature, vocab_sz, bos)
      if token_id == bos { break }
      words.push(vocab[token_id])
    }
  }

  let buf = StringBuilder::new()
  for i in 0..<words.length() {
    if i > 0 { buf.write_char(' ') }
    buf.write_string(words[i])
  }
  buf.to_string()
}

pub fn get_step() -> Int {
  g_step.val
}

pub fn get_num_steps() -> Int {
  num_steps
}
