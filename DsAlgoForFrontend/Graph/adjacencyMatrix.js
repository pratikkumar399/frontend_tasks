class GraphAdjMatrix {
    constructor(size) {
        this.size = size;
        this.matrix = Array.from({ length: size }, () => Array(size).fill(0));
    }

    addEdge(v1, v2, isDirected = false) {
        this.matrix[v1][v2] = 1;
        if (!isDirected) {
            this.matrix[v2][v1] = 1;
        }
    }

    display() {
        console.log(this.matrix.map(row => row.join(" ")).join("\n"));
    }
}

// Usage Example
const graphMatrix = new GraphAdjMatrix(3);
graphMatrix.addEdge(0, 1);
graphMatrix.addEdge(0, 2);
graphMatrix.addEdge(1, 2);

graphMatrix.display();
