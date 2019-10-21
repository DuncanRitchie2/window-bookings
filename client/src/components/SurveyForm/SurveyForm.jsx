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

        // The survey_id is 
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
            alert("Thank you "+this.props.surveyor.first_name+" for submitting the survey!")

            console.log("Adding a survey!")

            // Send data to backend
            let response = await fetch("/submitsurvey",{
                method:"POST",
                headers: { "content-type" : "application/json" },
                body: JSON.stringify({
                    submission: this.state
                })
            })
        
            let result = await response.json()
            console.log(result)

            // if (result) {
                // Redirect to SurveyorsList.
                this.setState({
                    redirectToSurveyorsList: true
                })
            // }
            // else {
            //     alert("Error in submitting survey! Please try again!")
            // }
            
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
                <h2>{ this.props.surveyor.first_name ? <>Hello, {this.props.surveyor.first_name} {this.props.surveyor.last_name}! </> : null } Complete this survey.</h2>
                <form>
                    <h3>Premises information</h3>

                    <label htmlFor="style">Architectural style</label>
                    <input id="style" value={this.state.style} onChange={this.updateStyle}/><br />
                    <label htmlFor="windows-count">Number of windows</label>
                    <input id="windows-count" value={this.state.windowsCount} onChange={this.updateWindowsCount} /><br />

                    <button id="book-submit-button" onClick={this.submit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default SurveyForm;