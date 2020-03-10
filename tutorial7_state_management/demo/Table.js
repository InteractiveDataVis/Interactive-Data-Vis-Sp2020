class Table {
  // initialize properties here
  setState;

  init(state, setState) {
    console.log("Table component is loaded...", state);
    this.setState = setState;
  }

  update() {
    console.log("now I am drawing my table");
  }
}

export { Table };
