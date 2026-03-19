// class A {
// constructor(name, email){
    
// }
//   fun() {
//     console.log("this is a A");
//   }
// }

// class B extends A {
//   constructor(){
//      super(); // this will be always written in constructor fn
      
//   } 
    
//     fun() {

//         console.log("This is B");
//     }
//   }
  

// let obj = new B();
// // obj.fun();



class Person {
  constructor(name, age) {
    this.name = name;   // 'this' = the new object being created
    this.age  = age;
  }

  greet() {
    // 'this' = whoever called greet()
    return `Hi, I'm ${this.name}, age ${this.age}`;
  }
}

const raj = new Person('Raj', 25);
console.log( raj.greet() );   // this = raj ✓

const priya = new Person('Priya', 28);
console.log( priya.greet() ); // this = priya ✓