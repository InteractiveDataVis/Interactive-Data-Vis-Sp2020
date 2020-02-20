
const duration = 200

const selection_with_transition = d3.select("#selection-transition")
  .selectAll("div.transition")
    .data([0,1,2,3])
    .join("div")
    .attr("class", "transition")
    .text("_")
    .transition()
      .duration(duration)
      .delay((d,i) => duration * i)
      .text(d => d)

console.log(selection_with_transition)

const selection_with_call = d3.select("#selection-call")
  .selectAll("div.call")
    .data(['a','b','c','d'])
    .join("div")
    .attr("class", "call")
    .text("_")
    .call(div => 
      div.transition()
        .duration(duration)
        .delay((d,i) => duration * i)
        .text(d => d)
    )

console.log(selection_with_call)