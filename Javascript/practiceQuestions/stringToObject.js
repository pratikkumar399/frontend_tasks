
/* 
    output => {a :{b : {c : {d : e}}}}
*/

const inputString = "a.b.c.d.e";

const convertToObj = (input) => {
    const arr = input.split(".").reverse();

    let obj = arr[0];

    arr.forEach((item, index) => {
        if (index === 0) return; 
        obj = { [item]: obj };
    });

    return obj;
};

const result = convertToObj(inputString);
console.log(result);
