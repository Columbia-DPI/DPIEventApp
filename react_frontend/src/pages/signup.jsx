import React, { Component } from 'react';
import PersonalDetails from '../containers/user/personaldetails.jsx';
import Interests from '../containers/user/interests.jsx';
import Success from '../containers/user/success.jsx';
import styled from 'styled-components'

const PageContainer = styled.div`
    height: 60rem;
    width: 100%;
    padding: 0 10rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

class SignupForm extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        schoolyear: 'Year',
        school: 'School',
        gender: 'Gender',
        interests: {}
    }

    sendData() {
        let payload={
          "firstName": this.state.firstName,
          "lastName": this.state.lastName,
          "schoolYear": this.state.schoolyear,
          "school": this.state.school,
          "gender": this.state.gender,
          "interests": this.state.interests,
        };
        let url = "./api/storeUserData";
        let fetchPromise = fetch(url, {
          method: "post",
          body: JSON.stringify(payload)
        });
        let jsonPromise = fetchPromise.then(response => response.json());
    
        return Promise.all([fetchPromise, jsonPromise]).then(function(data) {
          return {
            json: JSON.stringify(data),
            data: data.response
          };
        });
      }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = input => event => {
        if (input=='interests'){
            console.log("interest: ", event.target)
        } else{
            this.setState({ [input] : event.target.value })
        }
    }

    handleDropdown = input => event => {
        console.log(event.target)
        this.setState({ [input] : event.target.querySelector('span').innerHTML})
    }

    render(){
        const {step} = this.state;
        const { firstName, lastName, schoolyear, school, gender, interest } = this.state;
        const values = { firstName, lastName, schoolyear, school, gender, interest};
        // The values need to be saved to database when there is a change
        switch(step) {
        case 1:
            return <PageContainer><PersonalDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    handleDropdown = {this.handleDropdown}
                    values={values}
                    /></PageContainer>
        case 2:
            return <PageContainer><Interests
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    handleDropdown={this.handleDropdown}
                    values={values}
                    /></PageContainer>
        case 3:
            this.sendData()
            return <PageContainer><Success /></PageContainer>
        }
    }
}

export default SignupForm;
