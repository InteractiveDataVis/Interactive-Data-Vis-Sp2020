/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 3;

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
  selectedCountry: "South Africa",
};

/**
 * LOAD DATA
 * */
d3.csv("../../data/populationOverTime.csv", d => ({
  year: new Date(d.Year, 0, 1),
  country: d.Entity,
  population: +d.Population
})).then(raw_data => {
  console.log("raw_data", raw_data);
  const filteredData = raw_data.filter(d => d.country !== "World" && d.country !== "Asia" && d.country !== "Africa");
  state.data = filteredData
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {
  // SCALES
  xScale = d3
    .scaleTime()
    .domain(d3.extent(state.data, d => d.year))
    .range([margin.left, width - margin.right]);  

  yScale = d3
    .scaleLinear()
    .domain([0, d3.max(state.data, d => d.population)])
    .range([height - margin.bottom, margin.top]);

  // AXES
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // UI ELEMENT SETUP
  // add dropdown (HTML selection) for interaction
  // HTML select reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  const selectElement = d3
    .select("#dropdown")
    .on("change", function() {
    console.log("new selected entity is", this.value);
    // `this` === the selectElement
    // this.value holds the dropdown value a user just selected
    state.selectedCountry = this.value;
    draw(); // re-draw the graph based on this new selection
  });

  // add in dropdown options from the unique values in the data
  selectElement
    .selectAll("option")
    .data(Array.from(new Set (state.data.map(d => d.country))))
    .join("option")
    .attr("value", d => d)
    .text(d => d)
    
  // this ensures that the selected value is the same as what we have in state when we initialize the options
  selectElement.property("value", state.selectedCountry)

  // create an svg element in our main `d3-container` element
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // add the xAxis
  svg
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", "50%")
    .attr("dy", "3em")
    .text("Year");

  // add the yAxis
  svg
    .append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "50%")
    .attr("dx", "-3em")
    .attr("writing-mode", "vertical-rl")
    .text("Population");

  draw(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {
  // filter the data for the selectedParty
  let filteredData
  if (state.selectedCountry !== null) {
    filteredData = state.data.filter(d => d.country === state.selectedCountry)
  }

  const dot = svg
    .selectAll(".dot")
    .data(filteredData, d => d.year) // use `d.name` as the `key` to match between HTML and data elements
    .join(
      enter =>
        // enter selections -- all data elements that don't have a `.dot` element attached to them yet
        enter
          .append("circle")
          .attr("class", "dot") // Note: this is important so we can identify it in future updates
          .attr("stroke", "lightgrey")
          .attr("opacity", 0.5)
          .attr("fill",  "purple")
          .attr("r", radius) 
          .attr("cy", height - margin.bottom) // initial value - to be transitioned
          .attr("cx", d => xScale(d.year))
          .call(enter =>
            enter
              .transition() // initialize transition
              .duration(1000) // duration 1000ms / 1s
              .attr("cy", d => yScale(d.population)) // started from the bottom, now we're here
          ),
      update => update.call(enter =>
          enter
            .transition() // initialize transition
            .duration(1000) // duration 1000ms / 1s
            .attr("cy", d => yScale(d.population)) // started from the bottom, now we're here
        ),
      exit =>
        exit.call(exit =>
          // exit selections -- all the `.dot` element that no longer match to HTML elements
          exit
            .transition()
            .delay(d => d.year)
            .duration(500)
            .attr("cy", height - margin.bottom)
            .remove()
        )
    )
}
