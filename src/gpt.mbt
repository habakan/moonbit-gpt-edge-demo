// Encoder-Decoder Transformer (Vaswani 2017 style).
// Task: given first half of a cooking phrase (encoder input),
//       predict the second half (decoder output).
// Compiles to JS backend for in-browser training.
//
// Source split into:
//   autograd.mbt   — autograd engine (Value struct + backward)
//   config.mbt     — hyperparameters, dataset, tokenizer
//   globals.mbt    — all global Ref variables
//   init.mbt       — RNG helpers + init_model
//   ops.mbt        — linear/softmax/rmsnorm (autograd + float)
//   forward.mbt    — encoder_forward + decoder_step (autograd)
//   train.mbt      — train_step + generate + get_step
//   forward_f.mbt  — encoder_forward_f + decoder_step_f (float)
//   viz.mbt        — run_attn_viz + run_network_viz + getters
