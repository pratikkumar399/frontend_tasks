function curry(fn) {
  const _ = curry.placeholder;

  function curried(...args) {
    const complete = args.length >= fn.length && !args.slice(0, fn.length).includes(_);

    if (complete) {
      return fn(...args);
    }

    return function (...newArgs) {
      const mergedArgs = args.map(arg => (arg === _ && newArgs.length ? newArgs.shift() : arg));
      return curried(...mergedArgs, ...newArgs);
    };
  }

  return curried;
}


curry.placeholder = Symbol()