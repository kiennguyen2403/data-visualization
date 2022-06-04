import React from "react";
import * as d3 from "d3";



export default function Scatterplot(props){
    const {data, dimensions} = props;
    const svgRef = React.useRef(null);
    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;
    const dataset = [ 
      [5, 20], 
      [480, 90],  
      [250, 50],  
      [100, 33], 
      [330, 95], 
      [410, 12],  
      [475, 44],  
      [25, 67],  
      [85, 21],  
      [220, 88] 
   ]; 


    React.useEffect(()=>{
        const xScale = d3.scaleLinear()
        .domain([
          d3.min(dataset[1]),
          d3.max(dataset[1])
          ])
        .range([0, width]);
        
        const yScale = d3.scaleLinear()
            .domain([
            d3.min(dataset[0]),
            d3.max(dataset[0])
            ])
            .range([height, 0]);
    
         // Create root container where we will append all other chart elements
        const svgEl = d3.select(svgRef.current).attr("id","graph_container");
        svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
        const svg = svgEl
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top+100})`);
        const graphtitle = svg.append("text").text("Graph demonstrate the year").attr("id","graph_title");
        const controlbutton = svgEl.append("button").attr("type", "button");
   // Add X grid lines with labels
   const xAxis = d3.axisBottom(xScale)
     .ticks(5)
  
   const xAxisGroup = svg.append("g")
     .attr("transform", `translate(0, ${height - margin.bottom})`)
     .call(xAxis);
   xAxisGroup.select(".domain").remove();
   xAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
   xAxisGroup.selectAll("text")
     .attr("opacity", 0.5)
     .attr("color", "white")
     .attr("font-size", "0.75rem");
   // Add Y grid lines with labels
   const yAxis = d3.axisLeft(yScale)
     .ticks(5)
    
   const yAxisGroup = svg.append("g").call(yAxis);
   yAxisGroup.select(".domain").remove();
   yAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
   yAxisGroup.selectAll("text")
     .attr("opacity", 0.5)
     .attr("color", "white")
     .attr("font-size", "0.75rem");
     
     svg.selectAll("circle")
     .data(dataset)
     .enter()
     .append("circle")
     .transition().duration(1000)
     .attr("cx", function(d, i){
         return d[0];
     })
     .attr("cy", function(d,i){
         return d[1];
     })
     .attr("r", 5)
     .attr("fill", "slategrey")
    
     
  
    }, [dataset]);

    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;

}