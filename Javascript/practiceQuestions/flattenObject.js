
function flattenObj(obj, parent){
    const finalObj = {};

    const generateFlatObjects = (obj , parent) => {
        for(let key in obj){
            const newParent = parent+key;
            const value = obj[key];

            if(typeof value == "object"){
                generateFlatObjects(value,newParent+".");
            }
            else{
                finalObj[newParent]=value;
            }
        }
    }

    generateFlatObjects(obj,parent);
    return finalObj;
}




const obj = {
    A: "12",
    B: 13,
    C : {
        P : "ok",
        D : {
            E : [1,2]
        }
    }
}

console.log(flattenObj(obj,""));