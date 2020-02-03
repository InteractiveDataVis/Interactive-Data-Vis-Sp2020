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
  margins = { top: 20, bottom: 10, left: 50, right: 50 };

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
const barGroup = svg
  .selectAll("g.bar")
  .data(data)
  .join("g")
  .attr("class", "bar")
  .attr(
    "transform",
    d => `translate(${xScale(d)}, ${height - margins.bottom})`
  );

const rect = barGroup
  .append("rect")
  .attr("width", xScale.bandwidth())
  .attr("height", 0);

const text = barGroup
  .append("text")
  .attr("x", xScale.bandwidth() / 2)
  .attr("dy", -3)
  .style("text-anchor", "middle")
  .text(d => d);

// transition definition
const t = d3
  .transition()
  .duration(duration)
  .delay((d, i) => i * delay);

// transition position of the bar group
barGroup
  .transition(t)
  .attr("transform", d => `translate(${xScale(d)}, ${yScale(d)})`);

// transition height of the rect
rect.transition(t).attr("height", d => yScale(0) - yScale(d));
