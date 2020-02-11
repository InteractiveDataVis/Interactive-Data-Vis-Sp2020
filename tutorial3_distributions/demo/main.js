// CONSTANTS
const constants = {
  width: window.innerWidth * 0.7,
  height: window.innerHeight * 0.7,
  margin: { top: 20, bottom: 40, left: 40, right: 40 },
  radius: 3,
}

// APPLICATION STATE
let state = {
  data: [],
  selectedParty: "D"
}

// GLOBALS
// these variables allow us to access anything we manipulate in init() but need access to in draw(). All these variables are empty before we assign something to it.
let svg;
let xScale;
let yScale;

// DATA LOAD
d3.json("../../data/environmentRatings.json", d3.autoType).then(raw_data => {
  console.log("raw_data", raw_data);
  state.data = raw_data;
  init();
});

// INIT FUNCTION
function init() {
  // this will be run *once* when the data finishes loading in
  
  /** SCALES */
  xScale = d3
    .scaleLinear()
    .domain(d3.extent(state.data, d => d.ideology_rating))
    .range([constants.margin.left, constants.width - constants.margin.right]);

  yScale = d3
    .scaleLinear()
    .domain(d3.extent(state.data, d => d.environmental_rating))
    .range([constants.height - constants.margin.bottom, constants.margin.top]);

  /** AXES */
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // add dropdown (HTML selection) for interaction
  // HTML select reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  const selectElement = d3.select("#dropdown").on("change", function() {
    console.log("new selected party is", this.value);
    // `this` === the selectElement
    // this.value holds the dropdown value a user just selected
    state.selectedParty = this.value;
    draw(); // re-draw the graph based on this new selection
  });

  // add in dropdown values from the unique options in the data
  selectElement
    .selectAll("option")
    .data(["D", "R", "Both"])
    .join("option")
    .attr("value", d => d)
    .text(d => d);

  // create an svg element in our main `d3-container` element
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", constants.width)
    .attr("height", constants.height);

  // add the xAxis
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${constants.height - constants.margin.bottom})`)
    .call(xAxis);

  // add the xAxis
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${constants.margin.left},0)`)
    .call(yAxis);

  draw();
}

// DRAW FUNCTION
function draw() {
  // we call this everytime there is an update to the data/state

  // filter the data for the selectedParty
  let filteredData = state.data;
  // if there is a selectedParty, filter the data before drawing it
  if (state.selectedParty) {
    filteredData = state.data.filter(d => 
      state.selectedParty === "Both" 
    || d.party === state.selectedParty);
    console.log("new filtered data includes", filteredData.length, "politicians");
  }

  const dot = svg
    .selectAll(".dot")
    .data(filteredData, d => d.name)
    .join(
      enter => enter.append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.ideology_rating))
        .attr("cy", d => yScale(d.environmental_rating))
        .attr("r", constants.radius)
        .attr("stroke", "lightgrey")
        .attr("fill", "green"),
      update => update
        .attr("fill", "blue")
        .call(update => update.transition()
          .transition()
          .duration(500)
          .attr("fill", "blue")),
      exit => exit
        .attr("fill", "red")
        .call(exit => exit.transition()
          .duration(100)
          .delay(d => 500 * d.ideology_rating)
          .remove())
    )
}
