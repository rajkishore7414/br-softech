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







export default class Stack {

  constructor() {
    this.items = [];
  }

  // add to top
  push(item) {
    this.items.push(item);
  }

  // remove from top
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  // see top without removing
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  isFull() {
    return this.items.length >= 4;
  }

  // must be empty OR have exactly 4 same color cans
  isSorted() {
    // empty tube = fine
    if (this.isEmpty()) return true;

    // less than 4 cans = not sorted yet
    if (this.items.length < 4) return false;

    // all 4 must be same color
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] !== this.items[0]) {
        return false;
      }
    }

    return true;
  }

  size() {
    return this.items.length;
  }
}