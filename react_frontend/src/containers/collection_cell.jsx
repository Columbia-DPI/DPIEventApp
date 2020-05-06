import React, { Component } from "react";
import '../style.css'

class Collection_cell extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    const title = this.props.info.title;
    const type = this.props.info.type;
    const img = this.props.info.img;
    const description = this.props.info.description;
    var selected = this.props.info.selected;
    var selectedStyle = "Column_left"
    var textedStyle = "Column_right"
    if (selected){
      selectedStyle="Column_left_large"
      textedStyle = "Column_right_large"
    }
    return(
      <div class="Row_cell" onClick={selected=true}>
        
          <div class={selectedStyle}>
          <img class="img-cell" src={require("../img/"+img+".jpg")}
                              style={{height : "auto", width : "100%"}}/>
            </div>
          <div class={textedStyle}>
            <h4 style={{margin:"auto"}}>
              {title}
              </h4>
            <p style={{margin:"auto"}}>{type}</p>
            <span>{description}</span>
          </div>
        </div>
    )
  }
}
export default Collection_cell;