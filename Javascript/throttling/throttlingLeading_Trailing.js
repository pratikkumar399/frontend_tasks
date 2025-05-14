function throttle(fn, delay, option = { leading: true, trailing: true }) {
    const { leading, trailing } = option;
    let lastTimerId;
    let lastArgs;

    return function (...args) {
        const waitFn = () => {
            if (trailing && lastArgs) {
                fn.apply(this, lastArgs); // or fn(...args);
                lastArgs = null; // reset lastArgs
                lastTimerId = setTimeout(waitFn, delay); // executes the 
            } else {
                lastTimerId = null;
            }
        };

        // case : leading case
        if (!lastTimerId && leading) {
            // call immediately
            fn.apply(this, args);
        } else {
            // storing the last arguments for the trailing case
            lastArgs = args;
        }

        // case : trailing case
        if (!lastTimerId) {
            lastTimerId = setTimeout(waitFn, delay);
        }
    };
}