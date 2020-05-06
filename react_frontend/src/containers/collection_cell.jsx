import React, { Component } from "react";
import '../style.css'

class Collection_cell extends Component {
  constructor(props){
    super(props);
    this.state = {selected:false, selectedStyle: "Column_left", textedStyle: "Column_right"};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      selected: !state.selected
    }));
    if (this.state.selected){
      this.setState(state => ({
        selectedStyle: "Column_left_large",
        textedStyle: "Column_right_large"
      }));
    } else {
      this.setState(state => ({
        selectedStyle: "Column_left",
        textedStyle: "Column_right"
      }));
    }
  }
  render(){
    const title = this.props.info.title;
    const type = this.props.info.type;
    const img = this.props.info.img;
    const description = this.props.info.description;
    return( 
      <div class="Row_cell" onClick={this.handleClick}>
          <div class={this.state.selectedStyle}>
          <img class="img-cell" src={img}
                              style={{height : "10rem", width : "100%"}}/>
            </div>
          <div class={this.state.textedStyle}>
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