let name1 = { name: "Sourav" };
let name2 = { last_name: "Kumar", marks: {
    maths: 30,
    science: 50,

    // printmarks: function() {
    //     console.log(`My marks ${this.science} and mynameis ${this.name}`)
    // }
}};

// let fullname = { ...name1, ...name2 };
// console.log(fullname);

// let name3 = name2;
// name3.last_name= "kishore";
// console.log(name3.last_name);
// console.log(name2)
// console.log(name3)

name4 = {...name2} // using spread operator


// name4.last_name= "kishore";
// name4.marks.science= 99;
// console.log(name4.last_name);
// console.log(name2)
// console.log(name4)

const copy = structuredClone(name2); // this is the best and optimal way

name2.last_name= "kishore";
name2.marks.science= 99;
console.log(copy);

console.log(name2);

// console.log(Object.keys(obj).length)

const copy2 = JSON.parse(JSON.stringify(name2));

console.log("line41",name2);
console.log(copy2);


