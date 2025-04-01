// Array.prototype.filer implementation

/**
 * @template T
 * @param { (value: T, index: number, array: Array<T>) => boolean } callbackFn
 * @param {any} [thisArg]
 * @return {Array<T>}
 */


Array.prototype.myFilter = function (callbackFn, thisArg) {
    let array = Object(this); // convert this to an array
    const len = array.length;
    const result = [];

    for (let i = 0; i < len; i++) {
        if (i in array) {
            let element = array[i];
            if (callbackFn.call(thisArg, element, i, array)) {
                result.push(element);
            }
        }
    }
    return result;
};


const result = [1, 2, 3, 4].myFilter((value) => value % 2 == 0); // [2, 4]
console.log(result);

[1, 2, 3, 4].myFilter((value) => value < 3); // [1, 2]
