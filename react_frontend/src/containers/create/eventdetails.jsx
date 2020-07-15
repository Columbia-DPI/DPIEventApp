import React, { Component } from 'react';
import { Form, Button, Select } from 'semantic-ui-react';
import '../form.css';
import styled from 'styled-components'

const Title = styled.h1`
  margin-bottom: 50px;
`

const genderoptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const yearoptions = [
  { key: 'F', text: 'Freshman', value: 'freshman'},
  { key: 'S', text: 'Sophomore', value: 'sophomore'},
  { key: 'J', text: 'Junior', value: 'junior'},
  { key: 'S', text: 'Senior', value: 'senior'},
  { key: 'G', text: 'Graduate', value: 'graduate'}
]

const collegeoptions = [
  { key: 's', text: 'SEAS', value: 'seas'},
  { key: 'c', text: 'CC', value: 'cc'},
  { key: 'g', text: 'GS', value: 'gs'},
  { key: 'b', text: 'Barnard', value: 'barnard'}
]

class EventDetails extends Component{

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    back = (e) => {
        e.preventDefault()
        this.props.prevStep()
    }

    render(){
        const { values } = this.props;
        return(
          <div>
            <Form >
                <Title className="ui centered">Welcome to CUBrite</Title>

                <Form.Group widths='equal' class='inline fields'>
                  <Form.Field>
                      <label>Title</label>
                      <input
                      placeholder='Title'
                      onChange={this.props.handleChange('title')}
                      defaultValue={values.title}
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>Location</label>
                      <input
                      placeholder='Location'
                      onChange={this.props.handleChange('location')}
                      defaultValue={values.location}
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>Time Stamp</label>
                      <input
                      placeholder='TimeStamp'
                      onChange={this.props.handleChange('timestamp')}
                      defaultValue={values.timestamp}
                      />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal' class='inline fields'>
                  <Form.Field>
                      <label>Description</label>
                      <input
                      placeholder='Description'
                      onChange={this.props.handleChange('description')}
                      defaultValue={values.description}
                      />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal' class='inline fields'>
                  <Form.Field>
                      <label>Image Link</label>
                      <input
                      placeholder='Image Link'
                      onChange={this.props.handleChange('imagelink')}
                      defaultValue={values.imagelink}
                      />
                  </Form.Field>
                </Form.Group>
                <Button size='small' onClick={this.saveAndContinue}>Save and Continue</Button>

            </Form>

          </div>
        )
    }
}

export default EventDetails;
