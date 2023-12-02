// let item = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// item.map((index) => {
//   console.log(item);
//   console.log("index: " + index);
// });

// data = { name: "Rashad", city: "London", marks: 39999 };
// const {name, ...item} = data;
// console.log(name);
// console.log(item);
// console.log();

data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const [one, two, three, ...left] = data;
console.log("one: " + one);
console.log("two: " + two);
console.log("three: " + three);
console.log(left)