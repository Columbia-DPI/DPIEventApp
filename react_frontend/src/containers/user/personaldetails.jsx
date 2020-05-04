import React, { Component } from 'react';
import { Form, Button, Select } from 'semantic-ui-react';

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

class PersonalDetails extends Component{

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    render(){
        const { values } = this.props;
        return(
            <Form >
                <h1 className="ui centered">Welcome to DPIEventApp</h1>

                <Form.Group widths='equal'>
                  <Form.Field>
                      <label>First Name</label>
                      <input
                      placeholder='First Name'
                      onChange={this.props.handleChange('firstName')}
                      defaultValue={values.firstName}
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>Last Name</label>
                      <input
                      placeholder='Last Name'
                      onChange={this.props.handleChange('lastName')}
                      defaultValue={values.lastName}
                      />
                  </Form.Field>
                  <Form.Field
                    control={Select}
                    label='Gender'
                    options={genderoptions}
                    placeholder='Gender'
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field
                    control={Select}
                    label='Year'
                    options={yearoptions}
                    placeholder='School Year'
                  />
                  <Form.Field
                    control={Select}
                    label='College'
                    options={collegeoptions}
                    placeholder='College'
                  />
                </Form.Group>
                <Button onClick={this.saveAndContinue}>Save And Continue </Button>
            </Form>
        )
    }
}

export default PersonalDetails;
