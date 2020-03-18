class Count {

  constructor(state, setGlobalState) {
    this.container = d3.select("#count")
    this.duration = 1000;
  }

  draw(state, setGlobalState) {
    console.log("now I am drawing my count");

    const filteredData = state.data.filter(d =>
      state.selectedCountry ? d.countryRegion === state.selectedCountry : true
    );

    const metrics = ["confirmed", "recovered", "deaths"];

    const totalsData = metrics.map(metric => {
      return {
        country: state.selectedCountry,
        metric: metric,
        sum: d3.sum(filteredData, d => d[metric]),
      };
    });

    const metric = this.container
      .selectAll("div.metric")
      .data(totalsData, d => d.country)
      .join(
        enter => 
          enter
            .append("div")
            .attr("class", "metric")
            .call(enter => enter.append("div").attr("class", "title"))
            .call(enter => enter.append("div").attr("class", "number")),
          update => update,
          exit => exit.remove())

    metric.select("div.title")
      .text(d => d.metric)

    const format = d3.format("." + d3.precisionFixed(1) + "f");

    metric.select("div.number")
      .transition()
      .duration(this.duration)
      .textTween(function(d) {
        const i = d3.interpolate(0, d.sum);
        return function(t) { return format(i(t)); };
      })
  }
}

export { Count };
