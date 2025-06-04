function throttle(fn, delay, option = { leading: true, trailing: true }) {
    const { leading, trailing } = option;
    let lastTimerId = null;
    let lastArgs = null;
    let lastContext = null;

    return function (...args) {
        lastArgs = args;
        lastContext = this;

        const invokeTrailing = () => {
            if (trailing && lastArgs) {
                fn.apply(lastContext, lastArgs);
                lastArgs = null;
            }
            lastTimerId = null; // clear timer to allow new calls
        };

        // Leading case: if no timer and leading is true, invoke immediately
        if (!lastTimerId && leading) {
            fn.apply(lastContext, lastArgs);
            lastArgs = null; // already used
        }

        // Set the timer if not already set
        if (!lastTimerId) {
            lastTimerId = setTimeout(invokeTrailing, delay);
        }
    };
}
