/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/

function sum(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    console.log("sum : "+total);
}


function calculateTime(n) {
    // const d = new Date()
    let startTime = performance.now();  
    sum(n);
    let finishTime = performance.now();
    let time = (finishTime - startTime) / 1000;
    
    return time;
}

console.log(calculateTime(100));
console.log(calculateTime(100000));
console.log(calculateTime(1000000000));