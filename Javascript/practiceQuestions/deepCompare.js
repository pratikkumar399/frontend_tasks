// compare objects and arrays

function deepCompare(obj1 , obj2){
    if(obj1 === obj2) return true;

    if(obj1 === null || obj2 === null)
    {
        return false; 
    }

     if(typeof obj1 !== "object" || typeof obj2 !== "object")
    {
        return false; 
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);


    if(keys1.length !== keys2.length){
        return false;
    }

    if(Array.isArray(obj1) !== Array.isArray(obj2)){
        return false;
    }

    return keys1.every(key =>
       deepCompare(obj1[key], obj2[key])
    );

}

const obj1 = { user: { name: "Pratik" } };
const obj2 = { user: { name: "Pratik", age: 23 } };

console.log(deepCompare(obj1, obj2));