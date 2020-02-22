/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 }

/** these variables allow us to access anything we manipulate in
 * init() but need access to in draw().
 * All these variables are empty before we assign something to them.*/
let svg;

/**
 * APPLICATION STATE
 * */
let state = {
  topojson: null,
};

/**
 * LOAD DATA
 * */
d3.json("../../data/us-state.json").then(raw_data => {
  console.log("raw_data", raw_data);
  state.geojson = raw_data;
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {

  const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson)
  const path = d3.geoPath()
    .projection(projection)
    .pointRadius(2);

  // create an svg element in our main `d3-container` element
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg.selectAll(".state")
      .data(state.geojson.features)
    .enter().append("path")
      .attr("d", path)
      .attr("class", "state")
      .attr("fill", "none")

  draw(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {

}