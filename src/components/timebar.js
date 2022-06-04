import React from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import { Australiatotal } from "../data/Australiaconsumption";
import { Statedata } from "../data/state";
import { sankeydata as sankey} from '../data/data_sankey';



export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curIdx: 0,
      prevIdx: -1
    };
  }

  

  render() 
  {
    
    const EXAMPLE = [
  
    ];
   
  if (this.props.mode=="consumption")
  {
    Statedata.forEach((data,i)=>{
      data.value.forEach(d=>{
        EXAMPLE.push({data:d.Time.slice(0,-2)});
      })
    })
  }
  else if (this.props.mode =="production")
  {
    sankey.forEach(d=>{
      EXAMPLE.push({data:d.year})
    })
  }



    const { curIdx, prevIdx } = this.state;
    const curStatus = EXAMPLE[curIdx].statusB;
    const prevStatus = prevIdx >= 0 ? EXAMPLE[prevIdx].statusB : "";
    return (
      <div id="timebar_container">
        <div
          style={{
            width: "80%",
            height: "100px",
            margin: "0 auto",
            marginTop: "20px",
            fontSize: "15px"
          }}
        >
          <HorizontalTimeline
            styles={{
              background: "#f8f8f8",
              foreground: "#1A79AD",
              outline: "#dfdfdf"
            }}
            index={this.state.curIdx}
            indexClick={(index) => {
              const curIdx = this.state.curIdx;
              this.setState({ curIdx: index, prevIdx: curIdx });
              this.props.Changetime(index);
    
            }}
            values={EXAMPLE.map((x) => x.data)}
          />
        </div>
      </div>
    );
  }
}


