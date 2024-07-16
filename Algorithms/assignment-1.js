class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  isEmpty = () => this.heap.length === 0;
  compare = (a, b) => b.weight - a.weight;
  getParentIndex = (index) => Math.floor((index - 1) / 2);
  getLeftChildIndex = (index) => index * 2 + 1;
  getRightChildIndex = (index) => index * 2 + 2;

  enqueue(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }

  dequeue() {
    const result = this.heap[0];
    const lastItem = this.heap.pop();
    if (this.heap.length > 0 && lastItem !== undefined) {
      this.heap[0] = lastItem;
      this.siftDown(0);
    }
    return result;
  }

  get size() {
    return this.heap.length;
  }

  siftUp(index) {
    let parentIndex = this.getParentIndex(index);
    while (
      index > 0 &&
      this.compare(this.heap[index], this.heap[parentIndex]) > 0
    ) {
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  siftDown(index) {
    let maxIndex = index;
    const leftChildIndex = this.getLeftChildIndex(index);
    if (
      leftChildIndex < this.heap.length &&
      this.compare(this.heap[leftChildIndex], this.heap[maxIndex]) > 0
    ) {
      maxIndex = leftChildIndex;
    }
    const rightChildIndex = this.getRightChildIndex(index);
    if (
      rightChildIndex < this.heap.length &&
      this.compare(this.heap[rightChildIndex], this.heap[maxIndex]) > 0
    ) {
      maxIndex = rightChildIndex;
    }
    if (index !== maxIndex) {
      [this.heap[index], this.heap[maxIndex]] = [
        this.heap[maxIndex],
        this.heap[index],
      ];
      this.siftDown(maxIndex);
    }
  }
}

function Prim(graph) {
  const MST = {};
  const visitedNodes = new Set();
  const queue = new PriorityQueue();

  // Add first node to MST
  const startNode = Object.keys(graph)[0];
  visitedNodes.add(startNode);
  MST[startNode] = [];

  // Add edges from first node to priority queue
  graph[startNode].forEach((edge) => queue.enqueue(edge));

  // Build MST
  while (!queue.isEmpty()) {
    const edge = queue.dequeue();

    if (visitedNodes.has(edge.to)) {
      continue;
    }

    visitedNodes.add(edge.to);
    const from = Object.keys(graph).find((node) =>
      graph[node].some((e) => e === edge)
    );

    MST[from].push(edge);
    MST[edge.to] = [{ to: from, weight: edge.weight }];

    // Add edges from new node to priority queue
    for (const e of graph[edge.to]) {
      queue.enqueue(e);
    }
  }

  return MST;
}

function getConnectivity(tree, v, arr = []) {
  arr.push(v);
  tree[v].forEach((edge) => {
    if (!arr.includes(edge.to)) {
      getConnectivity(tree, edge.to, arr);
    }
  });

  return arr;
}

function removeEdgeFromGraph(graph, tree, edge) {
  // Remove edg from tree
  const removed = tree[edge.from].find((t_edge) => t_edge.to === edge.to);
  if (!removed)
    return tree;

  // Split to 2 connectivities
  const edge_to_remove = tree[edge.to].find(
    (t_edge) => t_edge.to === edge.from
  );

  tree[edge.to].splice(tree[edge.to].indexOf(edge_to_remove), 1);
  tree[edge.from].splice(tree[edge.from].indexOf(removed), 1);

  graph[edge.to].splice(graph[edge.to].indexOf(edge_to_remove), 1);
  graph[edge.from].splice(graph[edge.from].indexOf(removed), 1);

  const first_connected_component_vertexes = getConnectivity(tree, edge.from);
  const seconed_connected_component_vertexes = Object.keys(tree).filter(
    (k) => !first_connected_component_vertexes.includes(k)
  );

  const edges = first_connected_component_vertexes
    .map((v) =>
      graph[v]
        .filter((e) => seconed_connected_component_vertexes.includes(e.to))
        .map((e) => ({ ...e, from: v })))
    .flat();

  if (!edges) {
    console.log("New graph is not connected, aborting...");
    return tree;
  }

  const minEdge = edges.sort((edge) => edge.weight)[0];

  tree[minEdge.from].push({ to: minEdge.to, weight: minEdge.weight });
  tree[minEdge.to].push({ to: minEdge.from, weight: minEdge.weight });

  return tree;
}

function generateGraph(numNodes, numEdges) {
  const graph = {};

  // Create nodes
  for (let i = 0; i < numNodes; i++) {
    graph[String.fromCharCode(65 + i)] = [];
  }

  // Create edges
  let i = 0;
  while (i < numEdges) {
    const nodeKeys = Object.keys(graph);
    const fromNode = nodeKeys[Math.floor(Math.random() * nodeKeys.length)];
    const toNode = nodeKeys[Math.floor(Math.random() * nodeKeys.length)];
    if (fromNode !== toNode) {
      const weight = Math.floor(Math.random() * 10) + 1;
      const edge = { to: toNode, weight };
      if (!graph[fromNode].some(e => e.to === toNode)) {
        graph[fromNode].push(edge);
        graph[toNode].push({ to: fromNode, weight }); // Add the reverse edge for undirected graph
        i++;
      }
    }
  }

  return graph;
}

function getRandomEdge(graph) {
  const nodes = Object.keys(graph);

  const randomNode = nodes[Math.floor(Math.random() * nodes.length)];

  const edges = graph[randomNode];
  const randomEdge = edges[Math.floor(Math.random() * edges.length)];

  return {
    from: randomNode,
    to: randomEdge.to,
    weight: randomEdge.weight
  };
}

function getDestroyingEdgeAndNotOneSOmething(graph, tree) {
  let destroyingEdge = getRandomEdge(graph);
  while (JSON.stringify(tree) === JSON.stringify(removeEdgeFromGraph(graph, tree, destroyingEdge)))
    destroyingEdge = getRandomEdge(graph);

  let notDestroyingEdge = getRandomEdge(graph);
  while (JSON.stringify(tree) !== JSON.stringify(removeEdgeFromGraph(graph, tree, notDestroyingEdge)))
    notDestroyingEdge = getRandomEdge(graph);

  return { destroyingEdge, notDestroyingEdge };
}

function main() {
  const graph = JSON.stringify(generateGraph(20, 50))
  const tree = Prim(JSON.parse(graph));
  const { destroyingEdge, notDestroyingEdge } = getDestroyingEdgeAndNotOneSOmething(JSON.parse(graph), tree);

  console.log(JSON.stringify({ graph: JSON.parse(graph), tree }));

  console.log(JSON.stringify(notDestroyingEdge));
  console.log(JSON.stringify(removeEdgeFromGraph(JSON.parse(graph), tree, notDestroyingEdge), null, 2));

  console.log(JSON.stringify(destroyingEdge));
  console.log(JSON.stringify(removeEdgeFromGraph(JSON.parse(graph), tree, destroyingEdge), null, 2));
}

main();