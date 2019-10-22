import React, {Component} from 'react';
import { Redirect, withRouter } from 'react-router-dom';

class SurveyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            style: "",
            windowsCount: "",
            windows: [
                {
                    description: "",
                    height: "",
                    width: "",
                    url: ""
                },
                {
                    description: "",
                    height: "",
                    width: "",
                    url: ""
                }
            ],
            infoFromFetch: {},
            redirectToSurveyorsList: false
        }
        this.updateStyle = this.updateStyle.bind(this);
        this.updateWindowsCount = this.updateWindowsCount.bind(this);
        this.updateWindow = this.updateWindow.bind(this);
        this.submit = this.submit.bind(this);
    }

    async readPremises() {
        // Gets premises info from database and sets state.

        const survey_id = this.props.match.params.id
        console.log("Fetching data for survey_id "+survey_id+"!")
        const response = await fetch('http://localhost:3019/readpremises?survey_id='+survey_id);
        const responseJson = await response.json();
        console.table(responseJson.data.premises);
        this.setState({
            // windows: responseJson.data[0].windows,
            windowsCount: responseJson.data.windowsCount,
            style: responseJson.data.premises.style,
            infoFromFetch: responseJson.data.premises
        });
    }

    async componentDidMount() {
        this.readPremises();
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
            console.log("Attempting to submit a survey!")

            let submission = {
                style: this.state.style,
                windowsCount: this.state.windowsCount,
                windows: this.state.windows
            }

            console.table(submission)

            // Send data to backend
            let response = await fetch("/submitsurvey",{
                method:"POST",
                headers: { "content-type" : "application/json" },
                body: JSON.stringify({
                    submission: submission,
                    survey_id: this.props.match.params.id,
                    surveyor_id: this.props.surveyor.id
                })
            })
        
            let result = await response.json()
            console.log(result)

            alert("Thank you "+this.props.surveyor.first_name+" for submitting the survey!")

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

        const {houseName, houseNumber, street, town, country, postCode, latitude, longitude} = this.state.infoFromFetch;
        return (
            <div id="SurveyForm">
                <h2>{ this.props.surveyor.first_name ? <>Hello, {this.props.surveyor.first_name} {this.props.surveyor.last_name}! </> : null } Complete this survey.</h2>
                <p>The address is {houseName || houseNumber} {street}, {town}, {country}{postCode ? ", "+postCode : null}.</p>
                {latitude ? <p>The co-ords are {Math.abs(latitude)}&deg; {latitude<0 ? "south" : "north"}, {Math.abs(longitude)}&deg; {longitude<0 ? "west" : "east"}. </p> : null}
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

export default withRouter(SurveyForm);