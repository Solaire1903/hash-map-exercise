import HashMap from "./hash-map.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(`Should be 12: ${test.length()}`);
console.log(`Should be 16: ${test.capacity}\n`);

test.set("apple", "green");
test.set("frog", "yellow");
test.set("ice cream", "pink");

console.log(`Should be 12: ${test.length()}`);
console.log(`Should be 16: ${test.capacity}\n`);

test.set("moon", "silver");

console.log(`Should be 13: ${test.length()}`);
console.log(`Should be 32: ${test.capacity}\n`);

test.set("moon", "red");
test.set("dog", "white");

console.log(`Should be 13: ${test.length()}`);
console.log(`Should be 32: ${test.capacity}\n`);

console.log(test.buckets);
console.log(test.entries());
