const width = 500;
const height = 200;

const margin = { left: 100, right: 30, top: 30, bottom: 150 };

const g = d3
  .select("#container")
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

g.append("text")
  .text("Revenue")
  .attr("x", -height / 2)
  .attr("y", -60)
  .attr("text-anchor", "middle")
  .attr("transform", `rotate(270)`)
  .attr("fill", "gray")
  .attr("class", "title");

d3.json("./revenues.json").then(data => {
  data = data.map(dataItem => {
    return { ...dataItem, revenue: +dataItem.revenue };
  });

  const color = d3
    .scaleOrdinal()
    .domain(data.map(dataItem => dataItem.month))
    .range(d3.schemePastel1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.revenue)])
    .range([height, 0]);

  const x = d3
    .scaleBand()
    .domain(data.map(dataItem => dataItem.month))
    .range([0, width])
    .paddingInner(0.6)
    .paddingOuter(0.3);

  const xAxisCall = d3
    .axisBottom(x)
    .tickSizeOuter(0)
    .tickSizeInner(4)
    .tickPadding(8);

  g.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxisCall)
    .selectAll("text");

  const yAxisCall = d3
    .axisLeft(y)
    .tickSizeOuter(0)
    .tickSizeInner(4)
    .tickPadding(8);

  g.append("g")
    .attr("class", "yAxis")
    .call(yAxisCall)
    .selectAll("text");

  const radius = x.bandwidth() / 2;

  const circles = g.selectAll("circle").data(data);

  circles
    .enter()
    .append("circle")
    .attr("cy", height - radius)
    .attr("cx", d => x(d.month))
    .attr("r", radius)
    .attr("fill", d => color(d.month));
  circles
    .enter()
    .append("circle")
    .attr("cy", height - radius)
    .attr("cx", d => x(d.month) + 2 * radius)
    .attr("r", radius)
    .attr("fill", d => color(d.month));

  circles
    .enter()
    .append("circle")
    .attr("cy", d => y(d.revenue) + radius)
    .attr("cx", d => x(d.month) + radius)
    .attr("r", radius)
    .attr("fill", d => color(d.month));

  const shafts = g.selectAll("rect").data(data);
  shafts
    .enter()
    .append("rect")
    .attr("fill", d => color(d.month))
    .attr("y", d => y(d.revenue) + radius)
    .attr("x", d => x(d.month))
    .attr("width", x.bandwidth)
    .attr("height", d => height - y(d.revenue) - 2 * radius);
});
