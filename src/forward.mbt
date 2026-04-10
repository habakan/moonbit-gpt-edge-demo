// ---------------------------------------------------------------------------
// Encoder forward (bidirectional self-attention, processes full src sequence)
// Returns: Array of n_embd vectors, one per src position
// ---------------------------------------------------------------------------

fn encoder_forward(src_toks : Array[Int]) -> Array[Array[Value]] {
  let src_len = src_toks.length()
  let scale = @math.pow(head_dim.to_double(), -0.5)

  // Build initial embeddings
  let mut xs : Array[Array[Value]] = []
  for pos in 0..<src_len {
    let tok_emb = g_wte.val[src_toks[pos]]
    let x : Array[Value] = []
    if g_use_pos_emb.val {
      let pos_emb = g_wpe_enc.val[pos]
      for i in 0..<n_embd {
        x.push(tok_emb[i] + pos_emb[i])
      }
    } else {
      for i in 0..<n_embd {
        x.push(tok_emb[i])
      }
    }
    xs.push(x)
  }

  for li in 0..<n_layer {
    // Compute normalized input + K, V for all positions at once
    let all_xn : Array[Array[Value]] = []
    let all_k : Array[Array[Value]] = []
    let all_v : Array[Array[Value]] = []
    for pos in 0..<src_len {
      let xn = rmsnorm(xs[pos])
      all_xn.push(xn)
      all_k.push(linear(xn, g_enc_wk.val[li]))
      all_v.push(linear(xn, g_enc_wv.val[li]))
    }

    // Bidirectional multi-head attention for each position
    let new_xs : Array[Array[Value]] = []
    for pos in 0..<src_len {
      let x_res = xs[pos]

      let x_attn : Array[Value] = []
      if g_use_attn.val {
        let q = linear(all_xn[pos], g_enc_wq.val[li])
        for h in 0..<n_head {
          let hs = h * head_dim
          let q_h = q[hs:hs + head_dim].to_array()
          let attn_logits : Array[Value] = []
          for t in 0..<src_len {
            let k_h = all_k[t][hs:hs + head_dim].to_array()
            let mut dot = v_leaf(0.0)
            for j in 0..<head_dim {
              dot = dot + q_h[j] * k_h[j]
            }
            attn_logits.push(dot * v_leaf(scale))
          }
          let attn_w = softmax(attn_logits)
          for j in 0..<head_dim {
            let mut acc = v_leaf(0.0)
            for t in 0..<src_len {
              let v_h = all_v[t][hs:hs + head_dim].to_array()
              acc = acc + attn_w[t] * v_h[j]
            }
            x_attn.push(acc)
          }
        }
      } else {
        for _ in 0..<n_embd { x_attn.push(v_leaf(0.0)) }
      }

      let attn_out = if g_use_attn.val { linear(x_attn, g_enc_wo.val[li]) } else { x_attn }
      let mut x2 : Array[Value] = []
      for i in 0..<n_embd {
        x2.push(if g_use_skip.val { attn_out[i] + x_res[i] } else { attn_out[i] })
      }

      // Feed-forward
      let x_res2 = x2
      x2 = rmsnorm(x2)
      x2 = linear(x2, g_enc_fc1.val[li])
      let x2r : Array[Value] = []
      for xi in x2 {
        x2r.push(xi.v_relu())
      }
      x2 = linear(x2r, g_enc_fc2.val[li])
      let x3 : Array[Value] = []
      for i in 0..<n_embd {
        x3.push(if g_use_skip.val { x2[i] + x_res2[i] } else { x2[i] })
      }
      new_xs.push(x3)
    }
    xs = new_xs
  }
  xs
}

// ---------------------------------------------------------------------------
// Decoder step (one token at a time, causal self-attn + cross-attn)
// cross_k / cross_v: [n_layer][src_len][n_embd] precomputed from encoder output
// Returns: logits (vocab_size)
// ---------------------------------------------------------------------------

fn decoder_step(
  token_id : Int,
  pos_id : Int,
  dec_keys : Array[Array[Array[Value]]],
  dec_vals : Array[Array[Array[Value]]],
  cross_k : Array[Array[Array[Value]]],
  cross_v : Array[Array[Array[Value]]]
) -> Array[Value] {
  let scale = @math.pow(head_dim.to_double(), -0.5)
  let tok_emb = g_wte.val[token_id]
  let mut x : Array[Value] = []
  if g_use_pos_emb.val {
    let pos_emb = g_wpe_dec.val[pos_id]
    for i in 0..<n_embd {
      x.push(tok_emb[i] + pos_emb[i])
    }
  } else {
    for i in 0..<n_embd {
      x.push(tok_emb[i])
    }
  }

  for li in 0..<n_layer {
    // 1. Masked self-attention (causal)
    let x_res = x
    let x_sattn : Array[Value] = []
    if g_use_attn.val {
      let xn = rmsnorm(x)
      let q = linear(xn, g_dec_wq.val[li])
      let k = linear(xn, g_dec_wk.val[li])
      let v = linear(xn, g_dec_wv.val[li])
      dec_keys[li].push(k)
      dec_vals[li].push(v)
      let t_len = dec_keys[li].length()
      for h in 0..<n_head {
        let hs = h * head_dim
        let q_h = q[hs:hs + head_dim].to_array()
        let attn_logits : Array[Value] = []
        for t in 0..<t_len {
          let k_h = dec_keys[li][t][hs:hs + head_dim].to_array()
          let mut dot = v_leaf(0.0)
          for j in 0..<head_dim {
            dot = dot + q_h[j] * k_h[j]
          }
          attn_logits.push(dot * v_leaf(scale))
        }
        let attn_w = softmax(attn_logits)
        for j in 0..<head_dim {
          let mut acc = v_leaf(0.0)
          for t in 0..<t_len {
            let v_h = dec_vals[li][t][hs:hs + head_dim].to_array()
            acc = acc + attn_w[t] * v_h[j]
          }
          x_sattn.push(acc)
        }
      }
    } else {
      for _ in 0..<n_embd { x_sattn.push(v_leaf(0.0)) }
    }
    let sattn_out = if g_use_attn.val { linear(x_sattn, g_dec_wo.val[li]) } else { x_sattn }
    let x2 : Array[Value] = []
    for i in 0..<n_embd {
      x2.push(if g_use_skip.val { sattn_out[i] + x_res[i] } else { sattn_out[i] })
    }

    // 2. Cross-attention (Q from decoder, K/V from encoder) — skipped in GPT mode
    let mut x3 : Array[Value] = x2
    if not(g_gpt_mode.val) {
      let x_res2 = x2
      let x_xattn : Array[Value] = []
      if g_use_attn.val {
        let xn2 = rmsnorm(x2)
        let xq = linear(xn2, g_dec_xq.val[li])
        let src_len = cross_k[li].length()
        for h in 0..<n_head {
          let hs = h * head_dim
          let q_h = xq[hs:hs + head_dim].to_array()
          let attn_logits : Array[Value] = []
          for t in 0..<src_len {
            let k_h = cross_k[li][t][hs:hs + head_dim].to_array()
            let mut dot = v_leaf(0.0)
            for j in 0..<head_dim {
              dot = dot + q_h[j] * k_h[j]
            }
            attn_logits.push(dot * v_leaf(scale))
          }
          let attn_w = softmax(attn_logits)
          for j in 0..<head_dim {
            let mut acc = v_leaf(0.0)
            for t in 0..<src_len {
              let v_h = cross_v[li][t][hs:hs + head_dim].to_array()
              acc = acc + attn_w[t] * v_h[j]
            }
            x_xattn.push(acc)
          }
        }
      } else {
        for _ in 0..<n_embd { x_xattn.push(v_leaf(0.0)) }
      }
      let xattn_out = if g_use_attn.val { linear(x_xattn, g_dec_xo.val[li]) } else { x_xattn }
      x3 = []
      for i in 0..<n_embd {
        x3.push(if g_use_skip.val { xattn_out[i] + x_res2[i] } else { xattn_out[i] })
      }
    }

    // 3. Feed-forward
    let x_res3 = x3
    x3 = rmsnorm(x3)
    x3 = linear(x3, g_dec_fc1.val[li])
    let x3r : Array[Value] = []
    for xi in x3 {
      x3r.push(xi.v_relu())
    }
    x3 = linear(x3r, g_dec_fc2.val[li])
    let x4 : Array[Value] = []
    for i in 0..<n_embd {
      x4.push(if g_use_skip.val { x3[i] + x_res3[i] } else { x3[i] })
    }
    x = x4
  }

  linear(x, g_lm_head.val)
}
