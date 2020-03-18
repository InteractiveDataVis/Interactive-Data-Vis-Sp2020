class Graph {
  // initialize properties here
  svg;
  width = 500;
  height;

  constructor(state, setGlobalState) {
    this.svg = d3.select("#chart").append("svg");
  }

  draw(state) {
    console.log("now I am drawing my graph");
  }
}

export { Graph };
