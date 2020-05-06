import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Event from '../containers/event.jsx';
import Header from '../containers/header.jsx'
import Collection_cell from '../containers/collection_cell.jsx'
import Collection from '../containers/collection.jsx'
import styled from 'styled-components'
import '../style.css'

const CarouselContainer = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  display: table;
  table-layout: fixed;
  border-spacing: 10px;
  background: red;
`
const ColumnSide = styled.div`
  display: table-cell; /*Optional*/
  width: 10%;
  & :hover {
    background: lightGray
  }
`
const ColumnCenter = styled.div`
  display: table-cell;
  background: blue;
  width: 80%; 
`

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      serverData: null,
      currentIndex: 0,
      itemsInSlide: 1,
      showList: false,
      responsive: { 0: { items: 3 } },
      events: []
    }

    this.fetchAllEvents = this.fetchAllEvents.bind(this)
    this.eventList = this.eventList.bind(this)
    this.slideNextPage = this.slideNextPage.bind(this)
    this.slidePrevPage = this.slidePrevPage.bind(this)
    this.displayAllEvents = this.displayAllEvents.bind(this)
    this.handleOnSlideChange = this.handleOnSlideChange.bind(this)
    this.eventList = this.eventList.bind(this)
    this.printindex = this.printindex.bind(this)
  }

  componentDidMount(){
    this.fetchAllEvents()
  }

  componentDidUpdate(){
    console.log(this.state.currentIndex)
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

  printindex(){
    console.log(this.state.currentIndex)
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

  slidePrevPage = () => {
    const currentIndex = Math.max(0, this.state.currentIndex - this.state.itemsInSlide)
    this.setState({ currentIndex: currentIndex })
  }

  slideNextPage = () => {
    let currentIndex = this.state.currentIndex + this.state.itemsInSlide
    if (currentIndex > this.state.events.length) currentIndex = this.state.events.length
    this.setState({ currentIndex: currentIndex })
    console.log("currentIndex: " + currentIndex + ", this.state.currentIndex: " + this.state.currentIndex)
    
  }

  handleOnSlideChange = (event) => {
    this.setState({ currentIndex: event.item })
    console.log("handleOnSlideChange: event.item=" + event.item + ", currentIndex: " + this.state.currentIndex)
  }

  displayAllEvents = () =>{
    this.setState({
      showList: !this.state.showList
    })
  }

  render() {
    var listComp = null
    var showButton = <button class="showEventButton" onClick={this.displayAllEvents}>show all events</button>
    const { currentIndex, events, responsive, showList} = this.state
    if (showList){
      listComp = this.eventList("all")
      showButton = <button class="collapseEventButton" onClick={this.displayAllEvents}>collapse list</button>
    }

    return (
      <div>
        <Header/>
        <button onClick={this.printindex}>print state</button>
        <CarouselContainer>
          <ColumnSide>
            <button class="button" onClick={this.slidePrevPage}><i class="i arrow left"></i></button>
          </ColumnSide>
          <ColumnCenter>
            <AliceCarousel
              items={this.eventList("carousel")}
              slideToIndex={currentIndex}
              responsive={responsive}
              buttonsDisabled={false}
              onInitialized={this.handleOnSlideChange}
              onSlideChanged={this.handleOnSlideChange}
              onResized={this.handleOnSlideChange}
            />
          </ColumnCenter>
          <ColumnSide>
            <button class="button" onClick={this.slideNextPage}><i class="i arrow right"></i></button>
          </ColumnSide>
        </CarouselContainer>
        <div>
          {showButton}
        </div>
        <div>
          {listComp}
        </div>

      </div>
    )
  }
}

export default HomePage;
