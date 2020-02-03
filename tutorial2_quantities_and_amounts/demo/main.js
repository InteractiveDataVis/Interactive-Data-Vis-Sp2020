/***********
 * CONSTANTS
 *
 * */
data = createRandomData();
console.log("data", data);

// size and margins
let width = window.innerWidth,
  height = window.innerHeight / 2,
  barPadding = 0.05, // number 0-1, percent of space
  margins = { top: 20, bottom: 10, left: 50, right: 50 };

// animation constants
let delay = 100,
  duration = 800;

// initial state
let isAscendingOrder = true;

/**
 * MAIN CODE
 *
 * */
// add svg to our html
const svg = d3
  .select("#d3-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

draw();

// ref: https://github.com/d3/d3-selection#handling-events
const button = d3.select("#data-button").on("click", () => {
  isAscendingOrder = !isAscendingOrder;
  draw(); // redraw with the new data
});

/** DRAW FUNCTION */
function draw() {
  // sort data
  const sortOrder = isAscendingOrder ? d3.ascending : d3.descending;
  data = [...data.sort(sortOrder)];

  // scales
  // ref: https://github.com/d3/d3-scale
  const xScale = d3
    .scaleBand() // ref: https://github.com/d3/d3-scale#band-scales
    .domain(data)
    .range([margins.left, width - margins.right])
    .paddingInner(barPadding);

  // ref: https://github.com/d3/d3-array#extent -- returns [min, max] of array
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([height - margins.bottom, margins.top]);

  // transition definition
  const t = d3.transition().duration(duration);

  const barGroup = svg
    .selectAll("g.bar")
    .data(data, d => d)
    .join(
      enter =>
        enter
          .append("g")
          .attr("class", "bar")
          .attr("transform", d => `translate(${xScale(d)}, ${yScale(0)})`)
          .call(sel =>
            sel // rect element
              .append("rect")
              .attr("width", xScale.bandwidth())
              .attr("height", 0)
              .transition(t)
              .delay((d, i) => i * delay)
              .attr("width", xScale.bandwidth())
              .attr("height", d => yScale(0) - yScale(d))
          )
          .call(sel =>
            sel // text element
              .append("text")
              .attr("x", xScale.bandwidth() / 2)
              .attr("dy", -3)
              .style("text-anchor", "middle")
              .text(d => d)
          )
          .call(sel =>
            sel // group position transition
              .transition(t)
              .delay((d, i) => i * delay)
              .attr("transform", d => `translate(${xScale(d)}, ${yScale(d)})`)
          ),
      update =>
        update.call(sel =>
          sel // group position transition
            .transition(t)
            .delay((d, i) => i * delay)
            .attr("transform", d => `translate(${xScale(d)}, ${yScale(d)})`)
        )
    );
}

/** HELPER FUNCTIONS */
function createRandomData() {
  // create a random dataset
  let maxNumBars = 10,
    maxNumber = 100;

  return d3
    .range(maxNumBars)
    .map(d => Math.floor(Math.random() * maxNumber))
    .slice(0, Math.floor(maxNumBars / 2 + Math.random() * maxNumBars));
}
