import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Event from '../containers/event.jsx';
import Header from '../containers/header.jsx'
import Collection_cell from '../containers/collection_cell.jsx'
import Collection from '../containers/collection.jsx'
import styled from 'styled-components'
import '../style.css'
import { Button } from "semantic-ui-react";


const responsiveCarousel = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

const CarouselContainer = styled.div`
  width: 100%;
  padding: 0 8rem;
  margin-top: 3rem;
`

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      serverData: null,
      events: []
    }

    this.fetchAllEvents = this.fetchAllEvents.bind(this)
    this.eventList = this.eventList.bind(this)
  }

  componentDidMount(){
    this.fetchAllEvents()
  }

  
  fetchAllEvents() {
    let payload={
      "placeholder": "nothing rn",
    };
    let url = "./api/getAllEvents";
    fetch(url, {
      method: "post",
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(res => {
        this.setState({
          events: res['response']
      })})
  }

  eventList(type) {
      if (type == "all"){
          return this.state.events
          .map((item, i) => <Collection_cell info = {{title: item['title'],
                                                      type: "Academic",
                                                      img: item['link'],
                                                      description: item['description'], 
                                                      timestamp: item['timestamp']}}/>)
      }
      return this.state.events
        .map((item, i) => <Event info = {{title: item['title'],
                                                    type: "Academic",
                                                    img: item['link'],
                                                    description: item['description'],
                                                    timestamp: item['timestamp']}}/>)
  }

  render() {
    return (
      <div>
        <Header/>
        <CarouselContainer>
          <Carousel responsive={responsiveCarousel}
                    autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this.props.deviceType}
                    itemClass="carousel-item-padding-40-px">
            {this.state.events.map((item, i) => {
              return(
                <div key={"div" + i}>
                  <Event info = {{title: item['title'],
                                                    type: "Academic",
                                                    img: item['link'],
                                                    description: item['description'],
                                                    timestamp: item['timestamp']}}/>
                </div>
              )
            })}
          </Carousel>
        </CarouselContainer>

      </div>
    )
  }
}

export default HomePage;
