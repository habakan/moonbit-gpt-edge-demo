# Development Retrospective — MoonBit GPT

## What It Is

A Transformer implementation written entirely in [MoonBit](https://www.moonbitlang.com/), compiled to WebAssembly (wasm-gc) and running fully in the browser. No server, no Python, no GPU. The user can train a miniature neural network, watch it learn in real time, and explore its internals through an interactive canvas visualization.

Two architectures are available at runtime:
- **Enc-Dec** — original Transformer (Vaswani 2017): bidirectional encoder + autoregressive decoder with cross-attention
- **GPT** — decoder-only language model with causal self-attention

The model is intentionally tiny (`n_layer=1, n_embd=32, n_head=4, block_size=8`) so it trains to convergence in ~2000 steps inside a browser tab.

---

## Why MoonBit

The core constraint was "implement a non-trivial ML system in MoonBit, targeting wasm-gc." That constraint drove every architectural decision.

MoonBit's strengths for this project:
- **wasm-gc target**: ships a compact binary with GC support, no manual memory management
- **Strong type system**: caught many shape mismatches at compile time that would silently produce NaNs in dynamic languages
- **Functional style + mutability**: `Ref[T]` global state works cleanly for the weight store; pure functions for forward passes

The main constraint MoonBit imposed: **no standard ML library**. Every layer — autograd, linear, softmax, RMSNorm, attention, AdamW — had to be implemented from scratch.

---

## Architecture Decisions

### 1. Hand-rolled autograd engine (`autograd.mbt`)

The choice to write a full reverse-mode autograd engine (inspired by Karpathy's micrograd) rather than hardcoding analytic gradients was deliberate. It kept the forward pass readable and made adding new operations trivial. Each `Value` node stores its children and local gradients; `v_backward` runs a topological-sort reverse accumulation.

The tradeoff: every parameter allocation goes through `v_leaf`, and the computation graph is rebuilt from scratch each step. For a 32-dim model this is fast enough; for anything larger it would need to be replaced with a static graph or in-place gradient accumulation.

### 2. Dual forward pass (`forward.mbt` + `forward_f.mbt`)

Visualization requires reading intermediate activations (Q, K, V, attention weights, head outputs) without accumulating a computation graph. Maintaining two parallel implementations — one `Value`-based for training, one `Double`-based for visualization — was the simplest solution that kept both paths correct and independent.

The shared weight store (`g_enc_wq`, etc.) means visualization always reflects the current trained state without any synchronization.

### 3. WASM FFI protocol

MoonBit's wasm-gc `String` is a UTF-16 array that cannot cross the WASM boundary directly. The solution is an index-access protocol:

- **JS → MoonBit**: `mbt_in_str_clear()` + `mbt_in_str_push(charCode)` per character
- **MoonBit → JS**: call getter (e.g. `mbt_get_viz_tokens()`), read with `mbt_str_len()` / `mbt_str_char(i)`
- **`Array[Double]`**: same pattern via `mbt_arr_len()` / `mbt_arr_at(i)`

This is verbose but explicit. Every WASM export is a thin wrapper in `cmd/main/main.mbt` that consumes the input buffer, calls a function in the `src` package, and writes to the output buffer.

### 4. Ablation flags as runtime globals

Adding Skip / PosEmb / Attn ON/OFF toggles as `Ref[Bool]` globals in `globals.mbt` meant the forward pass could branch without any architectural changes. This turned what could have been six separate model variants into a single codebase with three boolean switches — useful for demonstrating what each component contributes.

### 5. Runtime-replaceable dataset

The initial design hardcoded training phrases in `config.mbt`. Adding `g_raw_docs_override: Ref[Array[String]]` let users supply their own text at runtime: `init_model()` checks the override and, if non-empty, rebuilds the vocabulary and tokenized docs entirely from the new text. The preset recipes are completely discarded — a clean separation between "default demo" and "user experiment."

---

## Challenges

### WASM string crossing

The first week was largely spent figuring out the FFI boundary. The wasm-gc memory model is opaque to JavaScript; you cannot share a pointer to a MoonBit string. The index-access protocol (character-by-character) solved it but required writing ~30 thin wrapper functions in `main.mbt` and corresponding TypeScript wrappers in `moonbit.ts`.

### Stale React closures

The training loop runs in `requestAnimationFrame` callbacks. Capturing `useSkipRef` / `usePosEmbRef` / `useAttnRef` as mutable refs (rather than state values) was necessary to ensure the closure always read the current toggle state without triggering unnecessary re-renders or re-creating the callback.

### WASM panic from out-of-bounds access

When `g_use_attn = false`, the visualization pass (`viz.mbt`) stored zero-length `head_xattn` arrays. A subsequent index into `dec_cross_attn_steps[pos][h]` without bounds checking caused a WASM trap — which JavaScript caught as an opaque exception, silently leaving the canvas blank. The fix was a `if h < ca_step.length()` guard that falls back to zero-filled output.

The lesson: WASM traps are invisible to JavaScript callers unless you wrap every exported call in try/catch. Add defensive bounds checks in MoonBit rather than relying on the JS side to detect them.

### React 18 automatic batching

After implementing the "replace dataset" feature, the DatasetPanel list wasn't refreshing after reinit. The cause: `reset()` calls `setInitialized(false)` and `ensureInit()` immediately calls `setInitialized(true)` — React 18 batches both into a single render, so `initialized` appears not to have changed, and the `useEffect` doesn't re-run. The fix was a `datasetVersion` counter prop that increments unconditionally after any dataset replacement.

### XSS via innerHTML

A vocab word rendered into a prediction bar used `innerHTML` templating. Since vocabulary now comes from user-supplied text, this was a real injection vector. Fixed by replacing the `innerHTML` assignment with explicit DOM construction using `textContent`.

---

## How AI (Claude) Was Used

This project was developed interactively with [Claude Code](https://claude.ai/code) (claude-sonnet-4-6). The collaboration covered every layer:

**MoonBit implementation**
Claude wrote the initial autograd engine, attention mechanism, AdamW optimizer, and visualization data extraction in `viz.mbt`. Debugging the WASM panic (bounds check missing in `cross_ho_flat`) was done by describing the symptom and having Claude trace the execution path through `forward_f.mbt` and `viz.mbt`.

**React / TypeScript frontend**
The WASM loader, training loop hook (`useTraining`), canvas renderers, and all UI components were written with Claude. The ref-based pattern for avoiding stale closures in `useCallback([])` was a Claude suggestion after the first version exhibited stale toggle reads.

**Architecture decisions**
Several design choices — dual forward pass, ablation flags as globals, the FFI protocol — emerged from back-and-forth discussion: describing a constraint, getting a proposed approach, weighing tradeoffs, then deciding. Claude proposed the `g_raw_docs_override` pattern for runtime dataset replacement after the user asked "can we replace the training text entirely?"

**Debugging**
The React batching issue with `datasetVersion` was diagnosed by Claude after describing that the panel list wasn't updating. The WASM panic was found by Claude reading `viz.mbt` and identifying the missing bounds check.

**Security review**
Claude performed a systematic OWASP Top 10 audit of the frontend code, identified the `innerHTML` XSS vulnerability in the prediction bar renderer, and proposed the fix.

**What Claude did not do**
All product decisions — what to build, what to show, what to cut — came from the user. The ablation controls, the custom dataset feature, the canvas diagram layout, and the decision to target wasm-gc were user-driven. Claude translated intentions into working code and flagged issues, but did not originate the goals.

---

## What Was Learned

**MoonBit is ready for non-trivial projects.** The type system, pattern matching, and `Ref[T]` globals handled a stateful ML training loop cleanly. The wasm-gc target produces compact binaries and the FFI, while verbose, is predictable.

**The FFI surface area is the hardest part.** Every new function exposed to JavaScript required changes in four places: `src/`, `cmd/main/main.mbt`, `moon.pkg` exports list, and `moonbit.ts`. A code-generation step or a macro that derives wrappers would significantly reduce this friction.

**Tiny models are surprisingly expressive for visualization.** A 1-layer, 32-dim Transformer is too small to do anything useful in production, but it trains fast enough to show the attention mechanism working, the loss curve falling, and the embedding space evolving — all the things that make the Transformer architecture intuitive.

---

## Project Stats

| | |
|---|---|
| MoonBit source | ~2,450 lines across 10 files |
| TypeScript source | ~3,200 lines across 20+ files |
| WASM binary | ~69 KB |
| Model parameters | ~50K (1 layer, 32-dim, 4-head) |
| Training time | ~5–10 seconds in-browser (2000 steps) |
| Test count | 26 (whitebox + blackbox) |

## References

- Vaswani et al., [Attention Is All You Need](https://arxiv.org/abs/1706.03762) (2017)
- Andrej Karpathy, [minimal GPT implementation](https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95)
- MoonBit language: [moonbitlang.com](https://www.moonbitlang.com/)
