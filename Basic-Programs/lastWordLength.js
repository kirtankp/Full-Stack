s = "   fly me   to   the moon  ";
s1 = "luffy is still joyboy";

const myArray = s.split(" ");

const newArray = [];
j = 0;
for (let i = 0; i < myArray.length; i++) {
    if (myArray[i] !== '') {
        newArray[j] = myArray[i];
        j++;
    }
}

console.log("length of the last word is : "+newArray[newArray.length - 1].length);




