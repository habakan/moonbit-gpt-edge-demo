const $12345678901234567L = { hi: 2874452, lo: 1567312775 };
class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function _M0TPB13StringBuilder(param0) {
  this.val = param0;
}
function $bound_check(arr, index) {
  if (index < 0 || index >= arr.length) throw new Error("Index out of bounds");
}
function _M0TPC16string10StringView(param0, param1, param2) {
  this.str = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB13SourceLocRepr(param0, param1, param2, param3, param4, param5) {
  this.pkg = param0;
  this.filename = param1;
  this.start_line = param2;
  this.start_column = param3;
  this.end_line = param4;
  this.end_column = param5;
}
function $compare_int(a, b) {
  return (a >= b) - (a <= b);
}
const _M0FPB12random__seed = () => {
  if (globalThis.crypto?.getRandomValues) {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    return array[0] | 0; // Convert to signed 32
  } else {
    return Math.floor(Math.random() * 0x100000000) | 0; // Fallback to Math.random
  }
};
function _M0TPB6Hasher(param0) {
  this.acc = param0;
}
const _M0FPB19int__to__string__js = (x, radix) => {
  return x.toString(radix);
};
const _M0MPB7JSArray4push = (arr, val) => { arr.push(val); };
function _M0TPC13ref3RefGiE(param0) {
  this.val = param0;
}
function _M0TPB7MyInt64(param0, param1) {
  this.hi = param0;
  this.lo = param1;
}
const _M0MPB7MyInt6419convert__to__double = (a) => a.hi * 4294967296.0 + (a.lo >>> 0);
function _M0TPB9ArrayViewGiE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB9ArrayViewGdE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB9ArrayViewGRP38username3gpt3src5ValueE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
function _M0TPC17hashmap7HashMapGsiE(param0, param1, param2, param3) {
  this.entries = param0;
  this.capacity = param1;
  this.capacity_mask = param2;
  this.size = param3;
}
function _M0TPC17hashmap7HashMapGibE(param0, param1, param2, param3) {
  this.entries = param0;
  this.capacity = param1;
  this.capacity_mask = param2;
  this.size = param3;
}
function _M0TPC17hashmap5EntryGsiE(param0, param1, param2, param3) {
  this.psl = param0;
  this.hash = param1;
  this.key = param2;
  this.value = param3;
}
function _M0TPC17hashmap5EntryGibE(param0, param1, param2, param3) {
  this.psl = param0;
  this.hash = param1;
  this.key = param2;
  this.value = param3;
}
function _M0TPC17hashset7HashSetGsE(param0, param1, param2, param3, param4) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
}
function _M0TPC17hashset5EntryGsE(param0, param1, param2) {
  this.psl = param0;
  this.hash = param1;
  this.key = param2;
}
function _M0TPC13ref3RefGRPB5ArrayGsEE(param0) {
  this.val = param0;
}
function _M0TPC13ref3RefGRPC17hashmap7HashMapGsiEE(param0) {
  this.val = param0;
}
function _M0TPC13ref3RefGbE(param0) {
  this.val = param0;
}
function _M0TP38username3gpt3src5Value(param0, param1, param2, param3, param4) {
  this.id = param0;
  this.data = param1;
  this.grad = param2;
  this.children = param3;
  this.local_grads = param4;
}
const $6364136223846793005L = { hi: 1481765933, lo: 1284865837 };
const $1442695040888963407L = { hi: 335903614, lo: -144211633 };
const $9223372036854775807L = { hi: 2147483647, lo: -1 };
const _M0FP48username3gpt3cmd4main17js__set__init__fn = (f) => { window._mbt_init = f; };
const _M0FP48username3gpt3cmd4main24js__set__train__step__fn = (f) => { window._mbt_train_step = f; };
const _M0FP48username3gpt3cmd4main21js__set__generate__fn = (f) => { window._mbt_generate = f; };
const _M0FP48username3gpt3cmd4main22js__set__get__step__fn = (f) => { window._mbt_get_step = f; };
const _M0FP48username3gpt3cmd4main28js__set__get__num__steps__fn = (f) => { window._mbt_get_num_steps = f; };
const _M0FP48username3gpt3cmd4main27js__set__run__attn__viz__fn = (f) => { window._mbt_run_attn_viz = f; };
const _M0FP48username3gpt3cmd4main31js__set__get__viz__seq__len__fn = (f) => { window._mbt_get_viz_seq_len = f; };
const _M0FP48username3gpt3cmd4main29js__set__get__viz__tokens__fn = (f) => { window._mbt_get_viz_tokens = f; };
const _M0FP48username3gpt3cmd4main33js__set__get__viz__attn__flat__fn = (f) => { window._mbt_get_viz_attn_flat = f; };
const _M0FP48username3gpt3cmd4main39js__set__get__embedding__similarity__fn = (f) => { window._mbt_get_embedding_similarity = f; };
const _M0FP48username3gpt3cmd4main31js__set__get__vocab__string__fn = (f) => { window._mbt_get_vocab_string = f; };
const _M0FP48username3gpt3cmd4main35js__set__get__viz__hidden__flat__fn = (f) => { window._mbt_get_viz_hidden_flat = f; };
const _M0FP48username3gpt3cmd4main38js__set__get__viz__mlp__acts__flat__fn = (f) => { window._mbt_get_viz_mlp_acts_flat = f; };
const _M0FP48username3gpt3cmd4main35js__set__get__viz__logits__flat__fn = (f) => { window._mbt_get_viz_logits_flat = f; };
const _M0FP48username3gpt3cmd4main30js__set__run__network__viz__fn = (f) => { window._mbt_run_network_viz = f; };
const _M0FP48username3gpt3cmd4main36js__set__get__network__viz__flat__fn = (f) => { window._mbt_get_network_viz_flat = f; };
const _M0FP48username3gpt3cmd4main36js__set__get__network__viz__attn__fn = (f) => { window._mbt_get_network_viz_attn = f; };
const _M0FP48username3gpt3cmd4main35js__set__get__network__viz__seq__fn = (f) => { window._mbt_get_network_viz_seq = f; };
const _M0FP48username3gpt3cmd4main35js__set__get__network__viz__pos__fn = (f) => { window._mbt_get_network_viz_pos = f; };
const _M0FP48username3gpt3cmd4main41js__set__get__network__viz__enc__flat__fn = (f) => { window._mbt_get_network_viz_enc_flat = f; };
const _M0FP48username3gpt3cmd4main41js__set__get__network__viz__dec__flat__fn = (f) => { window._mbt_get_network_viz_dec_flat = f; };
const _M0FP48username3gpt3cmd4main47js__set__get__network__viz__enc__self__attn__fn = (f) => { window._mbt_get_network_viz_enc_self_attn = f; };
const _M0FP48username3gpt3cmd4main47js__set__get__network__viz__dec__self__attn__fn = (f) => { window._mbt_get_network_viz_dec_self_attn = f; };
const _M0FP48username3gpt3cmd4main43js__set__get__network__viz__cross__attn__fn = (f) => { window._mbt_get_network_viz_cross_attn = f; };
const _M0FP48username3gpt3cmd4main40js__set__get__network__viz__src__len__fn = (f) => { window._mbt_get_network_viz_src_len = f; };
const _M0FP48username3gpt3cmd4main40js__set__get__network__viz__tgt__len__fn = (f) => { window._mbt_get_network_viz_tgt_len = f; };
const _M0FP48username3gpt3cmd4main43js__set__get__network__viz__src__tokens__fn = (f) => { window._mbt_get_network_viz_src_tokens = f; };
const _M0FP48username3gpt3cmd4main43js__set__get__network__viz__tgt__tokens__fn = (f) => { window._mbt_get_network_viz_tgt_tokens = f; };
const _M0FP48username3gpt3cmd4main44js__set__get__network__viz__enc__q__flat__fn = (f) => { window._mbt_get_network_viz_enc_q_flat = f; };
const _M0FP48username3gpt3cmd4main44js__set__get__network__viz__enc__k__flat__fn = (f) => { window._mbt_get_network_viz_enc_k_flat = f; };
const _M0FP48username3gpt3cmd4main44js__set__get__network__viz__enc__v__flat__fn = (f) => { window._mbt_get_network_viz_enc_v_flat = f; };
const _M0FP48username3gpt3cmd4main44js__set__get__network__viz__dec__q__flat__fn = (f) => { window._mbt_get_network_viz_dec_q_flat = f; };
const _M0FP48username3gpt3cmd4main44js__set__get__network__viz__dec__k__flat__fn = (f) => { window._mbt_get_network_viz_dec_k_flat = f; };
const _M0FP48username3gpt3cmd4main44js__set__get__network__viz__dec__v__flat__fn = (f) => { window._mbt_get_network_viz_dec_v_flat = f; };
const _M0FP48username3gpt3cmd4main45js__set__get__network__viz__enc__ho__flat__fn = (f) => { window._mbt_get_network_viz_enc_ho_flat = f; };
const _M0FP48username3gpt3cmd4main45js__set__get__network__viz__dec__ho__flat__fn = (f) => { window._mbt_get_network_viz_dec_ho_flat = f; };
const _M0FP48username3gpt3cmd4main47js__set__get__network__viz__cross__ho__flat__fn = (f) => { window._mbt_get_network_viz_cross_ho_flat = f; };
const _M0FP48username3gpt3cmd4main27js__set__set__gpt__mode__fn = (f) => { window._mbt_set_gpt_mode = f; };
const _M0FP48username3gpt3cmd4main27js__set__get__gpt__mode__fn = (f) => { window._mbt_get_gpt_mode = f; };
const _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char };
const _M0FP38username3gpt3src9raw__docs = ["mix flour and water until smooth", "add salt and pepper to taste", "boil water in a large pot", "cook pasta until al dente", "drain pasta using a colander", "heat olive oil in a pan", "saute garlic in butter", "add onion and cook until soft", "season with salt and pepper", "stir the sauce gently", "simmer over low heat", "slice the tomato thinly", "chop onion and garlic", "dice carrot and celery", "mince the garlic cloves", "rinse rice with cold water", "bake in the oven until golden", "whisk eggs and cream together", "mix flour and butter", "pour batter into the pan", "fold in the cream gently", "preheat the oven", "grease the pan with butter", "let cool for five minutes", "serve with fresh parsley", "combine all ingredients", "stir until smooth and creamy", "add tomato sauce and stir", "fry in olive oil", "season the chicken with salt", "bring to a boil", "reduce heat and simmer", "cover the pot", "remove from heat", "toss with olive oil", "sprinkle with cheese", "add butter and stir", "cook the onion until soft", "heat the pan over medium heat", "stir until golden brown", "cook for ten minutes", "drain and rinse with water", "chop the carrot finely", "add egg and mix well", "bake until golden and crisp", "add garlic to the oil", "cook over medium heat", "stir in the cream", "season with pepper and salt", "combine flour and egg", "whisk until smooth", "add water to the pot", "cook rice in salted water", "stir in butter until melted", "serve with pasta", "heat butter in a pan", "saute onion in olive oil", "chop garlic finely", "mash potato until smooth", "mix well and serve", "boil for ten minutes"];
const _M0FP38username3gpt3src17g__viz__mlp__acts = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src6g__bos = _M0MPC13ref3Ref3newGiE(0);
const _M0FP38username3gpt3src19g__viz__tokens__str = _M0MPC13ref3Ref3newGRPC17hashmap7HashMapGsiEE("");
const _M0FP38username3gpt3src10g__enc__wq = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src11g__enc__fc1 = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src10g__enc__wk = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src10g__enc__wv = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src10g__enc__wo = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src6g__wte = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src11g__wpe__enc = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src11g__enc__fc2 = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src11g__word2idx = _M0MPC13ref3Ref3newGRPC17hashmap7HashMapGsiEE(_M0MPC17hashmap7HashMap11new_2einnerGsiE(8));
const _M0FP38username3gpt3src12g__gpt__mode = _M0MPC13ref3Ref3newGbE(false);
const _M0FP38username3gpt3src16g__viz__seq__len = _M0MPC13ref3Ref3newGiE(0);
const _M0FP38username3gpt3src18g__viz__attn__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src14g__viz__logits = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FPB4seed = _M0FPB12random__seed();
const _M0FP38username3gpt3src14g__viz__hidden = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src21g__net__dec__ho__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src20g__net__enc__k__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src19g__net__cross__attn = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src23g__net__enc__self__attn = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src20g__net__dec__k__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src11g__net__pos = _M0MPC13ref3Ref3newGiE(0);
const _M0FP38username3gpt3src8g__vocab = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src23g__net__cross__ho__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src10g__dec__xv = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src14g__vocab__size = _M0MPC13ref3Ref3newGiE(0);
const _M0FP38username3gpt3src10g__dec__xq = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src9g__params = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src11g__dec__fc2 = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src10g__dec__wk = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src7g__docs = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src10g__dec__xo = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src10g__dec__wv = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src11g__dec__fc1 = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src10g__dec__wo = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src10g__dec__xk = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src6g__rng = _M0MPC13ref3Ref3newGRPC17hashmap7HashMapGsiEE($12345678901234567L);
const _M0FP38username3gpt3src11g__next__id = _M0MPC13ref3Ref3newGiE(0);
const _M0FP38username3gpt3src10g__dec__wq = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src7g__step = _M0MPC13ref3Ref3newGiE(0);
const _M0FP38username3gpt3src11g__wpe__dec = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src10g__adam__m = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src10g__adam__v = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src11g__lm__head = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src17g__net__enc__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src21g__net__enc__ho__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src20g__net__enc__q__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src17g__net__dec__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src20g__net__dec__v__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src20g__net__enc__v__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src24g__net__src__tokens__str = _M0MPC13ref3Ref3newGRPC17hashmap7HashMapGsiEE("");
const _M0FP38username3gpt3src16g__net__tgt__len = _M0MPC13ref3Ref3newGiE(0);
const _M0FP38username3gpt3src12g__net__attn = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src20g__net__dec__q__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src12g__net__flat = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src16g__net__src__len = _M0MPC13ref3Ref3newGiE(0);
const _M0FP38username3gpt3src11g__net__seq = _M0MPC13ref3Ref3newGiE(0);
const _M0FP38username3gpt3src23g__net__dec__self__attn = _M0MPC13ref3Ref3newGRPB5ArrayGsEE([]);
const _M0FP38username3gpt3src24g__net__tgt__tokens__str = _M0MPC13ref3Ref3newGRPC17hashmap7HashMapGsiEE("");
function _M0FPC15abort5abortGRPB9ArrayViewGiEE(msg) {
  return $panic();
}
function _M0FPC15abort5abortGiE(msg) {
  return $panic();
}
function _M0FPC15abort5abortGdE(msg) {
  return $panic();
}
function _M0MPB6Hasher8consume4(self, input) {
  const _p = (self.acc >>> 0) + ((Math.imul(input, -1028477379) | 0) >>> 0) | 0;
  const _p$2 = 17;
  self.acc = Math.imul(_p << _p$2 | (_p >>> (32 - _p$2 | 0) | 0), 668265263) | 0;
}
function _M0MPB6Hasher13combine__uint(self, value) {
  self.acc = (self.acc >>> 0) + (4 >>> 0) | 0;
  _M0MPB6Hasher8consume4(self, value);
}
function _M0FPB5abortGRPB9ArrayViewGiEE(string, loc) {
  return _M0FPC15abort5abortGRPB9ArrayViewGiEE(`${string}\n  at ${_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(loc)}\n`);
}
function _M0FPB5abortGiE(string, loc) {
  return _M0FPC15abort5abortGiE(`${string}\n  at ${_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(loc)}\n`);
}
function _M0FPB5abortGdE(string, loc) {
  return _M0FPC15abort5abortGdE(`${string}\n  at ${_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(loc)}\n`);
}
function _M0MPB13StringBuilder11new_2einner(size_hint) {
  return new _M0TPB13StringBuilder("");
}
function _M0IPB13StringBuilderPB6Logger11write__char(self, ch) {
  self.val = `${self.val}${String.fromCodePoint(ch)}`;
}
function _M0MPC16uint166UInt1622is__leading__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 55296) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 56319);
}
function _M0MPC16uint166UInt1623is__trailing__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 56320) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 57343);
}
function _M0FPB32code__point__of__surrogate__pair(leading, trailing) {
  return (((Math.imul(leading - 55296 | 0, 1024) | 0) + trailing | 0) - 56320 | 0) + 65536 | 0;
}
function _M0MPC15array5Array2atGsE(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function _M0MPC15array5Array2atGiE(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function _M0MPC15array5Array2atGdE(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function _M0MPB13SourceLocRepr5parse(repr) {
  const _bind = new _M0TPC16string10StringView(repr, 0, repr.length);
  const _data = _bind.str;
  const _start = _bind.start;
  const _end = _start + (_bind.end - _bind.start | 0) | 0;
  let _cursor = _start;
  let accept_state = -1;
  let match_end = -1;
  let match_tag_saver_0 = -1;
  let match_tag_saver_1 = -1;
  let match_tag_saver_2 = -1;
  let match_tag_saver_3 = -1;
  let match_tag_saver_4 = -1;
  let tag_0 = -1;
  let tag_1 = -1;
  let tag_1_1 = -1;
  let tag_1_2 = -1;
  let tag_3 = -1;
  let tag_2 = -1;
  let tag_2_1 = -1;
  let tag_4 = -1;
  _L: {
    if (_cursor < _end) {
      const _p = _cursor;
      if (_data.charCodeAt(_p) === 64) {
        _cursor = _cursor + 1 | 0;
        _L$2: while (true) {
          tag_0 = _cursor;
          if (_cursor < _end) {
            const _p$2 = _cursor;
            const next_char = _data.charCodeAt(_p$2);
            _cursor = _cursor + 1 | 0;
            if (next_char === 58) {
              if (_cursor < _end) {
                _cursor = _cursor + 1 | 0;
                let _tmp = 0;
                _L$3: while (true) {
                  const dispatch_15 = _tmp;
                  _L$4: {
                    _L$5: {
                      switch (dispatch_15) {
                        case 3: {
                          tag_1_2 = tag_1_1;
                          tag_1_1 = tag_1;
                          tag_1 = _cursor;
                          if (_cursor < _end) {
                            _L$6: {
                              const _p$3 = _cursor;
                              const next_char$2 = _data.charCodeAt(_p$3);
                              _cursor = _cursor + 1 | 0;
                              if (next_char$2 < 58) {
                                if (next_char$2 < 48) {
                                  break _L$6;
                                } else {
                                  tag_1 = _cursor;
                                  tag_2_1 = tag_2;
                                  tag_2 = _cursor;
                                  tag_3 = _cursor;
                                  if (_cursor < _end) {
                                    _L$7: {
                                      const _p$4 = _cursor;
                                      const next_char$3 = _data.charCodeAt(_p$4);
                                      _cursor = _cursor + 1 | 0;
                                      if (next_char$3 < 48) {
                                        if (next_char$3 === 45) {
                                          break _L$4;
                                        } else {
                                          break _L$7;
                                        }
                                      } else {
                                        if (next_char$3 > 57) {
                                          if (next_char$3 < 59) {
                                            _tmp = 3;
                                            continue _L$3;
                                          } else {
                                            break _L$7;
                                          }
                                        } else {
                                          _tmp = 6;
                                          continue _L$3;
                                        }
                                      }
                                    }
                                    _tmp = 0;
                                    continue _L$3;
                                  } else {
                                    break _L;
                                  }
                                }
                              } else {
                                if (next_char$2 > 58) {
                                  break _L$6;
                                } else {
                                  _tmp = 1;
                                  continue _L$3;
                                }
                              }
                            }
                            _tmp = 0;
                            continue _L$3;
                          } else {
                            break _L;
                          }
                        }
                        case 2: {
                          tag_1 = _cursor;
                          tag_2 = _cursor;
                          if (_cursor < _end) {
                            _L$6: {
                              const _p$3 = _cursor;
                              const next_char$2 = _data.charCodeAt(_p$3);
                              _cursor = _cursor + 1 | 0;
                              if (next_char$2 < 58) {
                                if (next_char$2 < 48) {
                                  break _L$6;
                                } else {
                                  _tmp = 2;
                                  continue _L$3;
                                }
                              } else {
                                if (next_char$2 > 58) {
                                  break _L$6;
                                } else {
                                  _tmp = 3;
                                  continue _L$3;
                                }
                              }
                            }
                            _tmp = 0;
                            continue _L$3;
                          } else {
                            break _L;
                          }
                        }
                        case 0: {
                          tag_1 = _cursor;
                          if (_cursor < _end) {
                            const _p$3 = _cursor;
                            const next_char$2 = _data.charCodeAt(_p$3);
                            _cursor = _cursor + 1 | 0;
                            if (next_char$2 === 58) {
                              _tmp = 1;
                              continue _L$3;
                            } else {
                              _tmp = 0;
                              continue _L$3;
                            }
                          } else {
                            break _L;
                          }
                        }
                        case 4: {
                          tag_1 = _cursor;
                          tag_4 = _cursor;
                          if (_cursor < _end) {
                            _L$6: {
                              const _p$3 = _cursor;
                              const next_char$2 = _data.charCodeAt(_p$3);
                              _cursor = _cursor + 1 | 0;
                              if (next_char$2 < 58) {
                                if (next_char$2 < 48) {
                                  break _L$6;
                                } else {
                                  _tmp = 4;
                                  continue _L$3;
                                }
                              } else {
                                if (next_char$2 > 58) {
                                  break _L$6;
                                } else {
                                  tag_1_2 = tag_1_1;
                                  tag_1_1 = tag_1;
                                  tag_1 = _cursor;
                                  if (_cursor < _end) {
                                    _L$7: {
                                      const _p$4 = _cursor;
                                      const next_char$3 = _data.charCodeAt(_p$4);
                                      _cursor = _cursor + 1 | 0;
                                      if (next_char$3 < 58) {
                                        if (next_char$3 < 48) {
                                          break _L$7;
                                        } else {
                                          tag_1 = _cursor;
                                          tag_2_1 = tag_2;
                                          tag_2 = _cursor;
                                          if (_cursor < _end) {
                                            _L$8: {
                                              const _p$5 = _cursor;
                                              const next_char$4 = _data.charCodeAt(_p$5);
                                              _cursor = _cursor + 1 | 0;
                                              if (next_char$4 < 58) {
                                                if (next_char$4 < 48) {
                                                  break _L$8;
                                                } else {
                                                  _tmp = 5;
                                                  continue _L$3;
                                                }
                                              } else {
                                                if (next_char$4 > 58) {
                                                  break _L$8;
                                                } else {
                                                  _tmp = 3;
                                                  continue _L$3;
                                                }
                                              }
                                            }
                                            _tmp = 0;
                                            continue _L$3;
                                          } else {
                                            break _L$5;
                                          }
                                        }
                                      } else {
                                        if (next_char$3 > 58) {
                                          break _L$7;
                                        } else {
                                          _tmp = 1;
                                          continue _L$3;
                                        }
                                      }
                                    }
                                    _tmp = 0;
                                    continue _L$3;
                                  } else {
                                    break _L;
                                  }
                                }
                              }
                            }
                            _tmp = 0;
                            continue _L$3;
                          } else {
                            break _L;
                          }
                        }
                        case 5: {
                          tag_1 = _cursor;
                          tag_2 = _cursor;
                          if (_cursor < _end) {
                            _L$6: {
                              const _p$3 = _cursor;
                              const next_char$2 = _data.charCodeAt(_p$3);
                              _cursor = _cursor + 1 | 0;
                              if (next_char$2 < 58) {
                                if (next_char$2 < 48) {
                                  break _L$6;
                                } else {
                                  _tmp = 5;
                                  continue _L$3;
                                }
                              } else {
                                if (next_char$2 > 58) {
                                  break _L$6;
                                } else {
                                  _tmp = 3;
                                  continue _L$3;
                                }
                              }
                            }
                            _tmp = 0;
                            continue _L$3;
                          } else {
                            break _L$5;
                          }
                        }
                        case 6: {
                          tag_1 = _cursor;
                          tag_2 = _cursor;
                          tag_3 = _cursor;
                          if (_cursor < _end) {
                            _L$6: {
                              const _p$3 = _cursor;
                              const next_char$2 = _data.charCodeAt(_p$3);
                              _cursor = _cursor + 1 | 0;
                              if (next_char$2 < 48) {
                                if (next_char$2 === 45) {
                                  break _L$4;
                                } else {
                                  break _L$6;
                                }
                              } else {
                                if (next_char$2 > 57) {
                                  if (next_char$2 < 59) {
                                    _tmp = 3;
                                    continue _L$3;
                                  } else {
                                    break _L$6;
                                  }
                                } else {
                                  _tmp = 6;
                                  continue _L$3;
                                }
                              }
                            }
                            _tmp = 0;
                            continue _L$3;
                          } else {
                            break _L;
                          }
                        }
                        case 1: {
                          tag_1_1 = tag_1;
                          tag_1 = _cursor;
                          if (_cursor < _end) {
                            _L$6: {
                              const _p$3 = _cursor;
                              const next_char$2 = _data.charCodeAt(_p$3);
                              _cursor = _cursor + 1 | 0;
                              if (next_char$2 < 58) {
                                if (next_char$2 < 48) {
                                  break _L$6;
                                } else {
                                  _tmp = 2;
                                  continue _L$3;
                                }
                              } else {
                                if (next_char$2 > 58) {
                                  break _L$6;
                                } else {
                                  _tmp = 1;
                                  continue _L$3;
                                }
                              }
                            }
                            _tmp = 0;
                            continue _L$3;
                          } else {
                            break _L;
                          }
                        }
                        default: {
                          break _L;
                        }
                      }
                    }
                    tag_1 = tag_1_2;
                    tag_2 = tag_2_1;
                    match_tag_saver_0 = tag_0;
                    match_tag_saver_1 = tag_1;
                    match_tag_saver_2 = tag_2;
                    match_tag_saver_3 = tag_3;
                    match_tag_saver_4 = tag_4;
                    accept_state = 0;
                    match_end = _cursor;
                    break _L;
                  }
                  tag_1_1 = tag_1_2;
                  tag_1 = _cursor;
                  tag_2 = tag_2_1;
                  if (_cursor < _end) {
                    _L$5: {
                      const _p$3 = _cursor;
                      const next_char$2 = _data.charCodeAt(_p$3);
                      _cursor = _cursor + 1 | 0;
                      if (next_char$2 < 58) {
                        if (next_char$2 < 48) {
                          break _L$5;
                        } else {
                          _tmp = 4;
                          continue;
                        }
                      } else {
                        if (next_char$2 > 58) {
                          break _L$5;
                        } else {
                          _tmp = 1;
                          continue;
                        }
                      }
                    }
                    _tmp = 0;
                    continue;
                  } else {
                    break _L;
                  }
                }
              } else {
                break _L;
              }
            } else {
              continue;
            }
          } else {
            break _L;
          }
        }
      } else {
        break _L;
      }
    } else {
      break _L;
    }
  }
  if (accept_state === 0) {
    const start_line = _M0MPC16string6String4view(_data, match_tag_saver_1 + 1 | 0, match_tag_saver_2);
    const start_column = _M0MPC16string6String4view(_data, match_tag_saver_2 + 1 | 0, match_tag_saver_3);
    const pkg = _M0MPC16string6String4view(_data, _start + 1 | 0, match_tag_saver_0);
    const filename = _M0MPC16string6String4view(_data, match_tag_saver_0 + 1 | 0, match_tag_saver_1);
    const end_line = _M0MPC16string6String4view(_data, match_tag_saver_3 + 1 | 0, match_tag_saver_4);
    const end_column = _M0MPC16string6String4view(_data, match_tag_saver_4 + 1 | 0, match_end);
    return new _M0TPB13SourceLocRepr(pkg, filename, start_line, start_column, end_line, end_column);
  } else {
    return $panic();
  }
}
function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
  self.val = `${self.val}${str}`;
}
function _M0MPB6Hasher12combine__int(self, value) {
  _M0MPB6Hasher13combine__uint(self, value);
}
function _M0MPB6Hasher7combineGsE(self, value) {
  _M0IPC16string6StringPB4Hash13hash__combine(value, self);
}
function _M0MPB6Hasher7combineGiE(self, value) {
  _M0IPC13int3IntPB4Hash13hash__combine(value, self);
}
function _M0IP016_24default__implPB7Compare6op__gtGsE(x, y) {
  return _M0IPC16string6StringPB7Compare7compare(x, y) > 0;
}
function _M0IP016_24default__implPB7Compare6op__leGkE(x, y) {
  return $compare_int(x, y) <= 0;
}
function _M0IP016_24default__implPB7Compare6op__geGkE(x, y) {
  return $compare_int(x, y) >= 0;
}
function _M0MPB6Hasher9avalanche(self) {
  let acc = self.acc;
  acc = acc ^ (acc >>> 15 | 0);
  acc = Math.imul(acc, -2048144777) | 0;
  acc = acc ^ (acc >>> 13 | 0);
  acc = Math.imul(acc, -1028477379) | 0;
  acc = acc ^ (acc >>> 16 | 0);
  return acc;
}
function _M0MPB6Hasher8finalize(self) {
  return _M0MPB6Hasher9avalanche(self);
}
function _M0MPB6Hasher11new_2einner(seed) {
  return new _M0TPB6Hasher((seed >>> 0) + (374761393 >>> 0) | 0);
}
function _M0MPB6Hasher3new(seed$46$opt) {
  let seed;
  if (seed$46$opt === undefined) {
    seed = _M0FPB4seed;
  } else {
    const _Some = seed$46$opt;
    seed = _Some;
  }
  return _M0MPB6Hasher11new_2einner(seed);
}
function _M0IP016_24default__implPB4Hash4hashGsE(self) {
  const h = _M0MPB6Hasher3new(undefined);
  _M0MPB6Hasher7combineGsE(h, self);
  return _M0MPB6Hasher8finalize(h);
}
function _M0IP016_24default__implPB4Hash4hashGiE(self) {
  const h = _M0MPB6Hasher3new(undefined);
  _M0MPB6Hasher7combineGiE(h, self);
  return _M0MPB6Hasher8finalize(h);
}
function _M0MPC16string6String11sub_2einner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  if (start$2 >= 0 && (start$2 <= end$2 && end$2 <= len)) {
    if (start$2 < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(start$2))) {
      } else {
        $panic();
      }
    }
    if (end$2 < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(end$2))) {
      } else {
        $panic();
      }
    }
    return new _M0TPC16string10StringView(self, start$2, end$2);
  } else {
    return $panic();
  }
}
function _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(self, value, start, len) {
  _M0IPB13StringBuilderPB6Logger11write__view(self, _M0MPC16string6String11sub_2einner(value, start, start + len | 0));
}
function _M0IP016_24default__implPB4Show10to__stringGiE(self) {
  const logger = _M0MPB13StringBuilder11new_2einner(0);
  _M0IPC13int3IntPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return logger.val;
}
function _M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(self) {
  const logger = _M0MPB13StringBuilder11new_2einner(0);
  _M0IPB9SourceLocPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return logger.val;
}
function _M0MPB4Iter4nextGsE(self) {
  const _func = self;
  return _func();
}
function _M0MPB4Iter4nextGcE(self) {
  const _func = self;
  return _func();
}
function _M0MPC13int3Int18to__string_2einner(self, radix) {
  return _M0FPB19int__to__string__js(self, radix);
}
function _M0IPC16string10StringViewPB4Show10to__string(self) {
  return self.str.substring(self.start, self.end);
}
function _M0MPC16string6String12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= self.length) ? new _M0TPC16string10StringView(self, start_offset, end_offset$2) : _M0FPB5abortGRPB9ArrayViewGiEE("Invalid index for View", "@moonbitlang/core/builtin:stringview.mbt:399:5-399:36");
}
function _M0MPC16string6String4view(self, start_offset$46$opt, end_offset) {
  let start_offset;
  if (start_offset$46$opt === undefined) {
    start_offset = 0;
  } else {
    const _Some = start_offset$46$opt;
    start_offset = _Some;
  }
  return _M0MPC16string6String12view_2einner(self, start_offset, end_offset);
}
function _M0IPB13StringBuilderPB6Logger11write__view(self, str) {
  self.val = `${self.val}${_M0IPC16string10StringViewPB4Show10to__string(str)}`;
}
function _M0MPB13StringBuilder5reset(self) {
  self.val = "";
}
function _M0MPC15array5Array4pushGsE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC15array5Array4pushGiE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC15array5Array4pushGRPB5ArrayGiEE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC15array5Array4pushGdE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC16string6String4iter(self) {
  const len = self.length;
  const index = new _M0TPC13ref3RefGiE(0);
  const _p = () => {
    if (index.val < len) {
      const c1 = self.charCodeAt(index.val);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index.val + 1 | 0) < len) {
        const c2 = self.charCodeAt(index.val + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          const c = _M0FPB32code__point__of__surrogate__pair(c1, c2);
          index.val = index.val + 2 | 0;
          return c;
        }
      }
      index.val = index.val + 1 | 0;
      return c1;
    } else {
      return -1;
    }
  };
  return _p;
}
function _M0IPC16string6StringPB7Compare7compare(self, other) {
  const len = self.length;
  const _bind = $compare_int(len, other.length);
  if (_bind === 0) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _p = self.charCodeAt(i);
        const _p$2 = other.charCodeAt(i);
        const order = $compare_int(_p, _p$2);
        if (order !== 0) {
          return order;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return 0;
  } else {
    return _bind;
  }
}
function _M0IPC13int3IntPB4Show6output(self, logger) {
  logger.method_table.method_0(logger.self, _M0MPC13int3Int18to__string_2einner(self, 10));
}
function _M0MPC15array9ArrayView2atGiE(self, index) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return _M0FPB5abortGiE(`index out of bounds: the len is from 0 to ${_M0IP016_24default__implPB4Show10to__stringGiE(self.end - self.start | 0)} but the index is ${_M0IP016_24default__implPB4Show10to__stringGiE(index)}`, "@moonbitlang/core/builtin:arrayview.mbt:135:5-137:6");
  }
}
function _M0MPC15array9ArrayView2atGdE(self, index) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return _M0FPB5abortGdE(`index out of bounds: the len is from 0 to ${_M0IP016_24default__implPB4Show10to__stringGiE(self.end - self.start | 0)} but the index is ${_M0IP016_24default__implPB4Show10to__stringGiE(index)}`, "@moonbitlang/core/builtin:arrayview.mbt:135:5-137:6");
  }
}
function _M0MPC15array9ArrayView2atGRP38username3gpt3src5ValueE(self, index) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return _M0FPB5abortGRPB9ArrayViewGiEE(`index out of bounds: the len is from 0 to ${_M0IP016_24default__implPB4Show10to__stringGiE(self.end - self.start | 0)} but the index is ${_M0IP016_24default__implPB4Show10to__stringGiE(index)}`, "@moonbitlang/core/builtin:arrayview.mbt:135:5-137:6");
  }
}
function _M0MPC15array5Array4makeGdE(len, elem) {
  const arr = new Array(len);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      arr[i] = elem;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array4makeGiE(len, elem) {
  const arr = new Array(len);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      arr[i] = elem;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array4makeGRP38username3gpt3src5ValueE(len, elem) {
  const arr = new Array(len);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      arr[i] = elem;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3setGsE(self, index, value) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    self[index] = value;
    return;
  } else {
    $panic();
    return;
  }
}
function _M0MPC15array5Array3setGdE(self, index, value) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    self[index] = value;
    return;
  } else {
    $panic();
    return;
  }
}
function _M0MPC15array5Array3setGiE(self, index, value) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    self[index] = value;
    return;
  } else {
    $panic();
    return;
  }
}
function _M0MPC15array9ArrayView9to__arrayGiE(self) {
  const len = self.end - self.start | 0;
  if (len === 0) {
    return [];
  } else {
    const arr = _M0MPC15array5Array4makeGiE(len, _M0MPC15array9ArrayView2atGiE(self, 0));
    const _bind = self.end - self.start | 0;
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < _bind) {
        const v = self.buf[self.start + i | 0];
        _M0MPC15array5Array3setGiE(arr, i, v);
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return arr;
  }
}
function _M0MPC15array9ArrayView9to__arrayGdE(self) {
  const len = self.end - self.start | 0;
  if (len === 0) {
    return [];
  } else {
    const arr = _M0MPC15array5Array4makeGdE(len, _M0MPC15array9ArrayView2atGdE(self, 0));
    const _bind = self.end - self.start | 0;
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < _bind) {
        const v = self.buf[self.start + i | 0];
        _M0MPC15array5Array3setGdE(arr, i, v);
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return arr;
  }
}
function _M0MPC15array9ArrayView9to__arrayGRP38username3gpt3src5ValueE(self) {
  const len = self.end - self.start | 0;
  if (len === 0) {
    return [];
  } else {
    const arr = _M0MPC15array5Array4makeGRP38username3gpt3src5ValueE(len, _M0MPC15array9ArrayView2atGRP38username3gpt3src5ValueE(self, 0));
    const _bind = self.end - self.start | 0;
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < _bind) {
        const v = self.buf[self.start + i | 0];
        _M0MPC15array5Array3setGsE(arr, i, v);
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return arr;
  }
}
function _M0MPC13int3Int20next__power__of__two(self) {
  if (self >= 0) {
    if (self <= 1) {
      return 1;
    }
    if (self > 1073741824) {
      return 1073741824;
    }
    return (2147483647 >> (Math.clz32(self - 1 | 0) - 1 | 0)) + 1 | 0;
  } else {
    return $panic();
  }
}
function _M0MPB7MyInt6411add__hi__lo(self, bhi, blo) {
  const _ahi = self.hi;
  const _alo = self.lo;
  const lo = _alo + blo | 0;
  const s = lo >> 31;
  const as_ = _alo >> 31;
  const bs = blo >> 31;
  const c = (as_ & bs | ~s & (as_ ^ bs)) & 1;
  const hi = (_ahi + bhi | 0) + c | 0;
  return new _M0TPB7MyInt64(hi, lo);
}
function _M0IPB7MyInt64PB3Add3add(self, other) {
  return _M0MPB7MyInt6411add__hi__lo(self, other.hi, other.lo);
}
function _M0IPB7MyInt64PB3Mul3mul(self, other) {
  const _ahi = self.hi;
  const _alo = self.lo;
  const _bhi = other.hi;
  const _blo = other.lo;
  const ahi = _ahi;
  const alo = _alo;
  const bhi = _bhi;
  const blo = _blo;
  const a48 = ahi >>> 16 | 0;
  const a32 = ahi & 65535;
  const a16 = alo >>> 16 | 0;
  const a00 = alo & 65535;
  const b48 = bhi >>> 16 | 0;
  const b32 = bhi & 65535;
  const b16 = blo >>> 16 | 0;
  const b00 = blo & 65535;
  const c00 = Math.imul(a00, b00) | 0;
  const c16 = c00 >>> 16 | 0;
  const c00$2 = c00 & 65535;
  const c16$2 = (c16 >>> 0) + ((Math.imul(a16, b00) | 0) >>> 0) | 0;
  const c32 = c16$2 >>> 16 | 0;
  const c16$3 = c16$2 & 65535;
  const c16$4 = (c16$3 >>> 0) + ((Math.imul(a00, b16) | 0) >>> 0) | 0;
  const c32$2 = (c32 >>> 0) + ((c16$4 >>> 16 | 0) >>> 0) | 0;
  const c16$5 = c16$4 & 65535;
  const c32$3 = (c32$2 >>> 0) + ((Math.imul(a32, b00) | 0) >>> 0) | 0;
  const c48 = c32$3 >>> 16 | 0;
  const c32$4 = c32$3 & 65535;
  const c32$5 = (c32$4 >>> 0) + ((Math.imul(a16, b16) | 0) >>> 0) | 0;
  const c48$2 = (c48 >>> 0) + ((c32$5 >>> 16 | 0) >>> 0) | 0;
  const c32$6 = c32$5 & 65535;
  const c32$7 = (c32$6 >>> 0) + ((Math.imul(a00, b32) | 0) >>> 0) | 0;
  const c48$3 = (c48$2 >>> 0) + ((c32$7 >>> 16 | 0) >>> 0) | 0;
  const c32$8 = c32$7 & 65535;
  const c48$4 = (((((((c48$3 >>> 0) + ((Math.imul(a48, b00) | 0) >>> 0) | 0) >>> 0) + ((Math.imul(a32, b16) | 0) >>> 0) | 0) >>> 0) + ((Math.imul(a16, b32) | 0) >>> 0) | 0) >>> 0) + ((Math.imul(a00, b48) | 0) >>> 0) | 0;
  const c48$5 = c48$4 & 65535;
  return new _M0TPB7MyInt64(c48$5 << 16 | c32$8, c16$5 << 16 | c00$2);
}
function _M0MPB7MyInt644land(self, other) {
  return new _M0TPB7MyInt64(self.hi & other.hi, self.lo & other.lo);
}
function _M0IPC15int645Int64PB3Add3add(self, other) {
  return _M0IPB7MyInt64PB3Add3add(self, other);
}
function _M0IPC15int645Int64PB3Mul3mul(self, other) {
  return _M0IPB7MyInt64PB3Mul3mul(self, other);
}
function _M0IPC15int645Int64PB6BitAnd4land(self, other) {
  return _M0MPB7MyInt644land(self, other);
}
function _M0MPC16double6Double14convert__int64(value) {
  return _M0MPB7MyInt6419convert__to__double(value);
}
function _M0MPC15int645Int6410to__double(self) {
  return _M0MPC16double6Double14convert__int64(self);
}
function _M0MPB6Hasher15combine__string(self, value) {
  const _bind = value.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      _M0MPB6Hasher13combine__uint(self, value.charCodeAt(i));
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0IPC16string6StringPB4Hash13hash__combine(self, hasher) {
  _M0MPB6Hasher15combine__string(hasher, self);
}
function _M0IPC13int3IntPB4Hash13hash__combine(self, hasher) {
  _M0MPB6Hasher12combine__int(hasher, self);
}
function _M0IPB13SourceLocReprPB4Show6output(self, logger) {
  const pkg = self.pkg;
  const _data = pkg.str;
  const _start = pkg.start;
  const _end = _start + (pkg.end - pkg.start | 0) | 0;
  let _cursor = _start;
  let accept_state = -1;
  let match_end = -1;
  let match_tag_saver_0 = -1;
  let tag_0 = -1;
  let _bind;
  _L: {
    _L$2: {
      _L$3: while (true) {
        if (_cursor < _end) {
          const _p = _cursor;
          const next_char = _data.charCodeAt(_p);
          _cursor = _cursor + 1 | 0;
          if (next_char === 47) {
            _L$4: while (true) {
              tag_0 = _cursor;
              if (_cursor < _end) {
                const _p$2 = _cursor;
                const next_char$2 = _data.charCodeAt(_p$2);
                _cursor = _cursor + 1 | 0;
                if (next_char$2 === 47) {
                  while (true) {
                    if (_cursor < _end) {
                      _cursor = _cursor + 1 | 0;
                      continue;
                    } else {
                      match_tag_saver_0 = tag_0;
                      accept_state = 0;
                      match_end = _cursor;
                      break _L$2;
                    }
                  }
                } else {
                  continue;
                }
              } else {
                break _L$2;
              }
            }
          } else {
            continue;
          }
        } else {
          break _L$2;
        }
      }
      break _L;
    }
    if (accept_state === 0) {
      const package_name = _M0MPC16string6String4view(_data, match_tag_saver_0 + 1 | 0, match_end);
      const module_name = _M0MPC16string6String4view(_data, _start, match_tag_saver_0);
      _bind = { _0: module_name, _1: package_name };
    } else {
      _bind = { _0: pkg, _1: undefined };
    }
  }
  const _module_name = _bind._0;
  const _package_name = _bind._1;
  if (_package_name === undefined) {
  } else {
    const _Some = _package_name;
    const _pkg_name = _Some;
    logger.method_table.method_2(logger.self, _pkg_name);
    logger.method_table.method_3(logger.self, 47);
  }
  logger.method_table.method_2(logger.self, self.filename);
  logger.method_table.method_3(logger.self, 58);
  logger.method_table.method_2(logger.self, self.start_line);
  logger.method_table.method_3(logger.self, 58);
  logger.method_table.method_2(logger.self, self.start_column);
  logger.method_table.method_3(logger.self, 45);
  logger.method_table.method_2(logger.self, self.end_line);
  logger.method_table.method_3(logger.self, 58);
  logger.method_table.method_2(logger.self, self.end_column);
  logger.method_table.method_3(logger.self, 64);
  logger.method_table.method_2(logger.self, _module_name);
}
function _M0IPB9SourceLocPB4Show6output(self, logger) {
  _M0IPB13SourceLocReprPB4Show6output(_M0MPB13SourceLocRepr5parse(self), logger);
}
function _M0MPC15array5Array12view_2einnerGiE(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  if (start$2 >= 0 && (start$2 <= end$2 && end$2 <= len)) {
    const _bind = self;
    const _bind$2 = end$2 - start$2 | 0;
    return new _M0TPB9ArrayViewGiE(_bind, start$2, start$2 + _bind$2 | 0);
  } else {
    return _M0FPB5abortGRPB9ArrayViewGiEE("View index out of bounds", "@moonbitlang/core/builtin:arrayview.mbt:263:5-263:38");
  }
}
function _M0MPC15array5Array12view_2einnerGdE(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  if (start$2 >= 0 && (start$2 <= end$2 && end$2 <= len)) {
    const _bind = self;
    const _bind$2 = end$2 - start$2 | 0;
    return new _M0TPB9ArrayViewGdE(_bind, start$2, start$2 + _bind$2 | 0);
  } else {
    return _M0FPB5abortGRPB9ArrayViewGiEE("View index out of bounds", "@moonbitlang/core/builtin:arrayview.mbt:263:5-263:38");
  }
}
function _M0MPC15array5Array12view_2einnerGRP38username3gpt3src5ValueE(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  if (start$2 >= 0 && (start$2 <= end$2 && end$2 <= len)) {
    const _bind = self;
    const _bind$2 = end$2 - start$2 | 0;
    return new _M0TPB9ArrayViewGRP38username3gpt3src5ValueE(_bind, start$2, start$2 + _bind$2 | 0);
  } else {
    return _M0FPB5abortGRPB9ArrayViewGiEE("View index out of bounds", "@moonbitlang/core/builtin:arrayview.mbt:263:5-263:38");
  }
}
function _M0MPC17hashmap7HashMap11new_2einnerGsiE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = $make_array_len_and_init(capacity$2, undefined);
  const _bind$2 = capacity$2 - 1 | 0;
  return new _M0TPC17hashmap7HashMapGsiE(_bind, capacity$2, _bind$2, 0);
}
function _M0MPC17hashmap7HashMap11new_2einnerGibE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = $make_array_len_and_init(capacity$2, undefined);
  const _bind$2 = capacity$2 - 1 | 0;
  return new _M0TPC17hashmap7HashMapGibE(_bind, capacity$2, _bind$2, 0);
}
function _M0MPC17hashmap7HashMap10push__awayGsiE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _tmp$4 = self.entries;
    $bound_check(_tmp$4, idx$2);
    const _bind = _tmp$4[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      const _tmp$5 = self.entries;
      $bound_check(_tmp$5, idx$2);
      _tmp$5[idx$2] = entry$2;
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        const _tmp$5 = self.entries;
        $bound_check(_tmp$5, idx$2);
        _tmp$5[idx$2] = entry$2;
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPC17hashmap7HashMap10push__awayGibE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _tmp$4 = self.entries;
    $bound_check(_tmp$4, idx$2);
    const _bind = _tmp$4[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      const _tmp$5 = self.entries;
      $bound_check(_tmp$5, idx$2);
      _tmp$5[idx$2] = entry$2;
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        const _tmp$5 = self.entries;
        $bound_check(_tmp$5, idx$2);
        _tmp$5[idx$2] = entry$2;
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPC17hashmap7HashMap15set__with__hashGsiE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      if (self.size >= (self.capacity / 2 | 0)) {
        _M0MPC17hashmap7HashMap4growGsiE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const entry = new _M0TPC17hashmap5EntryGsiE(psl, hash, key, value);
      const _tmp$4 = self.entries;
      $bound_check(_tmp$4, idx);
      _tmp$4[idx] = entry;
      self.size = self.size + 1 | 0;
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= (self.capacity / 2 | 0)) {
          _M0MPC17hashmap7HashMap4growGsiE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPC17hashmap7HashMap10push__awayGsiE(self, idx, _curr_entry);
        const entry = new _M0TPC17hashmap5EntryGsiE(psl, hash, key, value);
        const _tmp$4 = self.entries;
        $bound_check(_tmp$4, idx);
        _tmp$4[idx] = entry;
        self.size = self.size + 1 | 0;
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPC17hashmap7HashMap15set__with__hashGibE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      if (self.size >= (self.capacity / 2 | 0)) {
        _M0MPC17hashmap7HashMap4growGibE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const entry = new _M0TPC17hashmap5EntryGibE(psl, hash, key, value);
      const _tmp$4 = self.entries;
      $bound_check(_tmp$4, idx);
      _tmp$4[idx] = entry;
      self.size = self.size + 1 | 0;
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= (self.capacity / 2 | 0)) {
          _M0MPC17hashmap7HashMap4growGibE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPC17hashmap7HashMap10push__awayGibE(self, idx, _curr_entry);
        const entry = new _M0TPC17hashmap5EntryGibE(psl, hash, key, value);
        const _tmp$4 = self.entries;
        $bound_check(_tmp$4, idx);
        _tmp$4[idx] = entry;
        self.size = self.size + 1 | 0;
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPC17hashmap7HashMap4growGsiE(self) {
  const old_entries = self.entries;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  self.size = 0;
  const _bind = old_entries.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      $bound_check(old_entries, i);
      const _bind$2 = old_entries[i];
      if (_bind$2 === undefined) {
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        const _key = _x.key;
        const _value = _x.value;
        const _hash = _x.hash;
        _M0MPC17hashmap7HashMap15set__with__hashGsiE(self, _key, _value, _hash);
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0MPC17hashmap7HashMap4growGibE(self) {
  const old_entries = self.entries;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  self.size = 0;
  const _bind = old_entries.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      $bound_check(old_entries, i);
      const _bind$2 = old_entries[i];
      if (_bind$2 === undefined) {
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        const _key = _x.key;
        const _value = _x.value;
        const _hash = _x.hash;
        _M0MPC17hashmap7HashMap15set__with__hashGibE(self, _key, _value, _hash);
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0MPC17hashmap7HashMap3setGsiE(self, key, value) {
  _M0MPC17hashmap7HashMap15set__with__hashGsiE(self, key, value, _M0IP016_24default__implPB4Hash4hashGsE(key));
}
function _M0MPC17hashmap7HashMap3setGibE(self, key, value) {
  _M0MPC17hashmap7HashMap15set__with__hashGibE(self, key, value, _M0IP016_24default__implPB4Hash4hashGiE(key));
}
function _M0MPC17hashmap7HashMap3getGsiE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGsE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPC17hashmap7HashMap8containsGibE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGiE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return false;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPC17hashset7HashSet11new_2einnerGsE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  return new _M0TPC17hashset7HashSetGsE(_bind$3, 0, capacity$2, _bind, _bind$2);
}
function _M0MPC17hashset7HashSet3newGsE(capacity$46$opt) {
  let capacity;
  if (capacity$46$opt === undefined) {
    capacity = 8;
  } else {
    const _Some = capacity$46$opt;
    capacity = _Some;
  }
  return _M0MPC17hashset7HashSet11new_2einnerGsE(capacity);
}
function _M0MPC17hashset7HashSet10push__awayGsE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _tmp$4 = self.entries;
    $bound_check(_tmp$4, idx$2);
    const _bind = _tmp$4[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      const _tmp$5 = self.entries;
      $bound_check(_tmp$5, idx$2);
      _tmp$5[idx$2] = entry$2;
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        const _tmp$5 = self.entries;
        $bound_check(_tmp$5, idx$2);
        _tmp$5[idx$2] = entry$2;
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPC17hashset7HashSet15add__with__hashGsE(self, key, hash) {
  if (self.size >= self.grow_at) {
    _M0MPC17hashset7HashSet4growGsE(self);
  }
  let _bind;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind$2 = _tmp$3[idx];
    if (_bind$2 === undefined) {
      _bind = { _0: idx, _1: psl };
      break;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        _M0MPC17hashset7HashSet10push__awayGsE(self, idx, _curr_entry);
        _bind = { _0: idx, _1: psl };
        break;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
  const _idx = _bind._0;
  const _psl = _bind._1;
  const entry = new _M0TPC17hashset5EntryGsE(_psl, hash, key);
  const _tmp$3 = self.entries;
  $bound_check(_tmp$3, _idx);
  _tmp$3[_idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPC17hashset7HashSet4growGsE(self) {
  if (self.capacity === 0) {
    self.capacity = 8;
    self.capacity_mask = self.capacity - 1 | 0;
    const _p = self.capacity;
    self.grow_at = (Math.imul(_p, 13) | 0) / 16 | 0;
    self.size = 0;
    self.entries = $make_array_len_and_init(self.capacity, undefined);
    return undefined;
  }
  const old_entries = self.entries;
  self.entries = $make_array_len_and_init(Math.imul(self.capacity, 2) | 0, undefined);
  self.capacity = Math.imul(self.capacity, 2) | 0;
  self.capacity_mask = self.capacity - 1 | 0;
  const _p = self.capacity;
  self.grow_at = (Math.imul(_p, 13) | 0) / 16 | 0;
  self.size = 0;
  const _bind = old_entries.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      $bound_check(old_entries, i);
      const _bind$2 = old_entries[i];
      if (_bind$2 === undefined) {
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        const _key = _x.key;
        const _hash = _x.hash;
        _M0MPC17hashset7HashSet15add__with__hashGsE(self, _key, _hash);
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0MPC17hashset7HashSet3addGsE(self, key) {
  _M0MPC17hashset7HashSet15add__with__hashGsE(self, key, _M0IP016_24default__implPB4Hash4hashGsE(key));
}
function _M0MPC17hashset7HashSet4iterGsE(self) {
  const i = new _M0TPC13ref3RefGiE(0);
  const len = self.entries.length;
  const _p = () => {
    while (true) {
      if (i.val < len) {
        const entry = self.entries[i.val];
        i.val = i.val + 1 | 0;
        if (entry === undefined) {
        } else {
          const _Some = entry;
          const _x = _Some;
          const _key = _x.key;
          return _key;
        }
        continue;
      } else {
        return undefined;
      }
    }
  };
  return _p;
}
function _M0MPC13ref3Ref3newGRPB5ArrayGsEE(x) {
  return new _M0TPC13ref3RefGRPB5ArrayGsEE(x);
}
function _M0MPC13ref3Ref3newGiE(x) {
  return new _M0TPC13ref3RefGiE(x);
}
function _M0MPC13ref3Ref3newGRPC17hashmap7HashMapGsiEE(x) {
  return new _M0TPC13ref3RefGRPC17hashmap7HashMapGsiEE(x);
}
function _M0MPC13ref3Ref3newGbE(x) {
  return new _M0TPC13ref3RefGbE(x);
}
function _M0FPC14math3cos(_tmp) {
  return Math.cos(_tmp);
}
function _M0FPC14math3pow(_tmp, _tmp$2) {
  return Math.pow(_tmp, _tmp$2);
}
function _M0FPC14math2ln(_tmp) {
  return Math.log(_tmp);
}
function _M0FPC14math3exp(_tmp) {
  return Math.exp(_tmp);
}
function _M0FP38username3gpt3src9linear__f(x, w) {
  const out = [];
  const _bind = w.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const row = w[_];
      let acc = 0;
      const n = row.length;
      let _tmp$2 = 0;
      while (true) {
        const i = _tmp$2;
        if (i < n) {
          acc = acc + _M0MPC15array5Array2atGsE(row, i).data * _M0MPC15array5Array2atGdE(x, i);
          _tmp$2 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array4pushGdE(out, acc);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return out;
}
function _M0FP38username3gpt3src10rmsnorm__f(x) {
  const n = x.length;
  let ms = 0;
  const _bind = x.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const xi = x[_];
      ms = ms + xi * xi;
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  ms = ms / (n + 0);
  const scale = _M0FPC14math3pow(ms + 1e-05, -0.5);
  const out = [];
  const _bind$2 = x.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$2) {
      const xi = x[_];
      _M0MPC15array5Array4pushGdE(out, xi * scale);
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return out;
}
function _M0FP38username3gpt3src10softmax__f(logits) {
  let max_val = _M0MPC15array5Array2atGdE(logits, 0);
  const _bind = logits.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const v = logits[_];
      if (v > max_val) {
        max_val = v;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const exps = [];
  const _bind$2 = logits.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$2) {
      const v = logits[_];
      _M0MPC15array5Array4pushGdE(exps, _M0FPC14math3exp(v - max_val));
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let total = 0;
  const _bind$3 = exps.length;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$3;
    if (_ < _bind$3) {
      const e = exps[_];
      total = total + e;
      _tmp$3 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const probs = [];
  const _bind$4 = exps.length;
  let _tmp$4 = 0;
  while (true) {
    const _ = _tmp$4;
    if (_ < _bind$4) {
      const e = exps[_];
      _M0MPC15array5Array4pushGdE(probs, e / total);
      _tmp$4 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return probs;
}
function _M0FP38username3gpt3src19encoder__forward__f(src_toks) {
  const src_len = src_toks.length;
  const scale = _M0FPC14math3pow(8 + 0, -0.5);
  let xs = [];
  let _tmp = 0;
  while (true) {
    const pos = _tmp;
    if (pos < src_len) {
      const tok_emb = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, _M0MPC15array5Array2atGiE(src_toks, pos));
      const pos_emb = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__enc.val, pos);
      const x = [];
      let _tmp$2 = 0;
      while (true) {
        const i = _tmp$2;
        if (i < 32) {
          _M0MPC15array5Array4pushGdE(x, _M0MPC15array5Array2atGsE(tok_emb, i).data + _M0MPC15array5Array2atGsE(pos_emb, i).data);
          _tmp$2 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(xs, x);
      _tmp = pos + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let last_self_attn = [];
  let _tmp$2 = 0;
  while (true) {
    const li = _tmp$2;
    if (li < 1) {
      const all_xn = [];
      const all_k = [];
      const all_v = [];
      let _tmp$3 = 0;
      while (true) {
        const pos = _tmp$3;
        if (pos < src_len) {
          const xn = _M0FP38username3gpt3src10rmsnorm__f(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(xs, pos));
          _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_xn, xn);
          _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_k, _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wk.val, li)));
          _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_v, _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wv.val, li)));
          _tmp$3 = pos + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const head_attn = [];
      let _tmp$4 = 0;
      while (true) {
        const _ = _tmp$4;
        if (_ < 4) {
          const row = [];
          let _tmp$5 = 0;
          while (true) {
            const _$2 = _tmp$5;
            if (_$2 < src_len) {
              _M0MPC15array5Array4pushGRPB5ArrayGiEE(row, _M0MPC15array5Array4makeGdE(src_len, 0));
              _tmp$5 = _$2 + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _M0MPC15array5Array4pushGRPB5ArrayGiEE(head_attn, row);
          _tmp$4 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const new_xs = [];
      let _tmp$5 = 0;
      while (true) {
        const pos = _tmp$5;
        if (pos < src_len) {
          const x_res = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(xs, pos);
          const q = _M0FP38username3gpt3src9linear__f(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_xn, pos), _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wq.val, li));
          const x_attn = [];
          let _tmp$6 = 0;
          while (true) {
            const h = _tmp$6;
            if (h < 4) {
              const hs = Math.imul(h, 8) | 0;
              const q_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(q, hs, hs + 8 | 0));
              const attn_logits = [];
              let _tmp$7 = 0;
              while (true) {
                const t = _tmp$7;
                if (t < src_len) {
                  const k_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_k, t), hs, hs + 8 | 0));
                  let dot = 0;
                  let _tmp$8 = 0;
                  while (true) {
                    const j = _tmp$8;
                    if (j < 8) {
                      dot = dot + _M0MPC15array5Array2atGdE(q_h, j) * _M0MPC15array5Array2atGdE(k_h, j);
                      _tmp$8 = j + 1 | 0;
                      continue;
                    } else {
                      break;
                    }
                  }
                  _M0MPC15array5Array4pushGdE(attn_logits, dot * scale);
                  _tmp$7 = t + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              const attn_w = _M0FP38username3gpt3src10softmax__f(attn_logits);
              let _tmp$8 = 0;
              while (true) {
                const t = _tmp$8;
                if (t < src_len) {
                  _M0MPC15array5Array3setGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(head_attn, h), pos), t, _M0MPC15array5Array2atGdE(attn_w, t));
                  _tmp$8 = t + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              let _tmp$9 = 0;
              while (true) {
                const j = _tmp$9;
                if (j < 8) {
                  let acc = 0;
                  let _tmp$10 = 0;
                  while (true) {
                    const t = _tmp$10;
                    if (t < src_len) {
                      const v_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_v, t), hs, hs + 8 | 0));
                      acc = acc + _M0MPC15array5Array2atGdE(attn_w, t) * _M0MPC15array5Array2atGdE(v_h, j);
                      _tmp$10 = t + 1 | 0;
                      continue;
                    } else {
                      break;
                    }
                  }
                  _M0MPC15array5Array4pushGdE(x_attn, acc);
                  _tmp$9 = j + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _tmp$6 = h + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const attn_out = _M0FP38username3gpt3src9linear__f(x_attn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wo.val, li));
          let x2 = [];
          let _tmp$7 = 0;
          while (true) {
            const i = _tmp$7;
            if (i < 32) {
              _M0MPC15array5Array4pushGdE(x2, _M0MPC15array5Array2atGdE(attn_out, i) + _M0MPC15array5Array2atGdE(x_res, i));
              _tmp$7 = i + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const x_res2 = x2;
          x2 = _M0FP38username3gpt3src10rmsnorm__f(x2);
          x2 = _M0FP38username3gpt3src9linear__f(x2, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__enc__fc1.val, li));
          const x2r = [];
          const _bind = x2;
          const _bind$2 = _bind.length;
          let _tmp$8 = 0;
          while (true) {
            const _ = _tmp$8;
            if (_ < _bind$2) {
              const xi = _bind[_];
              _M0MPC15array5Array4pushGdE(x2r, xi > 0 ? xi : 0);
              _tmp$8 = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          x2 = _M0FP38username3gpt3src9linear__f(x2r, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__enc__fc2.val, li));
          const x3 = [];
          let _tmp$9 = 0;
          while (true) {
            const i = _tmp$9;
            if (i < 32) {
              _M0MPC15array5Array4pushGdE(x3, _M0MPC15array5Array2atGdE(x2, i) + _M0MPC15array5Array2atGdE(x_res2, i));
              _tmp$9 = i + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _M0MPC15array5Array4pushGRPB5ArrayGiEE(new_xs, x3);
          _tmp$5 = pos + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      xs = new_xs;
      last_self_attn = head_attn;
      _tmp$2 = li + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return { _0: xs, _1: last_self_attn };
}
function _M0FP38username3gpt3src12split__words(s) {
  const words = [];
  const buf = _M0MPB13StringBuilder11new_2einner(0);
  const _it = _M0MPC16string6String4iter(s);
  while (true) {
    const _bind = _M0MPB4Iter4nextGcE(_it);
    if (_bind === -1) {
      break;
    } else {
      const _Some = _bind;
      const _ch = _Some;
      if (_ch === 32) {
        if (!(buf.val === "")) {
          _M0MPC15array5Array4pushGsE(words, buf.val);
          _M0MPB13StringBuilder5reset(buf);
        }
      } else {
        _M0IPB13StringBuilderPB6Logger11write__char(buf, _ch);
      }
      continue;
    }
  }
  if (!(buf.val === "")) {
    _M0MPC15array5Array4pushGsE(words, buf.val);
  }
  return words;
}
function _M0FP38username3gpt3src14run__attn__viz(phrase) {
  if (_M0FP38username3gpt3src12g__gpt__mode.val) {
    _M0FP38username3gpt3src16g__viz__seq__len.val = 0;
    return undefined;
  }
  const bos = _M0FP38username3gpt3src6g__bos.val;
  const w2i = _M0FP38username3gpt3src11g__word2idx.val;
  const src_toks = [bos];
  const token_words = ["<BOS>"];
  const _bind = _M0FP38username3gpt3src12split__words(phrase);
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const word = _bind[_];
      const _bind$3 = _M0MPC17hashmap7HashMap3getGsiE(w2i, word);
      if (_bind$3 === undefined) {
      } else {
        const _Some = _bind$3;
        const _idx = _Some;
        _M0MPC15array5Array4pushGiE(src_toks, _idx);
        _M0MPC15array5Array4pushGsE(token_words, word);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const seq = 8 < src_toks.length ? 8 : src_toks.length;
  if (seq <= 0) {
    _M0FP38username3gpt3src16g__viz__seq__len.val = 0;
    return undefined;
  }
  const src_toks_clamped = _M0MPC15array9ArrayView9to__arrayGiE(_M0MPC15array5Array12view_2einnerGiE(src_toks, 0, seq));
  const label_buf = _M0MPB13StringBuilder11new_2einner(0);
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i < seq) {
      if (i > 0) {
        _M0IPB13StringBuilderPB6Logger11write__char(label_buf, 124);
      }
      if (i < token_words.length) {
        _M0IPB13StringBuilderPB6Logger13write__string(label_buf, _M0MPC15array5Array2atGsE(token_words, i));
      }
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src19g__viz__tokens__str.val = label_buf.val;
  _M0FP38username3gpt3src16g__viz__seq__len.val = seq;
  const _bind$3 = _M0FP38username3gpt3src19encoder__forward__f(src_toks_clamped);
  const _enc_out = _bind$3._0;
  const _self_attn = _bind$3._1;
  const flat = [];
  let _tmp$3 = 0;
  while (true) {
    const h = _tmp$3;
    if (h < 4) {
      let _tmp$4 = 0;
      while (true) {
        const qi = _tmp$4;
        if (qi < seq) {
          let _tmp$5 = 0;
          while (true) {
            const ki = _tmp$5;
            if (ki < seq) {
              if (h < _self_attn.length && qi < _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_self_attn, h).length) {
                _M0MPC15array5Array4pushGdE(flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_self_attn, h), qi), ki));
              } else {
                _M0MPC15array5Array4pushGdE(flat, 0);
              }
              _tmp$5 = ki + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$4 = qi + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$3 = h + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src18g__viz__attn__flat.val = flat;
  const hidden_flat = [];
  const _bind$4 = _enc_out.length;
  let _tmp$4 = 0;
  while (true) {
    const _ = _tmp$4;
    if (_ < _bind$4) {
      const pos_vec = _enc_out[_];
      const _bind$5 = pos_vec.length;
      let _tmp$5 = 0;
      while (true) {
        const _$2 = _tmp$5;
        if (_$2 < _bind$5) {
          const v = pos_vec[_$2];
          _M0MPC15array5Array4pushGdE(hidden_flat, v);
          _tmp$5 = _$2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$4 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src14g__viz__hidden.val = hidden_flat;
  _M0FP38username3gpt3src17g__viz__mlp__acts.val = [];
  _M0FP38username3gpt3src14g__viz__logits.val = [];
}
function _M0FP38username3gpt3src16decoder__step__f(token_id, pos_id, dec_keys_f, dec_vals_f, cross_k_f, cross_v_f) {
  const scale = _M0FPC14math3pow(8 + 0, -0.5);
  const tok_emb = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, token_id);
  const pos_emb = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__dec.val, pos_id);
  let x = [];
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < 32) {
      _M0MPC15array5Array4pushGdE(x, _M0MPC15array5Array2atGsE(tok_emb, i).data + _M0MPC15array5Array2atGsE(pos_emb, i).data);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let out_post_sattn = [];
  let out_post_xattn = [];
  let out_post_mlp = [];
  let last_self_attn = [];
  let last_cross_attn = [];
  let _tmp$2 = 0;
  while (true) {
    const li = _tmp$2;
    if (li < 1) {
      const x_res = x;
      const xn = _M0FP38username3gpt3src10rmsnorm__f(x);
      const q = _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wq.val, li));
      const k = _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wk.val, li));
      const v = _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wv.val, li));
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_keys_f, li), k);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_vals_f, li), v);
      const t_len = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_keys_f, li).length;
      const x_sattn = [];
      const head_sattn = [];
      let _tmp$3 = 0;
      while (true) {
        const h = _tmp$3;
        if (h < 4) {
          const hs = Math.imul(h, 8) | 0;
          const q_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(q, hs, hs + 8 | 0));
          const attn_logits = [];
          let _tmp$4 = 0;
          while (true) {
            const t = _tmp$4;
            if (t < t_len) {
              const k_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_keys_f, li), t), hs, hs + 8 | 0));
              let dot = 0;
              let _tmp$5 = 0;
              while (true) {
                const j = _tmp$5;
                if (j < 8) {
                  dot = dot + _M0MPC15array5Array2atGdE(q_h, j) * _M0MPC15array5Array2atGdE(k_h, j);
                  _tmp$5 = j + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MPC15array5Array4pushGdE(attn_logits, dot * scale);
              _tmp$4 = t + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const attn_w = _M0FP38username3gpt3src10softmax__f(attn_logits);
          _M0MPC15array5Array4pushGRPB5ArrayGiEE(head_sattn, attn_w);
          let _tmp$5 = 0;
          while (true) {
            const j = _tmp$5;
            if (j < 8) {
              let acc = 0;
              let _tmp$6 = 0;
              while (true) {
                const t = _tmp$6;
                if (t < t_len) {
                  const v_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_vals_f, li), t), hs, hs + 8 | 0));
                  acc = acc + _M0MPC15array5Array2atGdE(attn_w, t) * _M0MPC15array5Array2atGdE(v_h, j);
                  _tmp$6 = t + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MPC15array5Array4pushGdE(x_sattn, acc);
              _tmp$5 = j + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$3 = h + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const sattn_out = _M0FP38username3gpt3src9linear__f(x_sattn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wo.val, li));
      const x2 = [];
      let _tmp$4 = 0;
      while (true) {
        const i = _tmp$4;
        if (i < 32) {
          _M0MPC15array5Array4pushGdE(x2, _M0MPC15array5Array2atGdE(sattn_out, i) + _M0MPC15array5Array2atGdE(x_res, i));
          _tmp$4 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      if (li === 0) {
        out_post_sattn = x2;
        last_self_attn = head_sattn;
      }
      let x3 = x2;
      if (!_M0FP38username3gpt3src12g__gpt__mode.val) {
        const xn2 = _M0FP38username3gpt3src10rmsnorm__f(x2);
        const xq = _M0FP38username3gpt3src9linear__f(xn2, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xq.val, li));
        const src_len = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(cross_k_f, li).length;
        const x_xattn = [];
        const head_xattn = [];
        let _tmp$5 = 0;
        while (true) {
          const h = _tmp$5;
          if (h < 4) {
            const hs = Math.imul(h, 8) | 0;
            const q_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(xq, hs, hs + 8 | 0));
            const attn_logits = [];
            let _tmp$6 = 0;
            while (true) {
              const t = _tmp$6;
              if (t < src_len) {
                const k_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(cross_k_f, li), t), hs, hs + 8 | 0));
                let dot = 0;
                let _tmp$7 = 0;
                while (true) {
                  const j = _tmp$7;
                  if (j < 8) {
                    dot = dot + _M0MPC15array5Array2atGdE(q_h, j) * _M0MPC15array5Array2atGdE(k_h, j);
                    _tmp$7 = j + 1 | 0;
                    continue;
                  } else {
                    break;
                  }
                }
                _M0MPC15array5Array4pushGdE(attn_logits, dot * scale);
                _tmp$6 = t + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            const attn_w = _M0FP38username3gpt3src10softmax__f(attn_logits);
            _M0MPC15array5Array4pushGRPB5ArrayGiEE(head_xattn, attn_w);
            let _tmp$7 = 0;
            while (true) {
              const j = _tmp$7;
              if (j < 8) {
                let acc = 0;
                let _tmp$8 = 0;
                while (true) {
                  const t = _tmp$8;
                  if (t < src_len) {
                    const v_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(cross_v_f, li), t), hs, hs + 8 | 0));
                    acc = acc + _M0MPC15array5Array2atGdE(attn_w, t) * _M0MPC15array5Array2atGdE(v_h, j);
                    _tmp$8 = t + 1 | 0;
                    continue;
                  } else {
                    break;
                  }
                }
                _M0MPC15array5Array4pushGdE(x_xattn, acc);
                _tmp$7 = j + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            _tmp$5 = h + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        const xattn_out = _M0FP38username3gpt3src9linear__f(x_xattn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xo.val, li));
        x3 = [];
        let _tmp$6 = 0;
        while (true) {
          const i = _tmp$6;
          if (i < 32) {
            _M0MPC15array5Array4pushGdE(x3, _M0MPC15array5Array2atGdE(xattn_out, i) + _M0MPC15array5Array2atGdE(x2, i));
            _tmp$6 = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        if (li === 0) {
          out_post_xattn = x3;
          last_cross_attn = head_xattn;
        }
      } else {
        if (li === 0) {
          out_post_xattn = x3;
        }
      }
      const x_res3 = x3;
      x3 = _M0FP38username3gpt3src10rmsnorm__f(x3);
      x3 = _M0FP38username3gpt3src9linear__f(x3, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__dec__fc1.val, li));
      const x3r = [];
      const _bind = x3;
      const _bind$2 = _bind.length;
      let _tmp$5 = 0;
      while (true) {
        const _ = _tmp$5;
        if (_ < _bind$2) {
          const xi = _bind[_];
          _M0MPC15array5Array4pushGdE(x3r, xi > 0 ? xi : 0);
          _tmp$5 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      x3 = _M0FP38username3gpt3src9linear__f(x3r, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__dec__fc2.val, li));
      const x4 = [];
      let _tmp$6 = 0;
      while (true) {
        const i = _tmp$6;
        if (i < 32) {
          _M0MPC15array5Array4pushGdE(x4, _M0MPC15array5Array2atGdE(x3, i) + _M0MPC15array5Array2atGdE(x_res3, i));
          _tmp$6 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      x = x4;
      if (li === 0) {
        out_post_mlp = x4;
      }
      _tmp$2 = li + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const logits = _M0FP38username3gpt3src9linear__f(out_post_mlp, _M0FP38username3gpt3src11g__lm__head.val);
  return { _0: out_post_sattn, _1: out_post_xattn, _2: out_post_mlp, _3: logits, _4: last_self_attn, _5: last_cross_attn };
}
function _M0FP38username3gpt3src22run__network__viz__gpt(prompt, dec_pos) {
  const w2i = _M0FP38username3gpt3src11g__word2idx.val;
  const bos = _M0FP38username3gpt3src6g__bos.val;
  const vocab = _M0FP38username3gpt3src8g__vocab.val;
  const prompt_toks = [bos];
  const prompt_words = ["<BOS>"];
  const _bind = _M0FP38username3gpt3src12split__words(prompt);
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const word = _bind[_];
      const _bind$3 = _M0MPC17hashmap7HashMap3getGsiE(w2i, word);
      if (_bind$3 === undefined) {
      } else {
        const _Some = _bind$3;
        const _idx = _Some;
        _M0MPC15array5Array4pushGiE(prompt_toks, _idx);
        _M0MPC15array5Array4pushGsE(prompt_words, word);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const prompt_len = prompt_toks.length > 8 ? 8 : prompt_toks.length;
  if (prompt_len === 0) {
    _M0FP38username3gpt3src16g__net__src__len.val = 0;
    _M0FP38username3gpt3src16g__net__tgt__len.val = 0;
    return undefined;
  }
  const dec_keys_f = [];
  const dec_vals_f = [];
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < 1) {
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_keys_f, []);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_vals_f, []);
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const empty = [];
  const dec_tok_ids = [];
  const dec_words = [];
  const dec_post_sattn = [];
  const dec_post_xattn = [];
  const dec_post_mlp = [];
  const dec_logits_all = [];
  const dec_self_attn_steps = [];
  let _tmp$3 = 0;
  while (true) {
    const i = _tmp$3;
    if (i < prompt_len) {
      _M0MPC15array5Array4pushGiE(dec_tok_ids, _M0MPC15array5Array2atGiE(prompt_toks, i));
      _M0MPC15array5Array4pushGsE(dec_words, _M0MPC15array5Array2atGsE(prompt_words, i));
      const _bind$3 = _M0FP38username3gpt3src16decoder__step__f(_M0MPC15array5Array2atGiE(prompt_toks, i), i, dec_keys_f, dec_vals_f, empty, empty);
      const _ps = _bind$3._0;
      const _px = _bind$3._1;
      const _pm = _bind$3._2;
      const _lg = _bind$3._3;
      const _sa = _bind$3._4;
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_post_sattn, _ps);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_post_xattn, _px);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_post_mlp, _pm);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_logits_all, _lg);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_self_attn_steps, _sa);
      _tmp$3 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const probs = _M0FP38username3gpt3src10softmax__f(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_logits_all, prompt_len - 1 | 0));
  let best = 0;
  const _bind$3 = _M0FP38username3gpt3src14g__vocab__size.val;
  let _tmp$4 = 1;
  while (true) {
    const k = _tmp$4;
    if (k < _bind$3) {
      if (_M0MPC15array5Array2atGdE(probs, k) > _M0MPC15array5Array2atGdE(probs, best)) {
        best = k;
      }
      _tmp$4 = k + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let cur_tok = best;
  let pos = prompt_len;
  while (true) {
    if (pos < 8 && cur_tok !== bos) {
      _M0MPC15array5Array4pushGiE(dec_tok_ids, cur_tok);
      if (cur_tok < vocab.length) {
        _M0MPC15array5Array4pushGsE(dec_words, _M0MPC15array5Array2atGsE(vocab, cur_tok));
      } else {
        _M0MPC15array5Array4pushGsE(dec_words, "?");
      }
      const _bind$4 = _M0FP38username3gpt3src16decoder__step__f(cur_tok, pos, dec_keys_f, dec_vals_f, empty, empty);
      const _ps = _bind$4._0;
      const _px = _bind$4._1;
      const _pm = _bind$4._2;
      const _lg = _bind$4._3;
      const _sa = _bind$4._4;
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_post_sattn, _ps);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_post_xattn, _px);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_post_mlp, _pm);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_logits_all, _lg);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_self_attn_steps, _sa);
      const probs$2 = _M0FP38username3gpt3src10softmax__f(_lg);
      let best$2 = 0;
      const _bind$5 = _M0FP38username3gpt3src14g__vocab__size.val;
      let _tmp$5 = 1;
      while (true) {
        const k = _tmp$5;
        if (k < _bind$5) {
          if (_M0MPC15array5Array2atGdE(probs$2, k) > _M0MPC15array5Array2atGdE(probs$2, best$2)) {
            best$2 = k;
          }
          _tmp$5 = k + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      cur_tok = best$2;
      pos = pos + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const dec_len = dec_post_sattn.length;
  const tgt_buf = _M0MPB13StringBuilder11new_2einner(0);
  const _bind$4 = dec_words.length;
  let _tmp$5 = 0;
  while (true) {
    const i = _tmp$5;
    if (i < _bind$4) {
      if (i > 0) {
        _M0IPB13StringBuilderPB6Logger11write__char(tgt_buf, 124);
      }
      _M0IPB13StringBuilderPB6Logger13write__string(tgt_buf, _M0MPC15array5Array2atGsE(dec_words, i));
      _tmp$5 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src24g__net__tgt__tokens__str.val = tgt_buf.val;
  _M0FP38username3gpt3src24g__net__src__tokens__str.val = "";
  _M0FP38username3gpt3src16g__net__src__len.val = 0;
  _M0FP38username3gpt3src16g__net__tgt__len.val = dec_len;
  _M0FP38username3gpt3src17g__net__enc__flat.val = [];
  _M0FP38username3gpt3src23g__net__enc__self__attn.val = [];
  _M0FP38username3gpt3src20g__net__enc__q__flat.val = [];
  _M0FP38username3gpt3src20g__net__enc__k__flat.val = [];
  _M0FP38username3gpt3src20g__net__enc__v__flat.val = [];
  _M0FP38username3gpt3src21g__net__enc__ho__flat.val = [];
  _M0FP38username3gpt3src19g__net__cross__attn.val = [];
  _M0FP38username3gpt3src23g__net__cross__ho__flat.val = [];
  const vs = _M0FP38username3gpt3src14g__vocab__size.val;
  const dec_flat = [];
  let _tmp$6 = 0;
  while (true) {
    const p = _tmp$6;
    if (p < dec_len) {
      const token_id = _M0MPC15array5Array2atGiE(dec_tok_ids, p);
      let _tmp$7 = 0;
      while (true) {
        const d = _tmp$7;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGsE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, token_id), d).data);
          _tmp$7 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$8 = 0;
      while (true) {
        const d = _tmp$8;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGsE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__dec.val, p), d).data);
          _tmp$8 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$9 = 0;
      while (true) {
        const d = _tmp$9;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGsE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, token_id), d).data + _M0MPC15array5Array2atGsE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__dec.val, p), d).data);
          _tmp$9 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$10 = 0;
      while (true) {
        const d = _tmp$10;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_post_sattn, p), d));
          _tmp$10 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$11 = 0;
      while (true) {
        const d = _tmp$11;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_post_xattn, p), d));
          _tmp$11 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$12 = 0;
      while (true) {
        const d = _tmp$12;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_post_mlp, p), d));
          _tmp$12 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$13 = 0;
      while (true) {
        const d = _tmp$13;
        if (d < vs) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_logits_all, p), d));
          _tmp$13 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$6 = p + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src17g__net__dec__flat.val = dec_flat;
  const all_dq = [];
  const all_dk = [];
  const all_dv = [];
  let _tmp$7 = 0;
  while (true) {
    const p = _tmp$7;
    if (p < dec_len) {
      const te = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, _M0MPC15array5Array2atGiE(dec_tok_ids, p));
      const pe = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__dec.val, p);
      const xi = [];
      let _tmp$8 = 0;
      while (true) {
        const d = _tmp$8;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(xi, _M0MPC15array5Array2atGsE(te, d).data + _M0MPC15array5Array2atGsE(pe, d).data);
          _tmp$8 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const xn = _M0FP38username3gpt3src10rmsnorm__f(xi);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_dq, _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wq.val, 0)));
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_dk, _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wk.val, 0)));
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_dv, _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wv.val, 0)));
      _tmp$7 = p + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const dec_q_flat = [];
  const dec_k_flat = [];
  const dec_v_flat = [];
  let _tmp$8 = 0;
  while (true) {
    const h = _tmp$8;
    if (h < 4) {
      const hs = Math.imul(h, 8) | 0;
      let _tmp$9 = 0;
      while (true) {
        const p = _tmp$9;
        if (p < dec_len) {
          let _tmp$10 = 0;
          while (true) {
            const j = _tmp$10;
            if (j < 8) {
              _M0MPC15array5Array4pushGdE(dec_q_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_dq, p), hs + j | 0));
              _M0MPC15array5Array4pushGdE(dec_k_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_dk, p), hs + j | 0));
              _M0MPC15array5Array4pushGdE(dec_v_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_dv, p), hs + j | 0));
              _tmp$10 = j + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$9 = p + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$8 = h + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src20g__net__dec__q__flat.val = dec_q_flat;
  _M0FP38username3gpt3src20g__net__dec__k__flat.val = dec_k_flat;
  _M0FP38username3gpt3src20g__net__dec__v__flat.val = dec_v_flat;
  const attn_scale = _M0FPC14math3pow(8 + 0, -0.5);
  const dec_ho_flat = [];
  let _tmp$9 = 0;
  while (true) {
    const h = _tmp$9;
    if (h < 4) {
      const hs = Math.imul(h, 8) | 0;
      let _tmp$10 = 0;
      while (true) {
        const pos2 = _tmp$10;
        if (pos2 < dec_len) {
          const q_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_dq, pos2), hs, hs + 8 | 0));
          const logits_h = [];
          let _tmp$11 = 0;
          while (true) {
            const t = _tmp$11;
            if (t < dec_len) {
              if (t <= pos2) {
                const k_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_dk, t), hs, hs + 8 | 0));
                let dot = 0;
                let _tmp$12 = 0;
                while (true) {
                  const j = _tmp$12;
                  if (j < 8) {
                    dot = dot + _M0MPC15array5Array2atGdE(q_h, j) * _M0MPC15array5Array2atGdE(k_h, j);
                    _tmp$12 = j + 1 | 0;
                    continue;
                  } else {
                    break;
                  }
                }
                _M0MPC15array5Array4pushGdE(logits_h, dot * attn_scale);
              } else {
                _M0MPC15array5Array4pushGdE(logits_h, -1000000000);
              }
              _tmp$11 = t + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const aw = _M0FP38username3gpt3src10softmax__f(logits_h);
          let _tmp$12 = 0;
          while (true) {
            const j = _tmp$12;
            if (j < 8) {
              let acc = 0;
              let _tmp$13 = 0;
              while (true) {
                const t = _tmp$13;
                if (t < dec_len) {
                  acc = acc + _M0MPC15array5Array2atGdE(aw, t) * _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_dv, t), hs + j | 0);
                  _tmp$13 = t + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MPC15array5Array4pushGdE(dec_ho_flat, acc);
              _tmp$12 = j + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$10 = pos2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$9 = h + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src21g__net__dec__ho__flat.val = dec_ho_flat;
  const dec_sa_flat = [];
  let _tmp$10 = 0;
  while (true) {
    const h = _tmp$10;
    if (h < 4) {
      let _tmp$11 = 0;
      while (true) {
        const qi = _tmp$11;
        if (qi < dec_len) {
          const sa = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_self_attn_steps, qi);
          let _tmp$12 = 0;
          while (true) {
            const ki = _tmp$12;
            if (ki < dec_len) {
              if (h < sa.length && ki < _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(sa, h).length) {
                _M0MPC15array5Array4pushGdE(dec_sa_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(sa, h), ki));
              } else {
                _M0MPC15array5Array4pushGdE(dec_sa_flat, 0);
              }
              _tmp$12 = ki + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$11 = qi + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$10 = h + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src23g__net__dec__self__attn.val = dec_sa_flat;
  _M0FP38username3gpt3src12g__net__flat.val = dec_flat;
  _M0FP38username3gpt3src12g__net__attn.val = [];
  _M0FP38username3gpt3src11g__net__seq.val = dec_len;
  _M0FP38username3gpt3src11g__net__pos.val = dec_pos < dec_len ? dec_pos : dec_len - 1 | 0;
}
function _M0FP38username3gpt3src17run__network__viz(src_phrase, dec_pos) {
  if (_M0FP38username3gpt3src12g__gpt__mode.val) {
    _M0FP38username3gpt3src22run__network__viz__gpt(src_phrase, dec_pos);
    return undefined;
  }
  const w2i = _M0FP38username3gpt3src11g__word2idx.val;
  const bos = _M0FP38username3gpt3src6g__bos.val;
  const vocab = _M0FP38username3gpt3src8g__vocab.val;
  const src_toks = [];
  const src_words = [];
  const _bind = _M0FP38username3gpt3src12split__words(src_phrase);
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const word = _bind[_];
      const _bind$3 = _M0MPC17hashmap7HashMap3getGsiE(w2i, word);
      if (_bind$3 === undefined) {
      } else {
        const _Some = _bind$3;
        const _idx = _Some;
        _M0MPC15array5Array4pushGiE(src_toks, _idx);
        _M0MPC15array5Array4pushGsE(src_words, word);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const enc_len = src_toks.length > 8 ? 8 : src_toks.length;
  if (enc_len === 0) {
    _M0FP38username3gpt3src16g__net__src__len.val = 0;
    _M0FP38username3gpt3src16g__net__tgt__len.val = 0;
    return undefined;
  }
  const src_toks_clamped = _M0MPC15array9ArrayView9to__arrayGiE(_M0MPC15array5Array12view_2einnerGiE(src_toks, 0, enc_len));
  const _bind$3 = _M0FP38username3gpt3src19encoder__forward__f(src_toks_clamped);
  const _enc_out = _bind$3._0;
  const _enc_self_attn = _bind$3._1;
  const cross_k_f = [];
  const cross_v_f = [];
  let _tmp$2 = 0;
  while (true) {
    const li = _tmp$2;
    if (li < 1) {
      const ck = [];
      const cv = [];
      let _tmp$3 = 0;
      while (true) {
        const t = _tmp$3;
        if (t < enc_len) {
          _M0MPC15array5Array4pushGRPB5ArrayGiEE(ck, _M0FP38username3gpt3src9linear__f(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_enc_out, t), _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xk.val, li)));
          _M0MPC15array5Array4pushGRPB5ArrayGiEE(cv, _M0FP38username3gpt3src9linear__f(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_enc_out, t), _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xv.val, li)));
          _tmp$3 = t + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(cross_k_f, ck);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(cross_v_f, cv);
      _tmp$2 = li + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const dec_keys_f = [];
  const dec_vals_f = [];
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$3;
    if (_ < 1) {
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_keys_f, []);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_vals_f, []);
      _tmp$3 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const dec_tok_ids = [];
  const dec_words = [];
  let cur_tok = bos;
  _M0MPC15array5Array4pushGsE(dec_words, "<BOS>");
  _M0MPC15array5Array4pushGiE(dec_tok_ids, bos);
  const dec_post_sattn = [];
  const dec_post_xattn = [];
  const dec_post_mlp = [];
  const dec_logits_all = [];
  const dec_self_attn_steps = [];
  const dec_cross_attn_steps = [];
  let _tmp$4 = 0;
  while (true) {
    const pos_id = _tmp$4;
    if (pos_id < 8) {
      const token_id = cur_tok;
      const _bind$4 = _M0FP38username3gpt3src16decoder__step__f(token_id, pos_id, dec_keys_f, dec_vals_f, cross_k_f, cross_v_f);
      const _ps = _bind$4._0;
      const _px = _bind$4._1;
      const _pm = _bind$4._2;
      const _lg = _bind$4._3;
      const _sa = _bind$4._4;
      const _ca = _bind$4._5;
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_post_sattn, _ps);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_post_xattn, _px);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_post_mlp, _pm);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_logits_all, _lg);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_self_attn_steps, _sa);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_cross_attn_steps, _ca);
      const probs = _M0FP38username3gpt3src10softmax__f(_lg);
      let best = 0;
      const _bind$5 = _M0FP38username3gpt3src14g__vocab__size.val;
      let _tmp$5 = 1;
      while (true) {
        const k = _tmp$5;
        if (k < _bind$5) {
          if (_M0MPC15array5Array2atGdE(probs, k) > _M0MPC15array5Array2atGdE(probs, best)) {
            best = k;
          }
          _tmp$5 = k + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      cur_tok = best;
      if (best === bos) {
        break;
      }
      if (best < vocab.length) {
        _M0MPC15array5Array4pushGsE(dec_words, _M0MPC15array5Array2atGsE(vocab, best));
        _M0MPC15array5Array4pushGiE(dec_tok_ids, best);
      }
      _tmp$4 = pos_id + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const dec_len = dec_post_sattn.length;
  const src_buf = _M0MPB13StringBuilder11new_2einner(0);
  let _tmp$5 = 0;
  while (true) {
    const i = _tmp$5;
    if (i < enc_len) {
      if (i > 0) {
        _M0IPB13StringBuilderPB6Logger11write__char(src_buf, 124);
      }
      if (i < src_words.length) {
        _M0IPB13StringBuilderPB6Logger13write__string(src_buf, _M0MPC15array5Array2atGsE(src_words, i));
      }
      _tmp$5 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src24g__net__src__tokens__str.val = src_buf.val;
  const tgt_buf = _M0MPB13StringBuilder11new_2einner(0);
  const _bind$4 = dec_words.length;
  let _tmp$6 = 0;
  while (true) {
    const i = _tmp$6;
    if (i < _bind$4) {
      if (i > 0) {
        _M0IPB13StringBuilderPB6Logger11write__char(tgt_buf, 124);
      }
      _M0IPB13StringBuilderPB6Logger13write__string(tgt_buf, _M0MPC15array5Array2atGsE(dec_words, i));
      _tmp$6 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src24g__net__tgt__tokens__str.val = tgt_buf.val;
  _M0FP38username3gpt3src16g__net__src__len.val = enc_len;
  _M0FP38username3gpt3src16g__net__tgt__len.val = dec_len;
  const enc_flat = [];
  let _tmp$7 = 0;
  while (true) {
    const pos = _tmp$7;
    if (pos < enc_len) {
      let _tmp$8 = 0;
      while (true) {
        const d = _tmp$8;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(enc_flat, _M0MPC15array5Array2atGsE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, _M0MPC15array5Array2atGiE(src_toks_clamped, pos)), d).data);
          _tmp$8 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$9 = 0;
      while (true) {
        const d = _tmp$9;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(enc_flat, _M0MPC15array5Array2atGsE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__enc.val, pos), d).data);
          _tmp$9 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const tok_emb_v = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, _M0MPC15array5Array2atGiE(src_toks_clamped, pos));
      const pos_emb_v = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__enc.val, pos);
      let _tmp$10 = 0;
      while (true) {
        const d = _tmp$10;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(enc_flat, _M0MPC15array5Array2atGsE(tok_emb_v, d).data + _M0MPC15array5Array2atGsE(pos_emb_v, d).data);
          _tmp$10 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$11 = 0;
      while (true) {
        const d = _tmp$11;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(enc_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_enc_out, pos), d));
          _tmp$11 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$12 = 0;
      while (true) {
        const d = _tmp$12;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(enc_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_enc_out, pos), d));
          _tmp$12 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$7 = pos + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src17g__net__enc__flat.val = enc_flat;
  const vs = _M0FP38username3gpt3src14g__vocab__size.val;
  const dec_flat = [];
  let _tmp$8 = 0;
  while (true) {
    const pos = _tmp$8;
    if (pos < dec_len) {
      const token_id = _M0MPC15array5Array2atGiE(dec_tok_ids, pos);
      let _tmp$9 = 0;
      while (true) {
        const d = _tmp$9;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGsE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, token_id), d).data);
          _tmp$9 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$10 = 0;
      while (true) {
        const d = _tmp$10;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGsE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__dec.val, pos), d).data);
          _tmp$10 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$11 = 0;
      while (true) {
        const d = _tmp$11;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGsE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, token_id), d).data + _M0MPC15array5Array2atGsE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__dec.val, pos), d).data);
          _tmp$11 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$12 = 0;
      while (true) {
        const d = _tmp$12;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_post_sattn, pos), d));
          _tmp$12 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$13 = 0;
      while (true) {
        const d = _tmp$13;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_post_xattn, pos), d));
          _tmp$13 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$14 = 0;
      while (true) {
        const d = _tmp$14;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_post_mlp, pos), d));
          _tmp$14 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$15 = 0;
      while (true) {
        const d = _tmp$15;
        if (d < vs) {
          _M0MPC15array5Array4pushGdE(dec_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_logits_all, pos), d));
          _tmp$15 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$8 = pos + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src17g__net__dec__flat.val = dec_flat;
  const all_eq = [];
  const all_ek = [];
  const all_ev = [];
  let _tmp$9 = 0;
  while (true) {
    const pos = _tmp$9;
    if (pos < enc_len) {
      const te = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, _M0MPC15array5Array2atGiE(src_toks_clamped, pos));
      const pe = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__enc.val, pos);
      const xi = [];
      let _tmp$10 = 0;
      while (true) {
        const d = _tmp$10;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(xi, _M0MPC15array5Array2atGsE(te, d).data + _M0MPC15array5Array2atGsE(pe, d).data);
          _tmp$10 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const xn = _M0FP38username3gpt3src10rmsnorm__f(xi);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_eq, _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wq.val, 0)));
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_ek, _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wk.val, 0)));
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_ev, _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wv.val, 0)));
      _tmp$9 = pos + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const enc_q_flat = [];
  const enc_k_flat = [];
  const enc_v_flat = [];
  let _tmp$10 = 0;
  while (true) {
    const h = _tmp$10;
    if (h < 4) {
      const hs = Math.imul(h, 8) | 0;
      let _tmp$11 = 0;
      while (true) {
        const pos = _tmp$11;
        if (pos < enc_len) {
          let _tmp$12 = 0;
          while (true) {
            const j = _tmp$12;
            if (j < 8) {
              _M0MPC15array5Array4pushGdE(enc_q_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_eq, pos), hs + j | 0));
              _M0MPC15array5Array4pushGdE(enc_k_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_ek, pos), hs + j | 0));
              _M0MPC15array5Array4pushGdE(enc_v_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_ev, pos), hs + j | 0));
              _tmp$12 = j + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$11 = pos + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$10 = h + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src20g__net__enc__q__flat.val = enc_q_flat;
  _M0FP38username3gpt3src20g__net__enc__k__flat.val = enc_k_flat;
  _M0FP38username3gpt3src20g__net__enc__v__flat.val = enc_v_flat;
  const all_dq = [];
  const all_dk = [];
  const all_dv = [];
  let _tmp$11 = 0;
  while (true) {
    const pos = _tmp$11;
    if (pos < dec_len) {
      const token_id = _M0MPC15array5Array2atGiE(dec_tok_ids, pos);
      const te = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, token_id);
      const pe = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__dec.val, pos);
      const xi = [];
      let _tmp$12 = 0;
      while (true) {
        const d = _tmp$12;
        if (d < 32) {
          _M0MPC15array5Array4pushGdE(xi, _M0MPC15array5Array2atGsE(te, d).data + _M0MPC15array5Array2atGsE(pe, d).data);
          _tmp$12 = d + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const xn = _M0FP38username3gpt3src10rmsnorm__f(xi);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_dq, _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wq.val, 0)));
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_dk, _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wk.val, 0)));
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_dv, _M0FP38username3gpt3src9linear__f(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wv.val, 0)));
      _tmp$11 = pos + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const dec_q_flat = [];
  const dec_k_flat = [];
  const dec_v_flat = [];
  let _tmp$12 = 0;
  while (true) {
    const h = _tmp$12;
    if (h < 4) {
      const hs = Math.imul(h, 8) | 0;
      let _tmp$13 = 0;
      while (true) {
        const pos = _tmp$13;
        if (pos < dec_len) {
          let _tmp$14 = 0;
          while (true) {
            const j = _tmp$14;
            if (j < 8) {
              _M0MPC15array5Array4pushGdE(dec_q_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_dq, pos), hs + j | 0));
              _M0MPC15array5Array4pushGdE(dec_k_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_dk, pos), hs + j | 0));
              _M0MPC15array5Array4pushGdE(dec_v_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_dv, pos), hs + j | 0));
              _tmp$14 = j + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$13 = pos + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$12 = h + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src20g__net__dec__q__flat.val = dec_q_flat;
  _M0FP38username3gpt3src20g__net__dec__k__flat.val = dec_k_flat;
  _M0FP38username3gpt3src20g__net__dec__v__flat.val = dec_v_flat;
  const attn_scale = _M0FPC14math3pow(8 + 0, -0.5);
  const enc_ho_flat = [];
  let _tmp$13 = 0;
  while (true) {
    const h = _tmp$13;
    if (h < 4) {
      const hs = Math.imul(h, 8) | 0;
      let _tmp$14 = 0;
      while (true) {
        const pos2 = _tmp$14;
        if (pos2 < enc_len) {
          const q_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_eq, pos2), hs, hs + 8 | 0));
          const logits = [];
          let _tmp$15 = 0;
          while (true) {
            const t = _tmp$15;
            if (t < enc_len) {
              const k_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_ek, t), hs, hs + 8 | 0));
              let dot = 0;
              let _tmp$16 = 0;
              while (true) {
                const j = _tmp$16;
                if (j < 8) {
                  dot = dot + _M0MPC15array5Array2atGdE(q_h, j) * _M0MPC15array5Array2atGdE(k_h, j);
                  _tmp$16 = j + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MPC15array5Array4pushGdE(logits, dot * attn_scale);
              _tmp$15 = t + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const aw = _M0FP38username3gpt3src10softmax__f(logits);
          let _tmp$16 = 0;
          while (true) {
            const j = _tmp$16;
            if (j < 8) {
              let acc = 0;
              let _tmp$17 = 0;
              while (true) {
                const t = _tmp$17;
                if (t < enc_len) {
                  acc = acc + _M0MPC15array5Array2atGdE(aw, t) * _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_ev, t), hs + j | 0);
                  _tmp$17 = t + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MPC15array5Array4pushGdE(enc_ho_flat, acc);
              _tmp$16 = j + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$14 = pos2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$13 = h + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src21g__net__enc__ho__flat.val = enc_ho_flat;
  const dec_ho_flat = [];
  let _tmp$14 = 0;
  while (true) {
    const h = _tmp$14;
    if (h < 4) {
      const hs = Math.imul(h, 8) | 0;
      let _tmp$15 = 0;
      while (true) {
        const pos2 = _tmp$15;
        if (pos2 < dec_len) {
          const q_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_dq, pos2), hs, hs + 8 | 0));
          const logits = [];
          let _tmp$16 = 0;
          while (true) {
            const t = _tmp$16;
            if (t < dec_len) {
              if (t <= pos2) {
                const k_h = _M0MPC15array9ArrayView9to__arrayGdE(_M0MPC15array5Array12view_2einnerGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_dk, t), hs, hs + 8 | 0));
                let dot = 0;
                let _tmp$17 = 0;
                while (true) {
                  const j = _tmp$17;
                  if (j < 8) {
                    dot = dot + _M0MPC15array5Array2atGdE(q_h, j) * _M0MPC15array5Array2atGdE(k_h, j);
                    _tmp$17 = j + 1 | 0;
                    continue;
                  } else {
                    break;
                  }
                }
                _M0MPC15array5Array4pushGdE(logits, dot * attn_scale);
              } else {
                _M0MPC15array5Array4pushGdE(logits, -1000000000);
              }
              _tmp$16 = t + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const aw = _M0FP38username3gpt3src10softmax__f(logits);
          let _tmp$17 = 0;
          while (true) {
            const j = _tmp$17;
            if (j < 8) {
              let acc = 0;
              let _tmp$18 = 0;
              while (true) {
                const t = _tmp$18;
                if (t < dec_len) {
                  acc = acc + _M0MPC15array5Array2atGdE(aw, t) * _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_dv, t), hs + j | 0);
                  _tmp$18 = t + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MPC15array5Array4pushGdE(dec_ho_flat, acc);
              _tmp$17 = j + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$15 = pos2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$14 = h + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src21g__net__dec__ho__flat.val = dec_ho_flat;
  const enc_sa_flat = [];
  let _tmp$15 = 0;
  while (true) {
    const h = _tmp$15;
    if (h < 4) {
      let _tmp$16 = 0;
      while (true) {
        const qi = _tmp$16;
        if (qi < enc_len) {
          let _tmp$17 = 0;
          while (true) {
            const ki = _tmp$17;
            if (ki < enc_len) {
              if (h < _enc_self_attn.length && qi < _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_enc_self_attn, h).length) {
                _M0MPC15array5Array4pushGdE(enc_sa_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_enc_self_attn, h), qi), ki));
              } else {
                _M0MPC15array5Array4pushGdE(enc_sa_flat, 0);
              }
              _tmp$17 = ki + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$16 = qi + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$15 = h + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src23g__net__enc__self__attn.val = enc_sa_flat;
  const dec_sa_flat = [];
  let _tmp$16 = 0;
  while (true) {
    const h = _tmp$16;
    if (h < 4) {
      let _tmp$17 = 0;
      while (true) {
        const qi = _tmp$17;
        if (qi < dec_len) {
          const sa = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_self_attn_steps, qi);
          let _tmp$18 = 0;
          while (true) {
            const ki = _tmp$18;
            if (ki < dec_len) {
              if (h < sa.length && ki < _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(sa, h).length) {
                _M0MPC15array5Array4pushGdE(dec_sa_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(sa, h), ki));
              } else {
                _M0MPC15array5Array4pushGdE(dec_sa_flat, 0);
              }
              _tmp$18 = ki + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$17 = qi + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$16 = h + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src23g__net__dec__self__attn.val = dec_sa_flat;
  const ca_flat = [];
  let _tmp$17 = 0;
  while (true) {
    const h = _tmp$17;
    if (h < 4) {
      let _tmp$18 = 0;
      while (true) {
        const qi = _tmp$18;
        if (qi < dec_len) {
          const ca = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_cross_attn_steps, qi);
          let _tmp$19 = 0;
          while (true) {
            const ki = _tmp$19;
            if (ki < enc_len) {
              if (h < ca.length && ki < _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(ca, h).length) {
                _M0MPC15array5Array4pushGdE(ca_flat, _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(ca, h), ki));
              } else {
                _M0MPC15array5Array4pushGdE(ca_flat, 0);
              }
              _tmp$19 = ki + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$18 = qi + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$17 = h + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src19g__net__cross__attn.val = ca_flat;
  const cross_ho_flat = [];
  let _tmp$18 = 0;
  while (true) {
    const h = _tmp$18;
    if (h < 4) {
      const hs = Math.imul(h, 8) | 0;
      let _tmp$19 = 0;
      while (true) {
        const pos2 = _tmp$19;
        if (pos2 < dec_len) {
          const aw = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_cross_attn_steps, pos2), h);
          let _tmp$20 = 0;
          while (true) {
            const j = _tmp$20;
            if (j < 8) {
              let acc = 0;
              let _tmp$21 = 0;
              while (true) {
                const t = _tmp$21;
                if (t < enc_len) {
                  acc = acc + _M0MPC15array5Array2atGdE(aw, t) * _M0MPC15array5Array2atGdE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(cross_v_f, 0), t), hs + j | 0);
                  _tmp$21 = t + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MPC15array5Array4pushGdE(cross_ho_flat, acc);
              _tmp$20 = j + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$19 = pos2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$18 = h + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src23g__net__cross__ho__flat.val = cross_ho_flat;
  _M0FP38username3gpt3src12g__net__flat.val = dec_flat;
  _M0FP38username3gpt3src12g__net__attn.val = ca_flat;
  _M0FP38username3gpt3src11g__net__seq.val = dec_len;
  _M0FP38username3gpt3src11g__net__pos.val = dec_pos < dec_len ? dec_pos : dec_len - 1 | 0;
}
function _M0FP38username3gpt3src26get__embedding__similarity() {
  const wte = _M0FP38username3gpt3src6g__wte.val;
  const vs = _M0FP38username3gpt3src14g__vocab__size.val;
  const norms = [];
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < vs) {
      let s = 0;
      const _bind = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(wte, i);
      const _bind$2 = _bind.length;
      let _tmp$2 = 0;
      while (true) {
        const _ = _tmp$2;
        if (_ < _bind$2) {
          const d = _bind[_];
          s = s + d.data * d.data;
          _tmp$2 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array4pushGdE(norms, _M0FPC14math3pow(s, 0.5));
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const out = [];
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i < vs) {
      let _tmp$3 = 0;
      while (true) {
        const j = _tmp$3;
        if (j < vs) {
          let dot = 0;
          let _tmp$4 = 0;
          while (true) {
            const d = _tmp$4;
            if (d < 32) {
              dot = dot + _M0MPC15array5Array2atGsE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(wte, i), d).data * _M0MPC15array5Array2atGsE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(wte, j), d).data;
              _tmp$4 = d + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const denom = _M0MPC15array5Array2atGdE(norms, i) * _M0MPC15array5Array2atGdE(norms, j);
          _M0MPC15array5Array4pushGdE(out, denom < 1e-10 ? 0 : dot / denom);
          _tmp$3 = j + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return out;
}
function _M0FP38username3gpt3src18get__vocab__string() {
  const buf = _M0MPB13StringBuilder11new_2einner(0);
  const words = _M0FP38username3gpt3src8g__vocab.val;
  const _bind = words.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      if (i > 0) {
        _M0IPB13StringBuilderPB6Logger11write__char(buf, 124);
      }
      _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0MPC15array5Array2atGsE(words, i));
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0IPB13StringBuilderPB6Logger13write__string(buf, "|<BOS>");
  return buf.val;
}
function _M0FP38username3gpt3src6v__new(data, ch, lg) {
  const id = _M0FP38username3gpt3src11g__next__id.val;
  _M0FP38username3gpt3src11g__next__id.val = id + 1 | 0;
  return new _M0TP38username3gpt3src5Value(id, data, 0, ch, lg);
}
function _M0FP38username3gpt3src7v__leaf(data) {
  return _M0FP38username3gpt3src6v__new(data, [], []);
}
function _M0FP38username3gpt3src6linear(x, w) {
  const out = [];
  const _bind = w.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const row = w[_];
      let acc = _M0FP38username3gpt3src7v__leaf(0);
      const n = row.length;
      let _tmp$2 = 0;
      while (true) {
        const i = _tmp$2;
        if (i < n) {
          acc = _M0IP38username3gpt3src5ValuePB3Add3add(acc, _M0IP38username3gpt3src5ValuePB3Mul3mul(_M0MPC15array5Array2atGsE(row, i), _M0MPC15array5Array2atGsE(x, i)));
          _tmp$2 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array4pushGsE(out, acc);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return out;
}
function _M0MP38username3gpt3src5Value6v__pow(self, exp) {
  const lgrad = exp * _M0FPC14math3pow(self.data, exp - 1);
  return _M0FP38username3gpt3src6v__new(_M0FPC14math3pow(self.data, exp), [self], [lgrad]);
}
function _M0MP38username3gpt3src5Value6v__div(self, other) {
  return _M0IP38username3gpt3src5ValuePB3Mul3mul(self, _M0MP38username3gpt3src5Value6v__pow(other, -1));
}
function _M0FP38username3gpt3src7rmsnorm(x) {
  const n = x.length;
  let ms = _M0FP38username3gpt3src7v__leaf(0);
  const _bind = x.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const xi = x[_];
      ms = _M0IP38username3gpt3src5ValuePB3Add3add(ms, _M0IP38username3gpt3src5ValuePB3Mul3mul(xi, xi));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  ms = _M0MP38username3gpt3src5Value6v__div(ms, _M0FP38username3gpt3src7v__leaf(n + 0));
  const scale = _M0MP38username3gpt3src5Value6v__pow(_M0IP38username3gpt3src5ValuePB3Add3add(ms, _M0FP38username3gpt3src7v__leaf(1e-05)), -0.5);
  const out = [];
  const _bind$2 = x.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$2) {
      const xi = x[_];
      _M0MPC15array5Array4pushGsE(out, _M0IP38username3gpt3src5ValuePB3Mul3mul(xi, scale));
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return out;
}
function _M0MP38username3gpt3src5Value6v__exp(self) {
  const e = _M0FPC14math3exp(self.data);
  return _M0FP38username3gpt3src6v__new(e, [self], [e]);
}
function _M0FP38username3gpt3src7softmax(logits) {
  let max_val = _M0MPC15array5Array2atGsE(logits, 0).data;
  const _bind = logits.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const v = logits[_];
      if (v.data > max_val) {
        max_val = v.data;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const exps = [];
  const _bind$2 = logits.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$2) {
      const v = logits[_];
      _M0MPC15array5Array4pushGsE(exps, _M0MP38username3gpt3src5Value6v__exp(_M0IP38username3gpt3src5ValuePB3Add3add(v, _M0FP38username3gpt3src7v__leaf(-max_val))));
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let total = _M0FP38username3gpt3src7v__leaf(0);
  const _bind$3 = exps.length;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$3;
    if (_ < _bind$3) {
      const e = exps[_];
      total = _M0IP38username3gpt3src5ValuePB3Add3add(total, e);
      _tmp$3 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const probs = [];
  const _bind$4 = exps.length;
  let _tmp$4 = 0;
  while (true) {
    const _ = _tmp$4;
    if (_ < _bind$4) {
      const e = exps[_];
      _M0MPC15array5Array4pushGsE(probs, _M0MP38username3gpt3src5Value6v__div(e, total));
      _tmp$4 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return probs;
}
function _M0MP38username3gpt3src5Value7v__relu(self) {
  const out = self.data > 0 ? self.data : 0;
  const lgrad = self.data > 0 ? 1 : 0;
  return _M0FP38username3gpt3src6v__new(out, [self], [lgrad]);
}
function _M0FP38username3gpt3src13decoder__step(token_id, pos_id, dec_keys, dec_vals, cross_k, cross_v) {
  const scale = _M0FPC14math3pow(8 + 0, -0.5);
  const tok_emb = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, token_id);
  const pos_emb = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__dec.val, pos_id);
  let x = [];
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < 32) {
      _M0MPC15array5Array4pushGsE(x, _M0IP38username3gpt3src5ValuePB3Add3add(_M0MPC15array5Array2atGsE(tok_emb, i), _M0MPC15array5Array2atGsE(pos_emb, i)));
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$2 = 0;
  while (true) {
    const li = _tmp$2;
    if (li < 1) {
      const x_res = x;
      const xn = _M0FP38username3gpt3src7rmsnorm(x);
      const q = _M0FP38username3gpt3src6linear(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wq.val, li));
      const k = _M0FP38username3gpt3src6linear(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wk.val, li));
      const v = _M0FP38username3gpt3src6linear(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wv.val, li));
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_keys, li), k);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_vals, li), v);
      const t_len = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_keys, li).length;
      const x_sattn = [];
      let _tmp$3 = 0;
      while (true) {
        const h = _tmp$3;
        if (h < 4) {
          const hs = Math.imul(h, 8) | 0;
          const q_h = _M0MPC15array9ArrayView9to__arrayGRP38username3gpt3src5ValueE(_M0MPC15array5Array12view_2einnerGRP38username3gpt3src5ValueE(q, hs, hs + 8 | 0));
          const attn_logits = [];
          let _tmp$4 = 0;
          while (true) {
            const t = _tmp$4;
            if (t < t_len) {
              const k_h = _M0MPC15array9ArrayView9to__arrayGRP38username3gpt3src5ValueE(_M0MPC15array5Array12view_2einnerGRP38username3gpt3src5ValueE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_keys, li), t), hs, hs + 8 | 0));
              let dot = _M0FP38username3gpt3src7v__leaf(0);
              let _tmp$5 = 0;
              while (true) {
                const j = _tmp$5;
                if (j < 8) {
                  dot = _M0IP38username3gpt3src5ValuePB3Add3add(dot, _M0IP38username3gpt3src5ValuePB3Mul3mul(_M0MPC15array5Array2atGsE(q_h, j), _M0MPC15array5Array2atGsE(k_h, j)));
                  _tmp$5 = j + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MPC15array5Array4pushGsE(attn_logits, _M0IP38username3gpt3src5ValuePB3Mul3mul(dot, _M0FP38username3gpt3src7v__leaf(scale)));
              _tmp$4 = t + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const attn_w = _M0FP38username3gpt3src7softmax(attn_logits);
          let _tmp$5 = 0;
          while (true) {
            const j = _tmp$5;
            if (j < 8) {
              let acc = _M0FP38username3gpt3src7v__leaf(0);
              let _tmp$6 = 0;
              while (true) {
                const t = _tmp$6;
                if (t < t_len) {
                  const v_h = _M0MPC15array9ArrayView9to__arrayGRP38username3gpt3src5ValueE(_M0MPC15array5Array12view_2einnerGRP38username3gpt3src5ValueE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(dec_vals, li), t), hs, hs + 8 | 0));
                  acc = _M0IP38username3gpt3src5ValuePB3Add3add(acc, _M0IP38username3gpt3src5ValuePB3Mul3mul(_M0MPC15array5Array2atGsE(attn_w, t), _M0MPC15array5Array2atGsE(v_h, j)));
                  _tmp$6 = t + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MPC15array5Array4pushGsE(x_sattn, acc);
              _tmp$5 = j + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _tmp$3 = h + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const sattn_out = _M0FP38username3gpt3src6linear(x_sattn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wo.val, li));
      const x2 = [];
      let _tmp$4 = 0;
      while (true) {
        const i = _tmp$4;
        if (i < 32) {
          _M0MPC15array5Array4pushGsE(x2, _M0IP38username3gpt3src5ValuePB3Add3add(_M0MPC15array5Array2atGsE(sattn_out, i), _M0MPC15array5Array2atGsE(x_res, i)));
          _tmp$4 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let x3 = x2;
      if (!_M0FP38username3gpt3src12g__gpt__mode.val) {
        const xn2 = _M0FP38username3gpt3src7rmsnorm(x2);
        const xq = _M0FP38username3gpt3src6linear(xn2, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xq.val, li));
        const src_len = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(cross_k, li).length;
        const x_xattn = [];
        let _tmp$5 = 0;
        while (true) {
          const h = _tmp$5;
          if (h < 4) {
            const hs = Math.imul(h, 8) | 0;
            const q_h = _M0MPC15array9ArrayView9to__arrayGRP38username3gpt3src5ValueE(_M0MPC15array5Array12view_2einnerGRP38username3gpt3src5ValueE(xq, hs, hs + 8 | 0));
            const attn_logits = [];
            let _tmp$6 = 0;
            while (true) {
              const t = _tmp$6;
              if (t < src_len) {
                const k_h = _M0MPC15array9ArrayView9to__arrayGRP38username3gpt3src5ValueE(_M0MPC15array5Array12view_2einnerGRP38username3gpt3src5ValueE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(cross_k, li), t), hs, hs + 8 | 0));
                let dot = _M0FP38username3gpt3src7v__leaf(0);
                let _tmp$7 = 0;
                while (true) {
                  const j = _tmp$7;
                  if (j < 8) {
                    dot = _M0IP38username3gpt3src5ValuePB3Add3add(dot, _M0IP38username3gpt3src5ValuePB3Mul3mul(_M0MPC15array5Array2atGsE(q_h, j), _M0MPC15array5Array2atGsE(k_h, j)));
                    _tmp$7 = j + 1 | 0;
                    continue;
                  } else {
                    break;
                  }
                }
                _M0MPC15array5Array4pushGsE(attn_logits, _M0IP38username3gpt3src5ValuePB3Mul3mul(dot, _M0FP38username3gpt3src7v__leaf(scale)));
                _tmp$6 = t + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            const attn_w = _M0FP38username3gpt3src7softmax(attn_logits);
            let _tmp$7 = 0;
            while (true) {
              const j = _tmp$7;
              if (j < 8) {
                let acc = _M0FP38username3gpt3src7v__leaf(0);
                let _tmp$8 = 0;
                while (true) {
                  const t = _tmp$8;
                  if (t < src_len) {
                    const v_h = _M0MPC15array9ArrayView9to__arrayGRP38username3gpt3src5ValueE(_M0MPC15array5Array12view_2einnerGRP38username3gpt3src5ValueE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(cross_v, li), t), hs, hs + 8 | 0));
                    acc = _M0IP38username3gpt3src5ValuePB3Add3add(acc, _M0IP38username3gpt3src5ValuePB3Mul3mul(_M0MPC15array5Array2atGsE(attn_w, t), _M0MPC15array5Array2atGsE(v_h, j)));
                    _tmp$8 = t + 1 | 0;
                    continue;
                  } else {
                    break;
                  }
                }
                _M0MPC15array5Array4pushGsE(x_xattn, acc);
                _tmp$7 = j + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            _tmp$5 = h + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        const xattn_out = _M0FP38username3gpt3src6linear(x_xattn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xo.val, li));
        x3 = [];
        let _tmp$6 = 0;
        while (true) {
          const i = _tmp$6;
          if (i < 32) {
            _M0MPC15array5Array4pushGsE(x3, _M0IP38username3gpt3src5ValuePB3Add3add(_M0MPC15array5Array2atGsE(xattn_out, i), _M0MPC15array5Array2atGsE(x2, i)));
            _tmp$6 = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
      }
      const x_res3 = x3;
      x3 = _M0FP38username3gpt3src7rmsnorm(x3);
      x3 = _M0FP38username3gpt3src6linear(x3, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__dec__fc1.val, li));
      const x3r = [];
      const _bind = x3;
      const _bind$2 = _bind.length;
      let _tmp$5 = 0;
      while (true) {
        const _ = _tmp$5;
        if (_ < _bind$2) {
          const xi = _bind[_];
          _M0MPC15array5Array4pushGsE(x3r, _M0MP38username3gpt3src5Value7v__relu(xi));
          _tmp$5 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      x3 = _M0FP38username3gpt3src6linear(x3r, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__dec__fc2.val, li));
      const x4 = [];
      let _tmp$6 = 0;
      while (true) {
        const i = _tmp$6;
        if (i < 32) {
          _M0MPC15array5Array4pushGsE(x4, _M0IP38username3gpt3src5ValuePB3Add3add(_M0MPC15array5Array2atGsE(x3, i), _M0MPC15array5Array2atGsE(x_res3, i)));
          _tmp$6 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      x = x4;
      _tmp$2 = li + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FP38username3gpt3src6linear(x, _M0FP38username3gpt3src11g__lm__head.val);
}
function _M0FP38username3gpt3src16encoder__forward(src_toks) {
  const src_len = src_toks.length;
  const scale = _M0FPC14math3pow(8 + 0, -0.5);
  let xs = [];
  let _tmp = 0;
  while (true) {
    const pos = _tmp;
    if (pos < src_len) {
      const tok_emb = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src6g__wte.val, _M0MPC15array5Array2atGiE(src_toks, pos));
      const pos_emb = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__wpe__enc.val, pos);
      const x = [];
      let _tmp$2 = 0;
      while (true) {
        const i = _tmp$2;
        if (i < 32) {
          _M0MPC15array5Array4pushGsE(x, _M0IP38username3gpt3src5ValuePB3Add3add(_M0MPC15array5Array2atGsE(tok_emb, i), _M0MPC15array5Array2atGsE(pos_emb, i)));
          _tmp$2 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(xs, x);
      _tmp = pos + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$2 = 0;
  while (true) {
    const li = _tmp$2;
    if (li < 1) {
      const all_xn = [];
      const all_k = [];
      const all_v = [];
      let _tmp$3 = 0;
      while (true) {
        const pos = _tmp$3;
        if (pos < src_len) {
          const xn = _M0FP38username3gpt3src7rmsnorm(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(xs, pos));
          _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_xn, xn);
          _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_k, _M0FP38username3gpt3src6linear(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wk.val, li)));
          _M0MPC15array5Array4pushGRPB5ArrayGiEE(all_v, _M0FP38username3gpt3src6linear(xn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wv.val, li)));
          _tmp$3 = pos + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const new_xs = [];
      let _tmp$4 = 0;
      while (true) {
        const pos = _tmp$4;
        if (pos < src_len) {
          const x_res = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(xs, pos);
          const q = _M0FP38username3gpt3src6linear(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_xn, pos), _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wq.val, li));
          const x_attn = [];
          let _tmp$5 = 0;
          while (true) {
            const h = _tmp$5;
            if (h < 4) {
              const hs = Math.imul(h, 8) | 0;
              const q_h = _M0MPC15array9ArrayView9to__arrayGRP38username3gpt3src5ValueE(_M0MPC15array5Array12view_2einnerGRP38username3gpt3src5ValueE(q, hs, hs + 8 | 0));
              const attn_logits = [];
              let _tmp$6 = 0;
              while (true) {
                const t = _tmp$6;
                if (t < src_len) {
                  const k_h = _M0MPC15array9ArrayView9to__arrayGRP38username3gpt3src5ValueE(_M0MPC15array5Array12view_2einnerGRP38username3gpt3src5ValueE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_k, t), hs, hs + 8 | 0));
                  let dot = _M0FP38username3gpt3src7v__leaf(0);
                  let _tmp$7 = 0;
                  while (true) {
                    const j = _tmp$7;
                    if (j < 8) {
                      dot = _M0IP38username3gpt3src5ValuePB3Add3add(dot, _M0IP38username3gpt3src5ValuePB3Mul3mul(_M0MPC15array5Array2atGsE(q_h, j), _M0MPC15array5Array2atGsE(k_h, j)));
                      _tmp$7 = j + 1 | 0;
                      continue;
                    } else {
                      break;
                    }
                  }
                  _M0MPC15array5Array4pushGsE(attn_logits, _M0IP38username3gpt3src5ValuePB3Mul3mul(dot, _M0FP38username3gpt3src7v__leaf(scale)));
                  _tmp$6 = t + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              const attn_w = _M0FP38username3gpt3src7softmax(attn_logits);
              let _tmp$7 = 0;
              while (true) {
                const j = _tmp$7;
                if (j < 8) {
                  let acc = _M0FP38username3gpt3src7v__leaf(0);
                  let _tmp$8 = 0;
                  while (true) {
                    const t = _tmp$8;
                    if (t < src_len) {
                      const v_h = _M0MPC15array9ArrayView9to__arrayGRP38username3gpt3src5ValueE(_M0MPC15array5Array12view_2einnerGRP38username3gpt3src5ValueE(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(all_v, t), hs, hs + 8 | 0));
                      acc = _M0IP38username3gpt3src5ValuePB3Add3add(acc, _M0IP38username3gpt3src5ValuePB3Mul3mul(_M0MPC15array5Array2atGsE(attn_w, t), _M0MPC15array5Array2atGsE(v_h, j)));
                      _tmp$8 = t + 1 | 0;
                      continue;
                    } else {
                      break;
                    }
                  }
                  _M0MPC15array5Array4pushGsE(x_attn, acc);
                  _tmp$7 = j + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _tmp$5 = h + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const attn_out = _M0FP38username3gpt3src6linear(x_attn, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wo.val, li));
          let x2 = [];
          let _tmp$6 = 0;
          while (true) {
            const i = _tmp$6;
            if (i < 32) {
              _M0MPC15array5Array4pushGsE(x2, _M0IP38username3gpt3src5ValuePB3Add3add(_M0MPC15array5Array2atGsE(attn_out, i), _M0MPC15array5Array2atGsE(x_res, i)));
              _tmp$6 = i + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const x_res2 = x2;
          x2 = _M0FP38username3gpt3src7rmsnorm(x2);
          x2 = _M0FP38username3gpt3src6linear(x2, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__enc__fc1.val, li));
          const x2r = [];
          const _bind = x2;
          const _bind$2 = _bind.length;
          let _tmp$7 = 0;
          while (true) {
            const _ = _tmp$7;
            if (_ < _bind$2) {
              const xi = _bind[_];
              _M0MPC15array5Array4pushGsE(x2r, _M0MP38username3gpt3src5Value7v__relu(xi));
              _tmp$7 = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          x2 = _M0FP38username3gpt3src6linear(x2r, _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__enc__fc2.val, li));
          const x3 = [];
          let _tmp$8 = 0;
          while (true) {
            const i = _tmp$8;
            if (i < 32) {
              _M0MPC15array5Array4pushGsE(x3, _M0IP38username3gpt3src5ValuePB3Add3add(_M0MPC15array5Array2atGsE(x2, i), _M0MPC15array5Array2atGsE(x_res2, i)));
              _tmp$8 = i + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _M0MPC15array5Array4pushGRPB5ArrayGiEE(new_xs, x3);
          _tmp$4 = pos + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      xs = new_xs;
      _tmp$2 = li + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return xs;
}
function _M0FP38username3gpt3src11v__backwardN11build__topoS4(_env, v) {
  const visited = _env._1;
  const topo = _env._0;
  if (!_M0MPC17hashmap7HashMap8containsGibE(visited, v.id)) {
    _M0MPC17hashmap7HashMap3setGibE(visited, v.id, true);
    const _bind = v.children;
    const _bind$2 = _bind.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$2) {
        const child = _bind[_];
        _M0FP38username3gpt3src11v__backwardN11build__topoS4(_env, child);
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0MPC15array5Array4pushGsE(topo, v);
    return;
  } else {
    return;
  }
}
function _M0FP38username3gpt3src11v__backward(root) {
  const topo = [];
  const visited = _M0MPC17hashmap7HashMap11new_2einnerGibE(8);
  const _env = { _0: topo, _1: visited };
  _M0FP38username3gpt3src11v__backwardN11build__topoS4(_env, root);
  root.grad = 1;
  const n = topo.length;
  let i = n - 1 | 0;
  while (true) {
    if (i >= 0) {
      const node = _M0MPC15array5Array2atGsE(topo, i);
      const nc = node.children.length;
      let _tmp = 0;
      while (true) {
        const j = _tmp;
        if (j < nc) {
          const _bind = _M0MPC15array5Array2atGsE(node.children, j);
          _bind.grad = _bind.grad + _M0MPC15array5Array2atGdE(node.local_grads, j) * node.grad;
          _tmp = j + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      i = i - 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0MP38username3gpt3src5Value6v__log(self) {
  const d = self.data < 1e-15 ? 1e-15 : self.data;
  return _M0FP38username3gpt3src6v__new(_M0FPC14math2ln(d), [self], [1 / d]);
}
function _M0MP38username3gpt3src5Value6v__neg(self) {
  return _M0FP38username3gpt3src6v__new(-self.data, [self], [-1]);
}
function _M0FP38username3gpt3src11train__step() {
  const step = _M0FP38username3gpt3src7g__step.val;
  if (step >= 2000) {
    return -1;
  }
  _M0FP38username3gpt3src11g__next__id.val = 0;
  const docs = _M0FP38username3gpt3src7g__docs.val;
  const doc = _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(docs, step % docs.length | 0);
  const bos = _M0FP38username3gpt3src6g__bos.val;
  const losses = [];
  if (_M0FP38username3gpt3src12g__gpt__mode.val) {
    const n = doc.length;
    if (n < 2) {
      _M0FP38username3gpt3src7g__step.val = step + 1 | 0;
      return 0;
    }
    const seq_len = n > 8 ? 8 : n;
    const dec_keys = [];
    const dec_vals = [];
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < 1) {
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_keys, []);
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_vals, []);
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const empty = [];
    const _bind = seq_len - 1 | 0;
    let _tmp$2 = 0;
    while (true) {
      const pos_id = _tmp$2;
      if (pos_id < _bind) {
        const token_id = _M0MPC15array5Array2atGiE(doc, pos_id);
        const target_id = _M0MPC15array5Array2atGiE(doc, pos_id + 1 | 0);
        const logits = _M0FP38username3gpt3src13decoder__step(token_id, pos_id, dec_keys, dec_vals, empty, empty);
        const probs = _M0FP38username3gpt3src7softmax(logits);
        _M0MPC15array5Array4pushGsE(losses, _M0MP38username3gpt3src5Value6v__neg(_M0MP38username3gpt3src5Value6v__log(_M0MPC15array5Array2atGsE(probs, target_id))));
        _tmp$2 = pos_id + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  } else {
    const total = doc.length;
    if (total < 2) {
      _M0FP38username3gpt3src7g__step.val = step + 1 | 0;
      return 0;
    }
    const split = total / 2 | 0;
    const enc_len = split > 8 ? 8 : split;
    const raw_tgt_len = total - split | 0;
    const dec_len = raw_tgt_len > 7 ? 7 : raw_tgt_len;
    if (enc_len <= 0 || dec_len <= 0) {
      _M0FP38username3gpt3src7g__step.val = step + 1 | 0;
      return 0;
    }
    const src_toks = [];
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < enc_len) {
        _M0MPC15array5Array4pushGiE(src_toks, _M0MPC15array5Array2atGiE(doc, i));
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const tgt_inputs = [bos];
    const tgt_targets = [];
    let _tmp$2 = 0;
    while (true) {
      const i = _tmp$2;
      if (i < dec_len) {
        _M0MPC15array5Array4pushGiE(tgt_inputs, _M0MPC15array5Array2atGiE(doc, split + i | 0));
        _M0MPC15array5Array4pushGiE(tgt_targets, _M0MPC15array5Array2atGiE(doc, split + i | 0));
        _tmp$2 = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0MPC15array5Array4pushGiE(tgt_targets, bos);
    const enc_out = _M0FP38username3gpt3src16encoder__forward(src_toks);
    const cross_k = [];
    const cross_v = [];
    let _tmp$3 = 0;
    while (true) {
      const li = _tmp$3;
      if (li < 1) {
        const ck = [];
        const cv = [];
        let _tmp$4 = 0;
        while (true) {
          const t = _tmp$4;
          if (t < enc_len) {
            _M0MPC15array5Array4pushGRPB5ArrayGiEE(ck, _M0FP38username3gpt3src6linear(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(enc_out, t), _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xk.val, li)));
            _M0MPC15array5Array4pushGRPB5ArrayGiEE(cv, _M0FP38username3gpt3src6linear(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(enc_out, t), _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xv.val, li)));
            _tmp$4 = t + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(cross_k, ck);
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(cross_v, cv);
        _tmp$3 = li + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const dec_keys = [];
    const dec_vals = [];
    let _tmp$4 = 0;
    while (true) {
      const _ = _tmp$4;
      if (_ < 1) {
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_keys, []);
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_vals, []);
        _tmp$4 = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const n_dec = tgt_targets.length;
    let _tmp$5 = 0;
    while (true) {
      const pos_id = _tmp$5;
      if (pos_id < n_dec) {
        const token_id = _M0MPC15array5Array2atGiE(tgt_inputs, pos_id);
        const target_id = _M0MPC15array5Array2atGiE(tgt_targets, pos_id);
        const logits = _M0FP38username3gpt3src13decoder__step(token_id, pos_id, dec_keys, dec_vals, cross_k, cross_v);
        const probs = _M0FP38username3gpt3src7softmax(logits);
        _M0MPC15array5Array4pushGsE(losses, _M0MP38username3gpt3src5Value6v__neg(_M0MP38username3gpt3src5Value6v__log(_M0MPC15array5Array2atGsE(probs, target_id))));
        _tmp$5 = pos_id + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  let loss = _M0FP38username3gpt3src7v__leaf(0);
  const _bind = losses.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const lt = losses[_];
      loss = _M0IP38username3gpt3src5ValuePB3Add3add(loss, lt);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  loss = _M0MP38username3gpt3src5Value6v__div(loss, _M0FP38username3gpt3src7v__leaf(losses.length + 0));
  _M0FP38username3gpt3src11v__backward(loss);
  const t = step + 1 | 0;
  const lr_t = 0.01 * (1 - (step + 0) / (2000 + 0));
  const params = _M0FP38username3gpt3src9g__params.val;
  const np = params.length;
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i < np) {
      const p = _M0MPC15array5Array2atGsE(params, i);
      const g = p.grad;
      _M0MPC15array5Array3setGdE(_M0FP38username3gpt3src10g__adam__m.val, i, 0.85 * _M0MPC15array5Array2atGdE(_M0FP38username3gpt3src10g__adam__m.val, i) + 0.150000000000000022 * g);
      _M0MPC15array5Array3setGdE(_M0FP38username3gpt3src10g__adam__v.val, i, 0.99 * _M0MPC15array5Array2atGdE(_M0FP38username3gpt3src10g__adam__v.val, i) + 0.0100000000000000089 * g * g);
      const m_hat = _M0MPC15array5Array2atGdE(_M0FP38username3gpt3src10g__adam__m.val, i) / (1 - _M0FPC14math3pow(0.85, t + 0));
      const v_hat = _M0MPC15array5Array2atGdE(_M0FP38username3gpt3src10g__adam__v.val, i) / (1 - _M0FPC14math3pow(0.99, t + 0));
      p.data = p.data - lr_t * m_hat / (_M0FPC14math3pow(v_hat, 0.5) + 1e-08);
      p.grad = 0;
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const loss_val = loss.data;
  _M0FP38username3gpt3src7g__step.val = step + 1 | 0;
  return loss_val;
}
function _M0FP38username3gpt3src9rng__next() {
  _M0FP38username3gpt3src6g__rng.val = _M0IPC15int645Int64PB3Add3add(_M0IPC15int645Int64PB3Mul3mul(_M0FP38username3gpt3src6g__rng.val, $6364136223846793005L), $1442695040888963407L);
  const bits = _M0IPC15int645Int64PB6BitAnd4land(_M0FP38username3gpt3src6g__rng.val, $9223372036854775807L);
  return _M0MPC15int645Int6410to__double(bits) / 9.22337203685477581e+18;
}
function _M0FP38username3gpt3src13sample__token(logits, temperature, vocab_sz, bos) {
  const scaled = [];
  const _bind = logits.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const l = logits[_];
      _M0MPC15array5Array4pushGsE(scaled, _M0FP38username3gpt3src7v__leaf(l.data / temperature));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const probs = _M0FP38username3gpt3src7softmax(scaled);
  const r = _M0FP38username3gpt3src9rng__next();
  let cumulative = 0;
  let sampled = bos;
  let _tmp$2 = 0;
  while (true) {
    const k = _tmp$2;
    if (k < vocab_sz) {
      cumulative = cumulative + _M0MPC15array5Array2atGsE(probs, k).data;
      if (r <= cumulative) {
        sampled = k;
        break;
      }
      _tmp$2 = k + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return sampled;
}
function _M0FP38username3gpt3src8generate(src_phrase, temperature) {
  _M0FP38username3gpt3src11g__next__id.val = 0;
  const w2i = _M0FP38username3gpt3src11g__word2idx.val;
  const bos = _M0FP38username3gpt3src6g__bos.val;
  const vocab = _M0FP38username3gpt3src8g__vocab.val;
  const vocab_sz = _M0FP38username3gpt3src14g__vocab__size.val;
  const dec_keys = [];
  const dec_vals = [];
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < 1) {
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_keys, []);
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_vals, []);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const words = [];
  if (_M0FP38username3gpt3src12g__gpt__mode.val) {
    const prompt_toks = [bos];
    const _bind = _M0FP38username3gpt3src12split__words(src_phrase);
    const _bind$2 = _bind.length;
    let _tmp$2 = 0;
    while (true) {
      const _ = _tmp$2;
      if (_ < _bind$2) {
        const word = _bind[_];
        const _bind$3 = _M0MPC17hashmap7HashMap3getGsiE(w2i, word);
        if (_bind$3 === undefined) {
        } else {
          const _Some = _bind$3;
          const _idx = _Some;
          _M0MPC15array5Array4pushGiE(prompt_toks, _idx);
        }
        _tmp$2 = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const prompt_len = prompt_toks.length > 8 ? 8 : prompt_toks.length;
    const empty = [];
    let last_logits = [];
    let _tmp$3 = 0;
    while (true) {
      const pos_id = _tmp$3;
      if (pos_id < prompt_len) {
        last_logits = _M0FP38username3gpt3src13decoder__step(_M0MPC15array5Array2atGiE(prompt_toks, pos_id), pos_id, dec_keys, dec_vals, empty, empty);
        _tmp$3 = pos_id + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    let token_id = _M0FP38username3gpt3src13sample__token(last_logits, temperature, vocab_sz, bos);
    let _tmp$4 = prompt_len;
    while (true) {
      const pos_id = _tmp$4;
      if (pos_id < 8) {
        if (token_id === bos) {
          break;
        }
        _M0MPC15array5Array4pushGsE(words, _M0MPC15array5Array2atGsE(vocab, token_id));
        const logits = _M0FP38username3gpt3src13decoder__step(token_id, pos_id, dec_keys, dec_vals, empty, empty);
        token_id = _M0FP38username3gpt3src13sample__token(logits, temperature, vocab_sz, bos);
        _tmp$4 = pos_id + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  } else {
    const src_toks = [];
    const _bind = _M0FP38username3gpt3src12split__words(src_phrase);
    const _bind$2 = _bind.length;
    let _tmp$2 = 0;
    while (true) {
      const _ = _tmp$2;
      if (_ < _bind$2) {
        const word = _bind[_];
        const _bind$3 = _M0MPC17hashmap7HashMap3getGsiE(w2i, word);
        if (_bind$3 === undefined) {
        } else {
          const _Some = _bind$3;
          const _idx = _Some;
          _M0MPC15array5Array4pushGiE(src_toks, _idx);
        }
        _tmp$2 = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const enc_len = src_toks.length > 8 ? 8 : src_toks.length;
    if (enc_len === 0) {
      return "";
    }
    const src_toks_clamped = _M0MPC15array9ArrayView9to__arrayGiE(_M0MPC15array5Array12view_2einnerGiE(src_toks, 0, enc_len));
    const enc_out = _M0FP38username3gpt3src16encoder__forward(src_toks_clamped);
    const cross_k = [];
    const cross_v = [];
    let _tmp$3 = 0;
    while (true) {
      const li = _tmp$3;
      if (li < 1) {
        const ck = [];
        const cv = [];
        let _tmp$4 = 0;
        while (true) {
          const t = _tmp$4;
          if (t < enc_len) {
            _M0MPC15array5Array4pushGRPB5ArrayGiEE(ck, _M0FP38username3gpt3src6linear(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(enc_out, t), _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xk.val, li)));
            _M0MPC15array5Array4pushGRPB5ArrayGiEE(cv, _M0FP38username3gpt3src6linear(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(enc_out, t), _M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xv.val, li)));
            _tmp$4 = t + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(cross_k, ck);
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(cross_v, cv);
        _tmp$3 = li + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    let token_id = bos;
    let _tmp$4 = 0;
    while (true) {
      const pos_id = _tmp$4;
      if (pos_id < 8) {
        const logits = _M0FP38username3gpt3src13decoder__step(token_id, pos_id, dec_keys, dec_vals, cross_k, cross_v);
        token_id = _M0FP38username3gpt3src13sample__token(logits, temperature, vocab_sz, bos);
        if (token_id === bos) {
          break;
        }
        _M0MPC15array5Array4pushGsE(words, _M0MPC15array5Array2atGsE(vocab, token_id));
        _tmp$4 = pos_id + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  const buf = _M0MPB13StringBuilder11new_2einner(0);
  const _bind = words.length;
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i < _bind) {
      if (i > 0) {
        _M0IPB13StringBuilderPB6Logger11write__char(buf, 32);
      }
      _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0MPC15array5Array2atGsE(words, i));
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return buf.val;
}
function _M0FP38username3gpt3src5gauss(std) {
  const u = _M0FP38username3gpt3src9rng__next();
  const u1c = u < 1e-15 ? 1e-15 : u;
  const u2 = _M0FP38username3gpt3src9rng__next();
  return _M0FPC14math3pow(-2 * _M0FPC14math2ln(u1c), 0.5) * _M0FPC14math3cos(6.28318530717958623 * u2) * std;
}
function _M0FP38username3gpt3src12make__matrix(nout, nin, std) {
  const rows = [];
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < nout) {
      const row = [];
      let _tmp$2 = 0;
      while (true) {
        const _$2 = _tmp$2;
        if (_$2 < nin) {
          _M0MPC15array5Array4pushGsE(row, _M0FP38username3gpt3src7v__leaf(_M0FP38username3gpt3src5gauss(std)));
          _tmp$2 = _$2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(rows, row);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return rows;
}
function _M0FP38username3gpt3src15collect__params(m, out) {
  const _bind = m.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const row = m[_];
      const _bind$2 = row.length;
      let _tmp$2 = 0;
      while (true) {
        const _$2 = _tmp$2;
        if (_$2 < _bind$2) {
          const p = row[_$2];
          _M0MPC15array5Array4pushGsE(out, p);
          _tmp$2 = _$2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FP38username3gpt3src14set__gpt__mode(v) {
  _M0FP38username3gpt3src12g__gpt__mode.val = v;
}
function _M0FP38username3gpt3src11init__model() {
  const word_set = _M0MPC17hashset7HashSet3newGsE(undefined);
  const _bind = _M0FP38username3gpt3src9raw__docs.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const doc = _M0FP38username3gpt3src9raw__docs[_];
      const _bind$2 = _M0FP38username3gpt3src12split__words(doc);
      const _bind$3 = _bind$2.length;
      let _tmp$2 = 0;
      while (true) {
        const _$2 = _tmp$2;
        if (_$2 < _bind$3) {
          const word = _bind$2[_$2];
          _M0MPC17hashset7HashSet3addGsE(word_set, word);
          _tmp$2 = _$2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const vocab_arr = [];
  const _it = _M0MPC17hashset7HashSet4iterGsE(word_set);
  while (true) {
    const _bind$2 = _M0MPB4Iter4nextGsE(_it);
    if (_bind$2 === undefined) {
      break;
    } else {
      const _Some = _bind$2;
      const _word = _Some;
      _M0MPC15array5Array4pushGsE(vocab_arr, _word);
      continue;
    }
  }
  const nv = vocab_arr.length;
  let _tmp$2 = 1;
  while (true) {
    const i = _tmp$2;
    if (i < nv) {
      const key = _M0MPC15array5Array2atGsE(vocab_arr, i);
      let j = i - 1 | 0;
      while (true) {
        if (j >= 0 && _M0IP016_24default__implPB7Compare6op__gtGsE(_M0MPC15array5Array2atGsE(vocab_arr, j), key)) {
          _M0MPC15array5Array3setGsE(vocab_arr, j + 1 | 0, _M0MPC15array5Array2atGsE(vocab_arr, j));
          j = j - 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array3setGsE(vocab_arr, j + 1 | 0, key);
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const bos_id = vocab_arr.length;
  _M0FP38username3gpt3src8g__vocab.val = vocab_arr;
  _M0FP38username3gpt3src14g__vocab__size.val = vocab_arr.length + 1 | 0;
  _M0FP38username3gpt3src6g__bos.val = bos_id;
  const w2i = _M0MPC17hashmap7HashMap11new_2einnerGsiE(8);
  const _bind$2 = vocab_arr.length;
  let _tmp$3 = 0;
  while (true) {
    const i = _tmp$3;
    if (i < _bind$2) {
      _M0MPC17hashmap7HashMap3setGsiE(w2i, _M0MPC15array5Array2atGsE(vocab_arr, i), i);
      _tmp$3 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src11g__word2idx.val = w2i;
  const tokenized = [];
  const _bind$3 = _M0FP38username3gpt3src9raw__docs.length;
  let _tmp$4 = 0;
  while (true) {
    const _ = _tmp$4;
    if (_ < _bind$3) {
      const doc = _M0FP38username3gpt3src9raw__docs[_];
      const toks = [];
      const _bind$4 = _M0FP38username3gpt3src12split__words(doc);
      const _bind$5 = _bind$4.length;
      let _tmp$5 = 0;
      while (true) {
        const _$2 = _tmp$5;
        if (_$2 < _bind$5) {
          const word = _bind$4[_$2];
          const _bind$6 = _M0MPC17hashmap7HashMap3getGsiE(w2i, word);
          if (_bind$6 === undefined) {
          } else {
            const _Some = _bind$6;
            const _idx = _Some;
            _M0MPC15array5Array4pushGiE(toks, _idx);
          }
          _tmp$5 = _$2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(tokenized, toks);
      _tmp$4 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src7g__docs.val = tokenized;
  const vocab_sz = _M0FP38username3gpt3src14g__vocab__size.val;
  _M0FP38username3gpt3src6g__wte.val = _M0FP38username3gpt3src12make__matrix(vocab_sz, 32, 0.08);
  if (!_M0FP38username3gpt3src12g__gpt__mode.val) {
    _M0FP38username3gpt3src11g__wpe__enc.val = _M0FP38username3gpt3src12make__matrix(8, 32, 0.08);
  }
  _M0FP38username3gpt3src11g__wpe__dec.val = _M0FP38username3gpt3src12make__matrix(8, 32, 0.08);
  _M0FP38username3gpt3src11g__lm__head.val = _M0FP38username3gpt3src12make__matrix(vocab_sz, 32, 0.08);
  const enc_wq = [];
  const enc_wk = [];
  const enc_wv = [];
  const enc_wo = [];
  const enc_fc1 = [];
  const enc_fc2 = [];
  const dec_wq = [];
  const dec_wk = [];
  const dec_wv = [];
  const dec_wo = [];
  const dec_xq = [];
  const dec_xk = [];
  const dec_xv = [];
  const dec_xo = [];
  const dec_fc1 = [];
  const dec_fc2 = [];
  let _tmp$5 = 0;
  while (true) {
    const _ = _tmp$5;
    if (_ < 1) {
      if (!_M0FP38username3gpt3src12g__gpt__mode.val) {
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(enc_wq, _M0FP38username3gpt3src12make__matrix(32, 32, 0.08));
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(enc_wk, _M0FP38username3gpt3src12make__matrix(32, 32, 0.08));
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(enc_wv, _M0FP38username3gpt3src12make__matrix(32, 32, 0.08));
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(enc_wo, _M0FP38username3gpt3src12make__matrix(32, 32, 0.08));
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(enc_fc1, _M0FP38username3gpt3src12make__matrix(128, 32, 0.08));
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(enc_fc2, _M0FP38username3gpt3src12make__matrix(32, 128, 0.08));
      }
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_wq, _M0FP38username3gpt3src12make__matrix(32, 32, 0.08));
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_wk, _M0FP38username3gpt3src12make__matrix(32, 32, 0.08));
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_wv, _M0FP38username3gpt3src12make__matrix(32, 32, 0.08));
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_wo, _M0FP38username3gpt3src12make__matrix(32, 32, 0.08));
      if (!_M0FP38username3gpt3src12g__gpt__mode.val) {
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_xq, _M0FP38username3gpt3src12make__matrix(32, 32, 0.08));
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_xk, _M0FP38username3gpt3src12make__matrix(32, 32, 0.08));
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_xv, _M0FP38username3gpt3src12make__matrix(32, 32, 0.08));
        _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_xo, _M0FP38username3gpt3src12make__matrix(32, 32, 0.08));
      }
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_fc1, _M0FP38username3gpt3src12make__matrix(128, 32, 0.08));
      _M0MPC15array5Array4pushGRPB5ArrayGiEE(dec_fc2, _M0FP38username3gpt3src12make__matrix(32, 128, 0.08));
      _tmp$5 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src10g__enc__wq.val = enc_wq;
  _M0FP38username3gpt3src10g__enc__wk.val = enc_wk;
  _M0FP38username3gpt3src10g__enc__wv.val = enc_wv;
  _M0FP38username3gpt3src10g__enc__wo.val = enc_wo;
  _M0FP38username3gpt3src11g__enc__fc1.val = enc_fc1;
  _M0FP38username3gpt3src11g__enc__fc2.val = enc_fc2;
  _M0FP38username3gpt3src10g__dec__wq.val = dec_wq;
  _M0FP38username3gpt3src10g__dec__wk.val = dec_wk;
  _M0FP38username3gpt3src10g__dec__wv.val = dec_wv;
  _M0FP38username3gpt3src10g__dec__wo.val = dec_wo;
  _M0FP38username3gpt3src10g__dec__xq.val = dec_xq;
  _M0FP38username3gpt3src10g__dec__xk.val = dec_xk;
  _M0FP38username3gpt3src10g__dec__xv.val = dec_xv;
  _M0FP38username3gpt3src10g__dec__xo.val = dec_xo;
  _M0FP38username3gpt3src11g__dec__fc1.val = dec_fc1;
  _M0FP38username3gpt3src11g__dec__fc2.val = dec_fc2;
  const params = [];
  _M0FP38username3gpt3src15collect__params(_M0FP38username3gpt3src6g__wte.val, params);
  if (!_M0FP38username3gpt3src12g__gpt__mode.val) {
    _M0FP38username3gpt3src15collect__params(_M0FP38username3gpt3src11g__wpe__enc.val, params);
  }
  _M0FP38username3gpt3src15collect__params(_M0FP38username3gpt3src11g__wpe__dec.val, params);
  _M0FP38username3gpt3src15collect__params(_M0FP38username3gpt3src11g__lm__head.val, params);
  let _tmp$6 = 0;
  while (true) {
    const li = _tmp$6;
    if (li < 1) {
      if (!_M0FP38username3gpt3src12g__gpt__mode.val) {
        _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wq.val, li), params);
        _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wk.val, li), params);
        _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wv.val, li), params);
        _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__enc__wo.val, li), params);
        _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__enc__fc1.val, li), params);
        _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__enc__fc2.val, li), params);
      }
      _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wq.val, li), params);
      _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wk.val, li), params);
      _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wv.val, li), params);
      _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__wo.val, li), params);
      if (!_M0FP38username3gpt3src12g__gpt__mode.val) {
        _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xq.val, li), params);
        _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xk.val, li), params);
        _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xv.val, li), params);
        _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src10g__dec__xo.val, li), params);
      }
      _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__dec__fc1.val, li), params);
      _M0FP38username3gpt3src15collect__params(_M0MPC15array5Array2atGRPB5ArrayGRPB5ArrayGRP38username3gpt3src5ValueEEE(_M0FP38username3gpt3src11g__dec__fc2.val, li), params);
      _tmp$6 = li + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38username3gpt3src9g__params.val = params;
  const np = params.length;
  _M0FP38username3gpt3src10g__adam__m.val = _M0MPC15array5Array4makeGdE(np, 0);
  _M0FP38username3gpt3src10g__adam__v.val = _M0MPC15array5Array4makeGdE(np, 0);
  _M0FP38username3gpt3src7g__step.val = 0;
}
function _M0IP38username3gpt3src5ValuePB3Add3add(self, other) {
  return _M0FP38username3gpt3src6v__new(self.data + other.data, [self, other], [1, 1]);
}
function _M0IP38username3gpt3src5ValuePB3Mul3mul(self, other) {
  return _M0FP38username3gpt3src6v__new(self.data * other.data, [self, other], [other.data, self.data]);
}
(() => {
  _M0FP48username3gpt3cmd4main17js__set__init__fn(() => {
    _M0FP38username3gpt3src11init__model();
  });
  _M0FP48username3gpt3cmd4main24js__set__train__step__fn(() => _M0FP38username3gpt3src11train__step());
  _M0FP48username3gpt3cmd4main21js__set__generate__fn((src, temp) => _M0FP38username3gpt3src8generate(src, temp));
  _M0FP48username3gpt3cmd4main22js__set__get__step__fn(() => _M0FP38username3gpt3src7g__step.val);
  _M0FP48username3gpt3cmd4main28js__set__get__num__steps__fn(() => 2000);
  _M0FP48username3gpt3cmd4main27js__set__run__attn__viz__fn((name) => {
    _M0FP38username3gpt3src14run__attn__viz(name);
  });
  _M0FP48username3gpt3cmd4main31js__set__get__viz__seq__len__fn(() => _M0FP38username3gpt3src16g__viz__seq__len.val);
  _M0FP48username3gpt3cmd4main29js__set__get__viz__tokens__fn(() => _M0FP38username3gpt3src19g__viz__tokens__str.val);
  _M0FP48username3gpt3cmd4main33js__set__get__viz__attn__flat__fn(() => _M0FP38username3gpt3src18g__viz__attn__flat.val);
  _M0FP48username3gpt3cmd4main39js__set__get__embedding__similarity__fn(() => _M0FP38username3gpt3src26get__embedding__similarity());
  _M0FP48username3gpt3cmd4main31js__set__get__vocab__string__fn(() => _M0FP38username3gpt3src18get__vocab__string());
  _M0FP48username3gpt3cmd4main35js__set__get__viz__hidden__flat__fn(() => _M0FP38username3gpt3src14g__viz__hidden.val);
  _M0FP48username3gpt3cmd4main38js__set__get__viz__mlp__acts__flat__fn(() => _M0FP38username3gpt3src17g__viz__mlp__acts.val);
  _M0FP48username3gpt3cmd4main35js__set__get__viz__logits__flat__fn(() => _M0FP38username3gpt3src14g__viz__logits.val);
  _M0FP48username3gpt3cmd4main30js__set__run__network__viz__fn((phrase, pos) => {
    _M0FP38username3gpt3src17run__network__viz(phrase, pos);
  });
  _M0FP48username3gpt3cmd4main36js__set__get__network__viz__flat__fn(() => _M0FP38username3gpt3src12g__net__flat.val);
  _M0FP48username3gpt3cmd4main36js__set__get__network__viz__attn__fn(() => _M0FP38username3gpt3src12g__net__attn.val);
  _M0FP48username3gpt3cmd4main35js__set__get__network__viz__seq__fn(() => _M0FP38username3gpt3src11g__net__seq.val);
  _M0FP48username3gpt3cmd4main35js__set__get__network__viz__pos__fn(() => _M0FP38username3gpt3src11g__net__pos.val);
  _M0FP48username3gpt3cmd4main41js__set__get__network__viz__enc__flat__fn(() => _M0FP38username3gpt3src17g__net__enc__flat.val);
  _M0FP48username3gpt3cmd4main41js__set__get__network__viz__dec__flat__fn(() => _M0FP38username3gpt3src17g__net__dec__flat.val);
  _M0FP48username3gpt3cmd4main47js__set__get__network__viz__enc__self__attn__fn(() => _M0FP38username3gpt3src23g__net__enc__self__attn.val);
  _M0FP48username3gpt3cmd4main47js__set__get__network__viz__dec__self__attn__fn(() => _M0FP38username3gpt3src23g__net__dec__self__attn.val);
  _M0FP48username3gpt3cmd4main43js__set__get__network__viz__cross__attn__fn(() => _M0FP38username3gpt3src19g__net__cross__attn.val);
  _M0FP48username3gpt3cmd4main40js__set__get__network__viz__src__len__fn(() => _M0FP38username3gpt3src16g__net__src__len.val);
  _M0FP48username3gpt3cmd4main40js__set__get__network__viz__tgt__len__fn(() => _M0FP38username3gpt3src16g__net__tgt__len.val);
  _M0FP48username3gpt3cmd4main43js__set__get__network__viz__src__tokens__fn(() => _M0FP38username3gpt3src24g__net__src__tokens__str.val);
  _M0FP48username3gpt3cmd4main43js__set__get__network__viz__tgt__tokens__fn(() => _M0FP38username3gpt3src24g__net__tgt__tokens__str.val);
  _M0FP48username3gpt3cmd4main44js__set__get__network__viz__enc__q__flat__fn(() => _M0FP38username3gpt3src20g__net__enc__q__flat.val);
  _M0FP48username3gpt3cmd4main44js__set__get__network__viz__enc__k__flat__fn(() => _M0FP38username3gpt3src20g__net__enc__k__flat.val);
  _M0FP48username3gpt3cmd4main44js__set__get__network__viz__enc__v__flat__fn(() => _M0FP38username3gpt3src20g__net__enc__v__flat.val);
  _M0FP48username3gpt3cmd4main44js__set__get__network__viz__dec__q__flat__fn(() => _M0FP38username3gpt3src20g__net__dec__q__flat.val);
  _M0FP48username3gpt3cmd4main44js__set__get__network__viz__dec__k__flat__fn(() => _M0FP38username3gpt3src20g__net__dec__k__flat.val);
  _M0FP48username3gpt3cmd4main44js__set__get__network__viz__dec__v__flat__fn(() => _M0FP38username3gpt3src20g__net__dec__v__flat.val);
  _M0FP48username3gpt3cmd4main45js__set__get__network__viz__enc__ho__flat__fn(() => _M0FP38username3gpt3src21g__net__enc__ho__flat.val);
  _M0FP48username3gpt3cmd4main45js__set__get__network__viz__dec__ho__flat__fn(() => _M0FP38username3gpt3src21g__net__dec__ho__flat.val);
  _M0FP48username3gpt3cmd4main47js__set__get__network__viz__cross__ho__flat__fn(() => _M0FP38username3gpt3src23g__net__cross__ho__flat.val);
  _M0FP48username3gpt3cmd4main27js__set__set__gpt__mode__fn((v) => {
    _M0FP38username3gpt3src14set__gpt__mode(v);
  });
  _M0FP48username3gpt3cmd4main27js__set__get__gpt__mode__fn(() => _M0FP38username3gpt3src12g__gpt__mode.val);
})();
