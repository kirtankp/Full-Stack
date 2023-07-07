
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

