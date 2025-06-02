
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

export default function curry(fn) {
    // curried is the inner function that keeps collecting arguments
    return function curried(...args) {
        // If enough arguments are collected, call the original function
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }

        // Otherwise, return a function to collect more arguments
        return function (...nextArgs) {
            // Combine previously collected args with the new ones
            return curried.apply(this, [...args, ...nextArgs]);
        };
    };
}