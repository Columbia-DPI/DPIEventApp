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
        uni: '',
        schoolyear: 'Year',
        school: 'School',
        gender: 'Gender',
        interests: {'All':''},
        tags:['free food' , 'tech', 'professional',  'academic',  'art' , 'study break', 'social event',  'sports' , 'party', 'social ', 'online' , 'stupid' , 'resume drop' , 'finance ', 'concert ', 'choir' , 'varsity ', 'useless ', 'club meeting' , 'panel'  , 'challenge' ]
    }

    sendData() {
        let payload={
          "firstName": this.state.firstName,
          "lastName": this.state.lastName,
          'uni': this.state.uni,
          "school": this.state.school,
          "schoolYear": this.state.schoolyear,
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
            var current = this.state.interests
            current[event.target.name]=''
            this.setState({[input] : current})
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
        const { firstName, lastName, uni, schoolyear, school, gender, interest, tags } = this.state;
        const values = { firstName, lastName, uni, schoolyear, school, gender, interest, tags};
        //console.log(this.state.interests)
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
