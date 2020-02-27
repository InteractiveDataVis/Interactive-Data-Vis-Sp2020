/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 }

/** these variables allow us to access anything we manipulate in
 * init() but need access to in draw().
 * All these variables are empty before we assign something to them.*/
let svg;

/**
 * APPLICATION STATE
 * */
let state = {
  geojson: null,
  extremes: null,
  tooltip: {
    "lattitude": null,
    "longitude": null,
    "state": null
  }
};

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../../data/us-state.json"),
  d3.csv("../../data/usHeatExtremes.csv", d3.autoType)
]).then(([geojson, extremes]) => {
  state.geojson = geojson;
  state.extremes = extremes;
  console.log("state: ", state)
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {

  // our projection and path are only defined once, and we don't need to access them in the draw function, 
  // so they can be locally scoped to init()
  const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson)
  const path = d3.geoPath().projection(projection)

  // create an svg element in our main `d3-container` element
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg.selectAll(".state")
    // all of the features of the geojson, meaning all the states as individuals
    .data(state.geojson.features)
    .join("path")
      .attr("d", path)
      .attr("class", "state")
      .attr("fill", "transparent")
      .on("mouseover", d => { 
        // when the mouse rolls over this feature, do this
        state.tooltip['state'] = d.properties.NAME
        draw() // re-call the draw function when we set a new hoveredState
      })

  // this triggers any movement at all while on the svg
  svg.on("mousemove", d => {
    // we can use d3.mouse() to tell us the exact x and y positions of our cursor
    const [mx, my] = d3.mouse(svg.node())
    // projection can be inverted to return [lat, long] from [x, y] in pixels
    const proj = projection.invert([mx, my])
    state.tooltip['lattitude'] = proj[0],
    state.tooltip['longitude'] = proj[1]
    draw() // re-call the draw function when we set a new hoveredState
  })

  draw(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {

  let tooltipData = []
  if (Object.values(state.tooltip).reduce((t,v) => t || v !== null, false)) {
    tooltipData = Object.entries(state.tooltip)
  }

  d3.select("#tooltip")
    .selectAll('div.content')
    .data(tooltipData)
    .join("div")
      .attr("class", "content")
      .html(d => `${d[0]}: ${d[1]}`)

}