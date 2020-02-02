/***********
 * CONSTANTS
 *
 * */

// create a random dataset
let numBars = 10,
  maxNumber = 100,
  data = d3.range(numBars).map(d => Math.floor(Math.random() * maxNumber));
console.log("data", data);

// size and margins
let width = window.innerWidth,
  height = window.innerHeight / 2,
  barPadding = 0.05, // number 0-1,
  margins = { top: 10, bottom: 10, left: 50, right: 50 };

// animation constants
let delay = 50,
  duration = 800;

/***********
 * MAIN CODE
 *
 * */
// scales
// ref: https://github.com/d3/d3-scale
const xScale = d3
  .scaleBand() // ref: https://github.com/d3/d3-scale#band-scales
  .domain(data)
  .range([margins.left, width - margins.right])
  .paddingInner(barPadding);

// ref: https://github.com/d3/d3-array#extent -- returns [min, max] of array
const [min, max] = d3.extent(data);
const yScale = d3
  .scaleLinear()
  .domain([0, max])
  .range([height - margins.bottom, margins.top]);

// add svg to our html
const svg = d3
  .select("#d3-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// ref: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect
const bar = svg
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("class", "bar")
  .attr("x", d => xScale(d))
  .attr("y", d => yScale(d))
  .attr("y", d => height - margins.bottom)
  .attr("width", xScale.bandwidth())
  .attr("height", 0);

bar
  .transition()
  .duration(duration)
  .delay((d, i) => i * delay)
  .attr("y", d => yScale(d))
  .attr("height", d => yScale(0) - yScale(d));
