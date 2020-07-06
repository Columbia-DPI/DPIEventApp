import React, { Component } from "react";
import Event from '../containers/event.jsx';
import Header from '../containers/header.jsx'
import Collection_cell from '../containers/collection_cell.jsx'
import '../style.css'
import styled from 'styled-components'

class AllEvents extends Component {

  state = {
    serverData: null,
    eventList: [],
    tags:[]
  }

  removeTag = (i) => {
    const newTags = [...this.state.tags]
    newTags.splice(i,1);
    this.setState({tags:newTags}, () => {
      this.getEvents();
    });
  }

  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      this.setState({ tags: [...this.state.tags, val]}, () => {
        this.getEvents();
      });
      this.tagInput.value = null;
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  }


  getEvents() {
    let payload={
      "tags": this.state.tags,
    };
    let url = "./api/searchEvents";
    fetch(url, {
      method: "post",
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(res => {
        this.setState({
          eventList: res['response']
      })})
  }

  eventList() {
      return this.state.eventList.map((item, i) => <Collection_cell info = {{title:item['title'],type:"Academic",img:"img_"+(i+1),description:"This event has free food and guest speakers!"}}/>)
  }

  componentDidMount(){
    this.getEvents();
  }

  render() {
    // store value in serverData


    var listComp = this.state.eventList
    const tags = this.state.tags || []

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
          {this.state.eventList.map((item, i) => <Collection_cell info = {{title:item['title'],type:item['tags'].join(", "),img:item['link'],description:item['description']}}/>)}
        </div>
      </div>
    )
  }
}

export default AllEvents;
