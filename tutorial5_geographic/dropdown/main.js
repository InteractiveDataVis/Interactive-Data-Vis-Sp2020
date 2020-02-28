/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 }
let svg;

/* APPLICATION STATE */
let state = {
  geojson: null,
  viewing: "none"
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

  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // grab the dropdown, and make it a selection
  const htmlselect = d3
    .select("#choose-state")

  // append all the states as options in the dropdown
  const options = htmlselect
    .selectAll("option")
    .data([...state.geojson.features.map(d => d.properties.NAME), "none"])
    .join("option")
    .attr("value", d => d)
    .text(d => d)

  // now I define .on("change") function. You may notice this is not chained to the above. 
  // That is because I need to add this on change behavior to the html selection, 
  // and *not the options*. The above chunk of code (selectAll("options").data().join()) 
  // turns into a selection of options.
  htmlselect
    .on("change", function() {
      state.viewing = this.value;
      console.log("selected state is", this.value);
      draw(); 
    });
  
  // set all states as the initial value. This must happen after I append the options, 
  // so it knows which of the options to set. 
  htmlselect.property("value", "none")
  

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
function draw() {

  const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson)
  const geopath = d3.geoPath().projection(projection)

  const stateToDraw = state.geojson.features.find(d => d.properties.NAME === state.viewing)

  // only do this if stateToDraw isn't undefined
  if (stateToDraw) {
    // draw the viewed state
    svg.selectAll("path.state")
      // be sure to give it a key! In this case, the state name. 
      .data([stateToDraw], d => d.properties.NAME)
      .join(enter => enter.append("path")
        .attr("class", "state")
        .attr("d", d => geopath(d))
        // the transition below on exit won't work unless I initialize it here
        .attr("opacity", 1)
        .style("fill", () => `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`),
        update => update, 
        exit => exit.call(
          selection => selection
            .transition()
            .duration(500)
            .attr("opacity", 0)
            .remove()))
  }


}