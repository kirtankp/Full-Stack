
function fib(len) {
    let a = 0, b = 1;

    if (len == 1) {
        console.log(a);
    } else if (len == 2) {
        console.log(a);
        console.log(b);
    } else {
        console.log(a);
        console.log(b);
        for (let i = 3; i <= len; i++) {
            let temp = a;
            a = b;
            b += temp;
            console.log(b);
        }
    }
}

fib(12);