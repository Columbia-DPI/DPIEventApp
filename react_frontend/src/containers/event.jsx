import React, { Component } from "react";
import '../style.css'

var divStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: "../img/img_2.jpg"
};

class Event extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const title = this.props.info.title;
    const type = this.props.info.type;
    const img = this.props.info.img;
    return(
      <div class="item cultural col-sm-6 col-md-4 col-lg-4 mb-4">
            <a class="item-wrap fancybox">
              <div class="event-info">
                <h3>title</h3>
                <span>type <br /> Thursday 04/24 <br /> 2:00-4:00 PM</span>
              </div>
              <img class="img-fluid" src={ require("../img/"+img+".jpg")}/>
            </a>
      </div>
    )
  }
}
export default Event;