import React, { Component } from "react";

class Event extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const title = this.props.info.title;
    return(
      <div>
         {title}
      </div>
    )
  }
}
export default Event;
