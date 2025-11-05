
function iAmCreate(source) {

    const o = {};
    Object.setPrototypeOf(o, source);

    return o;
}



const obj = {
    name: "Pratik"
}

const obj2 = Object.create(obj);

const obj3 = iAmCreate(obj);

console.log(obj3.__proto__);

