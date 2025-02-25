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


function flat1(arr, depth = 1) {
    let ans = [];
    arr.forEach(item => {
        if (Array.isArray(item) && depth > 0) {
            ans.push(...flat(item, depth - 1));
        } else {
            ans.push(item);
        }
    });
    return ans;
}