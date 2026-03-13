export default class Stack {

  constructor() {
    this.items = [];
  }

  // add slice to top
  push(item) {
    this.items.push(item);
  }

  // remove slice from top
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  // see top slice without removing
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  // is column empty?
  isEmpty() {
    return this.items.length === 0;
  }

  // is column full?
  isFull() {
    return this.items.length >= 4;
  }

  // are all slices same color? (win check)
  isSorted() {
    if (this.isEmpty()) return true;
    return this.items.every(item => item === this.items[0]);
  }

  // how many slices
  size() {
    return this.items.length;
  }
}