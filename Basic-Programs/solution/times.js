
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