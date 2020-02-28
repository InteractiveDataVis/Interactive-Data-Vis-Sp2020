/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 }
let svg;

/* APPLICATION STATE */
let state = {
  geojson: null,
  hover: {
    "state": null
  }
};

/* LOAD DATA */
Promise.all([
  d3.json("../../data/us-state.json"),
  d3.csv("../../data/usHeatExtremes.csv", d3.autoType)
]).then(([geojson, extremes]) => {
  state.geojson = geojson;
  console.log(state)
  init();
});

/* INITIALIZING FUNCTION */
function init() {

  const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson)
  const geopath = d3.geoPath().projection(projection)

  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const geo = svg.selectAll("path.state")
    .data(state.geojson.features)
    .join("path")
    .attr("class", "state")
    .attr("d", d => geopath(d))
    .style("fill", () => `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`)
    .on('mouseover', d => {
      state.hover.state = d.properties.NAME;
      draw()
    })
  
  const GradCenterCoord = [  -73.9833, 40.7423 ];
  const GradCenterPixels = projection(GradCenterCoord)
  const gc = svg.append("circle")
    .attr("cx", GradCenterPixels[0])
    .attr("cy", GradCenterPixels[1])
    .attr("r", 10)
    .attr("stroke", "black")
    .attr("fill", "white")
  

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
function draw() {

    d3.select('#hover')
      .html(`<span>${state.hover.state}</span>`)

}