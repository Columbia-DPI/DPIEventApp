import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import '../form.css';

class Interests extends Component{

    state={
      tags:['free food' , 'tech', 'professional',  'academic',  'art' , 'study break', 'social event',  'sports' , 'party', 'social ', 'online' , 'stupid' , 'resume drop' , 'finance ', 'concert ', 'choir' , 'varsity ', 'useless ', 'club meeting' , 'panel'  , 'challenge' ]
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){

        var tags=['free food' , 'tech', 'professional',  'academic',  'art' , 'study break', 'social event',  'sports' , 'party', 'social ', 'online' , 'stupid' , 'resume drop' , 'finance ', 'concert ', 'choir' , 'varsity ', 'useless ', 'club meeting' , 'panel'  , 'challenge' ]

        console.log(this.props);
        const { values } = this.props
        var tags_div = this.state.tags.map((tag, index)=>(
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
                <h1 className="ui centered">I am interested in ... </h1>
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
