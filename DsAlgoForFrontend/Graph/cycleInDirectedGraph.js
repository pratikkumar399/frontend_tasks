// In a directed graph, a cycle exists 
// if we can revisit a node that's already in the current DFS path.

function hasCycle(graph) {
    const n = graph.length;
    const visited = new Array(n).fill(0); 

    function dfs(node) {
        visited[node] = 1; // mark as visiting

        for (const neighbor of graph[node]) {
            if (visited[neighbor] === 0) {
                if (dfs(neighbor)) return true; // cycle found
            } else if (visited[neighbor] === 1) {
                return true; // cycle found via back edge
            }
        }

        visited[node] = 2; // mark as fully processed
        return false;
    }

    for (let i = 0; i < n; i++) {
        if (visited[i] === 0) {
            if (dfs(i)) return true;
        }
    }

    return false;
}

const graph = {
    A: ["B", "C"],
    B: ["A", "D", "E"],
    C: ["A", "F"],
    D: ["B"],
    E: ["B"],
    F: ["C"]
};

console.log(hasCycle(graph));
