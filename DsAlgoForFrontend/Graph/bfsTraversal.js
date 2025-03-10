const bfs = (graph, node, source) => {
    let visited = new Set();
    let queue = [source];  // Use a queue for BFS traversal

    visited.add(source);

    while (queue.length > 0) {
        const front = queue.shift();
        node.push(front); // Store the visited node

        for (let neighbor of graph[front]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);  // Correctly mark as visited
                queue.push(neighbor);
            }
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

let node = [];

bfs(graph, node, "A");
console.log(node);  // Correct BFS order
