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


