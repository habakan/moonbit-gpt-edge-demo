// ---------------------------------------------------------------------------
// Autograd engine
// ---------------------------------------------------------------------------

priv struct Value {
  id : Int
  mut data : Double
  mut grad : Double
  children : Array[Value]
  local_grads : Array[Double]
}

let g_next_id : Ref[Int] = Ref::new(0)

fn v_new(
  data : Double,
  ch : Array[Value],
  lg : Array[Double]
) -> Value {
  let id = g_next_id.val
  g_next_id.val = id + 1
  { id, data, grad: 0.0, children: ch, local_grads: lg }
}

fn v_leaf(data : Double) -> Value {
  v_new(data, [], [])
}

impl Add for Value with add(self, other) {
  v_new(self.data + other.data, [self, other], [1.0, 1.0])
}

impl Mul for Value with mul(self, other) {
  v_new(self.data * other.data, [self, other], [other.data, self.data])
}

fn Value::v_pow(self : Value, exp : Double) -> Value {
  let lgrad = exp * @math.pow(self.data, exp - 1.0)
  v_new(@math.pow(self.data, exp), [self], [lgrad])
}

fn Value::v_log(self : Value) -> Value {
  let d = if self.data < 1.0e-15 { 1.0e-15 } else { self.data }
  v_new(@math.ln(d), [self], [1.0 / d])
}

fn Value::v_exp(self : Value) -> Value {
  let e = @math.exp(self.data)
  v_new(e, [self], [e])
}

fn Value::v_relu(self : Value) -> Value {
  let out = if self.data > 0.0 { self.data } else { 0.0 }
  let lgrad = if self.data > 0.0 { 1.0 } else { 0.0 }
  v_new(out, [self], [lgrad])
}

fn Value::v_neg(self : Value) -> Value {
  v_new(-self.data, [self], [-1.0])
}

fn Value::v_div(self : Value, other : Value) -> Value {
  self * other.v_pow(-1.0)
}

fn v_backward(root : Value) -> Unit {
  let topo : Array[Value] = []
  let visited : @hashmap.HashMap[Int, Bool] = @hashmap.HashMap::new()

  fn build_topo(v : Value) -> Unit {
    if not(visited.contains(v.id)) {
      visited.set(v.id, true)
      for child in v.children {
        build_topo(child)
      }
      topo.push(v)
    }
  }

  build_topo(root)
  root.grad = 1.0
  let n = topo.length()
  let mut i = n - 1
  while i >= 0 {
    let node = topo[i]
    let nc = node.children.length()
    for j in 0..<nc {
      node.children[j].grad += node.local_grads[j] * node.grad
    }
    i -= 1
  }
}
