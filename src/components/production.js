import {React,useState, useEffect}from 'react';
import Customgraph from './customgraph';
import { DataGrid } from '@mui/x-data-grid';
import { sankeydata as sankey} from '../data/data_sankey';
import { highlightNodes } from './d3component/sankeyv2';
import Timeline from './timebar';
import * as d3 from "d3";

export default function Production() {
    const columns = [
        { field: 'production', headerName: 'Production Type', width: 200 },
      
      ];
        
        const [tabledata, setTableData] = useState({id:1,production:"Value"});
        const [time,setTime] =useState(0)
        const Changethetime = (index) =>
        {
            setTime(index);
           
        }
        useEffect(()=>{
          var value= [];
          sankey[time].nodes.forEach((node,i)=>{
            value.push({id:i, production:node.name});
          })
          setTableData(value);
      
        },[])
        
        console.log(time);
        console.log(sankey[time]);
    return(
    <div>
      <Timeline Changetime={Changethetime} mode="production"></Timeline>
       <div id="production"> 
        <div id="sankey_container"> 
        <Customgraph charttype="sankey" dataset={sankey[time]}></Customgraph>
        </div>
        <div id="table_container">
        <DataGrid
        rows={tabledata}
        columns={columns}
        pageSize={12}
        hideFooterSelectedRowCount
        rowsPerPageOptions={[5]}
        onCellClick={(d,i)=>{
          let thisName=d.value;
           d3.selectAll("rect")
          .style("opacity", function (d) {
       
            return highlightNodes(d, thisName)
          })
          d3.selectAll(".sankey-link")
          .style("opacity", function (l) {
              return l.source.name == thisName || l.target.name == thisName ? 1 : 0.3;
          })

          d3.selectAll("text")
          .style("opacity", function (d) {
            return highlightNodes(d, thisName)
          })
            
          }}
        

        onCellDoubleClick={(d,i)=>{

          d3.selectAll("rect").style("opacity", 0.5);
          d3.selectAll(".sankey-link").style("opacity", 0.7);
          d3.selectAll("text").style("opacity", 1);
          

        }}
        
      />
      
        </div>

    </div>
    </div>
);


}