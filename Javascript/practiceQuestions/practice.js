// practice thread 

// polyfills
// 1.map , takes in 2 arguments, callbackFn, and the thisArg (can be undefined, if we do not pass anything)
// the callbackFn receives 3 arguments along with the context (item, index, array)

Array.prototype.myMap = function(callbackFn, thisArg){
    const arr = this ?? [];
    const length = arr.length;

    let res = [];
    // console.log(thisArg);

    for(let i = 0 ; i < length; i++){
        if(i in arr){
            res[i] = callbackFn.call(thisArg,arr[i], i , arr);
        }
    }

    return res;
} 

const res = [1,2,3,4];

const arr =  res.myMap((item , index) => {
   return item*index;
})

console.log(arr);

// 2. filter

Array.prototype.myFilter = function(callbackFn, thisArg){

    const res = [];

    for(let i = 0; i < this.length ; i++){
        if(i in this){ 
            if(callbackFn.call(thisArg,this[i], i, this)){
                res.push(this[i])
            }
        }
    }

    return res;

}


const arr2 =  res.myFilter((item , index) => {
   return item%2;
})

console.log(arr2);

// reduce

Array.prototype.myReduce = function(callbackFn, initialValue){
    const arr = this;

    const index = arguments.length > 1 ? 0 : 1;
    let accumulator = arguments.length > 1 ? initialValue : arr[0];

    for(let i = index; i < arr.length; i++){
        if(i in arr){
            accumulator = callbackFn.call(accumulator, arr[i], i, arr);
        } 
    }

    return accumulator;
}   

console.log(res.myReduce((acc , curr) => acc + arr), 0);