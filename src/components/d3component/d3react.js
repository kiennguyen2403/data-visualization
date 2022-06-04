import React from 'react';
import node from './d3'
import rd3 from 'react-d3-library';
const RD3Component = rd3.Component;

export default class RD3 extends React.Component 
{

  constructor(props) 
  {
    super(props);
    this.state = {d3: ''};
  }
  
  componentDidMount()
  {
      this.setState({d3: node});
  }

  
  render() 
  {
    return (
      <div>
        <RD3Component data={this.state.d3} />
      </div>
    )
  }
}