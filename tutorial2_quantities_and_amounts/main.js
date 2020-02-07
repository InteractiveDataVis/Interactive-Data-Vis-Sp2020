d3.csv("../data/squirrelActivities.csv", d3.autoType).then(data => {

  console.log(data)

  const height = window.innerHeight * 0.33
  const width = window.innerWidth * 0.9

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d.count))])
    .range([height, 0])

  const xScale = d3.scaleBand()
    .domain(data.map(d => d.activity))
    .range([0, width])

  const xAxis = d3.axisBottom(xScale)
  
  const svg = d3.select(".container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("height", d => height - yScale(d.count))
    .attr("width", 100 )
    .attr("data", d => d.count)
    .attr("x", d => xScale(d.activity))
    .attr("y", d => yScale(d.count))
    .attr("fill", "aquamarine")

  svg.append("g")
    .call(xAxis)
    .attr("transform", `translate(0,${height - 10})`)


})