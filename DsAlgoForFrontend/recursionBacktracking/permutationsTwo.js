/**
 * @param {number[]} nums
 * @return {number[][]}
 */

function fn(index, nums, arr) {
    if (index >= nums.length) {
        arr.push([...nums]);
        return;
    }

    const used = new Set();

    for (let i = index; i < nums.length; i++) {
        if (used.has(nums[i])) continue; // skip duplicates at this level
        used.add(nums[i]);

        [nums[i], nums[index]] = [nums[index], nums[i]]; // swap
        fn(index + 1, nums, arr);
        [nums[i], nums[index]] = [nums[index], nums[i]]; // backtrack
    }
}

var permuteUnique = function (nums) {
    const arr = [];
    nums.sort((a, b) => a - b); // sort to handle duplicates
    fn(0, nums, arr);
    return arr;
};

