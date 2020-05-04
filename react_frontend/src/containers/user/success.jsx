import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import '../form.css';

class Success extends Component{
    render(){
        return(
            <div>
                <h1 className="ui centered">Success! Welcome to DPIEventApp</h1>
                <Button size='small' class="ui button" onClicked={()=>{window.open(`http://127.0.0.1:5000/`)}}>
                  Go to homepage
                </Button>
            </div>
        )
    }
}

export default Success;
