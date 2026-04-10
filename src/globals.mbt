// ---------------------------------------------------------------------------
// Global state
// ---------------------------------------------------------------------------

// Set to true for Decoder-only (GPT) architecture; false for Encoder-Decoder (Transformer)
let g_gpt_mode : Ref[Bool] = Ref::new(false)

// Ablation flags
let g_use_skip : Ref[Bool] = Ref::new(true)    // skip (residual) connections
let g_use_pos_emb : Ref[Bool] = Ref::new(true) // positional embeddings
let g_use_attn : Ref[Bool] = Ref::new(true)    // multi-head attention

let g_raw_docs_override : Ref[Array[String]] = Ref::new([])

let g_vocab : Ref[Array[String]] = Ref::new([])
let g_vocab_size : Ref[Int] = Ref::new(0)
let g_bos : Ref[Int] = Ref::new(0)
let g_docs : Ref[Array[Array[Int]]] = Ref::new([])
let g_word2idx : Ref[@hashmap.HashMap[String, Int]] = Ref::new(
  @hashmap.HashMap::new(),
)

// Shared token embedding + position embeddings + LM head
let g_wte : Ref[Array[Array[Value]]] = Ref::new([])
let g_wpe_enc : Ref[Array[Array[Value]]] = Ref::new([])
let g_wpe_dec : Ref[Array[Array[Value]]] = Ref::new([])
let g_lm_head : Ref[Array[Array[Value]]] = Ref::new([])

// Encoder parameters (per layer)
let g_enc_wq : Ref[Array[Array[Array[Value]]]] = Ref::new([])
let g_enc_wk : Ref[Array[Array[Array[Value]]]] = Ref::new([])
let g_enc_wv : Ref[Array[Array[Array[Value]]]] = Ref::new([])
let g_enc_wo : Ref[Array[Array[Array[Value]]]] = Ref::new([])
let g_enc_fc1 : Ref[Array[Array[Array[Value]]]] = Ref::new([])
let g_enc_fc2 : Ref[Array[Array[Array[Value]]]] = Ref::new([])

// Decoder self-attention (per layer)
let g_dec_wq : Ref[Array[Array[Array[Value]]]] = Ref::new([])
let g_dec_wk : Ref[Array[Array[Array[Value]]]] = Ref::new([])
let g_dec_wv : Ref[Array[Array[Array[Value]]]] = Ref::new([])
let g_dec_wo : Ref[Array[Array[Array[Value]]]] = Ref::new([])

// Decoder cross-attention (per layer)
let g_dec_xq : Ref[Array[Array[Array[Value]]]] = Ref::new([])
let g_dec_xk : Ref[Array[Array[Array[Value]]]] = Ref::new([])
let g_dec_xv : Ref[Array[Array[Array[Value]]]] = Ref::new([])
let g_dec_xo : Ref[Array[Array[Array[Value]]]] = Ref::new([])

// Decoder feed-forward (per layer)
let g_dec_fc1 : Ref[Array[Array[Array[Value]]]] = Ref::new([])
let g_dec_fc2 : Ref[Array[Array[Array[Value]]]] = Ref::new([])

let g_params : Ref[Array[Value]] = Ref::new([])
let g_adam_m : Ref[Array[Double]] = Ref::new([])
let g_adam_v : Ref[Array[Double]] = Ref::new([])
let g_step : Ref[Int] = Ref::new(0)

// LCG RNG
let g_rng : Ref[Int64] = Ref::new(12345678901234567L)

// ---------------------------------------------------------------------------
// Attention visualization globals
// ---------------------------------------------------------------------------

let g_viz_seq_len : Ref[Int] = Ref::new(0)
let g_viz_tokens_str : Ref[String] = Ref::new("")
let g_viz_attn_flat : Ref[Array[Double]] = Ref::new([])
let g_viz_hidden : Ref[Array[Double]] = Ref::new([])
let g_viz_mlp_acts : Ref[Array[Double]] = Ref::new([])
let g_viz_logits : Ref[Array[Double]] = Ref::new([])

// ---------------------------------------------------------------------------
// Network flow visualization globals
// ---------------------------------------------------------------------------

let g_net_enc_flat : Ref[Array[Double]] = Ref::new([])
let g_net_dec_flat : Ref[Array[Double]] = Ref::new([])
let g_net_enc_self_attn : Ref[Array[Double]] = Ref::new([])
let g_net_dec_self_attn : Ref[Array[Double]] = Ref::new([])
let g_net_cross_attn : Ref[Array[Double]] = Ref::new([])
let g_net_enc_q_flat : Ref[Array[Double]] = Ref::new([])
let g_net_enc_k_flat : Ref[Array[Double]] = Ref::new([])
let g_net_enc_v_flat : Ref[Array[Double]] = Ref::new([])
let g_net_dec_q_flat : Ref[Array[Double]] = Ref::new([])
let g_net_dec_k_flat : Ref[Array[Double]] = Ref::new([])
let g_net_dec_v_flat : Ref[Array[Double]] = Ref::new([])
let g_net_enc_ho_flat : Ref[Array[Double]] = Ref::new([])
let g_net_dec_ho_flat : Ref[Array[Double]] = Ref::new([])
let g_net_cross_ho_flat : Ref[Array[Double]] = Ref::new([])
let g_net_src_tokens_str : Ref[String] = Ref::new("")
let g_net_tgt_tokens_str : Ref[String] = Ref::new("")
let g_net_src_len : Ref[Int] = Ref::new(0)
let g_net_tgt_len : Ref[Int] = Ref::new(0)

// For compatibility with existing JS bindings
let g_net_flat : Ref[Array[Double]] = Ref::new([])
let g_net_attn : Ref[Array[Double]] = Ref::new([])
let g_net_seq : Ref[Int] = Ref::new(0)
let g_net_pos : Ref[Int] = Ref::new(0)

// Loss history for in-WASM chart rendering
let g_loss_history : Ref[Array[Double]] = Ref::new([])

// PCA animation globals (normalized [0,1] positions)
let g_pca_tgt_xs : Ref[Array[Double]] = Ref::new([])
let g_pca_tgt_ys : Ref[Array[Double]] = Ref::new([])
let g_pca_cur_xs : Ref[Array[Double]] = Ref::new([])
let g_pca_cur_ys : Ref[Array[Double]] = Ref::new([])

// 3D PCA — third principal component targets/current
let g_pca_tgt_zs : Ref[Array[Double]] = Ref::new([])
let g_pca_cur_zs : Ref[Array[Double]] = Ref::new([])

// Drag state
let g_pca_drag : Ref[Bool] = Ref::new(false)
let g_pca_drag_sx : Ref[Double] = Ref::new(0.0)
let g_pca_drag_sy : Ref[Double] = Ref::new(0.0)
let g_pca_drag_lx : Ref[Double] = Ref::new(0.0)
let g_pca_drag_ly : Ref[Double] = Ref::new(0.0)

// Selection (-1 = none)
let g_pca_selected : Ref[Int] = Ref::new(-1)

// Screen positions from last tick_pca call (for click detection)
let g_pca_scr_xs : Ref[Array[Double]] = Ref::new([])
let g_pca_scr_ys : Ref[Array[Double]] = Ref::new([])

// Zoom & pan
let g_pca_zoom  : Ref[Double] = Ref::new(2.5)
let g_pca_pan_x : Ref[Double] = Ref::new(0.0)
let g_pca_pan_y : Ref[Double] = Ref::new(0.0)

// PCA eigenvectors and normalization params (saved by compute_pca for trajectory projection)
let g_pca_pc1 : Ref[Array[Double]] = Ref::new([])
let g_pca_pc2 : Ref[Array[Double]] = Ref::new([])
let g_pca_pc3 : Ref[Array[Double]] = Ref::new([])
let g_pca_emb_means : Ref[Array[Double]] = Ref::new([])
let g_pca_norm_mean_px : Ref[Double] = Ref::new(0.0)
let g_pca_norm_mean_py : Ref[Double] = Ref::new(0.0)
let g_pca_norm_mean_pz : Ref[Double] = Ref::new(0.0)
let g_pca_norm_rng : Ref[Double] = Ref::new(1.0)

// Trajectory: projected hidden states through PCA space
let g_pca_traj_xs : Ref[Array[Double]] = Ref::new([])
let g_pca_traj_ys : Ref[Array[Double]] = Ref::new([])
let g_pca_traj_zs : Ref[Array[Double]] = Ref::new([])

// Pos emb path viz: src token IDs for the current phrase
let g_viz_src_toks : Ref[Array[Int]] = Ref::new([])

// Pos emb path: lerp for wte+wpe endpoints (one per seq position)
let g_res_cur_xs : Ref[Array[Double]] = Ref::new([])
let g_res_cur_ys : Ref[Array[Double]] = Ref::new([])
