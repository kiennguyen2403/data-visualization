import React from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import { Statedata } from "../data/state";
import { sankeydata as sankey} from '../data/data_sankey';


//Timeline
export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curIdx: 0,
      prevIdx: -1  //assign the default current index and previous index
    };
  }
  render() 
  {
    
    const EXAMPLE = [
  
    ];
   

  //use the data in the consumption page if it is in the consumption page
  if (this.props.mode=="consumption")
  {
    Statedata.forEach((data,i)=>{
      data.value.forEach(d=>{
        EXAMPLE.push({data:d.Time.slice(0,-2)});
      })
    })
  }
  //use the data in the production page if it is in the production page
  else if (this.props.mode =="production")
  {
    sankey.forEach(d=>{
      EXAMPLE.push({data:d.year})
    })
  }

    //assign the required values
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


