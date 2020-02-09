// data load
d3.csv("../../data/squirrelActivities.csv", d3.autoType).then(data => {
  console.log(data);
});
