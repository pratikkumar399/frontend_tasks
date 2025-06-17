/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let mp = new Map();

    nums.forEach((item, index) => {
        let rs = target - item;
        if(mp.has(rs)){
            return [mp.get(rs), index];
        }
        mp.set(rs, index);
    })
    return [];
};