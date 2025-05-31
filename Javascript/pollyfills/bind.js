/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 */
Function.prototype.myBind = function (thisArg, ...argArray) {
    const originalFn = this;
    const tempFnKey = Symbol("boundFn");

    return function boundFunction(...laterArgs) {
        // If used as a constructor: preserve prototype
        const isNew = this instanceof boundFunction;
        const context = isNew ? this : (thisArg ?? globalThis);

        context[tempFnKey] = originalFn;
        const result = context[tempFnKey](...argArray, ...laterArgs);
        delete context[tempFnKey];

        return result;
    };
}