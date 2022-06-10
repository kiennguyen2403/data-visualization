import React from "react";
import * as d3 from "d3";


export default function Barchart(props) 
{
    const {data, dimensions,statename} = props;
    console.log(data)
    const dataset=[];
    for (let i in data) {

   
      if (typeof data[i]=="number")
      {
      dataset.push({name:i,value:data[i]});
      }
    }
  
    const svgRef = React.useRef(null);
    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    

    React.useEffect(()=>
    {
        const xScale = d3.scaleBand().domain(d3.range(dataset.length)).range([0,width]).paddingInner(0.3);
        
        const yScale = d3.scaleLinear().domain([d3.max(dataset,function(d){return d.value}),d3.min(dataset,function(d){return d.value})]).range([margin.bottom,height-margin.top])
    
         // Create root container where we will append all other chart elements
        const svgEl = d3.select(svgRef.current).attr("id","graph_container");;
        svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
        const svg = svgEl
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top+100})`);
   // Add X grid lines with labels
   const xAxis = d3.axisBottom(xScale)
     .ticks(5)

   const xAxisGroup = svg.append("g")
     .attr("transform", `translate(0, ${height - margin.bottom})`)
     .call(xAxis);

   xAxisGroup.select(".domain").remove();
   xAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
   xAxisGroup.selectAll("text").data(dataset)
    .text(function(d) {return d.name})
    .attr("opacity", 0.5)
    .attr("color", "black")
    .attr("width","10px")
    .attr("font-size", "0.75rem");
   // Add Y grid lines with labels
     svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .transition().duration(1000).ease(d3.easeElasticOut)
     .attr("x", function(d, i){
         return xScale(i);
     })
     .attr("y", function(d){
         return +(height - yScale(d.value) - 60);
     })
     .attr("width", Math.floor(xScale.bandwidth()))
     .attr("height", function(d){
         return (yScale(d.value));
     })
     .attr("fill", "darkslateblue")
     ;
 
     svg
     .append("text")
     .text("Energy consumptions of "+statename+" in different types of resources")
     .attr("class","graph_title")
     .attr("x",20)
     .attr("y",550)
     
     var yAxis = d3.axisLeft().ticks(7).scale(yScale); //create yAxis
     svg.append("g").attr("transform", "translate("+(-10)+",-30)").call(yAxis);
     
    }, [dataset]);

    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}