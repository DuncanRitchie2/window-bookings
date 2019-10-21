import React, {Component} from 'react';

class SurveyorLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValues: {
                firstName: "",
                lastName: ""
            },
        }
        this.updateInputValue = this.updateInputValue.bind(this);
        this.submit = this.submit.bind(this);
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
                // Update surveyor object with the new values.
                this.props.changeSurveyor(result.id, inputValues.firstName, inputValues.lastName)

                // Because there is now a surveyor.id, the view changes to SurveyorsList.
            }

            else {
                alert("No surveyor found with the name "+inputValues.firstName+" "+inputValues.lastName+"!")
            }
        }
        else {
            alert("Please fill in both values.")
        }
    }

    render() {
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