import React, { Component } from "react";
import '../style.css'
import _ from "lodash";
import Collection_cell from '../containers/collection_cell.jsx'
import { Header, Image, Label } from 'semantic-ui-react'

class Profile extends Component {

  state = {
    eventList: this.eventList(),
    allTags: this.allTags(),
  }

  eventList() {
      return Array(6)
        .fill()
        .map((item, i) => <Collection_cell info = {{title:"DPI Info session",type:"Academic",img:"img_"+(i+1),
                                            description:"This event has free food and guest speakers!"}}/>)
  }
  allTags() {
    const colors = [
      "orange",
      "yellow",
      "olive",
      "green",
      "teal",
      "blue",
      "violet",
      "purple"
    ]
    const nameTags = [
      "Pre-professional",
      "Party",
      "Social",
      "Cultural",
      "Recruiting",
      "Computer Science",
      "Free Food",
      "On Campus"
    ]
    var i = 0
    var tags = Array(8)
    for (i = 0; i < 8; i++) {
      tags[i]= <Label color={colors[i]} key={nameTags[i]} style={{marginTop:"5px",marginBottom:"5px"}}>
              {_.capitalize(nameTags[i])}
            </Label>
    }
    return tags
  }



  render() {
    var listComp = this.eventList()
    const tags = this.allTags()
    return (
      <div>
       <Image circular src={require("../img/profile.png")} style={{height : "auto", width : "25%",marginLeft:"auto",marginRight:"auto"}}/>
       <div>
        <Header as='h2' content='Username' style={{marginTop:"10px",marginBottom:"20px"}}>
          Username
          </Header>

          <Header as='h3' content='SEAS 2022' style={{marginTop:"15px"}}/>

        <div>
          <h3 style={{textAlign:"left",marginLeft:"20%",marginBottom:"20px"}}>I am interested in...</h3>
        </div>

        <div style={{marginLeft:"20%", marginRight:"20%",marginBottom:"35px"}}>
          {tags}
        </div>
        </div>
        <div>
          <h3 style={{textAlign:"left",marginLeft:"20%",marginBottom:"20px"}}>Events hosted by me:</h3>
        </div>
        <div style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}>
          {listComp}
        </div>

      </div>
    )
  }
}

export default Profile;
