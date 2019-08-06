const svg = d3
  .select("#container")
  .append("svg")
  .attr("width", 500)
  .attr("height", 300);

d3.json("./buildings.json").then(data => {
  data = data.map(building => {
    return { ...building, height: +building.height };
  });
  const circles = svg.selectAll("circle").data(data);
  const maxHeight = data.reduce(
    (max, building) => {
      return building.height >= max.height ? building : max;
    },
    {
      height: Number.MIN_SAFE_INTEGER
    }
  );

  let y = d3
    .scaleLinear()
    .domain([0, maxHeight.height])
    .range([0, 200]);

  circles
    .enter()
    .append("circle")
    .attr("cy", 20)
    .attr("cx", (d, i) => 30 + i * 70)
    .attr("r", 15)
    .attr("fill", "pink");

  circles
    .enter()
    .append("circle")
    .attr("cy", 20)
    .attr("cx", (d, i) => 60 + i * 70)
    .attr("r", 15)
    .attr("fill", "pink");

  circles
    .enter()
    .append("circle")
    .attr("cy", (d, i) => {
      return 20 + y(d.height);
    })
    .attr("cx", (d, i) => 45 + i * 70)
    .attr("r", 15)
    .attr("fill", "pink");

  const shafts = svg.selectAll("rect").data(data);
  shafts
    .enter()
    .append("rect")
    .attr("fill", "pink")
    .attr("y", 20)
    .attr("x", (d, i) => 30 + i * 70)
    .attr("width", 30)
    .attr("height", d => y(d.height));
});
