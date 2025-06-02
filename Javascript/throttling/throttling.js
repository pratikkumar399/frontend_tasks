// simple throttling

function throttle(functionToBePassed, delay) {
    // to keep track if the event has occurred or not yet
    let startId = null;
    // receive the params
    return function (...args) {
        // if the event hasn't occurred yet
        if (!startId) {
            // invoke the function
            functionToBePassed.apply(this, args);

            // a startId get assigned and remains until the delay has passed
            startId = setTimeout(() => {
                // as soon as the timer ends make the startId null
                startId = null;
            }, delay);
        }
    }
}


// throttling function to preserve the last event
function throttle(func, delay) {
    let startId = null;
    let lastArgs = null;

    return function (...args) {
        if (!startId) {
            func(...args);
            startId = setTimeout(() => {
                if (lastArgs) {
                    func(...lastArgs);
                    lastArgs = null; // Clear after execution
                }
                startId = null; // Reset so it can be called again
            }, delay);
        } else {
            lastArgs = args; // Store the latest args
        }
    };
}

// Example
const throttledFunc = throttle((msg) => console.log(msg), 2000);

throttledFunc("A"); // ✅ Executed immediately
throttledFunc("B"); // ❌ Ignored but stored
throttledFunc("C"); // ✅ "C" is now the latest stored

// After 2 sec: "C" is executed ✅
