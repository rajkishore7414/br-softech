// The push() method of Array instances adds the specified elements to the end of an array and returns the new length of the array.


const sports = ["soccer", "baseball"];
const total = sports.push("football", "swimming");

console.log(sports); // ['soccer', 'baseball', 'football', 'swimming']
// console.log(total); // 4

const student = ["raj", 'kushar',['rupesh']];
const student2 = [ 'ankit', 'kumkum'];

student2.push( ...student);
console.log(student2)