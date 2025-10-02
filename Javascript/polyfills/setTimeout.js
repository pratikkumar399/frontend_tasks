// polyfill for setTimeout

/*
    general syntax

    - setTimeout((...args)=> {
        
        }, delay)

    - setTimeout(callbackFn, delay, ...args)
*/


// there will be an id

// Polyfill for setTimeout / clearTimeout

window.timeoutTimerId = 1;
window.timers = {};

window.setTimeout = function (callbackFn, delay, ...args) {
  const id = window.timeoutTimerId++;
  const executeAt = Date.now() + delay;

  window.timers[id] = { callbackFn, executeAt, args };

  return id;
};

window.clearTimeout = function (id) {
  delete window.timers[id];
};

function processTimers() {
  const now = Date.now();

  Object.keys(window.timers).forEach((key) => {
    const { callbackFn, executeAt, args } = window.timers[key];
    if (now >= executeAt) {
      callbackFn(...args);
      delete window.timers[key];
    }
  });

  // keep the loop running
  Promise.resolve().then(processTimers); 
}

// start processing timers
processTimers();

const id = setTimeout((msg) => {
  console.log("Executed after 2s:", msg);
}, 2000, "Hello!");

setTimeout(() => {
  clearTimeout(id); // try clearing before it executes
  console.log("Cancelled if not already executed");
}, 1000);
