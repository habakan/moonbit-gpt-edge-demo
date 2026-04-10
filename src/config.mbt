// ---------------------------------------------------------------------------
// Model hyperparameters
// ---------------------------------------------------------------------------

let n_layer : Int = 1
let n_embd : Int = 32
let block_size : Int = 8   // max seq length for encoder or decoder
let n_head : Int = 4
let head_dim : Int = 8 // n_embd / n_head

// ---------------------------------------------------------------------------
// Dataset: Cooklang-style recipe sentences (word-level tokens)
// ---------------------------------------------------------------------------

let raw_docs : Array[String] = [
  "mix flour and water until smooth",
  "add salt and pepper to taste",
  "boil water in a large pot",
  "cook pasta until al dente",
  "drain pasta using a colander",
  "heat olive oil in a pan",
  "saute garlic in butter",
  "add onion and cook until soft",
  "season with salt and pepper",
  "stir the sauce gently",
  "simmer over low heat",
  "slice the tomato thinly",
  "chop onion and garlic",
  "dice carrot and celery",
  "mince the garlic cloves",
  "rinse rice with cold water",
  "bake in the oven until golden",
  "whisk eggs and cream together",
  "mix flour and butter",
  "pour batter into the pan",
  "fold in the cream gently",
  "preheat the oven",
  "grease the pan with butter",
  "let cool for five minutes",
  "serve with fresh parsley",
  "combine all ingredients",
  "stir until smooth and creamy",
  "add tomato sauce and stir",
  "fry in olive oil",
  "season the chicken with salt",
  "bring to a boil",
  "reduce heat and simmer",
  "cover the pot",
  "remove from heat",
  "toss with olive oil",
  "sprinkle with cheese",
  "add butter and stir",
  "cook the onion until soft",
  "heat the pan over medium heat",
  "stir until golden brown",
  "cook for ten minutes",
  "drain and rinse with water",
  "chop the carrot finely",
  "add egg and mix well",
  "bake until golden and crisp",
  "add garlic to the oil",
  "cook over medium heat",
  "stir in the cream",
  "season with pepper and salt",
  "combine flour and egg",
  "whisk until smooth",
  "add water to the pot",
  "cook rice in salted water",
  "stir in butter until melted",
  "serve with pasta",
  "heat butter in a pan",
  "saute onion in olive oil",
  "chop garlic finely",
  "mash potato until smooth",
  "mix well and serve",
  "boil for ten minutes",
]

// ---------------------------------------------------------------------------
// Word-level tokenizer helpers
// ---------------------------------------------------------------------------

fn split_words(s : String) -> Array[String] {
  let words : Array[String] = []
  let buf = StringBuilder::new()
  for ch in s.iter() {
    if ch == ' ' {
      if not(buf.is_empty()) {
        words.push(buf.to_string())
        buf.reset()
      }
    } else {
      buf.write_char(ch)
    }
  }
  if not(buf.is_empty()) {
    words.push(buf.to_string())
  }
  words
}
