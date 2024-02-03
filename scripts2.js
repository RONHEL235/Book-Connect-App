/* const aFunction = (aNumber) => {    
    let theNumber = aNumber
    return (anotherNumber) => {
        let result = theNumber + 2;
        console.log("The number", theNumber)
        return () => {
            console.log(result)
            let theResult = result + 2;
            return theResult
        }
    }    
}
const getFunction = aFunction(16)
const theGetFunction = getFunction(6)  
console.log("Function call",theGetFunction() )
 */

/* const farmFunction = (cows, chickens) => {
    let cowString = String(cows);
    while (cowString.length < 3) {
        cowString = '0' + cowString; 
    }
    console.log(`${cowString} cows`)

    let chickenString = String(chickens);
    while (chickenString.length < 3) {
        chickenString = '0' + chickenString; 
    }
    console.log(`${chickenString} chickens`)
}
farmFunction(7, 9) */

/* const min = (number1, number2) => {
    if (number1 > number2) {
        return number2
    }else {
        return number1
    }
}
console.log(min(-11, 6)) */

const isEven = (aNumber) => {
    let booleanResult = (aNumber % 2 == 0)
    if (booleanResult) {
        return booleanResult
    }else {
        return booleanResult
    }
}
console.log(isEven(-1))