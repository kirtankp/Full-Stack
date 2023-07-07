function isAnagram(str1, str2) {
  if (str1.length === str2.length) {
    let a = str1.toLowerCase();
    a = a.split("").sort().join("");//first split in char array than sort and join.
    let b = str2.toLowerCase();
    b = b.split("").sort().join("");
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

