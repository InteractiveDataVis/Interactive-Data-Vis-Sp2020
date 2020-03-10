// import our components
import { Table } from "./Table.js";
import { Graph } from "./Graph.js";

// initialize components so that we can use them in the future
const table = new Table();
const graph = new Graph();

// global state
let state = {
  data: [],
};

// state updating function that we pass to our components so that they are able to update our global state object
function setState(nextState) {
  const prevState = state;
  state = Object.assign({}, state, nextState);
  console.log("new state:", state);
  update(prevState);
}

init();

function init() {
  table.init(state, setState);
  graph.init(state, setState);
  update();
}

function update(prevState) {
  table.update(state);
  graph.update(state);
}
