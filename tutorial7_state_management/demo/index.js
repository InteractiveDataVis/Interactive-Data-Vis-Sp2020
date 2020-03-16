// import our components
import { Table } from "./Table.js";
import { Graph } from "./Graph.js";

// initialize components
// (since we don't have the data or setState function yet, we only initialize the component names)
let table;
let graph;

// global state, which we update with data
let state;

// data load
Promise.all([
  d3.json("../../data/DATA"),
]).then(([ data ]) => {
  state = { data };
  // we want to pass in the setState function so we have the ability to set GLOBAL state from within each component
  table = new Table(state, setState);
  graph = new Graph(state, setState);
});

// state updating function that we pass to our components so that they are able to update our global state object
function setState(nextState) {

  // this allows us to keep all other items of state when we update it, rather than overwriting all other items that we aren't setting in that function call
  state = Object.assign({}, state, nextState);
  console.log("new state:", state);

  // pass this to all components
  table.update(state);
  graph.update(state);
}
