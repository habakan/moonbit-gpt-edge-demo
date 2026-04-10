// ---------------------------------------------------------------------------
// Float encoder: returns (outputs[src_len][n_embd], self_attn[n_head][src_len][src_len])
// ---------------------------------------------------------------------------

fn encoder_forward_f(
  src_toks : Array[Int]
) -> (Array[Array[Double]], Array[Array[Array[Double]]]) {
  let src_len = src_toks.length()
  let scale = @math.pow(head_dim.to_double(), -0.5)

  let mut xs : Array[Array[Double]] = []
  for pos in 0..<src_len {
    let tok_emb = g_wte.val[src_toks[pos]]
    let x : Array[Double] = []
    if g_use_pos_emb.val {
      let pos_emb = g_wpe_enc.val[pos]
      for i in 0..<n_embd {
        x.push(tok_emb[i].data + pos_emb[i].data)
      }
    } else {
      for i in 0..<n_embd {
        x.push(tok_emb[i].data)
      }
    }
    xs.push(x)
  }

  // self_attn[layer][head][qi][ki] — keep last layer only
  let mut last_self_attn : Array[Array[Array[Double]]] = []

  for li in 0..<n_layer {
    let all_xn : Array[Array[Double]] = []
    let all_k : Array[Array[Double]] = []
    let all_v : Array[Array[Double]] = []
    for pos in 0..<src_len {
      let xn = rmsnorm_f(xs[pos])
      all_xn.push(xn)
      all_k.push(linear_f(xn, g_enc_wk.val[li]))
      all_v.push(linear_f(xn, g_enc_wv.val[li]))
    }

    let head_attn : Array[Array[Array[Double]]] = []
    for _ in 0..<n_head {
      let row : Array[Array[Double]] = []
      for _ in 0..<src_len {
        row.push(Array::make(src_len, 0.0))
      }
      head_attn.push(row)
    }

    let new_xs : Array[Array[Double]] = []
    for pos in 0..<src_len {
      let x_res = xs[pos]

      let x_attn : Array[Double] = []
      if g_use_attn.val {
        let q = linear_f(all_xn[pos], g_enc_wq.val[li])
        for h in 0..<n_head {
          let hs = h * head_dim
          let q_h = q[hs:hs + head_dim].to_array()
          let attn_logits : Array[Double] = []
          for t in 0..<src_len {
            let k_h = all_k[t][hs:hs + head_dim].to_array()
            let mut dot = 0.0
            for j in 0..<head_dim {
              dot += q_h[j] * k_h[j]
            }
            attn_logits.push(dot * scale)
          }
          let attn_w = softmax_f(attn_logits)
          for t in 0..<src_len {
            head_attn[h][pos][t] = attn_w[t]
          }
          for j in 0..<head_dim {
            let mut acc = 0.0
            for t in 0..<src_len {
              let v_h = all_v[t][hs:hs + head_dim].to_array()
              acc += attn_w[t] * v_h[j]
            }
            x_attn.push(acc)
          }
        }
      } else {
        for _ in 0..<n_embd { x_attn.push(0.0) }
      }

      let attn_out = if g_use_attn.val { linear_f(x_attn, g_enc_wo.val[li]) } else { x_attn }
      let mut x2 : Array[Double] = []
      for i in 0..<n_embd {
        x2.push(if g_use_skip.val { attn_out[i] + x_res[i] } else { attn_out[i] })
      }
      let x_res2 = x2
      x2 = rmsnorm_f(x2)
      x2 = linear_f(x2, g_enc_fc1.val[li])
      let x2r : Array[Double] = []
      for xi in x2 {
        x2r.push(if xi > 0.0 { xi } else { 0.0 })
      }
      x2 = linear_f(x2r, g_enc_fc2.val[li])
      let x3 : Array[Double] = []
      for i in 0..<n_embd {
        x3.push(if g_use_skip.val { x2[i] + x_res2[i] } else { x2[i] })
      }
      new_xs.push(x3)
    }
    xs = new_xs
    last_self_attn = head_attn
  }
  (xs, last_self_attn)
}

// ---------------------------------------------------------------------------
// Float decoder step:
// Returns (x_post_sattn, x_post_xattn, x_post_mlp, logits, self_attn_weights, cross_attn_weights)
// ---------------------------------------------------------------------------

fn decoder_step_f(
  token_id : Int,
  pos_id : Int,
  dec_keys_f : Array[Array[Array[Double]]],
  dec_vals_f : Array[Array[Array[Double]]],
  cross_k_f : Array[Array[Array[Double]]],
  cross_v_f : Array[Array[Array[Double]]]
) -> (Array[Double], Array[Double], Array[Double], Array[Double], Array[Array[Double]], Array[Array[Double]]) {
  let scale = @math.pow(head_dim.to_double(), -0.5)
  let tok_emb = g_wte.val[token_id]
  let mut x : Array[Double] = []
  if g_use_pos_emb.val {
    let pos_emb = g_wpe_dec.val[pos_id]
    for i in 0..<n_embd {
      x.push(tok_emb[i].data + pos_emb[i].data)
    }
  } else {
    for i in 0..<n_embd {
      x.push(tok_emb[i].data)
    }
  }

  let mut out_post_sattn : Array[Double] = []
  let mut out_post_xattn : Array[Double] = []
  let mut out_post_mlp : Array[Double] = []
  let mut last_self_attn : Array[Array[Double]] = []
  let mut last_cross_attn : Array[Array[Double]] = []

  for li in 0..<n_layer {
    // Self-attention
    let x_res = x
    let x_sattn : Array[Double] = []
    let head_sattn : Array[Array[Double]] = []
    if g_use_attn.val {
      let xn = rmsnorm_f(x)
      let q = linear_f(xn, g_dec_wq.val[li])
      let k = linear_f(xn, g_dec_wk.val[li])
      let v = linear_f(xn, g_dec_wv.val[li])
      dec_keys_f[li].push(k)
      dec_vals_f[li].push(v)
      let t_len = dec_keys_f[li].length()
      for h in 0..<n_head {
        let hs = h * head_dim
        let q_h = q[hs:hs + head_dim].to_array()
        let attn_logits : Array[Double] = []
        for t in 0..<t_len {
          let k_h = dec_keys_f[li][t][hs:hs + head_dim].to_array()
          let mut dot = 0.0
          for j in 0..<head_dim {
            dot += q_h[j] * k_h[j]
          }
          attn_logits.push(dot * scale)
        }
        let attn_w = softmax_f(attn_logits)
        head_sattn.push(attn_w)
        for j in 0..<head_dim {
          let mut acc = 0.0
          for t in 0..<t_len {
            let v_h = dec_vals_f[li][t][hs:hs + head_dim].to_array()
            acc += attn_w[t] * v_h[j]
          }
          x_sattn.push(acc)
        }
      }
    } else {
      for _ in 0..<n_embd { x_sattn.push(0.0) }
    }
    let sattn_out = if g_use_attn.val { linear_f(x_sattn, g_dec_wo.val[li]) } else { x_sattn }
    let x2 : Array[Double] = []
    for i in 0..<n_embd {
      x2.push(if g_use_skip.val { sattn_out[i] + x_res[i] } else { sattn_out[i] })
    }
    if li == n_layer - 1 {
      out_post_sattn = x2
      last_self_attn = head_sattn
    }

    // Cross-attention — skipped in GPT mode
    let mut x3 : Array[Double] = x2
    if not(g_gpt_mode.val) {
      let x_res2 = x2
      let x_xattn : Array[Double] = []
      let head_xattn : Array[Array[Double]] = []
      if g_use_attn.val {
        let xn2 = rmsnorm_f(x2)
        let xq = linear_f(xn2, g_dec_xq.val[li])
        let src_len = cross_k_f[li].length()
        for h in 0..<n_head {
          let hs = h * head_dim
          let q_h = xq[hs:hs + head_dim].to_array()
          let attn_logits : Array[Double] = []
          for t in 0..<src_len {
            let k_h = cross_k_f[li][t][hs:hs + head_dim].to_array()
            let mut dot = 0.0
            for j in 0..<head_dim {
              dot += q_h[j] * k_h[j]
            }
            attn_logits.push(dot * scale)
          }
          let attn_w = softmax_f(attn_logits)
          head_xattn.push(attn_w)
          for j in 0..<head_dim {
            let mut acc = 0.0
            for t in 0..<src_len {
              let v_h = cross_v_f[li][t][hs:hs + head_dim].to_array()
              acc += attn_w[t] * v_h[j]
            }
            x_xattn.push(acc)
          }
        }
      } else {
        for _ in 0..<n_embd { x_xattn.push(0.0) }
      }
      let xattn_out = if g_use_attn.val { linear_f(x_xattn, g_dec_xo.val[li]) } else { x_xattn }
      x3 = []
      for i in 0..<n_embd {
        x3.push(if g_use_skip.val { xattn_out[i] + x_res2[i] } else { xattn_out[i] })
      }
      if li == n_layer - 1 {
        out_post_xattn = x3
        last_cross_attn = head_xattn
      }
    } else if li == n_layer - 1 {
      out_post_xattn = x3
    }

    // Feed-forward
    let x_res3 = x3
    x3 = rmsnorm_f(x3)
    x3 = linear_f(x3, g_dec_fc1.val[li])
    let x3r : Array[Double] = []
    for xi in x3 {
      x3r.push(if xi > 0.0 { xi } else { 0.0 })
    }
    x3 = linear_f(x3r, g_dec_fc2.val[li])
    let x4 : Array[Double] = []
    for i in 0..<n_embd {
      x4.push(if g_use_skip.val { x3[i] + x_res3[i] } else { x3[i] })
    }
    x = x4
    if li == n_layer - 1 {
      out_post_mlp = x4
    }
  }

  let logits = linear_f(out_post_mlp, g_lm_head.val)
  (out_post_sattn, out_post_xattn, out_post_mlp, logits, last_self_attn, last_cross_attn)
}
