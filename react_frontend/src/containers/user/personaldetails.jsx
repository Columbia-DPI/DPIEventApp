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

class PersonalDetails extends Component{

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
                  <Form.Field>
                      <label>UNI</label>
                      <input
                      placeholder='UNI'
                      onChange={this.props.handleChange('uni')}
                      defaultValue={values.uni}
                      />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal' class='inline fields'>
                  <Form.Field
                    control={Select}
                    label='Gender'
                    options={genderoptions}
                    placeholder='Gender'
                    defaultValue={values.gender}
                    onChange={this.props.handleDropdown('gender')}
                  />

                  <Form.Field
                    control={Select}
                    label='Year'
                    options={yearoptions}
                    placeholder='Year'
                    defaultValue={values.schoolyear}
                    onChange={this.props.handleDropdown('schoolyear')}
                  />
                  <Form.Field
                    control={Select}
                    label='School'
                    options={collegeoptions}
                    placeholder={values.school}
                    onChange={this.props.handleDropdown('school')}
                  />
                </Form.Group>
                <Button size='small' onClick={this.saveAndContinue}>Save and Continue</Button>

            </Form>

          </div>
        )
    }
}

export default PersonalDetails;
