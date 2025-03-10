class GraphAdjList {
    constructor() {
        this.adjList = new Map();
    }

    addVertex(vertex) {
        if (!this.adjList.has(vertex)) {
            this.adjList.set(vertex, []);
        }
    }

    addEdge(vertex1, vertex2, isDirected = false) {
        this.adjList.get(vertex1).push(vertex2);
        if (!isDirected) {
            this.adjList.get(vertex2).push(vertex1);
        }
    }

    display() {
        for (let [vertex, edges] of this.adjList) {
            console.log(vertex, "->", edges.join(", "));
        }
    }
}

// Usage Example
const graphList = new GraphAdjList();
graphList.addVertex("A");
graphList.addVertex("B");
graphList.addVertex("C");

graphList.addEdge("A", "B");
graphList.addEdge("A", "C");
graphList.addEdge("B", "C");

graphList.display();
