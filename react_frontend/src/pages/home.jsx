import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Event from '../containers/event.jsx';
import Header from '../containers/header.jsx'
import Collection_cell from '../containers/collection_cell.jsx'
import Collection from '../containers/collection.jsx'
import '../style.css'

class HomePage extends Component {

  state = {
    serverData: null,
    currentIndex: 0,
    itemsInSlide: 1,
    showList: false,
    responsive: { 0: { items: 3 } },
    galleryItems: this.galleryItems(),
    eventList: this.eventList(),
  }

  galleryItems() {
      return Array(6)
      .fill()
      .map((item, i) => <Event info = {{title:"Event name",type:"Academic",img:"img_"+(i+1)}}/>)
  }
/*
  fetchResults() {
    let that = this;
    let payload = {
      "placeholder": "nothing rn",
    };
    let uri = "./api/getAllEvents";
    fetch(uri, {
      method: "post",
      body: JSON.stringify(payload)
    }).then(function(response){
      return response.json();
    }).then(function(data){
      //console.log(data);
      //console.log("Fetched: "+JSON.stringify(data));
      //return JSON.stringify(data);
      // that.setState({serverData:data.response});
    });
  }
*/
  fetchResults() {
    let payload={
      "placeholder": "nothing rn",
    };
    let url = "./api/getAllEvents";
    let fetchPromise = fetch(url, {
      method: "post",
      body: JSON.stringify(payload)
    });
    let jsonPromise = fetchPromise.then(response => response.json());

    return Promise.all([fetchPromise, jsonPromise]).then(function(data) {
      return {
        json: JSON.stringify(data),
        data: data.response
      };
    });
  }

  eventList() {
      return Array(6)
        .fill()
        .map((item, i) => <Collection_cell info = {{title:"DPI Info session",type:"Academic",img:"img_"+(i+1),description:"This event has free food and guest speakers!"}}/>)
  }

  slidePrevPage = () => {
    const currentIndex = this.state.currentIndex - this.state.itemsInSlide
    this.setState({ currentIndex })
  }

  slideNextPage = () => {
    const {
      itemsInSlide,
      galleryItems: { length },
    } = this.state
    let currentIndex = this.state.currentIndex + itemsInSlide
    if (currentIndex > length) currentIndex = length

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
    // store value in serverData
    if (this.serverData==null){
    this.fetchResults().then(
      data=>{
        data=data.json;
        this.setState({
          serverData:data
        });
      }
    );}

    console.log("serverData: ", this.state['serverData']);
    // javascript code here
    var listComp = null
    var showButton = <button class="showEventButton" onClick={this.displayAllEvents}>show all events</button>
    const { currentIndex, galleryItems, responsive, showList} = this.state
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
              items={galleryItems}
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
