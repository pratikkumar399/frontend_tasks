
// simple currying

function add(a, b) {
    return a + b;
}

function add2(a) {
    return function (b) {
        return a + b;
    }
}
add(3, 4);


// variant 1 -> we receive function as argument
function curry(func) {
    return function curried(...args) {
        // if criteria fulfilled then, call the function
        if (args.length >= func.length) {
            return func.apply(this, args);
        }
        // if more arguments are needed, return a function that takes more arguments
        return (...args2) => curried.apply(this, [...args, ...args2]);
    };
}


function add(a, b) {
    return a + b;
}

const curriedAdd = curry(add);
curriedAdd(3)(4); // 7

const alreadyAddedThree = curriedAdd(3);
alreadyAddedThree(4); // 7


// variant 2 -> 

function curried(a) {
    return function (b) {
        if (b === undefined) {
            return a;
        }
        else {
            return curried(a + b);
        }
    }
}

const res = curried(1)(2)(3)(4)();


// 3rd variant
const curriedThree = (...args) => {
    return (...args2) => {
        if (args2.length === 0) {
            return args.reduce((sum, val) => sum + val, 0);
        }
        else {
            return curriedThree(args.reduce((sum, val) => sum + val, 0) + args2.reduce((sum, val) => sum + val, 0));
        }

    }   

}

console.log(curriedThree(1,3)(2)(3)(4)(5)() + 1);


// 4th variant

const currying = (sum = 0) => {
  const inner = (...args) =>
    args.length === 0
      ? sum
      : currying(sum + args.reduce((a, b) => a + b, 0));

  // handling type coercion
  inner.valueOf = () => sum;
  inner.toString = () => String(sum);

  return inner;
};


console.log(currying(1, 3)(3)(4, 5)());   // 16
console.log(currying(1, 3)(3)(4, 5) + 1); // 17
console.log(currying(10)(20, 30)(40) + 0); // 100
