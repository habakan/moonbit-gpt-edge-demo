// ---------------------------------------------------------------------------
// Neural net ops — autograd (Value) versions
// ---------------------------------------------------------------------------

fn linear(x : Array[Value], w : Array[Array[Value]]) -> Array[Value] {
  let out : Array[Value] = []
  for row in w {
    let mut acc = v_leaf(0.0)
    let n = row.length()
    for i in 0..<n {
      acc = acc + row[i] * x[i]
    }
    out.push(acc)
  }
  out
}

fn softmax(logits : Array[Value]) -> Array[Value] {
  let mut max_val = logits[0].data
  for v in logits {
    if v.data > max_val {
      max_val = v.data
    }
  }
  let exps : Array[Value] = []
  for v in logits {
    exps.push((v + v_leaf(-max_val)).v_exp())
  }
  let mut total = v_leaf(0.0)
  for e in exps {
    total = total + e
  }
  let probs : Array[Value] = []
  for e in exps {
    probs.push(e.v_div(total))
  }
  probs
}

fn rmsnorm(x : Array[Value]) -> Array[Value] {
  let n = x.length()
  let mut ms = v_leaf(0.0)
  for xi in x {
    ms = ms + xi * xi
  }
  ms = ms.v_div(v_leaf(n.to_double()))
  let scale = (ms + v_leaf(1.0e-5)).v_pow(-0.5)
  let out : Array[Value] = []
  for xi in x {
    out.push(xi * scale)
  }
  out
}

// ---------------------------------------------------------------------------
// Neural net ops — pure-float (visualization) versions
// ---------------------------------------------------------------------------

fn linear_f(x : Array[Double], w : Array[Array[Value]]) -> Array[Double] {
  let out : Array[Double] = []
  for row in w {
    let mut acc = 0.0
    let n = row.length()
    for i in 0..<n {
      acc += row[i].data * x[i]
    }
    out.push(acc)
  }
  out
}

fn softmax_f(logits : Array[Double]) -> Array[Double] {
  let mut max_val = logits[0]
  for v in logits {
    if v > max_val {
      max_val = v
    }
  }
  let exps : Array[Double] = []
  for v in logits {
    exps.push(@math.exp(v - max_val))
  }
  let mut total = 0.0
  for e in exps {
    total += e
  }
  let probs : Array[Double] = []
  for e in exps {
    probs.push(e / total)
  }
  probs
}

fn rmsnorm_f(x : Array[Double]) -> Array[Double] {
  let n = x.length()
  let mut ms = 0.0
  for xi in x {
    ms += xi * xi
  }
  ms /= n.to_double()
  let scale = @math.pow(ms + 1.0e-5, -0.5)
  let out : Array[Double] = []
  for xi in x {
    out.push(xi * scale)
  }
  out
}
