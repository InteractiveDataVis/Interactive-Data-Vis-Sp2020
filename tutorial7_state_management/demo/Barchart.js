class Barchart {

  constructor(state, setGlobalState) {
    // initialize properties here
    this.width = window.innerWidth * 0.6;
    this.height = window.innerHeight * 0.6;
    this.margins = { top: 20, bottom: 20, left: 20, right: 20 };
    this.duration = 1000;
    this.format = d3.format(",." + d3.precisionFixed(1) + "f");

    this.svg = d3
      .select("#barchart")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
  }

  draw(state, setGlobalState) {
    console.log("now I am drawing my graph");

    const filteredData = state.data.find(d => state.selectedState === d.State);
    const metrics = ["Age < 20", "Age 20-65", "Age 65+"];
    const metricData = metrics.map(metric => {
      return {
        state: state.selectedState,
        metric: metric,
        value: filteredData ? filteredData[metric] : 0,
      };
    });

    const yScale = d3
      .scaleLinear()
      .domain(state.domain)
      .range([this.height - this.margins.top, this.margins.bottom]);

    const xScale = d3
      .scaleBand()
      .domain(metrics)
      .range([this.margins.left, this.width - this.margins.right])
      .paddingInner(0.05);

    const bars = this.svg
      .selectAll("g.bar")
      .data(metricData)
      .join(
        enter =>
          enter
            .append("g")
            .attr("class", "bar")
            .call(enter => enter.append("rect"))
            .call(enter => enter.append("text")),
        update => update,
        exit => exit.remove()
      ).on("click", d => {
        setGlobalState({ selectedMetric: d.metric });
      })

    bars
      .transition()
      .duration(this.duration)
      .attr(
        "transform",
        d => `translate(${xScale(d.metric)}, ${yScale(d.value)})`
      );

    bars
      .select("rect")
      .transition()
      .duration(this.duration)
      .attr("width", xScale.bandwidth())
      .attr("height", d => this.height - yScale(d.value))
      .style("fill", d => d.metric === state.selectedMetric ? "purple" : "#ccc")

    bars
      .select("text")
      .attr("dy", "-.5em")
      .text(d => `${d.metric}: ${this.format(d.value)}`);
  }
}

export { Barchart };
