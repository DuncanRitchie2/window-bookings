import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class SurveyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            style: "",
            windowsCount: null,
            windows: [
                {
                    description: "",
                    height: null,
                    width: null,
                    url: ""
                },
                {
                    description: "",
                    height: null,
                    width: null,
                    url: ""
                }
            ],
            redirectToSurveyorsList: false
        }
        this.updateStyle = this.updateStyle.bind(this);
        this.updateWindowsCount = this.updateWindowsCount.bind(this);
        this.updateWindow = this.updateWindow.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        // INSERT CODE HERE FOR GETTING PREMISES INFO FROM DATABASE AND SETTING STATE.
    }

    updateStyle(e) {
        // Whenever the style input is changed, the state is updated.
        this.setState({"style": e.target.value})
    }

    updateWindowsCount(e) {
        // Whenever the windows-count input is changed, the state is updated.
        this.setState({"windowsCount": e.target.value})
    }

    updateWindow(e) {
        // Whenever an input for a specific window is changed, the state is updated.
        let windows = this.state.windows
        let key = e.target.key
        windows[key][e.target.className] = e.target.value
        this.setState({"windows": windows})
    }

    async submit(e) {
        e.preventDefault();

        let {style, windowsCount} = this.state;

        if (style && windowsCount) {
            alert("Thank you "+this.props.surveyor.firstName+" for submitting the survey!")

            console.log("Adding a survey!")

            // Send data to backend
            let response = await fetch("/submitsurvey",{
                method:"POST",
                headers: { "content-type" : "application/json" },
                body: JSON.stringify({
                    premises: this.state
                })
            })
        
            let result = await response.json()
            console.log(result)

            if (result) {
                // Redirect to SurveyorsList.
                this.setState({
                    redirectToSurveyorsList: true
                })
            }
            else {
                alert("Error in submitting survey! Please try again!")
            }
            
        }
        else {
            alert("Please fill in all values.")
        }
    }

    render() {
        if (this.state.redirectToSurveyorsList) {
            return (
                <Redirect to='/surveyor' />
            )
        }
        return (
            <div id="SurveyForm">
                <h2>{ this.props.surveyor.first_name ? <>Thank you for choosing us again, {this.props.customer.first_name} {this.props.customer.last_name}! </> : null } Book a new survey.</h2>
                <form>
                    <h3>What&rsquo;s your name?</h3>
                    <label htmlFor="firstName">Your first name</label>
                    <input id="firstName" value={this.state.inputValues.firstName} onChange={this.updateInputValue}/><br />
                    <label htmlFor="lastName">Your last name</label>
                    <input id="lastName" value={this.state.inputValues.lastName} onChange={this.updateInputValue} /><br />
                    <h3>Where will we be surveying?</h3>
                    <label htmlFor="propertyAddress">Address first line</label>
                    <input id="propertyAddress" value={this.state.inputValues.propertyAddress} onChange={this.updateInputValue} /><br />
                    <label htmlFor="propertyTown">Town</label>
                    <input id="propertyTown" value={this.state.inputValues.propertyTown} onChange={this.updateInputValue} /><br />
                    <label htmlFor="propertyCountry">Country</label>
                    <input id="propertyCountry" value={this.state.inputValues.propertyCountry} onChange={this.updateInputValue} /><br />
                    <h3>When do you want us to come?</h3>
                    <label htmlFor="surveyDate">Preferred date</label>
                    <input id="surveyDate" type="date" value={this.state.inputValues.surveyDate} onChange={this.updateInputValue} /><br />
                    <label htmlFor="surveyTime">Preferred time</label>
                    <input id="surveyTime" type="time" value={this.state.inputValues.surveyTime} onChange={this.updateInputValue} /><br />
                    <button id="book-submit-button" onClick={this.submit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default SurveyForm;