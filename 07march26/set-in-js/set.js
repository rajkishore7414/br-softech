let myset = new Set();

// Adding new elements to the set
myset.add("California");
myset.add("Seattle");
myset.add("Chicago");

// Creating an iterator object
const setIterator = myset.entries();

// Getting values with iterator
console.log(setIterator.next());
// console.log(setIterator.next().value);
// console.log(setIterator.next().value);