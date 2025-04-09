/**
 * @param {number[][]} isConnected
 * @return {number}
 */

function dfs(visited, index, isConnected) {
    visited[index] = 1;

    for (let i = 0; i < isConnected.length; i++) {
        if (!visited[i] && isConnected[index][i] === 1) {
            dfs(visited, i, isConnected);
        }
    }
}

var findCircleNum = function (isConnected) {
    let visited = new Array(isConnected.length).fill(0);
    let count = 0;

    for (let i = 0; i < isConnected.length; i++) {
        if (!visited[i]) {
            count++;
            dfs(visited, i, isConnected);
        }
    }

    return count;
};
