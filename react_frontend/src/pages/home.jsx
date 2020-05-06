import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Event from '../containers/event.jsx';
import Header from '../containers/header.jsx'
import Collection_cell from '../containers/collection_cell.jsx'
import Collection from '../containers/collection.jsx'
import '../style.css'

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

  eventList() {
      return this.state.events
        .map((item, i) => <Collection_cell info = {{title: item['title'],
                                                    type: "Academic",
                                                    img: item['link'],
                                                    description: item['description']}}/>)
  }

  slidePrevPage = () => {
    const currentIndex = this.state.currentIndex - this.state.itemsInSlide
    this.setState({ currentIndex })
  }

  slideNextPage = () => {
    const {
      itemsInSlide,
    } = this.state
    let currentIndex = this.state.currentIndex + itemsInSlide
    if (currentIndex > this.state.events.length) currentIndex = this.state.events.length

    this.setState({ currentIndex })
  }

  handleOnSlideChange = (event) => {
    const { itemsInSlide, item } = event
    this.setState({ itemsInSlide, currentIndex: item })
  }

  displayAllEvents = () =>{
    const {
      showList,
    } = this.state
    if (showList){
      this.setState({showList:false})
    } else {
      this.setState({showList:true})
    }
  }

  render() {

    console.log("events: ", this.state.events);

    // javascript code here
    var listComp = null
    var showButton = <button class="showEventButton" onClick={this.displayAllEvents}>show all events</button>
    const { currentIndex, events, responsive, showList} = this.state
    if (showList){
      listComp = this.eventList()
      showButton = <button class="collapseEventButton" onClick={this.displayAllEvents}>collapse list</button>
    }


    return (
      <div>
        <Header/>
        <div class="Row">
          <div class="Column_side">
            <button class="button" onClick={this.slidePrevPage}><i class="i arrow left"></i></button>
            </div>
          <div class="Column_center">
            <AliceCarousel
              items={this.eventList()}
              slideToIndex={currentIndex}
              responsive={responsive}
              buttonsDisabled={false}
              onInitialized={this.handleOnSlideChange}
              onSlideChanged={this.handleOnSlideChange}
              onResized={this.handleOnSlideChange}
            />
          </div>
          <div class="Column_side">
            <button class="button" onClick={this.slideNextPage}><i class="i arrow right"></i></button>
          </div>
        </div>
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
