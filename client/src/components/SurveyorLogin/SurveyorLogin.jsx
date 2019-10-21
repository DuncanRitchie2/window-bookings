import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class SurveyorLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValues: {
                firstName: "",
                lastName: ""
            },
            redirectToCustomerList: false
        }
        this.updateInputValue = this.updateInputValue.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
    }

    updateInputValue(e) {
        // Whenever an input is changed, the state is updated.
        let inputValues = this.state.inputValues;
        inputValues[e.target.id] = e.target.value;
        this.setState({inputValues})
    }

    async submit(e) {
        e.preventDefault();

        let inputValues = this.state.inputValues;

        if (inputValues.firstName && inputValues.lastName) {

            console.log("Attempting to log in as "+inputValues.firstName+" "+inputValues.lastName+"!")

            // Send data to backend
            let response = await fetch("/signinsurveyor?first="+inputValues.firstName+"&last="+inputValues.lastName)
        
            let result = await response.json()
            console.log(result)

            if (await result.id) {
                // Update customer_id with the new value.
                this.props.changeSurveyor(result.id, inputValues.firstName, inputValues.lastName)
            }

            else {
                alert("No surveyor found with the name "+inputValues.firstName+" "+inputValues.lastName+"!")
            }

            // // Redirect to SurveyorList.
            // this.setState({
            //     redirectToSurveyorList: true
            // })
        }
        else {
            alert("Please fill in both values.")
        }
    }

    render() {
        if (this.state.redirectToCustomerList) {
            return (
                <Redirect to='/list' />
            )
        }
        return (
            <div id="SurveyorLogin">
                <h2>{ this.props.surveyor.first_name ? <>You are signed in as {this.props.surveyor.first_name} {this.props.surveyor.last_name}! Switch user?</> : <>Log in as a surveyor!</>}</h2>
                <form>
                    <h3>What&rsquo;s your name?</h3>
                    <label htmlFor="firstName">Your first name</label>
                    <input id="firstName" value={this.state.inputValues.firstName} onChange={this.updateInputValue}/><br />
                    <label htmlFor="lastName">Your last name</label>
                    <input id="lastName" value={this.state.inputValues.lastName} onChange={this.updateInputValue} />
                    <button id="book-submit-button" onClick={this.submit}>Log in</button>
                </form>
            </div>
        )
    }
}

export default SurveyorLogin;