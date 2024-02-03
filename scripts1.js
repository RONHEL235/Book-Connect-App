//2 to the 10th power is 2 multiplied by itself 10 times.

//10 times
//The actual computation

/* let counter = 1;
let result = 1;
while (counter < 11) {
    result = result * 2;
    counter = counter + 1; 
}

console.log(result) */

//2 to the 10th power is 2 multiplied by itself 10 times.

//10 times
//The actual computation
/* let result = 1;
for (let counter = 0; counter < 10; counter = counter + 1) {
    result = result * 2;
}
console.log(result) */

/* for (let current = 20; ; current = current + 1) {
    if (current % 7 == 0) {
        console.log(current)
        break
    }
} */
/* let hash = '#'
for (let counter = 0; counter < 7; counter = counter + 1) {
    console.log(hash)
    hash = hash + '#'
}
 */

/* for (let counter = 1; counter < 100; counter = counter + 1) {
    if (counter % 5 == 0 && counter % 3 == 0) {
        console.log('FizzBuzz')
    }else if (counter % 3 == 0) {
        console.log('Fizz')
    }else if (counter % 5 == 0) {
        console.log('Buzz')
    }else {
        console.log(counter)
    }
} */
/* 
let size = 4;
let hash = '# '
for (counter = 0; counter < size; counter = counter + 1) {
    for (hashCounter = 0; hashCounter = size; hashCounter = hashCounter + 1) {
        hash = hash + '# '
        break
    }
}console.log(hash)
 */

/* let missiles = function () {

} */

/* function chicken() {
    return egg();
  }
  function egg() {
    return chicken();
  }
  console.log(chicken() + " came first."); */

/* function power(base, exponent = 6) {
let result = 1;
for (let count = 0; count < exponent; count++) {
    result *= base;
}
return result;
}
console.log(power(2,6)) */

const yes = () => {
    
}

function wrapValue(n) {
    let local = n;
    return () => local;
  }
let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1())
console.log(wrap2())