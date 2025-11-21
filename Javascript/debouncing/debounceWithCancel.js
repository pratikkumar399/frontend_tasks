function debounce(func, wait) {
    let timer = null;
    let context = undefined;
    let argsToInvoke = undefined;
  
    function clearTimer() {
      clearTimeout(timer);
      timer = null;
    }
  
    function invoke() {
      if (timer === null) {
        return;
      }
      clearTimer();
      func.apply(context, argsToInvoke);
    }
  
    function fn(...args) {
      argsToInvoke = args;
      context = this;
      clearTimer();
  
      timer = setInterval(() => {
        invoke();
      }, wait);
    }
  
    fn.cancel = clearTimer;
    fn.flush = invoke;
  
    return fn;
  }

  

let i = 0;
function increment() {
i++;
}
const debouncedIncrement = debounce(increment, 100);

// t = 0: Call debouncedIncrement().
debouncedIncrement(); // i = 0

// t = 50: Cancel the delayed increment.
debouncedIncrement.cancel();

// t = 100: increment() was not invoked and i is still 0.
