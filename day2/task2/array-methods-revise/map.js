//map - The map() method is an iterative method. It calls a provided callbackFn function once for each element in an array and constructs a new array from the results.

//It is not invoked for empty slots in sparse arrays.


const numbers = [1, 4, 9];
const roots = numbers.map((num) => Math.sqrt(num));
// roots is now     [1, 2, 3]
// numbers is still [1, 4, 9]



const numbers2 = [21, 4, 5, 4];
this.a=10
const ans = numbers2.map( (num)=>{
    return num * 2
    // console.log(num2);
})

console.log(ans);
// here i am getting value undefined why?
