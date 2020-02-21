/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.9,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 2;
  default_selection = "India";

let svg;
let xScale;
let yScale;
let yAxis;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedCountry: default_selection, 
};

/* LOAD DATA */
d3.csv("../../data/populationOverTime.csv",  d => ({
  year: new Date(d.Year, 0, 1),
  country: d.Entity,
  population: +d.Population,
})).then(raw_data => {
  console.log("raw_data length:", raw_data);
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
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
  yAxis = d3.axisLeft(yScale)
    .tickFormat(d3.format(",.2s"));

  const selectElement = d3.select("#dropdown").on("change", function() {
    state.selectedCountry = this.value;
    console.log("new value is", this.value);
    draw(); 
  });

  // add in dropdown options from the unique values in the data
  selectElement
    .selectAll("option")
    .data(Array.from(
        new Set(state.data.map(d => d.country))))
    .join("option")
    .attr("value", d => d)
    .text(d => d)
    
    selectElement.property("value", default_selection);

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
    .attr("fill", "black")
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

/* DRAW FUNCTION */
function draw() {
  // filter the data for the selectedParty
  let filteredData
  if (state.selectedCountry !== null) {
    filteredData = state.data.filter(d => d.country === state.selectedCountry)
    console.log("filteredData length:", filteredData.length)
  }

  yScale.domain([0, d3.max(filteredData, d => d.population)])

  d3.select("g.y-axis")
    .transition()
      .duration(1000)
      .call(yAxis.scale(yScale))

  const lineFunc = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.population))

  console.log(lineFunc(filteredData))

  const dot = svg
    .selectAll(".dot")
    .data(filteredData, d => d.year) 
    .join(
      enter => enter
          .append("circle")
          .attr("class", "dot") 
          .attr("opacity", (d,i) => i % 3 ? 0 : 1)
          .attr("fill",  "purple")
          .attr("r", radius) 
          .attr("cy", height - margin.bottom)
          .attr("cx", d => xScale(d.year)),
      update => update,
      exit => exit.call(exit => exit
            .transition()
            .delay((_, i) => i * 50)
            .duration(50)
            .attr("cy", height - margin.bottom)
            .remove()
        )
    ).call(sel => sel
      .transition() 
      .duration(1000) 
      .attr("cy", d => yScale(d.population)) 
  )

    const line = svg.selectAll('path.trend')
        .data([filteredData])
        .join(
          enter => enter.append("path")
            .attr("class", "trend")
            .attr("d", d => lineFunc(d))
            .attr("fill", "none")
            .attr("stroke", "black"),
          update => update
            .call(sel => sel.transition()
              .duration(1000)
              .attr("d", d => lineFunc(d)))
        )
}
