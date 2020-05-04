import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import '../form.css';

class Interests extends Component{
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const { values } = this.props
        return(
        <Form color='blue' >
            <h1 className="ui centered">I am interested in ... </h1>
            <Form.Group>
                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.saveAndContinue}>Save And Continue </Button>
            </Form.Group>
        </Form>
        )
    }
}

export default Interests;
