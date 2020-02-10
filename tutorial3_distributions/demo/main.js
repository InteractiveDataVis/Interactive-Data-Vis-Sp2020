// CONSTANTS
const width = window.innerWidth * 0.8;
const height = window.innerHeight * 0.8;
const margin = { top: 20, bottom: 40, left: 40, right: 40 };
const radius = 3;

// APPLICATION STATE
let data = [];
let selectedState;

// GLOBALS
// initialize a variable `svg` -- this is empty before we assign something to it
let svg;
let xScale;
let yScale;

// load in data
d3.json("../../data/environmentRatings.json", d3.autoType).then(raw_data => {
  console.log("raw_data", raw_data);
  data = raw_data;
  init();
});

function init() {
  // this will be run *once* when the data finishes loading in
  /** SCALES */
  xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.ideology_rating))
    .range([margin.left, width - margin.right]);

  yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.environmental_rating))
    .range([height - margin.bottom, margin.top]);

  /** AXES */
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  /**
   * `Set` reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
   * pull out all the state values from the data create a `Set` out of them
   * This is useful for creating a list of just *unique* values.
   * The `[...Set]` syntax 'unpacks' the set into an array so that we can use it in our `data()` method.
   * To see what this does, try the following in your browser console:
   *    new Set([1, 2, 1, 4, 5, 6, 4, 6, 10])
   * and:
   *    [...new Set([1, 2, 1, 4, 5, 6, 4, 6, 10])]
   */
  const uniqueStates = [...new Set(data.map(d => d.state))];
  // add dropdown for interaction
  // select reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  const selectElement = d3.select("#dropdown").on("change", function() {
    console.log("new selected state is", this.value);
    // `this` === the selectElement
    // this.value holds the dropdown value a user just selected
    selectedState = this.value;
    draw(); // re-draw the graph based on this new selection
  });

  // add in dropdown values from the unique options in the data
  selectElement
    .selectAll("option")
    .data(uniqueStates)
    .join("option")
    .attr("value", d => d)
    .text(d => d);

  // create an svg element in our main `d3-container` element
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // add the xAxis
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  // add the xAxis
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);

  draw();
}

function draw() {
  // we call this everytime there is an update to the data/state

  // filter the data for the selectedState
  let filteredData = data;
  // if there is a selectedState, filter the data before drawing it
  if (selectedState) {
    filteredData = data.filter(d => d.state === selectedState);
  }

  /** create a `g`, or group element
   * This `g` will contain within it the `circle` and `text` elements
   * We do it this way so that we don't have to position the `circle` and `text` separtely
   * (since we want to keep the label tied to the circle it is annotating)
   */
  //
  const dotgroup = svg
    .selectAll(".dot")
    .data(filteredData) // map our data to all the `.dot` elements
    .join("g")
    .attr("class", "dot")
    .attr(
      // move the group to be in the right position
      "transform",
      d =>
        // translate(x-position, y-position)
        `translate(${xScale(d.ideology_rating)},
        ${yScale(d.environmental_rating)})`
    );

  // add the circles into each group
  dotgroup.append("circle").attr("r", radius);

  // add text into each group
  dotgroup
    .append("text")
    .attr("class", "hover-label")
    .attr("dy", -radius) // offset the text a bit so it doesn't overlab with circle
    .text(d => d.name);
}
