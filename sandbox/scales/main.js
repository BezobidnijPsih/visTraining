const width = 400;
const height = 200;

const svg = d3
  .select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height + 100);

d3.json("./buildings.json").then(data => {
  data = data.map(building => {
    return { ...building, height: +building.height };
  });
  const circles = svg.selectAll("circle").data(data);

  const color = d3
    .scaleOrdinal()
    .domain(data.map(building => building.name))
    .range(d3.schemePastel1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.height)])
    .range([0, height]);

  const x = d3
    .scaleBand()
    .domain(data.map(building => building.name))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  circles
    .enter()
    .append("circle")
    .attr("cy", 20)
    .attr("cx", d => x(d.name))
    .attr("r", 15)
    .attr("fill", d => color(d.name));

  circles
    .enter()
    .append("circle")
    .attr("cy", 20)
    .attr("cx", d => 30 + x(d.name))
    .attr("r", 15)
    .attr("fill", d => color(d.name));

  circles
    .enter()
    .append("circle")
    .attr("cy", (d, i) => {
      return 20 + y(d.height);
    })
    .attr("cx", d => 15 + x(d.name))
    .attr("r", 15)
    .attr("fill", d => color(d.name));

  const shafts = svg.selectAll("rect").data(data);
  shafts
    .enter()
    .append("rect")
    .attr("fill", d => color(d.name))
    .attr("y", 20)
    .attr("x", d => x(d.name))
    .attr("width", 30)
    .attr("height", d => y(d.height));
});
