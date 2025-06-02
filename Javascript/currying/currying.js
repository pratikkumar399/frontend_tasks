
// simple currying

function add(a, b) {
    return a + b;
}

function add2(a) {
    return function (b) {
        return a + b;
    }
}
add(3, 4);

/**
 * @param {Function} func
 * @return {Function}
 */

export default function curry(func) {
    return function curried(...args) {
        // if criteria fulfilled then, call the function
        if (args.length >= func.length) {
            return func.apply(this, args);
        }
        // if more arguments are needed, return a function that takes more arguments
        return (...args2) => curried.apply(this, [...args, ...args2]);
    };
}


function add(a, b) {
    return a + b;
}

const curriedAdd = curry(add);
curriedAdd(3)(4); // 7

const alreadyAddedThree = curriedAdd(3);
alreadyAddedThree(4); // 7
