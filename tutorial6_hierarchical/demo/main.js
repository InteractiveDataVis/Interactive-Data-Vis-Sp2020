/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;

/**
 * APPLICATION STATE
 * */
let state = {
  geojson: null,
};

/**
 * LOAD DATA
 * */
d3.csv("../../data/netflix_titles.csv", d3.autotype).then(data => {
  console.log(data);

  const rolledUp = d3.rollups(
    data,
    v => v,
    d => d.listed_in.split(",")[0],
    d => d.rating
  );

  console.log(rolledUp);

  const hierarchy = d3.hierarchy([null]);
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  draw(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {}
