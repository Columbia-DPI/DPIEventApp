import React, { Component } from "react";
import '../style.css';
import styled from "styled-components";
import Carousel from "react-multi-carousel";

const CarouselImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  position: absolute;
`

class Event extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const { title, type, img, timestamp, organizer } = this.props.info;
    return(
      <div class="item cultural col-sm-6 col-md-4 col-lg-4 mb-4">
            <a class="item-wrap">
              <div class="event-info">
                <h3>{title}</h3>
                <span>{type} <br /> {organizer} <br /> {timestamp} <br /></span>
              </div>
              <CarouselImg src={img}/>
            </a>
      </div>
    )
  }
}
export default Event;