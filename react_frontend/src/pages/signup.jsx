import React, { Component } from 'react';
import PersonalDetails from '../containers/user/personaldetails.jsx';
import Interests from '../containers/user/interests.jsx';
import Success from '../containers/user/success.jsx';

class SignupForm extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        schoolyear: '',
        school: 'School',
        gender: '',
        interest: ''
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
        this.setState({ [input] : event.target.value })
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
            return <PersonalDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    handleDropdown = {this.handleDropdown}
                    values={values}
                    />
        case 2:
            return <Interests
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    handleDropdown={this.handleDropdown}
                    values={values}
                    />
        case 3:
            return <Success />
        }
    }
}

export default SignupForm;
