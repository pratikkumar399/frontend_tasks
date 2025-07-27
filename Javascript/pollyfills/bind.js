/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 */
Function.prototype.myBind = function (thisArg, ...argArray) {
    const tempFnKey = Symbol("boundFn");
    const originalFn = this;

    return function (...laterArgs) {
        const context = thisArg ?? globalThis;

        context[tempFnKey] = originalFn;
        const result = context[tempFnKey](...argArray, ...laterArgs);
        delete context[tempFnKey];

        return result;
    };
};
    

const john = {
    age: 42,
    getAge: function () {
        return this.age;
    },
};

const unboundGetAge = john.getAge;
console.log(unboundGetAge()); // undefined

const boundGetAge = john.getAge.myBind(john);
console.log(boundGetAge()); // 42
