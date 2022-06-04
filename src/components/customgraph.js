import React, {useState,useEffect} from 'react';
import MultilineChart from "./d3component/multilinechart.js";
import Barchart from "./d3component/barchart.js";
import Scatterplot from "./d3component/scatterplot.js";
import Sankey from "./d3component/sankeyv2";



  const dimensions = {
    width: 900,
    height: 500,
    margin: {
      top: 30,
      right: 30,
      bottom: 30,
      left: 60
    }
  };


export default function Customgraph(props) {
  

  const {charttype,dataset,extrainformation} = props;

 
if (charttype === "linechart")
{
return(
        <MultilineChart
        data={dataset}
        dimensions={dimensions}
      
      />
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
else if (charttype ==="scatterplot")
{
  return(

    <div>
      <Scatterplot
      data={dataset}
      dimensions={dimensions}
      />
    
    </div>
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