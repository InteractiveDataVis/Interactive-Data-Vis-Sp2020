class Count {

  constructor(state, setGlobalState) {
    this.container = d3.select("#count")
    this.duration = 1000
  }

  draw(state, setGlobalState) {
    console.log("now I am drawing my count");

    const filteredData = state.data.find(d => state.selectedState === d.State);
    const metrics = ["Age < 20", "Age 20-65", "Age 65+"];
    const metricData = metrics.map(metric => {
      return {
        state: state.selectedState,
        metric: metric,
        value: filteredData ? filteredData[metric] : 0,
      };
    });

    const metric = this.container
      .selectAll("div.metric")
      .data(metricData, d => d.State)
      .join(
        enter => 
          enter
            .append("div")
            .attr("class", "metric")
            .call(enter => enter.append("div").attr("class", "title"))
            .call(enter => enter.append("div").attr("class", "number")),
          update => update,
          exit => exit.remove()
      ).on("click", d => {
        setGlobalState({ selectedMetric: d.metric });
      })


    metric.select("div.title")
      .text(d => d.metric)

    const format = d3.format(",." + d3.precisionFixed(1) + "f")

    metric.select("div.number")
      // reference: https://observablehq.com/@d3/transition-texttween
      .transition()
      .duration(this.duration)
      .style("color", d => d.metric === state.selectedMetric ? "purple" : "#ccc")
      .textTween(function(d) {
        const i = d3.interpolate(0, d.value);
        return function(t) { return format(i(t)); };
      })
  }
}

export { Count };
