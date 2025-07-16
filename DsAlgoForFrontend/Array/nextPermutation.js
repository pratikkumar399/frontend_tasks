var nextPermutation = function(nums) {
    let firstIndex = -1;

    // Step 1: Find the first decreasing element from the end
    for (let i = nums.length - 1; i > 0; i--) {
        if (nums[i - 1] < nums[i]) {
            firstIndex = i - 1;
            break;
        }
    }

    if (firstIndex !== -1) {
        // Step 2: Find the element just larger than nums[firstIndex]
        for (let i = nums.length - 1; i > firstIndex; i--) {
            if (nums[i] > nums[firstIndex]) {
                // Swap
                [nums[i], nums[firstIndex]] = [nums[firstIndex], nums[i]];
                break;
            }
        }
    }

    // Step 3: Reverse the suffix starting from firstIndex + 1
    let left = firstIndex + 1;
    let right = nums.length - 1;

    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
};


// arr = [1,2,3]
// 2 3 1 -> 1 2 3
// 3 2 1 -> 3 2 1