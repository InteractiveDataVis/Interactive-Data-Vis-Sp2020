/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;
let tooltip;

/**
 * APPLICATION STATE
 * */
let state = {
  data: null,
  hover: null,
};

/**
 * LOAD DATA
 * */
d3.json("../../data/flare.json", d3.autotype).then(data => {
  state.data = data;
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {
  const container = d3.select("#d3-container").style("position", "relative");

  tooltip = container
    .append("div")
    .attr("class", "tooltip")
    .attr("width", 100)
    .attr("height", 100)
    .style("position", "absolute");

  svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const root = d3.hierarchy(state.data)
    .sum(d => d.value)
    .sort((a,b) => b.value - a.value)

  const treeGen = d3.treemap()
    .size([width, height])
    .padding(1)

  treeGen(root)

  const leaf = svg.selectAll("g.leaf") 
    .data(root.leaves())
    .join("g")
    .attr("class", "leaf")
    .attr("transform", d => `translate(${d.x0},${d.y0})`)

  leaf.append("rect")
    .attr("height", d => d.y1 - d.y0)
    .attr("width", d => d.x1 - d.x0)
    .on("mouseover", d => {
      state.hover = {
        name: d.data.name,
        x: d.x1,
        y: d.y1,
      };
      draw();
    })

  leaf.append("text")
    .text(d => d.data.name)
    .style("dominant-baseline", "hanging")
    .style("fill", "white")

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
function draw() {

  if (state.hover) {
    tooltip
      .html(`  
        <div>${state.hover.name}</div>
      `)
      .transition()
      .duration(500)
      .style("transform", `translate(${state.hover.x}px, ${state.hover.y}px)`)
  }
}
