/*
    throttling basically means that you are setting a limit on the number of times
    a particular function is called in a certain interval of time
*/


// simplest throttling

const throttleSimple= (callbackFn, delay) => {
    let startId = null;
    return () => {
        if(!startId){
            callbackFn();
            startId = setTimeout(() => {
                startId = null;
            }, delay)
        }
    }
}



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


// throttle without setTimeout

const throttleWithoutTimeout = (callbackFn , delay) => {

    let lastCall = 0;

    return () => {
        let now = Date.now();
        if(now - lastCall >= delay){
            callbackFn();
            lastCall = now;
        }
    }
}

// => leading condition : invoke callback function immediately after the first event
// => trailing condition : invoke the callback after last event

const throttleWithLeadingTrailing = (callbackFn, delay, options={}) => {
    const {leading = true , trailing = true } = options;
    const thisVal = this ?? globalThis;

    let lastCall = 0;
    let timeoutId = "";

    return (...args) => {
        let now = Date.now();

        // check if it is the first invocation
        if(!leading && lastCall == 0){
            lastCall = now;
        }   

        if(now - lastCall >= delay){
            callbackFn.apply(thisVal, args);
            lastCall = now;
            // to ensure that only one condition runs
            clearTimeout(timeoutId);
            timeoutId = "";
        }else if(trailing && !timeoutId){
            timeoutId = setTimeout(() => {
                callbackFn.apply(thisVal, args);
                lastCall = leading ? now : 0;
                // make sure the timeoutId is reset
                timeoutId = ""
            }, delay)
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
