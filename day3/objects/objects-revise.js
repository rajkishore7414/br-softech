// //Objects In JS
// // -> 
// // -> stores data as a key-value pair
// // -> where each key uniquely identifies its value.



// /* In JS - two way to create objects
// 1. Using Object Literal -> {} just remember this
// //example
// let obj = {
//     name: "Sourav",
//     age: 23,
//     job: "Developer"
// };
// console.log(obj);

// 2. Using new Object Constructor -> new Object()  <- like this

// let obj = new Object();
// obj.name= "Sourav",
// obj.age= 23,
// obj.job= "Developer"

// console.log(obj);
// */



// // Basic Operations on JavaScript Objects


// // 1. Accessing Object Properties
// let obj = {name: "Sourav", age:23};

// console.log(obj.name);
// console.log(obj["age"]);


// // modify

// obj.name = "Raj"
// console.log(obj.name);

// // add new property to the object
// obj.rollno = 2;

// console.log(obj);


// // delete property from an object

// delete obj.name
// console.log(obj)


// // check property exists

// let obj2 = { model: "Tesla" };
// // console.log("color" in obj);
// console.log(obj2.hasOwnProperty("model"));



// // iterate objects
// console.log("line no 66")
// for( let key in obj) {
//     // console.log(key);
//     console.log(obj[key])
// }



// merge objects - how it is done using spread operator
let name1 = { name: "Sourav" };
let name2 = { last_name: "Kumar", marks: {
    maths: 30,
    science: 50,

    printmarks: function() {
        console.log(`My marks ${this.science} and mynameis ${this.name}`)
    }
}};

// let fullname = { ...name1, ...name2 };
// console.log(fullname);

// let name3 = name2;
// name3.last_name= "kishore";
// console.log(name3.last_name);
// console.log(name2)
// console.log(name3)

name4 = {...name2}


// name4.last_name= "kishore";
// name4.marks.science= 99;
// console.log(name4.last_name);
// console.log(name2)
// console.log(name4)

const copy = structuredClone(name2);
name2.last_name= "kishore";
name2.marks.science= 99;
console.log(copy);

console.log(name2);

// console.log(Object.keys(obj).length)



