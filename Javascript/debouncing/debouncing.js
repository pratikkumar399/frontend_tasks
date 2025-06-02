/**
 * Debounce ensures that a function is only called once after a certain 
 * delay, after the last event. It resets the timer every time the 
 * function is invoked.
 * 
 * 
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
function debounce(func, wait) {
    // debounce with wait
    let timeoutId = null;   

    return function (...args) {
        clearTimeout(timeoutId); // clearTimeout in case a new action is registered

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    }

}

let i = 0;
function increment() {
    i++;
    console.log(i);
}
const debouncedIncrement = debounce(increment, 1000);

// t = 0: Call debouncedIncrement().
debouncedIncrement(); // i = 0

// t = 50: i is still 0 because 100ms have not passed.

// t = 100: increment() was invoked and i is now 1.
