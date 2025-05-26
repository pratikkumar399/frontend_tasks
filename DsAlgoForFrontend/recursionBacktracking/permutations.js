/**
 * @param {number[]} nums
 * @return {number[][]}
 */

function fn(index, nums, arr) {
    if (index >= nums.length) {
        arr.push([...nums]);
        return;
    }

    for (let i = index; i < nums.length; i++) {
        [nums[i], nums[index]] = [nums[index], nums[i]]; // swap
        fn(index + 1, nums, arr);
        [nums[i], nums[index]] = [nums[index], nums[i]]; // backtrack
    }
}

var permute = function (nums) {
    let arr = [];
    fn(0, nums, arr);
    return arr;
};
