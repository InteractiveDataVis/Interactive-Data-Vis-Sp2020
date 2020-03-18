class Graph {
  constructor(state, setGlobalState) {
    // initialize properties here
    this.width = (window.innerWidth * 1.8) / 3;
    this.height = window.innerHeight * 0.6;
    this.margins = { top: 20, bottom: 20, left: 20, right: 20 };
    this.duration = 1000;

    this.svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
  }

  draw(state) {
    console.log("now I am drawing my graph");

    const filteredData = state.data.filter(d =>
      state.selectedCountry ? d.countryRegion === state.selectedCountry : true
    );

    this.metrics = ["confirmed", "recovered", "deaths"];

    this.totalsData = this.metrics.map(metric => {
      return {
        metric: metric,
        sum: d3.sum(filteredData, d => d[metric]),
      };
    });

    this.yScale = d3
      .scaleLinear()
      .domain([0, d3.max(this.totalsData, d => d.sum)])
      .range([this.height - this.margins.bottom, this.margins.top]);

    this.xScale = d3
      .scaleBand()
      .domain(this.metrics)
      .range([this.margins.left, this.width - this.margins.right])
      .paddingInner(0.05);

    this.bars = this.svg
      .selectAll("g.bar")
      .data(this.totalsData)
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

    this.bars
      .transition()
      .duration(this.duration)
      .attr(
        "transform",
        d => `translate(${this.xScale(d.metric)}, ${this.yScale(d.sum)})`
      );

    this.bars
      .select("rect")
      .transition()
      .duration(this.duration)
      .attr("width", this.xScale.bandwidth())
      .attr("height", d => this.height - this.yScale(d.sum));

    this.bars
      .select("text")
      .attr("dy", "-.5em")
      .text(d => `${d.metric}: ${d.sum}`);
  }
}

export { Graph };
