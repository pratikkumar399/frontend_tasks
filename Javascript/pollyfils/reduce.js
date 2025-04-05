
/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {Array<U>}
 */


Array.prototype.myReduce = function (callbackFn, initialValue) {
    let array = Object(this);
    let len = array.length;
    let accumulator;

    const noInitialValue = initialValue === undefined;
    
    if (noInitialValue && len === 0) {
        throw new TypeError("Reduce of empty array with no initial value");
    }

    if (noInitialValue) {
        accumulator = array[0];
    } else {
        accumulator = initialValue;
    }

    let index = noInitialValue ? 1 : 0;

    for (let i = index; i < len; i++) {
        if (i in array) {
            accumulator = callbackFn.call(this, accumulator, array[i], i, array);
        }
    }
    return accumulator;
};



//test cases 
[1, 2, 3].myReduce((prev, curr) => prev + curr, 0); // 6
[1, 2, 3].myReduce((prev, curr) => prev + curr, 4); // 10
