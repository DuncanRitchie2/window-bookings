import React, {Component} from 'react';
import { Redirect, withRouter } from 'react-router-dom';

class EditBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValues: {
                propertyAddress: "",
                propertyTown: "",
                propertyCountry: "UK",
                surveyDate: "", // Date is set to tomorrow in componentDidMount().
                surveyTime: "" || "09:00" // Default time is 9am.
            },
            infoFromFetch: {},
            redirectToCustomersList: false
        }
        this.updateInputValue = this.updateInputValue.bind(this);
        this.submit = this.submit.bind(this);
    }

    async readPremises() {
        // Gets premises info from database and sets state.

        const survey_id = this.props.match.params.id
        console.log("Fetching premises data for survey_id "+survey_id+"!")
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

    async readBooking() {
        // Gets booking info from database and sets state.

        const survey_id = this.props.match.params.id
        const customer_id = this.props.customer.id
        console.log("Fetching booking data for survey_id "+survey_id+" and customer_id "+customer_id+"!")
        const response = await fetch('http://localhost:3019/readbooking?survey_id='+survey_id+"&customer_id="+customer_id);
        const responseJson = await response.json();
        console.table(responseJson.data.premises);
        // this.setState({
        //     inputValues: responseJson.data.premises
        // });
    }

    updateInputValue(e) {
        // Whenever an input is changed, the state is updated.
        let inputValues = this.state.inputValues;
        inputValues[e.target.id] = e.target.value;
        this.setState({inputValues})
    }

    async componentDidMount() {
        this.readBooking()
        this.readPremises()
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
            <div id="EditBooking">
                <h2>{ this.props.customer.first_name ? <>Hello, {this.props.customer.first_name} {this.props.customer.last_name}! </> : null } Edit this booking.</h2>
                <p>The address is {houseName || houseNumber} {street}, {town}, {country}{postCode ? ", "+postCode : null}.</p>
                {latitude ? <p>The co-ords are {Math.abs(latitude)}&deg; {latitude<0 ? "south" : "north"}, {Math.abs(longitude)}&deg; {longitude<0 ? "west" : "east"}. </p> : null}
                <form>
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

export default withRouter(EditBooking);