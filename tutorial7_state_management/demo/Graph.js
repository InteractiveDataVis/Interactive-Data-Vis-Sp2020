class Graph {

  /* this is run when we create the first "new Graph", so it acts as our init function did */
  constructor(state, setState) {
    console.log("Graph component is loaded...", state);
    state.newProp = "testing new prop";
    // save our global update function to this component so we can use it from within
    this.setState = setState;
  }

  update() {
    console.log("now I am drawing my graph");
  }
}

export { Graph };
