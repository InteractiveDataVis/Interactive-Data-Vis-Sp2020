class Table {

  constructor(state, setGlobalState) {

    const slimmedData = state.data.map(d => ({
      "State": d.State,
      "Total Housing Units": d['Total Housing Units']
    })).sort((a, b) => d3.descending(a['Total Housing Units'], b['Total Housing Units']))

    // first map our values to a logarithmic scale
    const logScale = d3
      .scaleSymlog() // like a logScale but can handle 0 in the domain without throwing NaN
      .domain(d3.extent(slimmedData, d => d['Total Housing Units']))
      .range([0.5, 1]); // to use only the darker half of the color scale

    // use that logarithmic scale in our color interpolator
    this.colorScale = d3.scaleSequential(d => d3.interpolateBuPu(logScale(d)));

    const columns = ["State", "Total Housing Units"];
    const table = d3.select("#table").append("table");
    const format = d3.format(",." + d3.precisionFixed(1) + "f");

    table
      .append("thead")
      .append("tr")
      .selectAll("th")
      .data(columns)
      .join("th")
      .text(d => d);

    // make this a "this" to invoke global scope
    this.tableRows = table
      .append("tbody")
      .selectAll("tr")
      .data(slimmedData)
      .join("tr")
      .style("background-color", d => this.colorScale(d['Total Housing Units']))
      .style("color", "#eee");

    this.tableRows
      .selectAll("td")
      .data(d => Object.values(d))
      .join("td")
      .text(d => typeof(d) === "string" ? d : format(d));

    this.tableRows.on("click", d => {
      setGlobalState({ selectedState: d.State });
    });
  }

  draw(state, setGlobalState) {
    console.log("now I am drawing my barchart");

    // update the row to display selected country
    this.tableRows.style("background-color", d =>
      state.selectedState === d.State ? "grey" : this.colorScale(d['Total Housing Units'])
    );
  }
}

export { Table };
