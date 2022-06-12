import React from "react";
import * as d3 from "d3";


export default function Barchart(props) 
{
    //assign the required dataset
    const {data, dimensions,statename} = props;
    const dataset=[];
    //push the object into the dataset
    for (let i in data) 
    {
      if (typeof data[i]=="number" && data[i]!=0 && i!="Total energy consumption")
      {
      dataset.push({name:i,value:data[i]});
      }
    }
  

 
    const svgRef = React.useRef(null);
    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right+30;
    const svgHeight = height + margin.top + margin.bottom+100;

      
    //rerender when the dataset changes
    React.useEffect(()=>
    {
        const xScale = d3.scaleBand().domain(d3.range(dataset.length)).range([0,width+50]).paddingInner(0.35);
        
        const yScale = d3.scaleLinear().domain([0,d3.max(dataset,function(d){return d.value})]).range([height,margin.bottom])
    
         // Create root container where we will append all other chart elements
        const svgEl = d3.select(svgRef.current).attr("id","graph_container");;
        svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
        const svg = svgEl
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top+40})`);
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
    .attr("font-size", xScale.bandwidth()/7.5+2.5);
   // Add Y grid lines with labels
     svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("x", function(d, i){
         return xScale(i);
     })
     .attr("y", function(d){
         return +(yScale(d.value) - 55);
     })
     .attr("width", Math.floor(xScale.bandwidth()))
     .attr("height", function(d){
         return (height- yScale(d.value));
     })
     .attr("fill", "darkslateblue")
     .on("mouseover", function(i,d){ 
      d3.select(this).attr("fill","orange")
      var xPosition = parseFloat(d3.select(this).attr("x"));
      var yPosition = parseFloat(d3.select(this).attr("y"));
      svg.append("text").attr("id","tooltip").attr("x",xPosition+Math.floor(xScale.bandwidth()/2-18)).attr("y",yPosition-10).text(d.value+" PJ").attr("font-size","13px").transition()
      .duration(500);
      })
      .on("mouseout", function(event,d){ 
        d3.select(this).attr("fill","darkslateblue");
        svg.select("#tooltip").remove().transition()
     .duration(500)
    })
     .transition().duration(500).ease(d3.easeElasticOut)
     ;
     // Draw the bar chart
 

     //append the graph title
     svg
     .append("text")
     .text("Energy consumptions of "+statename+" by different resources")
     .attr("class","graph_title")
     .attr("x",0)
     .attr("y",500)

     
     
     var yAxis = d3.axisLeft().tickFormat(function(d){return d+" PJ"}).ticks(7).scale(yScale); //create yAxis

     
     svg.append("g").attr("transform", "translate(-10,-56)").call(yAxis); //append it to the yAxis
     
    
    }, [dataset]);
    

    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}