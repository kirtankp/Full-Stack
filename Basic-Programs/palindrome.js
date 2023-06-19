/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
  str = str.toLowerCase();
  str = str.replace(/[^a-zA-Z]/g, "");
  let rev = str.split("").reverse().join("");
  console.log(str);
  console.log(rev);
  if (str === rev) {
    return true;
  } else {
    return false;
  }
}

console.log(isPalindrome('Able, was I ere I saw Elba!'));
console.log(isPalindrome('Eva, can I see bees in a cave?'));
console.log(isPalindrome('Mr. Owl ate my metal worm.'));
module.exports = isPalindrome;
