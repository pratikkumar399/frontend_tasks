function dfsWithStack(graph, source) {
    let stack = [source];
    let visited = new Set(); // Track visited nodes

    while (stack.length > 0) {
        let node = stack.pop();

        if (!visited.has(node)) {
            visited.add(node);

            for (let neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
}

function dfsRecursive(graph, nodes, source, visited = new Set()) {
    if (visited.has(source)) return;

    visited.add(source);  // Correct way to mark as visited
    nodes.push(source);   // Store visited node

    for (let neighbor of graph[source]) {
        if (!visited.has(neighbor)) {
            dfsRecursive(graph, nodes, neighbor, visited);
        }
    }
}

const graph = {
    A: ["B", "C"],
    B: ["A", "D", "E"],
    C: ["A", "F"],
    D: ["B"],
    E: ["B"],
    F: ["C"]
};

console.log("DFS Traversal from A:");
const nodes = [];
dfsRecursive(graph, nodes, 'A');

console.log(nodes);  // Should print the correct DFS order

