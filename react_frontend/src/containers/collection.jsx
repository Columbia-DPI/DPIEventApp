import React, { Component } from "react";
import '../style.css'
import Collection_cell from './collection_cell.jsx'

class Collection extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const data = this.props.info.data;
    const listItems = data.map((d) => <Collection_cell info = {{title:d.title,type:d.type,img:d.img,description:d.description}}/>);
    return(
      <div>
        {listItems}
        </div>
    )
  }
}
export default Collection_cell;