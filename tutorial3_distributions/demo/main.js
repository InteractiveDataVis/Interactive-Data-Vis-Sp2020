// CONSTANTS
const width = window.innerWidth * 0.8
const height = width * .58;

// STATE
let state = {
  data: []
  // state items here
}

// load in data
d3.json("../../data/environmentRatings.json", d3.autoType).then(raw_data => setState({ data: raw_data }))

function update(prevState) {
  // this will be run with every state update

  // const new_data = ...

  setState({ data: new_data })
}

function draw() {
  // this will be run once, at the start

  const { data } = state

  d3.select('#d3-container')
    .append('svg')
    .attr("width", width)
    .attr("height", height)

}

function setState(nextState) {
  const prevState = state
  state = Object.assign({}, state, nextState)
  console.log('new state:', state)
  update(prevState)
}