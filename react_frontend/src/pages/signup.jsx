import React, { Component } from 'react';
import PersonalDetails from '../containers/user/personaldetails.jsx';
import Interests from '../containers/user/interests.jsx';
import Success from '../containers/user/success.jsx';
import styled, { keyframes } from 'styled-components'

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
    constructor(props){
        super(props);
        this.state = {
            step: 1,
            firstName: '',
            lastName: '',
            uni: '',
            schoolyear: 'Year',
            school: 'School',
            gender: 'Gender',
            interests: {'All':''},
            tags:['free food' , 'tech', 'professional',  'academic',  'art' , 'study break', 'social event',  'sports' , 'party', 'social ', 'online' , 'stupid' , 'resume drop' , 'finance ', 'concert ', 'choir' , 'varsity ', 'useless ', 'club meeting' , 'panel'  , 'challenge' ],
            tag_dict: null
        }
    
        this.getInterests = this.getInterests.bind(this)
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

      getInterests() {
        let payload={
          "Dummy": null,
        };
        let url = "./api/getInterestTags";
        let fetchPromise = fetch(url, {
          method: "post",
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(response => {
            this.setState({tag_dict: response})
            this.setState({tags: Object.keys(this.state.tag_dict)})
          })
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

    componentDidMount(){
        this.getInterests()
      }

    render(){
        console.log(this.state.tag_dict)
        const {step} = this.state;

        console.log(this.state.tags)

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
