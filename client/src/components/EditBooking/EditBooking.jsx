import React, {Component} from 'react';
import { Redirect, withRouter } from 'react-router-dom';

class EditBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValues: {
                propertyAddress: "",
                propertyTown: "",
                propertyCountry: "",
                surveyDate: "",
                surveyTime: ""
            },
            infoFromFetch: {},
            redirectToCustomersList: false
        }
        this.updateInputValue = this.updateInputValue.bind(this);
        this.submit = this.submit.bind(this);
    }
    async readBooking() {
        // Gets booking info from database and sets state.

        const survey_id = this.props.match.params.id
        const customer_id = this.props.customer.id
        console.log("Fetching booking data for survey_id "+survey_id+" and customer_id "+customer_id+"!")
        const response = await fetch('http://localhost:3019/readbooking?survey_id='+survey_id+"&customer_id="+customer_id);
        const responseJson = await response.json();
        const booking = await responseJson.data.premises;

        if (!booking || booking.customer_id !== customer_id) {
            this.setState({redirectToCustomersList: true})
        }
        else {
            console.table(booking);
            const { houseName, houseNumber, street, town, country, dateToHappen } = booking;

            const firstLine = (houseName && houseName!=="null" ? houseName+" "+street : houseNumber+" "+street)
            const inputValues = {
                propertyAddress: firstLine,
                propertyTown: town,
                propertyCountry: country,
                surveyDate: dateToHappen.substr(0,10),
                surveyTime: dateToHappen.substr(11,5)
            }

            this.setState({
                inputValues: inputValues
            });
        }
    }

    updateInputValue(e) {
        // Whenever an input is changed, the state is updated.
        let inputValues = this.state.inputValues;
        inputValues[e.target.id] = e.target.value;
        this.setState({inputValues})
    }

    async componentDidMount() {
        this.readBooking()
    }

    async submit(e) {
        e.preventDefault();

        const inputValues = this.state.inputValues
        let {propertyAddress, propertyTown, propertyCountry, surveyDate, surveyTime} = inputValues;

        if (propertyAddress && propertyTown && propertyCountry && surveyDate && surveyTime) {
            console.log("Attempting to update a survey!")

            console.table(inputValues)

            // Send data to backend
            let response = await fetch("http://localhost:3019/editbooking",{
                method:"POST",
                headers: { "content-type" : "application/json" },
                body: JSON.stringify({
                    submission: inputValues,
                    survey_id: this.props.match.params.id,
                    customer_id: this.props.customer.id
                })
            })
        
            let result = await response.json()
            console.log(result)

            alert("Thank you "+this.props.customer.first_name+" for submitting the survey!")

                // Redirect to CustomersList.
                this.setState({
                    redirectToCustomersList: true
                })
            
        }
        else {
            alert("Please fill in all values.")
        }
    }

    render() {
        if (this.state.redirectToCustomersList) {
            return (
                <Redirect to='/list' />
            )
        }
        return (
            <div id="EditBooking">
                <h2>{ this.props.customer.first_name ? <>Hello, {this.props.customer.first_name} {this.props.customer.last_name}! </> : null } You are editing a booking.</h2>
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