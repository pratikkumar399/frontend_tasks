function throttleLeadingTrailing(func, delay) {
    let timerId = null;
    let lastArgs = null;
    let lastContext = null;
    let called = false;

    return function () {
        const context = this;
        const args = arguments;

        if (!called) {
            func.apply(context, args); // Leading call
            called = true;

            timerId = setTimeout(function () {
                if (lastArgs) {
                    func.apply(lastContext, lastArgs); // Trailing call
                    lastArgs = null;
                    lastContext = null;
                }
                called = false;
                timerId = null;
            }, delay);
        } else {
            // Store last call for trailing execution
            lastArgs = args;
            lastContext = context;
        }
    };
}


function logMessage(msg) {
    console.log("Logged:", msg);
}

const throttledLog = throttleLeadingTrailing(logMessage, 2000);

throttledLog("A"); // Immediately logs "A"
throttledLog("B");
throttledLog("C"); // After 2 seconds, logs "C"
