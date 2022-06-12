import {React,useState, useEffect}from 'react';
import Customgraph from './customgraph';
import { DataGrid } from '@mui/x-data-grid';
import { sankeydata as sankey} from '../data/data_sankey';
import { highlightNodes } from './d3component/sankeyv2';
import Timeline from './timebar';
import * as d3 from "d3";

export default function Production() {

  //assign the table layout
    const columns = [
        { field: 'production', headerName: 'Production Type', width: 200, fontWeight:"bold"},
      
      ];
        //assign the required value
        const [tabledata, setTableData] = useState({id:1,production:"Value"});
        const [time,setTime] =useState(0)
        const Changethetime = (index) =>
        {
            setTime(index);
           
        }

        //change when the data change
        useEffect(()=>{
          var value= [];
          sankey[time].nodes.forEach((node,i)=>{
            value.push({id:i, production:node.name});
          })
          setTableData(value);
      
        },[])
    

    
    return(
    <div>
       
      <Timeline Changetime={Changethetime} mode="production"></Timeline>
       <div id="production"> 
        <div id="sankey_container"> 
        <Customgraph charttype="sankey" dataset={sankey[time]}></Customgraph>
        </div>
        <div id="table_container">
        <p className='graph_title'>List of categories</p>
        <DataGrid
        sx={{'.MuiDataGrid-columnHeaderTitle':{fontWeight:"bold"}}}
        rows={tabledata}
        columns={columns}
        pageSize={12}
        hideFooterSelectedRowCount
        rowsPerPageOptions={[5]}
        onCellClick={(d,i)=>{
        
          //change the sankey data if onclicked
  
          let thisName=d.value;
           d3.selectAll(".sankeyrect").transition().duration(500)
          .style("opacity",function(d,i){
            console.log(d.name)
            return highlightNodes(d, thisName)
          })
          d3.selectAll(".sankey-link").transition().duration(500)
          .style("opacity", function (l) {
              return l.source.name == thisName || l.target.name == thisName ? 1 : 0.3;
          })
          d3.selectAll(".rectdes").transition().duration(500)
          .style("opacity",(function (d,i) {
            return highlightNodes(d, thisName)
          }))
          }}
        onCellDoubleClick={(d,i)=>{
          //Return the to the default setting
          d3.selectAll("rect").style("opacity", 0.5).transition().duration(500);
          d3.selectAll(".sankey-link").style("opacity", 0.7).transition().duration(500);
          d3.selectAll("text").style("opacity", 1).transition().duration(500);
        }}
      />
        </div>
    </div>
    <div className="context">
  <p>The total amount of primary energy produced in the Australian economy, measured before consumption or transformation, is referred to as energy production. Primary energy sources are renewable energy sources that provide electricity without a thermal component, such as wind, hydro, and solar PV. Because the coal is previously accounted for when mined, coal-fired electricity generation is termed secondary energy output.
By understanding how the energy is transformed and transmitted, we would aware of using more clean or natural energy and reducing the consumption of fossil or non-renewable resources. The graph below is generated to demonstrate the flow of energy from the input to the output, which might give you the most general ideas. This diagram also represents how much amount of one resource has been contributed to the one in the next level of energy. 
</p>
</div>
    </div>
);


}