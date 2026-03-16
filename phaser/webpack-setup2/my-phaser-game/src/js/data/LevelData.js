// const LEVELS = {
//   1: {
//     columns: [
//       ["pink", "red", "pink", "red"],
//       ["red", "pink", "red", "pink"],
//       [],
//       [],
//     ]
//   },
//   2: {
//     columns: [
//       ["pink", "blue", "pink", "blue"],
//       ["blue", "pink", "blue", "pink"],
//       ["red", "red", "red", "red"],
//       [],
//       [],
//     ]
//   },
//   3: {
//     columns: [
//       ["pink", "blue", "red", "pink"],
//       ["red", "pink", "blue", "red"],
//       ["blue", "red", "pink", "blue"],
//       [],
//       [],
//     ]
//   },
//   4: {
//     columns: [
//       ["pink", "blue", "red", "green"],
//       ["green", "pink", "blue", "red"],
//       ["red", "green", "pink", "blue"],
//       ["blue", "red", "green", "pink"],
//       [],
//       [],
//     ]
//   },
//   5: {
//     columns: [
//       ["pink", "yellow", "red",    "green"],
//       ["green", "red",   "yellow", "pink"],
//       ["yellow","pink",  "green",  "red"],
//       ["red",  "green",  "pink",   "yellow"],
//       [],
//       [],
//     ]
//   }
// };

// export default LEVELS;




const LEVELS = {
  1: {
    // 2 colors — easy, ~4-6 moves
    columns: [
      ["pink", "red",  "red",  "pink"],
      ["red",  "pink", "pink", "red"],
      [],
      [],
    ]
  },
  2: {
    // 3 colors — medium, ~8-10 moves
    columns: [
      ["pink", "red",  "blue", "pink"],
      ["blue", "pink", "red",  "blue"],
      ["red",  "blue", "pink", "red"],
      [],
      [],
    ]
  },
  3: {
    // 3 colors — harder mix
    columns: [
      ["red",  "blue", "pink", "blue"],
      ["pink", "red",  "blue", "red"],
      ["blue", "pink", "red",  "pink"],
      [],
      [],
    ]
  },
  4: {
    // 4 colors — hard, ~14-16 moves
    columns: [
      ["pink",  "green", "red",   "blue"],
      ["red",   "pink",  "green", "blue"],
      ["blue",  "red",   "pink",  "green"],
      ["green", "blue",  "red",   "pink"],
      [],
      [],
    ]
  },
  5: {
    // 4 colors — hardest mix
    columns: [
      ["green", "blue",  "red",   "pink"],
      ["pink",  "green", "blue",  "red"],
      ["red",   "pink",  "green", "blue"],
      ["blue",  "red",   "pink",  "green"],
      [],
      [],
    ]
  }
};

export default LEVELS;
