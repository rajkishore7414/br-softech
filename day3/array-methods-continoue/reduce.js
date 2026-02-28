const array = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

// console.log(sumWithInitial);
// Expected output: 10


// Qn

const nums = [10, 20, 30, 40];
sum = nums.reduce((accumulator, currentvalue) => {
    return accumulator, currentvalue
});
// console.log(sum);



// Qn - return largest number
sum2 = nums.reduce((accumulator, currentvalue) => accumulator < currentvalue )
// console.log(sum2);


const nums2 = [10, 20, 30, 40];

const max = nums2.reduce((accumulator, currentValue) => {
  // If current is bigger, it becomes the new accumulator
//   return currentValue > accumulator ? currentValue : accumulator;
if( accumulator > currentValue)
    accumulator
});

console.log(max); // Output: 40





