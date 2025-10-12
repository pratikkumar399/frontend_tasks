
/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {Array<U>}
 */

Array.prototype.myReduce = function (callbackFn, initialValue) {
    if (typeof callbackFn !== "function") {
        throw new TypeError(callbackFn + " is not a function");
    }

    const arr = this;
    const hasInitialValue = arguments.length > 1;
    const len = arr.length;

    if (!hasInitialValue && len === 0) {
        throw new TypeError("Reduce of empty array with no initial value");
    }

    let accumulator = hasInitialValue ? initialValue : arr[0];
    let startIndex = hasInitialValue ? 0 : 1;

    for (let i = startIndex; i < len; i++) {
        if (i in arr) {
            accumulator = callbackFn(accumulator, arr[i], i, arr);
        }
    }

    return accumulator;
};



//test cases 
[1, 2, 3].myReduce((prev, curr) => prev + curr, 0); // 6
console.log([1, 2, 3].myReduce((prev, curr) => prev + curr)); // 10
