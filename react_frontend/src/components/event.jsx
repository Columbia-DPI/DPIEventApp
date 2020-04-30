import React, { Component } from "react";

class Event extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        this.props.info['title']
      </div>
    )
  }
}
export default Event;
