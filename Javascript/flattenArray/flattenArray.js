function flat(arr, depth = 1) {
    let ans = [];

    for (let i = 0; i < arr.length; i++) {
        if (i in arr) {
            if (Array.isArray(arr[i]) && depth > 0) {
                ans.push(...flat(arr[i], depth - 1));
            } else {
                ans.push(arr[i]);
            }
        }
    }
    return ans;
}

function flatten(val) {
  let valArr = [];

    Array.isArray(val) && val.forEach(value => {
        if(Array.isArray(value)){
            valArr.push(...flatten(value));
        }
        else{
            valArr.push(value);
        }
    })
  return valArr;
}


function flat1(arr, depth = 1) {
    let ans = [];
    arr.forEach(item => {
        if (Array.isArray(item) && depth > 0) {
            ans.push(...flat1(item, depth - 1)); // since we are getting an array in return, spread it and push
        } else {
            ans.push(item);
        }
    });
    return ans;
}


function withoutDepthFlat(arr){
    let ans = [];
    arr.forEach((item) => {
        if(Array.isArray(item)){
            ans.push(withoutDepthFlat(...item));
        }
        else{
            ans.push(item);
        }
    })
}

// easy method
const sampleData = [1, 2, 3, [4, 5, [6, 7]]];
const flatten = sampleData.flat();