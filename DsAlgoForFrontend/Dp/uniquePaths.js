/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

function fn(dp, i, j, m, n) {
    if (i === m - 1 && j === n - 1) return 1;
    if (i >= m || j >= n) return 0;

    if (dp[i][j] !== -1) return dp[i][j];

    let bottom = fn(dp, i + 1, j, m, n);
    let right = fn(dp, i, j + 1, m, n);

    return dp[i][j] = bottom + right;
}

var uniquePaths = function (m, n) {
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(-1));
    return fn(dp, 0, 0, m, n);
};

console.log(uniquePaths(3, 7));