/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (arr, target) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2);
        if (arr[mid] === target) {
            return mid;
        }
        else if (arr[mid] < target) {
            start = mid + 1;
        }
        else {
            end = mid - 1;
        }
    }
    return -1;
};

console.log(binarySearch([1, 2, 3, 4, 5], 3)); // 2