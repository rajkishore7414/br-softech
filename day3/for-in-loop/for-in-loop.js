// for...in → Iterates over keys (property names)

// Used for objects

// Returns property names (keys) as strings

// Can also work on arrays (but not recommended) /here it returns index



// const user = { name: "Alice", age: 25 };

// for (let key in user) {
// //   console.log(key);        // name, age
//   console.log(user[key]);  // Alice, 25
// }


//Exercises
const student = {
  name: "John",
  age: 20,
  grade: "A"
};

for (let key in student) {
    console.log(key);
    console.log(student[key])
}


//Qn - count properties
const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2022,
  color: "black"
};

for( key in car ) {
    
}
console.log(i);