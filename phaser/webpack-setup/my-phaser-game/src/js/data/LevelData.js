const LEVELS = {
  1: {
    columns: [
      ["pink", "red", "pink", "red"],
      ["red", "pink", "red", "pink"],
      [],
      [],
    ]
  },
  2: {
    columns: [
      ["pink", "blue", "pink", "blue"],
      ["blue", "pink", "blue", "pink"],
      ["red", "red", "red", "red"],
      [],
      [],
    ]
  },
  3: {
    columns: [
      ["pink", "blue", "red", "pink"],
      ["red", "pink", "blue", "red"],
      ["blue", "red", "pink", "blue"],
      [],
      [],
    ]
  },
  4: {
    columns: [
      ["pink", "blue", "red", "green"],
      ["green", "pink", "blue", "red"],
      ["red", "green", "pink", "blue"],
      ["blue", "red", "green", "pink"],
      [],
      [],
    ]
  },
  5: {
    columns: [
      ["pink", "yellow", "red",    "green"],
      ["green", "red",   "yellow", "pink"],
      ["yellow","pink",  "green",  "red"],
      ["red",  "green",  "pink",   "yellow"],
      [],
      [],
    ]
  }
};

export default LEVELS;
// ```

// ---

// ## What this data means:
// ```
// Each array = one tube
// Each string = one can color (bottom → top)

// Level 1:
//   Tube 0: ["pink", "red", "pink", "red"]  ← mixed
//   Tube 1: ["red", "pink", "red", "pink"]  ← mixed
//   Tube 2: []                              ← empty (for moving)
//   Tube 3: []                              ← empty (for moving)

// Goal → sort into:
//   Tube 0: ["pink","pink","pink","pink"]   ← all pink
//   Tube 1: ["red","red","red","red"]       ← all red