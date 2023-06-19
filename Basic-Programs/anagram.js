/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {
  if (str1.length === str2.length) {
    let a = str1.toLowerCase();
    a = a.split("").sort().join();//after joining spill in char Array and sort.

    let b = str2.toLowerCase();
    b = b.split("").sort().join();//after joining spill in char Array and sort.

    if (a === b) {
      return true;
    } else {

      return false;
    }
  } else {

    return false;
  }
}

console.log(isAnagram("Debit Card", "Bad Credit"));
module.exports = isAnagram;