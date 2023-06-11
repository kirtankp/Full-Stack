//basically the sync code get first priority than async code so, it calculate the sum first and than stopwatch will started.
//till the sync code is calculating async code will not run.


//line 2-9 is an asynchronus code
var count = 1;
function timer() {
    console.clear();
    console.log(count);
    count += 1;
}
setInterval(timer,1000);

//line 15-19 is an synchronus code 
var count2 = 1;
for (let index = 0; index < 1000000000; index++) {
  count2+=1;
}
console.log(count2);
