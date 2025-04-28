/**
 * @param {number[][]} graph
 * @return {number[]}
 */

function dfs(node, graph, visited, check) {
    visited[node] = 1;
    check[node] = 1;  // mark as currently in path

    for (let neighbor of graph[node]) {
        if (!visited[neighbor]) {
            if (dfs(neighbor, graph, visited, check)) {
                return true;
            }
        } else if (check[neighbor]) {
            return true; // found a cycle
        }
    }

    check[node] = 0; // mark as safe (not in path anymore)
    return false;
}

var eventualSafeNodes = function (graph) {
    const n = graph.length;
    const visited = new Array(n).fill(0);
    const check = new Array(n).fill(0);
    const safeNodes = [];

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, graph, visited, check);
        }
    }

    for (let i = 0; i < n; i++) {
        if (!check[i]) { // not part of a cycle
            safeNodes.push(i);
        }
    }

    return safeNodes;
};
