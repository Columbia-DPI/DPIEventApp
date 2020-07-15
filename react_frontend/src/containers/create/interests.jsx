import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import '../form.css';
import styled from 'styled-components'

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  margin-bottom: 50px;
`

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
        console.log(this.props)
        var tags_div = this.props.values.tags.map((tag, index)=>(
                      <div class="ui toggle checkbox" style={{height: '50px'}}>
                        <input
                          type="checkbox"
                          name={tag}
                          onChange={this.props.handleChange('interests')} />
                        <label>{tag}</label>
                      </div>
                    ))
        return(
            <div>
                <h1></h1>
                <Title className="ui centered">My event is about ... </Title>
                {tags_div}
                <Form color='blue' >
                    <Form.Group>
                        <Button onClick={this.back}>Back</Button>
                        <Button onClick={this.saveAndContinue}>Save And Continue </Button>
                    </Form.Group>
                </Form>
            </div>

        )
    }
}

export default Interests;
