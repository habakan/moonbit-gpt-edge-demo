// ---------------------------------------------------------------------------
// RNG and weight initialization helpers
// ---------------------------------------------------------------------------

fn rng_next() -> Double {
  g_rng.val = g_rng.val * 6364136223846793005L + 1442695040888963407L
  let bits = g_rng.val.land(0x7fffffffffffffffL)
  bits.to_double() / 9223372036854775807.0
}

fn gauss(std : Double) -> Double {
  let u1c = {
    let u = rng_next()
    if u < 1.0e-15 { 1.0e-15 } else { u }
  }
  let u2 = rng_next()
  @math.pow(-2.0 * @math.ln(u1c), 0.5) * @math.cos(2.0 * @math.PI * u2) * std
}

fn make_matrix(nout : Int, nin : Int, std : Double) -> Array[Array[Value]] {
  let rows : Array[Array[Value]] = []
  for _ in 0..<nout {
    let row : Array[Value] = []
    for _ in 0..<nin {
      row.push(v_leaf(gauss(std)))
    }
    rows.push(row)
  }
  rows
}

fn collect_params(m : Array[Array[Value]], out : Array[Value]) -> Unit {
  for row in m {
    for p in row {
      out.push(p)
    }
  }
}

pub fn clear_raw_docs() -> Unit {
  g_raw_docs_override.val = []
}

pub fn push_raw_doc(phrase : String) -> Unit {
  g_raw_docs_override.val.push(phrase)
}

pub fn get_docs_string() -> String {
  let vocab = g_vocab.val
  let docs = g_docs.val
  let buf = StringBuilder::new()
  for i in 0..<docs.length() {
    if i > 0 { buf.write_char('|') }
    let doc = docs[i]
    for j in 0..<doc.length() {
      if j > 0 { buf.write_char(' ') }
      buf.write_string(vocab[doc[j]])
    }
  }
  buf.to_string()
}

pub fn add_custom_doc(phrase : String) -> Bool {
  let w2i = g_word2idx.val
  let toks : Array[Int] = []
  for word in split_words(phrase) {
    match w2i.get(word) {
      Some(idx) => toks.push(idx)
      None => ()
    }
  }
  if toks.length() < 2 {
    return false
  }
  g_docs.val.push(toks)
  true
}

pub fn set_gpt_mode(v : Bool) -> Unit {
  g_gpt_mode.val = v
}

pub fn get_gpt_mode() -> Bool {
  g_gpt_mode.val
}

pub fn set_use_skip(v : Bool) -> Unit {
  g_use_skip.val = v
}

pub fn get_use_skip() -> Bool {
  g_use_skip.val
}

pub fn set_use_pos_emb(v : Bool) -> Unit {
  g_use_pos_emb.val = v
}

pub fn get_use_pos_emb() -> Bool {
  g_use_pos_emb.val
}

pub fn set_use_attn(v : Bool) -> Unit {
  g_use_attn.val = v
}

pub fn get_use_attn() -> Bool {
  g_use_attn.val
}

// ---------------------------------------------------------------------------
// Model initialization
// ---------------------------------------------------------------------------

pub fn init_model() -> Unit {
  let docs_src = if g_raw_docs_override.val.length() > 0 {
    g_raw_docs_override.val
  } else {
    raw_docs
  }
  let word_set : @hashset.HashSet[String] = @hashset.HashSet::new()
  for doc in docs_src {
    for word in split_words(doc) {
      word_set.add(word)
    }
  }
  let vocab_arr : Array[String] = []
  for word in word_set.iter() {
    vocab_arr.push(word)
  }
  let nv = vocab_arr.length()
  for i in 1..<nv {
    let key = vocab_arr[i]
    let mut j = i - 1
    while j >= 0 && vocab_arr[j] > key {
      vocab_arr[j + 1] = vocab_arr[j]
      j -= 1
    }
    vocab_arr[j + 1] = key
  }
  let bos_id = vocab_arr.length()
  g_vocab.val = vocab_arr
  g_vocab_size.val = vocab_arr.length() + 1
  g_bos.val = bos_id

  let w2i : @hashmap.HashMap[String, Int] = @hashmap.HashMap::new()
  for i in 0..<vocab_arr.length() {
    w2i.set(vocab_arr[i], i)
  }
  g_word2idx.val = w2i

  // Tokenize docs (plain words, no BOS/EOS in stored form — added at use time)
  let tokenized : Array[Array[Int]] = []
  for doc in docs_src {
    let toks : Array[Int] = []
    for word in split_words(doc) {
      match w2i.get(word) {
        Some(idx) => toks.push(idx)
        None => ()
      }
    }
    tokenized.push(toks)
  }
  g_docs.val = tokenized

  let vocab_sz = g_vocab_size.val
  g_wte.val = make_matrix(vocab_sz, n_embd, 0.08)
  if not(g_gpt_mode.val) {
    g_wpe_enc.val = make_matrix(block_size, n_embd, 0.08)
  }
  g_wpe_dec.val = make_matrix(block_size, n_embd, 0.08)
  g_lm_head.val = make_matrix(vocab_sz, n_embd, 0.08)

  let enc_wq : Array[Array[Array[Value]]] = []
  let enc_wk : Array[Array[Array[Value]]] = []
  let enc_wv : Array[Array[Array[Value]]] = []
  let enc_wo : Array[Array[Array[Value]]] = []
  let enc_fc1 : Array[Array[Array[Value]]] = []
  let enc_fc2 : Array[Array[Array[Value]]] = []
  let dec_wq : Array[Array[Array[Value]]] = []
  let dec_wk : Array[Array[Array[Value]]] = []
  let dec_wv : Array[Array[Array[Value]]] = []
  let dec_wo : Array[Array[Array[Value]]] = []
  let dec_xq : Array[Array[Array[Value]]] = []
  let dec_xk : Array[Array[Array[Value]]] = []
  let dec_xv : Array[Array[Array[Value]]] = []
  let dec_xo : Array[Array[Array[Value]]] = []
  let dec_fc1 : Array[Array[Array[Value]]] = []
  let dec_fc2 : Array[Array[Array[Value]]] = []

  for _ in 0..<n_layer {
    if not(g_gpt_mode.val) {
      enc_wq.push(make_matrix(n_embd, n_embd, 0.08))
      enc_wk.push(make_matrix(n_embd, n_embd, 0.08))
      enc_wv.push(make_matrix(n_embd, n_embd, 0.08))
      enc_wo.push(make_matrix(n_embd, n_embd, 0.08))
      enc_fc1.push(make_matrix(4 * n_embd, n_embd, 0.08))
      enc_fc2.push(make_matrix(n_embd, 4 * n_embd, 0.08))
    }
    dec_wq.push(make_matrix(n_embd, n_embd, 0.08))
    dec_wk.push(make_matrix(n_embd, n_embd, 0.08))
    dec_wv.push(make_matrix(n_embd, n_embd, 0.08))
    dec_wo.push(make_matrix(n_embd, n_embd, 0.08))
    if not(g_gpt_mode.val) {
      dec_xq.push(make_matrix(n_embd, n_embd, 0.08))
      dec_xk.push(make_matrix(n_embd, n_embd, 0.08))
      dec_xv.push(make_matrix(n_embd, n_embd, 0.08))
      dec_xo.push(make_matrix(n_embd, n_embd, 0.08))
    }
    dec_fc1.push(make_matrix(4 * n_embd, n_embd, 0.08))
    dec_fc2.push(make_matrix(n_embd, 4 * n_embd, 0.08))
  }

  g_enc_wq.val = enc_wq
  g_enc_wk.val = enc_wk
  g_enc_wv.val = enc_wv
  g_enc_wo.val = enc_wo
  g_enc_fc1.val = enc_fc1
  g_enc_fc2.val = enc_fc2
  g_dec_wq.val = dec_wq
  g_dec_wk.val = dec_wk
  g_dec_wv.val = dec_wv
  g_dec_wo.val = dec_wo
  g_dec_xq.val = dec_xq
  g_dec_xk.val = dec_xk
  g_dec_xv.val = dec_xv
  g_dec_xo.val = dec_xo
  g_dec_fc1.val = dec_fc1
  g_dec_fc2.val = dec_fc2

  let params : Array[Value] = []
  collect_params(g_wte.val, params)
  if not(g_gpt_mode.val) {
    collect_params(g_wpe_enc.val, params)
  }
  collect_params(g_wpe_dec.val, params)
  collect_params(g_lm_head.val, params)
  for li in 0..<n_layer {
    if not(g_gpt_mode.val) {
      collect_params(g_enc_wq.val[li], params)
      collect_params(g_enc_wk.val[li], params)
      collect_params(g_enc_wv.val[li], params)
      collect_params(g_enc_wo.val[li], params)
      collect_params(g_enc_fc1.val[li], params)
      collect_params(g_enc_fc2.val[li], params)
    }
    collect_params(g_dec_wq.val[li], params)
    collect_params(g_dec_wk.val[li], params)
    collect_params(g_dec_wv.val[li], params)
    collect_params(g_dec_wo.val[li], params)
    if not(g_gpt_mode.val) {
      collect_params(g_dec_xq.val[li], params)
      collect_params(g_dec_xk.val[li], params)
      collect_params(g_dec_xv.val[li], params)
      collect_params(g_dec_xo.val[li], params)
    }
    collect_params(g_dec_fc1.val[li], params)
    collect_params(g_dec_fc2.val[li], params)
  }
  g_params.val = params

  let np = params.length()
  g_adam_m.val = Array::make(np, 0.0)
  g_adam_v.val = Array::make(np, 0.0)
  g_step.val = 0
  g_loss_history.val = []
}
