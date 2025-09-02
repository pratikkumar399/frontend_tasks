/**
 * @template T, U
 * @param { (value: T, index: number, array: Array<T>) => U } callbackFn
 * @param {any} [thisArg]
 * @return {Array<U>}
 */


Array.prototype.myMap = function (callbackFn, thisArg) {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        if ((i in this)) {
            res[i] = callbackFn.call(thisArg, this[i], i, this);
        }
    }
    return res;
};



console.log([1, , 3, 4].myMap((i) => i)); // [1, <empty>, 3, 4]
console.log([1, 2, 3, 4].myMap((i) => i * i));// [1, 4, 9, 16]
