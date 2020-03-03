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
  root: null,
};

/**
 * LOAD DATA
 * */
d3.csv("../../data/netflix_titles_with_genre.csv", d3.autotype).then(data => {
  state.data = data;
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
function draw() {
  // groups the data by genre, type and rating
  const rolledUp = d3.rollups(
    state.data,
    v => v.length, // reduce function
    d => d.genre,
    d => d.type,
    d => d.rating,
    d => d.title
  );

  // reference: https://observablehq.com/@mbostock/2019-h-1b-employers
  const root = d3
    .hierarchy([null, rolledUp], ([parent, children]) => children) // children accessor
    .count() // sets the 'value' of each level
    .sort((a, b) => b.value - a.value);

  // make pack generator
  const pack = d3
    .pack()
    .size([width, height])
    .padding(1)(root);

  // make hierarchy
  svg
    .append("g")
    .attr("fill", "#ccc")
    .selectAll("circle")
    .data(root.leaves())
    .join("circle")
    .attr("transform", d => `translate(${d.x},${d.y})`)
    .attr("r", d => d.r)
    .append("title")
    .text(
      d =>
        `${d
          .ancestors()
          .map(d => d.data[0])
          .reverse()
          .join("/")}\n${d.value}`
    );
}
