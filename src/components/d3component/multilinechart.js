import React from "react";
import * as d3 from "d3";
 
export default function MultilineChart (props){
  const {data, dimensions}=props;
  const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  var duration = 250;
  var lineOpacity = "0.25";
  var lineOpacityHover = "0.85";
  var otherLinesOpacityHover = "0.1";
  var lineStroke = "1.5px";
  var lineStrokeHover = "2.5px";
  var circleOpacity = "0.85";
  var circleOpacityOnLineHover = "0.25";
  var circleRadius = 3;
  var circleRadiusHover = 6;
  const dataset=[];
  const keys = Object.keys(data[0]);
  console.log(keys);
  keys.forEach((key)=>{
    if(key!="Time")
    {
  dataset.push({
      name:key,
      value:data.map(d=>{
        if (!isNaN(d[key]))
        {
        return({year:d["Time"].slice(0,-3),consumption:d[key]})
        }
        else 
        { 
          return({year:d["Time"].slice(0,-3),consumption:0})
        }
      })
    })
    }
  })  
  
  dataset.forEach(d=>{
    d.value= d.value.filter((d,i)=>i%5==0)
  })
 
  var parseDate = d3.timeParse("%Y");
  dataset.forEach(function(d) {
    d.value.forEach(function(d) {
      d.year = parseDate(d.year);
      d.consumption = +d.consumption;
    });
  });
 
  React.useEffect(() => 
  {
    const xScale = d3.scaleTime()
      .domain(d3.extent(dataset[dataset.length-1].value, (d) => d.year))
      .range([0, width]);


    const yScale = d3.scaleLinear()
      .domain([0,d3.max(dataset[dataset.length-1].value, (d) => d.consumption)
      ])
      .range([height, 0]);
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current).attr("id","graph_container");
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    var color = d3.scaleOrdinal(d3.schemeCategory10);

   var line = d3
      .line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.consumption))
      
    let lines = svg.append("g").attr("class", "lines");

    lines
      .selectAll(".line-group")
      .data(dataset)
      .enter()
      .append("g")
      .attr("class", "line-group")
      .attr("id",d=>{return d.name})
      .on("mouseover", function(d, i) {
        svg
          .append("text")
          .attr("class", "title-text")
          .attr("id",d)
          .style("fill", "grey")
          .text(this.id)
          .attr("text-anchor", "middle")
          .attr("x", 420)
          .attr("y", 5);
      })
      .on("mouseout", function(d) {
        svg.select(".title-text").remove();
      })
      .append("path")
      .attr("class", "line")
      .attr("d", d => line(d.value))
      .style("stroke", (d, i) => color(i))
      .style("opacity", lineOpacity)
      .on("mouseover", function(d) {
        d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
        d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
        d3.select(this)
          .style("opacity", lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
      .on("mouseout", function(d) {
        d3.selectAll(".line").style("opacity", lineOpacity);
        d3.selectAll(".circle").style("opacity", circleOpacity);
        d3.select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });

    /* Add circles in the line */
    lines
      .selectAll("circle-group")
      .data(dataset)
      .enter()
      .append("g")
      .style("fill", (d, i) => { return color(i)})
      .selectAll("circle")
      .data(d => {
        return d.value})
      .enter()
      .append("g")
      .attr("class", "circle")
      .on("mouseover", function(d) {
        d3.select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(d=>d.consumption)
          .attr("x", d => xScale(d.year) + 5)
          .attr("y", d => {return yScale(d.consumption) - 10});})
      .on("mouseout", function(d) {
        d3.select(this)
          .style("cursor", "none")
          .transition()
          .duration(duration)
          .selectAll(".text")
          .remove();
      })
      .append("circle")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.consumption))
      .attr("r", circleRadius)
      .style("opacity", circleOpacity)
      .on("mouseover", function(d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadius);
      });
     
    /* Add Axis into SVG */
    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Total values");


    svg
    .append("text")
    .text("Total energy consumptions of different materials in Australia")
    .attr("class","graph_title")
    .attr("x",0)
    .attr("y",600)

     
  }, [dataset]); // Redraw chart if data changes
 
  return(  
  <svg ref={svgRef} width={svgWidth} height={svgHeight} />
 
  );
};
 

