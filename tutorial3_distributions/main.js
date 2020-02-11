// CONSTANTS
const constants = {
  width: window.innerWidth * 0.7,
  height: window.innerHeight * 0.7,
  margin: { top: 20, bottom: 40, left: 40, right: 40 },
  radius: 3,
};

// APPLICATION STATE
let state = {
  data: [],
  // + ADD STATE VARIABLE
};

// GLOBALS
/**these variables allow us to access anything we manipulate in
 * init() but need access to in draw().
 * All these variables are empty before we assign something to it.*/
let svg;
let xScale;
let yScale;

// DATA LOAD
d3.json(YOUR_DATA_PATH, d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("raw_data", raw_data);
  state.data = raw_data;
  init();
});

// INIT FUNCTION
function init() {
  // this will be run *once* when the data finishes loading in

  /** SCALES */
  // + xScale =
  // + yScale =

  /** AXES */
  // + const xAxis =
  // + const yAxis =

  // add dropdown (HTML selection) for interaction
  // HTML select reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  const selectElement = d3.select("#dropdown").on("change", function() {
    // `this` === the selectElement
    // 'this.value' holds the dropdown value a user just selected
    console.log("new value is", this.value);

    // + SET STATE VARIABLE HERE
    draw(); // re-draw the graph based on this new selection
  });

  // + ADD DROPDOWN OPTIONS

  // + CREATE SVG ELEMENT

  // + CALL AXES

  draw();
}

// DRAW FUNCTION
function draw() {
  // we call this everytime there is an update to the data/state

  // + FILTER DATA BASED ON STATE

  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.name)
    .join(
      enter => enter, // + CONFIGURE ENTER SELECTION
      update => update, // + UPDATE SELECTION
      exit => exit // + EXIT SELECTION
    );
}
