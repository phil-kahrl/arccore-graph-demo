const arccore = require("@encapsule/arccore");

// create a digraph object
let digraph = arccore.graph.directed.create().result;

/**
    Example 1.  Depth first traversal to obtain topological sort.
**/

// add some vertices
digraph.addVertex("a");
digraph.addVertex("b");
digraph.addVertex("c");
digraph.addVertex("d");

/**

connect with edges so we have a directed graph that looks like:

     a
    / \
    b  c
        \
         d
**/

digraph.addEdge({e: {u: "a", v: "b"}});
digraph.addEdge({e: {u: "a", v: "c"}});
digraph.addEdge({e: {u: "c", v: "d"}});

/**
    Do a depth-first traversal on the graph, and create a list
    of the vertices in topographical order
**/

// an array to store the ordered vertex list

const inOrder = [];

// a callback function that will be called on the dft as each vertex is visited.
const discoverVertex = ({u, g}) => {
    inOrder.push(u);
    return true;
}

let dftResponse = arccore.graph.directed.depthFirstTraverse({
    digraph,
    visitor: {discoverVertex}
});

console.log(inOrder);
//[ 'a', 'b', 'c', 'd' ]

/**
    Example 2. Find a cycle in a graph.
**/

digraph = arccore.graph.directed.create().result;

digraph.addVertex("a");
digraph.addVertex("b");
digraph.addVertex("c");
digraph.addVertex("d");

/**
    Add some edges so the directed graph looks like:

      a
      | 
      b
     / \
     c |
     | |
     d/

     There will be a cycle caused by the edge from d -> b
**/

digraph.addEdge({e: {u: "a", v: "b"}});
digraph.addEdge({e: {u: "b", v: "c"}});
digraph.addEdge({e: {u: "c", v: "d"}});
digraph.addEdge({e: {u: "d", v: "b"}});

// To find a cycle we need to use the backEdge call back when doing the traversal.

const backEdge = ({e, g}) => {
    console.log("Back edge found: " + JSON.stringify(e));
}

// run the traversal
dftResponse = arccore.graph.directed.depthFirstTraverse({
    digraph,
    visitor: {backEdge}
});
// output: Back edge found: {"u":"d","v":"b"}


