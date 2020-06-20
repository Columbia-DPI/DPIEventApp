import React, { Component } from "react";
import Event from '../containers/event.jsx';
import Header from '../containers/header.jsx'
import Collection_cell from '../containers/collection_cell.jsx'
import '../style.css'
import styled from 'styled-components'

class AllEvents extends Component {

  state = {
    serverData: null,
    eventList: this.eventList(),
  }

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
    var listComp = this.eventList()
    /*
    var listComp = null
    var showButton = <button class="showEventButton" onClick={this.displayAllEvents}>show all events</button>
    const { currentIndex, galleryItems, responsive, showList} = this.state
    if (showList){
      listComp = this.eventList()
      showButton = <button class="collapseEventButton" onClick={this.displayAllEvents}>collapse list</button>
    }
    */

    return (
      <div>
        <Header/>
        <div>
          {listComp}
        </div>
      </div>
    )
  }
}

export default AllEvents;
