import React, { Component } from "react";
import '../style.css'

class Collection extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const title = this.props.info.title;
    const type = this.props.info.type;
    const img = this.props.info.img;
    const description = this.props.info.description;
    return(
      <div class="Row_cell">
        
          <div class="Column_left">
          <img class="img-cell" src={require("../img/"+img+".jpg")}
                              style={{height : "auto", width : "100%"}}/>
            </div>
          <div class="Column_right">
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
export default Collection;