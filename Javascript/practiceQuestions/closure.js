/*

- when inner function access variable from its parent function.then it creates a closure, 
  but it should not be global scope
- not every function creates a closure
- it's not necessary that you access a variable defined in outside scope, 
  and say inner function is creating a closure
- closures are made during compilation phase 

advantages of closure
- to create private variables
- encapsulation/data-hiding

*/


function sayHello(){
    let say = "Hi";

    function getSalutation(){
        return say;
    }

    return {
        getSalutation,
    }
}

const {getSalutation} = sayHello(); // hiding data

getSalutation();