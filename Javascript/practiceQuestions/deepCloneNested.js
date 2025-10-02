// deep clone of objects


function deepClone(value, hasSeen = new WeakMap()) {

    if (value === null || typeof value !== "object") {
        return value;
    }


    if(hasSeen.has(value)){
        return hasSeen.get(value);
    }

    // handle the case for arrays

    if (Array.isArray(value)) {
        const arrCopy = [];
        hasSeen.set(value, arrCopy);

        value.forEach((item, index) => {
            arrCopy[index] = deepClone(item , hasSeen);
        })

        return arrCopy;

    }

    // for objects
    const deepResult = {};

    Object.keys(value).forEach((item) => {
        const data = value[item];
        if (typeof data === "object" && data !== null) {
            deepResult[item] = deepClone(data);
        } else {
            deepResult[item] = data;
        }
    })

    return deepResult;
}

const original = {
  name: "Pratik",
  skills: ["JS", "React"],
  meta: { age: 24, active: true },
  date: new Date(),
};

const clone = deepClone(original);

clone.skills.push("Next.js");
clone.meta.age = 30;

console.log(original); 
console.log(clone); 
