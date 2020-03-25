/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };


let svg;

/**
 * APPLICATION STATE
 * */
let state = {
  geojson: null,
  populations: null,
  hover: {
    latitude: null,
    longitude: null,
    state: null,
  },
};

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../../data/usState.json"),
  d3.csv("../../data/statePopulations.csv", d3.autoType), 
]).then(([geojson, populations]) => {
  state.geojson = geojson;
  state.populations = populations;
  console.log("state: ", state);
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {

  const colorScale = d3.scaleSequential(d3.interpolateBlues)
    .domain(d3.extent(state.populations.map(d => d['Voting Age Citizens'])))

  const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson);
  const path = d3.geoPath().projection(projection);

  /* this javascript Map works very fast for large amounts of data. Its negligible for something like the 50 states, but is a valuable asset for 2000+ items. Maps require an argument of an array; the first item in the array is the lookup value, the second is the returning value. */
  const populationLookup = new Map(state.populations.map(d => [d.State, d['Voting Age Citizens']]))

  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .selectAll(".state")
    .data(state.geojson.features)
    .join("path")
    .attr("d", path)
    .attr("class", "state")
    .attr("fill", d => {
      /* the curly braces here allow me to do more when this function is envoked each time.
      the best use of this is to console log the value, so for each item (d) in data, we console log (d) to get more clarity */
      // console.log(d) 

      // PART 1: I will save the state name from the data element that is getting created
      const stateName = d.properties.NAME

      // PART 2: get the data associated with that state name

      // OPTION A: using [array].find
      /* This version is the "crude" option, not performance optimized, that just looks for the state name in the populations data set */
      const statePopulations = state.populations.find(e => e.State === stateName)['Voting Age Citizens'] 

      // OPTION B: using a pre-defined map.get
      /* This version is more advanced, leveraging a pre-defined Map.*/
      const statePopulations2 = populationLookup.get(stateName)

      // PART 3: use the color scale defined above to return a color
      return colorScale(statePopulations)

    })
    // .attr("fill", "transparent")
    .on("mouseover", d => {
      state.hover["state"] = d.properties.NAME;
      draw();
    });

  // EXAMPLE 2: going from x, y => lat-long
  // this triggers any movement at all while on the svg
  svg.on("mousemove", () => {
    // we can use d3.mouse() to tell us the exact x and y positions of our cursor
    const [mx, my] = d3.mouse(svg.node());
    // projection can be inverted to return [lat, long] from [x, y] in pixels
    const proj = projection.invert([mx, my]);
    state.hover["longitude"] = proj[0];
    state.hover["latitude"] = proj[1];
    draw();
  });

  draw(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {
  // return an array of [key, value] pairs
  hoverData = Object.entries(state.hover);

  d3.select("#hover-content")
    .selectAll("div.row")
    .data(hoverData)
    .join("div")
    .attr("class", "row")
    .html(
      d =>
        // each d is [key, value] pair
        d[1] // check if value exist
          ? `${d[0]}: ${d[1]}` // if they do, fill them in
          : null // otherwise, show nothing
    );
}
