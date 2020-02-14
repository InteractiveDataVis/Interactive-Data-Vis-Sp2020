/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 5;


let svg;
let xScale;
let yScale;

/**
 * APPLICATION STATE
 * */
let state = {
  data: [],
  party: "D",
};

/**
 * LOAD DATA
 * */
d3.json("../data/environmentRatings.json", d3.autoType).then(raw_data => {
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
  console.log("initing")

  svg = d3.select("#svg")
    .attr("width", width)
    .attr("height", height)

  const selectElement = d3.select("#dropdown").on("change", function() {
    console.log("new value is", this.value);
    state.party = this.value;
    draw(); // re-draw the graph based on this new selection
  });

  selectElement
    .selectAll("option")
    .data(["D", "R", "I", "all"])
    .join("option")
    .attr("value", d => d)
    .text(d => d)

  draw();
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {
  console.log(state)
  const filteredData = state.data.filter(d => 
    state.party === "all" || d.party === state.party
    )

  // + FILTER DATA BASED ON STATE

  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.name)
    .join(
      enter => enter.append("circle")
        .attr("r", 0)
        .attr("fill", "black")
        .attr("cx", (d, i) => i * 5)
        .attr("cy", (d,i) => i * 5)
        .call(enter => enter.transition()
          .duration(500)
          .attr("r", 2)
          .attr("fill", )
        )
    );
}