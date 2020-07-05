import React, { Component } from "react";
import Event from '../containers/event.jsx';
import Header from '../containers/header.jsx'
import Collection_cell from '../containers/collection_cell.jsx'
import '../style.css'
import styled from 'styled-components'

class AllEvents extends Component {

  state = {
    serverData: null,
    //eventList: this.eventList(),
    tags:[]
  }

  removeTag = (i) => {
    const newTags = [...this.state.tags]
    newTags.splice(i,1);
    this.setState({tags:newTags});
  }

  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      this.setState({ tags: [...this.state.tags, val]});
      this.tagInput.value = null;
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  }

  searchEvents_2() {
    let payload={
      "tags": this.state.tags

    };
    let url = "./api/searchEvents";
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

  searchEvents() {
    let payload={
      "tags": this.state.tags
    };
    let url = "./api/searchEvents";
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
    this.searchEvents().then(
      data=>{
        data=data.json;
        this.setState({
          serverData:data
        });
      }
    );}
    console.log("---------------------------------");
    console.log("serverData: ", this.state['serverData']);
    // javascript code here
    //var listComp = this.eventList()
    const tags = this.state.tags || []
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
        <div className="input-tag">
         <ul className="input-tag__tags">
           { tags.map((tag, i) => (
             <li key={tag}>
               {tag}
               <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
             </li>
           ))}
           <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
         </ul>
        </div>
        <div>
          {tags}
        </div>
      </div>
    )
  }
}

export default AllEvents;
