/*

JavaScript does the following under the hood:

Creates a new empty object: {}

Sets the prototype of that object to Person.prototype

Calls Person with this bound to that object

If the constructor returns an object, that is returned; otherwise, the newly created object is returned.


*/

function person() {
    this.name = "Pratik";
}

function myNew(constructorFn, ...args) {
    // Step 1: create a new empty object
    const newObj = {};

    // Step 2: link it to the constructor's prototype
    Object.setPrototypeOf(newObj, constructorFn.prototype);

    // Step 3: call the constructor with 'this' bound to the new object
    const result = constructorFn.apply(newObj, args);

    // Step 4: return the object returned by constructor if it’s an object; otherwise, return newObj
    return result instanceof Object ? result : newObj;
}

const p = new person();
const newPerson = myNew(person, 1, 2, 3);

console.log(newPerson); // person { name: "Pratik" }
console.log(newPerson instanceof person); // true
