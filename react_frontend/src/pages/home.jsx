import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Event from '../containers/event.jsx';
import Header from '../containers/header.jsx'
import Collection_cell from '../containers/collection_cell.jsx'
import Collection from '../containers/collection.jsx'
import styled from 'styled-components'
import '../style.css'
import Popup from '../containers/Popup.jsx'
import { Modal } from "react-responsive-modal";

const EventContainer = styled.div`
  height: 100%;
  width: 100%;
  border: solid black 0.2rem;
  display: block;
`

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
      events: [],
      event_carousel_num: 12,
      popup_index: -1
    }

    this.fetchAllEvents = this.fetchAllEvents.bind(this)
    this.eventList = this.eventList.bind(this)
    this.togglePopup = this.togglePopup.bind(this)
  }

  componentDidMount(){
    this.fetchAllEvents()
  }

  componentDidUpdate(){
    console.log(this.state.popup_index)
  }

  togglePopup(event_index){
    this.setState({
      popup_index: event_index
    })
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
          events: res['response'],
          event_carousel_num: res['response'].length < 12 ? res['response'].length : 12
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
    const { popup_index } = this.state
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
                <EventContainer onClick={() => this.togglePopup(i)}>
                     <Event info = {{title: item['title'],
                                  type: "Academic",
                                  img: item['link'],
                                  description: item['description'],
                                  timestamp: item['timestamp']}}/>
                </EventContainer>
              )
            })}
          </Carousel>
        </CarouselContainer>

        <Modal open={popup_index === 1} onClose = {this.togglePopup(-1)}>
          hello again
        </Modal>
      </div>
    )
  }
}

export default HomePage;
