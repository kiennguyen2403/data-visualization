import React, {useState,useEffect} from 'react';
import MultilineChart from "./d3component/multilinechart.js";
import Barchart from "./d3component/barchart.js";

import Sankey from "./d3component/sankeyv2";



  

export default function Customgraph(props) {
  
//assing the required sizes of the chart
  const {charttype,dataset,extrainformation} = props;
  const dimensions = {
    width: 700*0.9,
    height: 500*0.9,
    margin: {
      top: 30*0.9,
      right: 80*0.9,
      bottom: 50*0.9,
      left: 60*0.9
    }
  };

 //return suitable graph that fit with the string
if (charttype === "linechart")
{
return(
        <MultilineChart
        data={dataset}
        dimensions={dimensions}/>
)

}
else if (charttype ==="barchart")
{
  return(
      <Barchart
        data={dataset}
        dimensions={dimensions}
        statename={extrainformation}
      />
  )
}

else if (charttype=="sankey")
{
  return (
    <div>
      <Sankey data={dataset} dimensions={dimensions}/>
    </div>
  )
}

}