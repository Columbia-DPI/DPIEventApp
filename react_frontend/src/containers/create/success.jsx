import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import '../form.css';
import {Link} from 'react-router-dom';

class Success extends Component{
    render(){
        return(
            <div>
                <h1 className="ui centered">Success! :)</h1>
                <Link to="/home">
                <Button size='small' class="ui button">
                  Go check it out
                </Button>
                </Link>
            </div>
        )
    }
}

export default Success;
