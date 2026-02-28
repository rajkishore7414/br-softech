console.log("day1");


// class Person {
//   name;

//   constructor(name) {
//     this.name = name;
//   }

//   introduceSelf() {
//     console.log(`Hi! I'm ${this.name}`);
//   }
// }

// const giles = new Person("Giles");

// giles.introduceSelf(); // Hi! I'm Giles





// Inheritance in JS

class Person {
  name;

  constructor(name) {
    this.name = name;
  }

  introduceSelf() {
    console.log(`Hi! I'm ${this.name}`);
  }
}



class Professor extends Person {
  teaches;

  constructor(name, teaches) {
    super(name);
    this.teaches = teaches;
  }

  introduceSelf() {
    console.log(
      `My name is ${this.name}, and I will be your ${this.teaches} professor.`,
    );
  }

  grade(paper) {
    const grade = Math.floor(Math.random() * (5 - 1) + 1);
    console.log(grade);
  }
}

const walsh = new Professor("Walsh", "Psychology");
walsh.introduceSelf(); // 'My name is Walsh, and I will be your Psychology professor'

walsh.grade("my paper"); // some random grade


// Encapsulation

class Student extends Person {
  #year;

  constructor(name, year) {
    super(name);
    this.#year = year;
  }

  introduceSelf() {
    console.log(`Hi! I'm ${this.name}, and I'm in year ${this.#year}.`);
  }

  canStudyArchery() {
    return this.#year > 1;
  }
}


const summers = new Student("Summers", 2);

summers.introduceSelf(); // Hi! I'm Summers, and I'm in year 2.
summers.canStudyArchery(); // true

// summers.#year; // SyntaxError

//----




// TEST 1

// class Shape {
//   name;
//   sides;
//   sideLength;

//   constructor(name, sides, sideLength) {
//     this.name = name;
//     this.sides = sides;
//     this.sideLength = sideLength;
//   }

//   calcPerimeter() {
//     console.log(
//       `The ${this.name}'s perimeter length is ${this.sides * this.sideLength}.`,
//     );
//   }
// }

// const square = new Shape("square", 4, 5);
// square.calcPerimeter();

// const triangle = new Shape("triangle", 3, 3);
// triangle.calcPerimeter();


// TEST 2

class Shape {
  name;
  sides;
  sideLength;

  constructor(name, sides, sideLength) {
    this.name = name;
    this.sides = sides;
    this.sideLength = sideLength;
  }

  calcPerimeter() {
    console.log(
      `The ${this.name}'s perimeter length is ${this.sides * this.sideLength}.`,
    );
  }
}



class Square extends Shape {
  constructor(sideLength) {
    // super("square", 4, sideLength); //here we pass values directly
    super (names, sides, sideLength)
  }

  calcArea() {
    console.log(
      `The ${this.name}'s area is ${this.sideLength * this.sideLength} squared.`,
    );
  }
}

const square = new Square(4);

square.calcPerimeter();
square.calcArea();