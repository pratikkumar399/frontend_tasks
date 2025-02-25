function curry(fn) {
    return function inner(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        else {
            return function (...args2) {
                return inner(...args, ...args2)
            }
        }
    }
}
