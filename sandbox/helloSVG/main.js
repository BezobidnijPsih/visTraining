const svg = d3.select("#canvas");

const ballRight = svg.append("circle");

ballRight.attr("cy", 400);
ballRight.attr("cx", 100);
ballRight.attr("r", 100);
ballRight.attr("fill", "pink");

const ballLeft = svg.append("circle");
ballLeft
  .attr("cy", 400)
  .attr("cx", 300)
  .attr("r", 100)
  .attr("fill", "pink");

const shaft = svg.append("rect");
shaft
  .attr("x", 100)
  .attr("y", 100)
  .attr("width", 200)
  .attr("height", 300)
  .attr("fill", "pink");

const tip = svg
  .append("circle")
  .attr("fill", "pink")
  .attr("cx", 200)
  .attr("cy", 100)
  .attr("r", 100);
