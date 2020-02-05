// data load
d3.csv("../../data/surveyResults.csv", d => {
  // clean up data - "+" converts the field to be a number
  return {
    timestamp: new Date(d.Timestamp),
    python: +d["Python or R (or data analysis tool)"],
    terminal: +d["Terminal (Bash/Zsh)"],
    github: +d["Git / Github"],
    html_css: +d["HTML / CSS"],
    javascript: +d["Javascript"],
    d3: +d["d3.js"],
  };
}).then(data => {
  console.log(data);
  /** CONSTANTS */
  const width = window.innerWidth * 0.9,
    height = window.innerHeight / 3,
    paddingInner = 0.2,
    margin = { top: 20, bottom: 20, left: 50, right: 50 },

  /** SCALES */
  const xScale = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .paddingInner(paddingInner);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.d3)])
    .range([height - margin.bottom, margin.top]);

  const yAxis = d3.axisLeft(yScale).ticks(5);

  /** MAIN CODE */
  const svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // main group
  const group = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr(
      "transform",
      (d, i) => `translate(${xScale(i)}, ${height - margin.bottom})`
    );

  // rects
  const rects = group
    .append("rect")
    .attr("width", xScale.bandwidth())
    .attr("height", 0);

  // text
  group
    .append("text")
    .attr("class", "hover-text")
    .attr("dy", "1.25em")
    .attr("x", xScale.bandwidth() / 2)
    .text(d => d.d3);

  svg
    .append("g")
    .attr("transform", `translate(${margin.left - 5}, 0)`)
    .call(yAxis);

  // transitions
  group
    .transition()
    .delay((d, i) => 20 * i)
    .duration(1000)
    .attr("transform", (d, i) => `translate(${xScale(i)}, ${yScale(d.d3)})`);

  rects
    .transition()
    .delay((d, i) => 20 * i)
    .duration(1000)
    .attr("height", d => height - margin.bottom - yScale(d.d3));
});