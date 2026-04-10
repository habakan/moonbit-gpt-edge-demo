// Blackbox tests run against the package's public API.
// Run `moon test` to execute.

// ---------------------------------------------------------------------------
// Vocabulary and dataset initialization
// ---------------------------------------------------------------------------

test "init_model: vocab is non-empty" {
  @src.set_gpt_mode(false)
  @src.init_model()
  let vocab = @src.get_vocab_string()
  assert_eq(vocab.length() > 0, true)
}

test "init_model: docs string is non-empty" {
  @src.set_gpt_mode(false)
  @src.init_model()
  let docs = @src.get_docs_string()
  assert_eq(docs.length() > 0, true)
}

// ---------------------------------------------------------------------------
// Training — 基本動作
// ---------------------------------------------------------------------------

test "train_step: initial loss is positive" {
  @src.set_gpt_mode(false)
  @src.init_model()
  let loss = @src.train_step()
  assert_eq(loss > 0.0, true)
}

test "train_step: step counter increments" {
  @src.set_gpt_mode(false)
  @src.init_model()
  assert_eq(@src.get_step(), 0)
  let _ = @src.train_step()
  assert_eq(@src.get_step(), 1)
  let _ = @src.train_step()
  assert_eq(@src.get_step(), 2)
}

test "train_step: GPT mode initial loss is positive" {
  @src.set_gpt_mode(true)
  @src.init_model()
  let loss = @src.train_step()
  assert_eq(loss > 0.0, true)
  @src.set_gpt_mode(false)
}

// ---------------------------------------------------------------------------
// Training — 収束性（モデルが実際に学習できること）
// ---------------------------------------------------------------------------

// Enc-Dec モードで50ステップ後にlossが下がること
test "training: enc-dec loss decreases over 50 steps" {
  @src.set_gpt_mode(false)
  @src.init_model()
  let loss0 = @src.train_step()
  for _ in 1..<50 {
    let _ = @src.train_step()
  }
  let loss50 = @src.train_step()
  assert_eq(loss50 < loss0, true)
}

// GPTモードで50ステップ後にlossが下がること
test "training: gpt loss decreases over 50 steps" {
  @src.set_gpt_mode(true)
  @src.init_model()
  let loss0 = @src.train_step()
  for _ in 1..<50 {
    let _ = @src.train_step()
  }
  let loss50 = @src.train_step()
  assert_eq(loss50 < loss0, true)
  @src.set_gpt_mode(false)
}

// lossの下限は語彙数のlog（ランダム予測レベル）より下には行かない
test "training: loss stays above zero after 200 steps" {
  @src.set_gpt_mode(false)
  @src.init_model()
  let mut last_loss = 0.0
  for _ in 0..<200 {
    last_loss = @src.train_step()
  }
  assert_eq(last_loss > 0.0, true)
}

// ---------------------------------------------------------------------------
// テキスト生成
// ---------------------------------------------------------------------------

// 学習後に既知フレーズで生成が動くこと
test "generate: returns non-empty output after training" {
  @src.set_gpt_mode(false)
  @src.init_model()
  for _ in 0..<100 {
    let _ = @src.train_step()
  }
  let output = @src.generate("heat olive", 1.0)
  assert_eq(output.length() > 0, true)
}

// GPTモードでも生成できること
test "generate: gpt mode returns non-empty output" {
  @src.set_gpt_mode(true)
  @src.init_model()
  for _ in 0..<100 {
    let _ = @src.train_step()
  }
  let output = @src.generate("heat olive", 1.0)
  assert_eq(output.length() > 0, true)
  @src.set_gpt_mode(false)
}

// ---------------------------------------------------------------------------
// カスタムデータセット
// ---------------------------------------------------------------------------

test "add_custom_doc: known words succeed" {
  @src.set_gpt_mode(false)
  @src.init_model()
  let ok = @src.add_custom_doc("heat olive oil in a pan")
  assert_eq(ok, true)
}

test "add_custom_doc: all-unknown words fail" {
  @src.set_gpt_mode(false)
  @src.init_model()
  let ok = @src.add_custom_doc("xyzzy foobar quux")
  assert_eq(ok, false)
}

test "add_custom_doc: single known word fails (need >= 2)" {
  @src.set_gpt_mode(false)
  @src.init_model()
  let ok = @src.add_custom_doc("heat")
  assert_eq(ok, false)
}

test "custom dataset: replace changes docs" {
  @src.clear_raw_docs()
  @src.push_raw_doc("the cat sat on the mat")
  @src.push_raw_doc("the dog ran in the park")
  @src.set_gpt_mode(false)
  @src.init_model()
  let docs = @src.get_docs_string()
  assert_eq(docs.length() > 0, true)
  // default recipe word "olive" should not appear in new docs
  let mut found_olive = false
  let n = docs.length()
  let target = "olive"
  let tn = target.length()
  for i in 0..<(n - tn + 1) {
    if docs[i] == target[0] && docs[i+1] == target[1] && docs[i+2] == target[2] &&
       docs[i+3] == target[3] && docs[i+4] == target[4] {
      found_olive = true
    }
  }
  assert_eq(found_olive, false)
  // restore default
  @src.clear_raw_docs()
  @src.init_model()
}

// カスタムデータセットでも学習が収束すること
test "custom dataset: training converges" {
  @src.clear_raw_docs()
  @src.push_raw_doc("the cat sat on the mat")
  @src.push_raw_doc("the dog ran in the park")
  @src.push_raw_doc("the bird flew over the tree")
  @src.set_gpt_mode(false)
  @src.init_model()
  let loss0 = @src.train_step()
  for _ in 1..<50 {
    let _ = @src.train_step()
  }
  let loss50 = @src.train_step()
  assert_eq(loss50 < loss0, true)
  // restore default
  @src.clear_raw_docs()
  @src.init_model()
}

// ---------------------------------------------------------------------------
// アブレーションフラグ
// ---------------------------------------------------------------------------

test "ablation: skip toggle" {
  @src.set_use_skip(true)
  assert_eq(@src.get_use_skip(), true)
  @src.set_use_skip(false)
  assert_eq(@src.get_use_skip(), false)
  @src.set_use_skip(true)
}

test "ablation: pos_emb toggle" {
  @src.set_use_pos_emb(true)
  assert_eq(@src.get_use_pos_emb(), true)
  @src.set_use_pos_emb(false)
  assert_eq(@src.get_use_pos_emb(), false)
  @src.set_use_pos_emb(true)
}

test "ablation: attn toggle" {
  @src.set_use_attn(true)
  assert_eq(@src.get_use_attn(), true)
  @src.set_use_attn(false)
  assert_eq(@src.get_use_attn(), false)
  @src.set_use_attn(true)
}

test "ablation: train runs with attn disabled" {
  @src.set_gpt_mode(false)
  @src.set_use_attn(false)
  @src.init_model()
  let loss = @src.train_step()
  assert_eq(loss > 0.0, true)
  @src.set_use_attn(true)
}

// Attn無効でも学習できること（MLP単独での学習）
test "ablation: loss decreases with attn disabled" {
  @src.set_gpt_mode(false)
  @src.set_use_attn(false)
  @src.init_model()
  let loss0 = @src.train_step()
  for _ in 1..<50 {
    let _ = @src.train_step()
  }
  let loss50 = @src.train_step()
  assert_eq(loss50 < loss0, true)
  @src.set_use_attn(true)
}
