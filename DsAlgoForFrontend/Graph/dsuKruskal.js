// DSU class
class DSU {
  constructor(n) {
    this.parent = Array(n).fill(0).map((_, i) => i);
    this.rank = Array(n).fill(0);
  }

  // find operation (path compression)
  find(node) {
    if (this.parent[node] === node) return node;
    return this.parent[node] = this.find(this.parent[node]);
  }

  // union by rank
  union(a, b) {
    const parentA = this.find(a);
    const parentB = this.find(b);

    if (parentA === parentB) return;

    if (this.rank[parentA] < this.rank[parentB]) {
      this.parent[parentA] = parentB;
    } else if (this.rank[parentA] > this.rank[parentB]) {
      this.parent[parentB] = parentA;
    } else {
      this.parent[parentB] = parentA;
      this.rank[parentA]++;
    }
  }
}

// --------------------------------
// cycle detection using DSU
// steps:
//  -> check if two nodes belong to same set (parent)
//  -> if not, make a union
//  -> if yes, then they form a cycle
// --------------------------------
function hasCycle(n, edges) {
  const dsu = new DSU(n);

  for (let [u, v] of edges) {
    const parentU = dsu.find(u);
    const parentV = dsu.find(v);

    if (parentU === parentV) return true; // cycle detected

    dsu.union(u, v);
  }

  return false; // no cycle
}

// --------------------------------
// Kruskal's Algorithm
// steps:
//  -> sort edges by edge weight
//  -> pick the smallest edges and stitch them together
// --------------------------------
function kruskal(n, edges) {
  edges.sort((a, b) => a.wt - b.wt); // sort by weight
  const dsu = new DSU(n);
  let mstWeight = 0;

  for (let edge of edges) {
    const parentU = dsu.find(edge.u);
    const parentV = dsu.find(edge.v);

    // why are we ignoring cycles?
    // because adding an edge between nodes in the same set would form a cycle
    if (parentU !== parentV) {
      mstWeight += edge.wt;
      dsu.union(edge.u, edge.v);
      console.log(`Edge added: ${edge.u} - ${edge.v}`);
    }
  }

  return mstWeight;
}

// -----------------------------
// Example Usage
// -----------------------------

// 1️⃣ Cycle Detection Example
const edges1 = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0]  // this will form a cycle
];

console.log("Cycle present?", hasCycle(4, edges1) ? "Yes" : "No");

// 2️⃣ Kruskal Example
const edges2 = [
  { u: 0, v: 1, wt: 10 },
  { u: 0, v: 2, wt: 6 },
  { u: 0, v: 3, wt: 5 },
  { u: 1, v: 3, wt: 15 },
  { u: 2, v: 3, wt: 4 }
];

console.log("MST Weight:", kruskal(4, edges2));
