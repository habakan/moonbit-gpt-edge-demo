# MoonBit GPT Edge Demo

[MoonBit](https://www.moonbitlang.com/) で書かれた Transformer の実装です。WebAssembly (wasm-gc) にコンパイルされ、ブラウザ上で完全に動作します。サーバー不要、Python 不要、GPU 不要。

![demo](docs/demo-arch.gif)

[English README](README.md)

## 特徴

- **実行時に切り替え可能な 2 つのアーキテクチャ**
  - **Enc-Dec** — オリジナル Transformer (Vaswani 2017): 双方向エンコーダー + クロスアテンション付き自己回帰デコーダー
  - **GPT** — デコーダーのみの言語モデル: 因果的自己注意、次トークン予測
- **MoonBit によるゼロから実装した自動微分エンジン** — 外部 ML ライブラリ不使用
- **AdamW オプティマイザー** (線形学習率減衰付き)
- **ライブ可視化パネル** — アテンション行列、Q/K/V ストリップ、MLP 活性化、埋め込み PCA (3D)、隠れ状態の軌跡、次トークン予測
- **アブレーション実験** — スキップ接続・位置埋め込み・アテンションを実行時に ON/OFF
- **エッジ動作** — `moon build --target wasm-gc` で WebAssembly にコンパイルし、静的ページとして配信
- **React + Vite フロントエンド** — TypeScript、ドラッグ＆リサイズ可能なフローティングパネル

## アーキテクチャ

```
src/
  autograd.mbt    — Value 構造体、順伝播/逆伝播 (Add, Mul, exp, log, relu, …)
  config.mbt      — ハイパーパラメータ、データセット (英語料理レシピ 50 文)
  globals.mbt     — グローバル Ref 状態: 重み、Adam モーメント、可視化バッファ、PCA 状態
  init.mbt        — 重み初期化 (ガウス分布)、アブレーションフラグ
  ops.mbt         — linear, softmax, rmsnorm (自動微分版 + float 版)
  forward.mbt     — encoder_forward, decoder_step (自動微分版)
  forward_f.mbt   — encoder_forward_f, decoder_step_f (float 版、可視化用)
  train.mbt       — train_step (AdamW), generate, sample_token
  viz.mbt         — run_attn_viz, run_network_viz, run_residual_viz
  draw.mbt        — ディスプレイリストプロトコルによるキャンバス描画 (tick_pca, draw_arch_diagram, …)
cmd/main/
  main.mbt        — pub fn WASM エクスポート (mbt_init, mbt_train_step, …)
  moon.pkg        — wasm-gc エクスポートリスト (DCE ガード)
web/
  public/
    moonbit.wasm  — コンパイル済み出力 (make build-mbt で生成)
  src/
    mbt/
      ffi.ts          — WebAssembly ローダー + 型付きラッパー (mbt.init(), mbt.trainStep(), …)
    hooks/
      useTraining.ts  — rAF ベースの学習ループ (アンマウント時 cleanup 付き)
      usePcaCanvas.ts — PCA アニメーションループ + マウス/ホイール操作
    canvas/
      displayList.ts  — ディスプレイリスト実行エンジン (CMD 定数, 36 コマンド)
      drawAttn.ts     — アテンション/埋め込みキャンバスヘルパー
      drawLossChart.ts
    components/
      FloatingPanel.tsx   — ドラッグ＆リサイズ可能なパネル基盤
      LiveBadge.tsx       — 学習中に表示される "live" インジケーター
      Toolbar.tsx         — トップバー + サイドバー
      panels/             — TrainingPanel, GenPanel, AttnPanel, EmbPanel,
                            EmbPcaPanel, HiddenPanel, MlpPanel, PredPanel,
                            DatasetPanel
    App.tsx
```

**モデルサイズ** (デフォルト): `n_layer=1  n_embd=32  n_head=4  block_size=8`

## WebAssembly FFI

MoonBit は `--target wasm-gc` でコンパイルされます。関数は WASM エクスポートとして公開され、`WebAssembly.instantiateStreaming` 経由で JavaScript から直接呼び出されます。

wasm-gc の `String` は UTF-16 配列であり WASM 境界を直接越えられないため、文字列 I/O はインデックスアクセスプロトコルを使用します:

- **JS → MoonBit**: `mbt_in_str_clear()` + 文字ごとに `mbt_in_str_push(charCode)`
- **MoonBit → JS**: getter 呼び出し (例: `mbt_get_viz_tokens()`) の後、`mbt_str_len()` / `mbt_str_char(i)` で読み出し
- **Array[Double]**: 同様に `mbt_arr_len()` / `mbt_arr_at(i)` を使用

## セットアップ

### 前提条件

- [MoonBit ツールチェーン](https://www.moonbitlang.com/download/) (`moon` CLI)
- Node.js 18+ および npm

### ビルド & 実行

```bash
# フロントエンド依存関係のインストール (初回のみ)
cd web && npm install && cd ..

# MoonBit → wasm + Vite → dist/ をビルド
make build

# 開発: MoonBit ビルド + Vite 開発サーバー (ホットリロード)
make dev
# → http://localhost:5173 を開く

# プロダクションビルドのプレビュー
make serve
```

### テスト

```bash
moon test
```

43 件のテストが、自動微分エンジン (有限差分による勾配検証を含む)、ニューラルネットワーク演算子 (rmsnorm, linear, softmax)、学習収束性、テキスト生成、カスタムデータセット、アブレーションフラグをカバーします。

## 使い方

1. ツールバーのトグルボタンで **Enc-Dec** または **GPT** モードを選択する。
2. サイドバーの **Start** を押す — **Embedding PCA** と **Pos Embedding Path** パネルが自動で開く。
3. **Analyze** をクリックすると、入力ボックスのフレーズで現在の重みを可視化する。
4. サイドバーから追加パネルを開く: **Loss / PCA / PosEmb / Data**。

### アブレーション実験

サイドバーのトグルスイッチで各コンポーネントを無効化できます。変更後はモデルが自動的にリセット・再初期化されます。

| スイッチ | 効果 |
|---------|------|
| **Attn: OFF** | Loss の収束が遅くなる。アテンション行列がゼロになる |
| **Skip: OFF** | 残差接続なし。勾配フローが劣化する |
| **PosEmb: OFF** | 位置情報なし。アテンションが位置不変になる |

### 可視化パネル

| パネル | 説明 |
|--------|------|
| Loss | 学習損失曲線 (クロスエントロピー) |
| Attention Weights | ヘッドごとのアテンション行列 (4 ヘッド) |
| Token Embedding Similarity | 語彙全体のコサイン類似度ヒートマップ |
| Embedding PCA | 単語埋め込みの 3D PCA 投影 — 回転/パン/ズーム可能 |
| Pos Embedding Path | PCA 空間における残差ストリームの軌跡 |
| Hidden State Evolution | 層をまたいだエンコーダー隠れ状態 |
| MLP Activations | FC1 ReLU 活性化値 |
| Next-word Predictions | 各位置のトップ k ロジット |
| Training Dataset | 学習コーパスの確認・置き換え |

## デモ

**アーキテクチャ切り替え** — Enc-Dec と GPT モードの切り替え

![arch](docs/demo-arch.gif)

**埋め込み可視化** — トークン埋め込み + 位置埋め込みの PCA 軌跡

![emb](docs/demo-emb.gif)

**アブレーション実験** — スキップ / 位置埋め込み / アテンションを無効化

![ablation](docs/demo-ablation.gif)

## 仕組み

### 学習

| モード | 目的関数 | エンコーダー |
|--------|---------|------------|
| Enc-Dec | 文の前半を与えて後半を予測 | 双方向自己注意 |
| GPT | 位置 t のトークンから t+1 を予測 | なし (デコーダーのみ) |

逆伝播はゼロから実装した自動微分エンジンが担います。各 `Value` ノードは子ノードとローカル勾配を保持し、`v_backward` がトポロジカル順に逆累積を実行します。

### PCA 可視化

埋め込みをべき乗反復法により 3 つの主成分に射影します。固有ベクトルの符号の不定性 (PCA の既知の問題) は、新しい固有ベクトルと前フレームの固有ベクトルとの内積チェックにより符号を整合させることで解決し、学習中の突然の反転を防いでいます。

### ディスプレイリストプロトコル

MoonBit はキャンバス描画コマンドをフラットな `Array[Double]` (コマンド ID + 引数) として生成します。JavaScript はこれを `executeDisplayList` で解釈・実行します。これにより全レンダリングロジックを MoonBit 側に保ちつつ、DOM と疎結合な設計を実現しています。

## 参考文献

- [Andrej Karpathy — minimal GPT implementation (gist)](https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95)
- [Attention Is All You Need — Vaswani et al. 2017](https://arxiv.org/abs/1706.03762)

## ライセンス

Apache-2.0
