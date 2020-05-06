import React, { Component } from "react";
import '../style.css'
import Collection_cell from './collection_cell.jsx'
import _ from "lodash";
import { Dropdown, Search } from "semantic-ui-react";

class SearchDropdown extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const addressDefinitions = [
      "Academic",
      "Pre-Professional",
      "Social",
      "Free food!",
      "Lerner"
    ];
    const stateOptions = _.map(addressDefinitions, (state, index) => ({
      key: addressDefinitions[index],
      text: state,
      value: addressDefinitions[index]
    }));
    return(
      <div>
          <div style={{tableLayout:"fixed",borderSpacing:"10px",marginLeft:"10%", marginRight:"10%"}}>
            <div style={{display:"table-cell",width:"80%"}}>
              <div style={{width : "100%", marginLeft:"auto", marginRight:"auto",marginTop:"5px",marginBottom:"15px"}}> 
                <Dropdown
                  placeholder="Filter by tag"
                  fluid
                  multiple
                  search
                  selection
                  options={stateOptions}
                />
              </div>
            </div>
            <div style={{display:"table-cell",width:"100%"}}>
                <Search
                //loading={isLoading}
                //onResultSelect={this.handleResultSelect}
                //onSearchChange={_.debounce(this.handleSearchChange, 500, {
                //  leading: true,
               // })}
                //results={results}
                //value={value}
                //{...this.props}
              />
            </div>
          </div>
        </div>

      
    )
  }
}
export default SearchDropdown;