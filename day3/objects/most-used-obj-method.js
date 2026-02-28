const user = { name: "John", age: 30 };

console.log(Object.keys(user));
// ["name", "age"] // returns an arry


console.log(Object.values(user));
// ["John", 30] // returns an array


console.log(Object.entries(user));
// [["name", "John"], ["age", 30]] //returns an array, as key-values

// very useful for loops
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}








// Copies properties from one or more objects into a target object. cretes a shallow copy

const target = { a: 1 };
const source = { b: 2 };

Object.assign(target, source);

console.log(target);
// { a: 1, b: 2 }





const config = { apiKey: "123" };
Object.freeze(config);

config.apiKey = "456"; // ❌ Won't change