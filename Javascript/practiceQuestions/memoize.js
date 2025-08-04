/*
    
    A memoize function is a higher-order function that takes in a function and returns a memoized version of it. 
    The memoized function caches the results of expensive function calls and returns the cached result when it 
    receives the same inputs again. This can significantly improve the performance of functions that involve 
    complex processing / significant latency and are called with the same arguments repeatedly.

    Memoization is a technique to cache the results of expensive function calls and 
    return the cached result when the same inputs occur again.

*/


/**
 * @param {Function} func
 * @returns Function
 */


function memoize(func) {

    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args); // serialize the arguments as keys
        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = func(...args);
        console.log(args,"result");
        cache.set(key, result);
        return result;
    }

}


const slowAdd = (a, b) => {
    console.log("Calculating...");
    return a + b;
};

const memoizedAdd = memoize(slowAdd);

console.log(memoizedAdd(2, 3)); // Logs "Calculating..." then 5
console.log(memoizedAdd(2, 3)); // Logs 5 (from cache)
