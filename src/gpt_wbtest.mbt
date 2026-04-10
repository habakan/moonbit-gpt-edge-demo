// Whitebox tests run within the package scope.
// Run `moon test` to execute.

// ---------------------------------------------------------------------------
// Tokenizer
// ---------------------------------------------------------------------------

test "split_words: basic" {
  let words = split_words("heat olive oil")
  assert_eq(words.length(), 3)
  assert_eq(words[0], "heat")
  assert_eq(words[1], "olive")
  assert_eq(words[2], "oil")
}

test "split_words: single word" {
  let words = split_words("hello")
  assert_eq(words.length(), 1)
  assert_eq(words[0], "hello")
}

test "split_words: empty string" {
  let words = split_words("")
  assert_eq(words.length(), 0)
}

test "split_words: leading and trailing spaces" {
  let words = split_words("  add salt  ")
  assert_eq(words.length(), 2)
  assert_eq(words[0], "add")
  assert_eq(words[1], "salt")
}

// ---------------------------------------------------------------------------
// Autograd engine — forward
// ---------------------------------------------------------------------------

test "autograd: add forward" {
  g_next_id.val = 0
  let a = v_leaf(2.0)
  let b = v_leaf(3.0)
  let c = a + b
  assert_eq(c.data, 5.0)
}

test "autograd: mul forward" {
  g_next_id.val = 0
  let a = v_leaf(3.0)
  let b = v_leaf(4.0)
  let c = a * b
  assert_eq(c.data, 12.0)
}

test "autograd: exp forward" {
  g_next_id.val = 0
  let a = v_leaf(1.0)
  let b = a.v_exp()
  assert_eq((b.data - @math.exp(1.0)).abs() < 1.0e-9, true)
}

test "autograd: relu boundary" {
  g_next_id.val = 0
  assert_eq(v_leaf(2.0).v_relu().data, 2.0)
  assert_eq(v_leaf(-1.0).v_relu().data, 0.0)
  assert_eq(v_leaf(0.0).v_relu().data, 0.0)
}

test "autograd: neg" {
  g_next_id.val = 0
  let a = v_leaf(5.0)
  let b = a.v_neg()
  assert_eq(b.data, -5.0)
  v_backward(b)
  assert_eq(a.grad, -1.0)
}

// ---------------------------------------------------------------------------
// Autograd engine — backward
// ---------------------------------------------------------------------------

test "autograd: add backward" {
  g_next_id.val = 0
  let a = v_leaf(2.0)
  let b = v_leaf(3.0)
  let c = a + b
  v_backward(c)
  assert_eq(a.grad, 1.0)
  assert_eq(b.grad, 1.0)
}

test "autograd: mul backward" {
  g_next_id.val = 0
  let a = v_leaf(3.0)
  let b = v_leaf(4.0)
  let c = a * b
  v_backward(c)
  assert_eq(a.grad, 4.0) // dc/da = b
  assert_eq(b.grad, 3.0) // dc/db = a
}

test "autograd: exp backward" {
  g_next_id.val = 0
  let a = v_leaf(2.0)
  let b = a.v_exp()
  v_backward(b)
  // d/da exp(a) = exp(a)
  assert_eq((a.grad - @math.exp(2.0)).abs() < 1.0e-6, true)
}

test "autograd: chain rule (a+b)*b" {
  g_next_id.val = 0
  // f(a,b) = (a+b)*b  →  df/da = b = 3,  df/db = a+2b = 2+6 = 8
  let a = v_leaf(2.0)
  let b = v_leaf(3.0)
  let c = (a + b) * b
  v_backward(c)
  assert_eq(c.data, 15.0)
  assert_eq(a.grad, 3.0)
  assert_eq(b.grad, 8.0)
}

// 有限差分による自動微分の検証（gold standard）
// f(x) = relu(x*x + x) at x=1.5  →  f'(x) = 2x+1 = 4.0
test "autograd: finite difference gradient check" {
  let eps = 1.0e-5
  g_next_id.val = 0
  let xp = v_leaf(1.5 + eps)
  let fp = (xp * xp + xp).v_relu()
  g_next_id.val = 0
  let xm = v_leaf(1.5 - eps)
  let fm = (xm * xm + xm).v_relu()
  let numeric = (fp.data - fm.data) / (2.0 * eps)

  g_next_id.val = 0
  let x = v_leaf(1.5)
  let f = (x * x + x).v_relu()
  v_backward(f)
  assert_eq((x.grad - numeric).abs() < 1.0e-4, true)
}

// ---------------------------------------------------------------------------
// softmax_f: probabilities sum to 1.0
// ---------------------------------------------------------------------------

test "softmax_f: sum to 1" {
  let logits = [1.0, 2.0, 3.0, 0.5]
  let probs = softmax_f(logits)
  assert_eq(probs.length(), 4)
  let mut total = 0.0
  for p in probs {
    total += p
  }
  assert_eq((total - 1.0).abs() < 1.0e-9, true)
}

test "softmax_f: max logit gets highest prob" {
  let logits = [0.0, 10.0, 0.0]
  let probs = softmax_f(logits)
  assert_eq(probs[1] > probs[0], true)
  assert_eq(probs[1] > probs[2], true)
}

// Value版も同様に確率の和が1になること
test "softmax (Value): sums to 1" {
  g_next_id.val = 0
  let logits = [v_leaf(1.0), v_leaf(2.0), v_leaf(3.0), v_leaf(0.5)]
  let probs = softmax(logits)
  let mut total = 0.0
  for p in probs {
    total += p.data
  }
  assert_eq((total - 1.0).abs() < 1.0e-9, true)
}

// ---------------------------------------------------------------------------
// rmsnorm_f: 正規化の正確性
// ---------------------------------------------------------------------------

// 出力の RMS が 1 になること
test "rmsnorm_f: output has unit RMS" {
  let x = [1.0, 2.0, 3.0, 4.0]
  let y = rmsnorm_f(x)
  assert_eq(y.length(), 4)
  let mut ms = 0.0
  for yi in y {
    ms += yi * yi
  }
  ms /= y.length().to_double()
  assert_eq((ms - 1.0).abs() < 0.001, true)
}

// ゼロ入力はゼロのまま（スケールは 0 に収束）
test "rmsnorm_f: zero input stays near zero" {
  let x = [0.0, 0.0, 0.0, 0.0]
  let y = rmsnorm_f(x)
  for yi in y {
    assert_eq(yi.abs() < 1.0e-3, true)
  }
}

// スケールしても出力の RMS は 1
test "rmsnorm_f: scale-invariant RMS" {
  let x1 = [1.0, -1.0, 2.0, -2.0]
  let x2 = [10.0, -10.0, 20.0, -20.0]
  let y1 = rmsnorm_f(x1)
  let y2 = rmsnorm_f(x2)
  let mut ms1 = 0.0
  let mut ms2 = 0.0
  for i in 0..<4 {
    ms1 += y1[i] * y1[i]
    ms2 += y2[i] * y2[i]
  }
  ms1 /= 4.0
  ms2 /= 4.0
  assert_eq((ms1 - 1.0).abs() < 0.001, true)
  assert_eq((ms2 - 1.0).abs() < 0.001, true)
  // 比率は保存される
  assert_eq((y1[0] / y1[1] - y2[0] / y2[1]).abs() < 1.0e-6, true)
}

// ---------------------------------------------------------------------------
// linear_f: 行列積の正確性
// ---------------------------------------------------------------------------

// 単位行列なら入力がそのまま出力
test "linear_f: identity matrix" {
  let x = [3.0, 4.0]
  let w = [[v_leaf(1.0), v_leaf(0.0)], [v_leaf(0.0), v_leaf(1.0)]]
  let y = linear_f(x, w)
  assert_eq(y.length(), 2)
  assert_eq((y[0] - 3.0).abs() < 1.0e-9, true)
  assert_eq((y[1] - 4.0).abs() < 1.0e-9, true)
}

// ゼロ行列ならゼロ出力
test "linear_f: zero matrix gives zero output" {
  let x = [1.0, 2.0, 3.0]
  let w = [
    [v_leaf(0.0), v_leaf(0.0), v_leaf(0.0)],
    [v_leaf(0.0), v_leaf(0.0), v_leaf(0.0)],
  ]
  let y = linear_f(x, w)
  for yi in y {
    assert_eq(yi.abs() < 1.0e-15, true)
  }
}

// 既知の値で行列積を検証
// w = [[2, 0], [0, 3]], x = [5, 7]  →  y = [10, 21]
test "linear_f: known values" {
  let x = [5.0, 7.0]
  let w = [[v_leaf(2.0), v_leaf(0.0)], [v_leaf(0.0), v_leaf(3.0)]]
  let y = linear_f(x, w)
  assert_eq((y[0] - 10.0).abs() < 1.0e-9, true)
  assert_eq((y[1] - 21.0).abs() < 1.0e-9, true)
}
