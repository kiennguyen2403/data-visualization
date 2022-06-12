import React,{useEffect, useRef,useState} from "react";
import * as d3 from "d3";
import {sankeyCircular,addCircularPathData,sankeyJustify} from "./d3-sankey-circular"


// declare and export the function so that it can be used in the production page
export function highlightNodes (node, name){
  let opacity = 0.3

  if (node.name == name) {
    opacity = 1;
  }
  node.sourceLinks.forEach(function (link) {
    if (link.target.name == name) {
      opacity = 1;
    };
  })
  node.targetLinks.forEach(function (link) {
    if (link.source.name == name) {
      opacity = 1;
    };
  })

  return opacity;
}

export default function Sankey(props) {
const {data,dimensions} = props
const svgRef = React.useRef(null);
const { width, height, margin } = dimensions;
const svgWidth = width + margin.left + margin.right;
const svgHeight = height + margin.top + margin.bottom;
useEffect(()=>{
var sankey = sankeyCircular()
  .nodeWidth(10)
  .nodePadding(20) 
  .nodePaddingRatio(0.5)
  .size([width, height])
  .nodeId(function (d) {
    return d.name;
  })
  .nodeAlign(sankeyJustify)
  .iterations(5)
  .circularLinkGap(3)
  .sortNodes("col")

  const svgEl = d3.select(svgRef.current).attr("id","graph_container");;
  svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
  const svg = svgEl
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top+50})`);


  svg
  .append("text")
  .text("Flow of energy production from 2015 to 2019")
  .attr("x",220)
  .attr("y",-20)
  .attr("class","graph_title")
var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var linkG = g.append("g")
  .attr("class", "links")
  .attr("fill", "none")
  .attr("stroke-opacity", 0.4)
  .selectAll("path");

var nodeG = g.append("g")
  .attr("class", "nodes")
  .attr("font-family", "sans-serif")
  .attr("font-size", 15)
  .selectAll("g");

let sankeyData = sankey(data);
let sankeyNodes = sankeyData.nodes;
let sankeyLinks = sankeyData.links;

let depthExtent = d3.extent(sankeyNodes, function (d) { 
    return d.depth; 
});

var nodeColour = d3.scaleSequential(d3.interpolateCool)
                    .domain([0, width]);

var node = nodeG.data(sankeyNodes)
                .enter()
                .append("g");

node.append("rect")
  .attr("x", function (d) {
    return d.x0;
  })
  .attr("y", function (d) { 
    return d.y0; 
  })
  .attr("height", function (d) { 
    return d.y1 - d.y0; 
  })
  .attr("width", function (d) { 
    return d.x1 - d.x0; 
  })
  .attr("id",(d)=>d.name)
  .attr("class","sankeyrect")
  .style("fill", function (d) { 
  
    return nodeColour(d.x0); 
  })
  .style("opacity", 0.5)
  .on("mouseover", function(d){
    let thisName=d.target.id;
    node.selectAll("rect").transition().duration(500)
      .style("opacity", function (d) {
        console.log(d.name)
        return highlightNodes(d, thisName)
      })

    d3.selectAll(".sankey-link").transition().duration(500)
      .style("opacity", function (l) {
        return l.source.name == thisName || l.target.name == thisName ? 1 : 0.3;
      })

    node.selectAll("text").transition().duration(500)
      .style("opacity", function (d) {
  
        return highlightNodes(d, thisName)
      })
  })
  .on("mouseout", function (d) {
    d3.selectAll("rect").style("opacity", 0.5).transition().duration(500);
    d3.selectAll(".sankey-link").style("opacity", 0.7).transition().duration(500);
    d3.selectAll("text").style("opacity", 1).transition().duration(500);
  })


node.append("text")
  .attr("x", function (d) { 
    return (d.x0 + d.x1) / 2; })
  .attr("y", function (d) { return d.y0 - 12; 
  })
  .attr("dy", "0.35em")
  .attr("text-anchor", "middle")
  .attr("class","rectdes")
  .text(function (d) { 
    return d.name; 
  });

node.append("title")
  .text(function (d) { 
    return d.name + "\n" + (d.value); 
  });

var link = linkG.data(sankeyLinks)
  .enter()
  .append("g")

const colorScale = d3.interpolateRainbow;
function addGradientStop(gradients, offset, fn) {
    return gradients.append("stop")
                    .attr("offset", offset)
                    .attr("stop-color", fn);
}

function color(index) {
    let ratio = index / (data.nodes.length - 1.0);
    return colorScale(ratio);
}

let gradients = link.append("linearGradient")
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", d => d.source.x1)
  .attr("x2", d => d.target.x0)
  .attr("id", d => getGradientId(d));
addGradientStop(gradients, 0.0, d => color(d.source.index));
addGradientStop(gradients, 1.0, d => color(d.target.index));

link.append("path")
  .attr("class", "sankey-link")
  .attr("d", function (link) {
    return link.path;
  })
  .attr("stroke", d => `url(#${getGradientId(d)})`)
  .style("stroke-width", function (d) { 
    return Math.max(1, d.width); 
  })
  .style("opacity", 0.7)


link.append("title")
  .text(function (d) {
    return d.source.name + " → " + d.target.name + "\n Index: " + (d.index);
  });

function getGradientId(d) {
    return `gradient_${d.source.id}_${d.target.id}`;
}

},[data])
return <svg ref={svgRef} width={svgWidth-200} height={svgHeight} />;


}