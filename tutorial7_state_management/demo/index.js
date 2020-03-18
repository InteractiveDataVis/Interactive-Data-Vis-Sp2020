// import our components
import { Table } from "./Table.js";
import { Barchart } from "./Barchart.js";
import { Count } from "./Count.js";

let table, barchart, count;

// global state
let state = {
  data: [],
  selectedCountry: null,
};

// pulling live from updating github site
d3.json("https://covid19.mathdro.id/api/confirmed", d3.autoType).then(data => {
  state.data = data;
  console.log("data", data);
  init();
});

function init() {
  table = new Table(state, setGlobalState);
  barchart = new Barchart(state, setGlobalState);
  count = new Count(state, setGlobalState);
  draw();
}

function draw() {
  table.draw(state);
  barchart.draw(state);
  count.draw(state);
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}
