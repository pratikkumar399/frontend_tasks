// simple throttling

function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
}

const handleScroll = () => {
    console.log('Scroll event triggered');
};

window.addEventListener('scroll', throttle(handleScroll, 1000));




// more robust with leading and trailing edge calls

function throttle(func, delay, options = {}) {
    let lastCall = 0;         // Last time the function was invoked
    let timeoutId = null;      // Timeout ID for trailing edge
    let lastArgs;              // Stores the last arguments
    let lastContext;           // Stores the last context (this)
    const { leading = true, trailing = true } = options; // Leading and trailing config

    // Function to execute the throttled function
    const invokeFunction = (time) => {
        lastCall = time;
        func.apply(lastContext, lastArgs);
        lastArgs = lastContext = null;
    };

    // Throttled function to return
    const throttled = function (...args) {
        const now = new Date().getTime();
        lastContext = this;
        lastArgs = args;

        const remainingTime = delay - (now - lastCall); // Time left before next allowed call

        if (remainingTime <= 0 || remainingTime > delay) {
            // If leading is true, execute immediately on the first call
            if (leading) {
                if (timeoutId) {
                    clearTimeout(timeoutId); // Clear any pending trailing call
                    timeoutId = null;
                }
                invokeFunction(now);
            }
        } else if (trailing && !timeoutId) {
            // Setup trailing call
            timeoutId = setTimeout(() => {
                timeoutId = null;
                invokeFunction(new Date().getTime());
            }, remainingTime);
        }
    };

    // Cancel function to clear any pending throttled calls
    throttled.cancel = function () {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        lastCall = 0;
        lastArgs = lastContext = null;
    };

    return throttled;
}
