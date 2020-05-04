import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class Success extends Component{
    render(){
        return(
            <div>
                <h1 className="ui centered">Success! Welcome to DPIEventApp</h1>
                <button class="ui button" onClicked={()=>{window.open(`http://127.0.0.1:5000/`)}}>
                  Go to homepage
                </button>
            </div>
        )
    }
}

export default Success;
