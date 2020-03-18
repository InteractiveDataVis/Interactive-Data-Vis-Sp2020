class Barchart {

  constructor(state, setGlobalState) {
    // initialize properties here
    this.width = (window.innerWidth * 1.8) / 3;
    this.height = window.innerHeight * 0.4;
    this.margins = { top: 20, bottom: 20, left: 20, right: 20 };
    this.duration = 1000;

    this.svg = d3
      .select("#barchart")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
  }

  draw(state) {
    console.log("now I am drawing my graph");

    const filteredData = state.data.filter(d =>
      state.selectedCountry ? d.countryRegion === state.selectedCountry : true
    );

    const metrics = ["confirmed", "recovered", "deaths"];

    const totalsData = metrics.map(metric => {
      return {
        metric: metric,
        sum: d3.sum(filteredData, d => d[metric]),
      };
    });

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(totalsData, d => d.sum)])
      .range([this.height - this.margins.top, this.margins.bottom]);

    const xScale = d3
      .scaleBand()
      .domain(metrics)
      .range([this.margins.left, this.width - this.margins.right])
      .paddingInner(0.05);

    const bars = this.svg
      .selectAll("g.bar")
      .data(totalsData)
      .join(
        enter =>
          enter
            .append("g")
            .attr("class", "bar")
            .call(enter => enter.append("rect"))
            .call(enter => enter.append("text")),
        update => update,
        exit => exit.remove()
      );

    bars
      .transition()
      .duration(this.duration)
      .attr(
        "transform",
        d => `translate(${xScale(d.metric)}, ${yScale(d.sum)})`
      );

    bars
      .select("rect")
      .transition()
      .duration(this.duration)
      .attr("width", xScale.bandwidth())
      .attr("height", d => this.height - yScale(d.sum));

    bars
      .select("text")
      .attr("dy", "-.5em")
      .text(d => `${d.metric}: ${d.sum}`);
  }
}

export { Barchart };
