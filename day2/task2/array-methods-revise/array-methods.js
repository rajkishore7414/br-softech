// filter - we pass callback fn, and based on some condition, we filter data And returns new Array( which is shallow)

const words = ["spray", "eliteeeee", "exuberant", "desn", "present"];

const result = words.filter((word) => word.length > 6);

// console.log(result);

const number = [1,3,5,53,3];
const result2 = number.filter(num => num > 50);
// console.log(result2);


// example2
function isBigEnough(value) {
  return value >= 10;
}

const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);




// Find all prime numbers in an array
const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// function isPrime(n) {
//   if (n < 2) {
//     return false;
//   }
//   if (n % 2 === 0) {
//     return n === 2;
//   }
//   for (let factor = 3; factor * factor <= n; factor += 2) {
//     if (n % factor === 0) {
//       return false;
//     }
//   }
//   return true;
// }

// console.log(array.filter(isPrime));

console.log(array.filter(function isPrime(n) {
  if (n < 2) {
    return false;
  }
  if (n % 2 === 0) {
    return n === 2;
  }
  for (let factor = 3; factor * factor <= n; factor += 2) {
    if (n % factor === 0) {
      return false;
    }
  }
  return true;
}))


//example 

const arr = [
  { id: 15 },
  { id: -1 },
  { id: 0 },
  { id: 3 },
  { id: 12.2 },
  {},
  { id: null },
  { id: NaN },
  { id: "undefined" },
];

let invalidEntries = 0;

function filterByID(item) {
  if (Number.isFinite(item.id) && item.id !== 0) {
    return true;
  }
  invalidEntries++;
  return false;
}

const arrByID = arr.filter(filterByID);

console.log("Filtered Array\n", arrByID);
// Filtered Array
// [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]

console.log("Number of Invalid Entries =", invalidEntries);
// Number of Invalid Entries = 5