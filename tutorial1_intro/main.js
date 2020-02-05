d3.csv("../data/surveyResults.csv").then(data => {


  console.log(data)

  const table = d3.select("#d3-table")

  const thead = table.append('thead')
    .attr("class", "head")

  const tbody = table.append('tbody')
console.log(data[0])
  thead
    .append('tr')
    .attr("class", "hi")
    .selectAll('td')
    .data(Object.keys(data[0]))
    .join('td')
    .text(d => d)

  tbody
    .selectAll('tr')
    .data(data)
    .join('tr')
    .attr("class", "classNameTr")
    .selectAll('td')
    .data(d => {
      return Object.values(d)
    })
    .join('td')
    .text(d => d)


const name = (input) => value

const addition = (a, b) => a + b
console.log(addition(4,5))

})