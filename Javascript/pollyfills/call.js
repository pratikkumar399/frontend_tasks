/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...argArray) {

    if (typeof this !== "function") {
        throw new TypeError("myCall must be called on a function");
    }

    thisArg = thisArg ?? globalThis;

    const fnSymbol = Symbol("tempFn");
    thisArg[fnSymbol] = this;

    // Call the function and capture the return value
    const result = thisArg[fnSymbol](...argArray);

    // Cleanup the temp function property
    delete thisArg[fnSymbol];

    return result;
};

function multiplyAge(multiplier = 1) {
    return this.age * multiplier;
}
const mary = {
    age: 21,
};

const john = {
    age: 42,
};

console.log(multiplyAge.myCall(mary)); // 21
console.log(multiplyAge.myCall(john, 2)); // 84
