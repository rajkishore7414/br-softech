// export default class Stack {

//   constructor() {
//     this.items = [];
//   }

//   // add to top
//   push(item) {
//     this.items.push(item);
//   }

//   // remove from top
//   pop() {
//     if (this.isEmpty()) return null;
//     return this.items.pop();
//   }

//   // see top without removing
//   peek() {
//     if (this.isEmpty()) return null;
//     return this.items[this.items.length - 1];
//   }

//   isEmpty() {
//     return this.items.length === 0;
//   }

//   isFull() {
//     return this.items.length >= 4;
//   }

//   // all same color = sorted
//   isSorted() {
//     if (this.isEmpty()) return true;
//     return this.items.every(item => item === this.items[0]);
//   }

//   size() {
//     return this.items.length;
//   }
// }







// export default class Stack {

//   constructor() {
//     this.items = [];
//   }

//   // add to top
//   push(item) {
//     this.items.push(item);
//   }

//   // remove from top
//   pop() {
//     if (this.isEmpty()) return null;
//     return this.items.pop();
//   }

//   // see top without removing
//   peek() {
//     if (this.isEmpty()) return null;
//     return this.items[this.items.length - 1];
//   }

//   isEmpty() {
//     return this.items.length === 0;
//   }

//   isFull() {
//     return this.items.length >= 4;
//   }

//   // must be empty OR have exactly 4 same color cans
//   isSorted() {
//     // empty tube = fine
//     if (this.isEmpty()) return true;

//     // less than 4 cans = not sorted yet
//     if (this.items.length < 4) return false;

//     // all 4 must be same color
//     for (let i = 0; i < this.items.length; i++) {
//       if (this.items[i] !== this.items[0]) {
//         return false;
//       }
//     }

//     return true;
//   }

//   size() {
//     return this.items.length;
//   }
// }















//implemented multiple picking
export default class Stack {

  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }


  //upar ke kitna CAN SELECT KARNA HAI YE BATAYEGA
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1]; //ye index return karega
  }

  // count how many matching cans on top
  peekMultiple() {
    if (this.isEmpty()) return 0;

    const topColor = this.peek();
    let count = 0;

    // count from top going down
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i] === topColor) {
        count++;
      } else {
        break; // stop when color changes
      }
    }

    return count;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  isFull() {
    return this.items.length >= 4;
  }

  isSorted() {
    if (this.isEmpty()) return true;
    if (this.items.length < 4) return false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] !== this.items[0]) {  // ye bas intna check karega sabhi indexes par zero toh nahi hai na agar hoga to return false karega
        return false;
      }
    }
    return true;
  }

  size() {
    return this.items.length;
  }
}


