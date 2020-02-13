/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 5;

/** these variables allow us to access anything we manipulate in
 * init() but need access to in draw().
 * All these variables are empty before we assign something to them.*/
let svg;
let xScale;
let yScale;

/**
 * APPLICATION STATE
 * */
let state = {
  data: [],
  // + ADD STATE VARIABLE FOR INTERACTION
};

/**
 * LOAD DATA
 * */
d3.json(YOUR_DATA_PATH, d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("raw_data", raw_data);
  state.data = raw_data;
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {
  // SCALES
  // + xScale =
  // + yScale =

  // AXES
  // + const xAxis =
  // + const yAxis =

  // UI ELEMENT SETUP
  // add dropdown (HTML selection) for interaction
  // HTML select reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  const selectElement = d3.select("#dropdown").on("change", function() {
    // `this` === the selectElement
    // 'this.value' holds the dropdown value a user just selected

    // + SET STATE VARIABLE WITH SELECTED VALUE
    console.log("new value is", this.value);
    draw(); // re-draw the graph based on this new selection
  });

  // + ADD DROPDOWN OPTIONS

  // + CREATE SVG ELEMENT

  // + CALL AXES

  draw();
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {
  // + FILTER DATA BASED ON STATE

  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.name)
    .join(
      enter => enter, // + HANDLE ENTER SELECTION
      update => update, // + HANDLE UPDATE SELECTION
      exit => exit // + HANDLE EXIT SELECTION
    );
}
