/**
 * Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
 * @param thisArg The object to be used as the this object.
 * @param argArray A set of arguments to be passed to the function.
 * @return {any}
 */
Function.prototype.myApply = function (thisArg, argArray) {
    thisArg = thisArg ?? globalThis;

    const tempFn = Symbol(); // lets have a symbol, a unique key for each fn
    thisArg[tempFn] = this; // assign the context of the function

    const result = Array.isArray(argArray)
        ? thisArg[tempFn](...argArray)
        : thisArg[tempFn](); // Handle null/undefined argArray

    delete thisArg[tempFn];
    return result;

};