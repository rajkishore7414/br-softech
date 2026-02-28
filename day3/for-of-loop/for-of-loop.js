// for...of → Iterates over values

// Used for arrays, strings, maps, sets, etc.

// Works on iterables

// Returns actual values

const arr = ["a", "b", "c"];

for (let value of arr) {
  console.log(value); // a, b, c
}


const str = "JS";

for (let char of str) {
  console.log(char); // J, S
}