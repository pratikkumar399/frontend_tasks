var sortColors = function (nums) {
    let a = 0;
    let b = 0;
    let c = nums.length - 1;

    while (b <= c) {
        if (nums[b] === 0) {
            [nums[a], nums[b]] = [nums[b], nums[a]];
            a++;
            b++;
        } else if (nums[b] === 1) {
            b++;
        } else {
            [nums[b], nums[c]] = [nums[c], nums[b]];
            c--;
        }
    }
};
