
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
            curried(a + b);
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