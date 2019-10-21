import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValues: {
                firstName: this.props.customer.first_name || "",
                lastName: this.props.customer.last_name || "",
                propertyAddress: "",
                propertyTown: "",
                propertyCountry: "UK",
                surveyDate: "", // Date is set to tomorrow in componentDidMount().
                surveyTime: "" || "09:00" // Default time is 9am.
            },
            redirectToCustomerList: false
        }
        this.updateInputValue = this.updateInputValue.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        // Set surveyDate to tomorrow.
        const tomorrow = new Date(new Date().valueOf()+1000*60*60*24);
        // Dates need to be in the format yyyy-mm-dd.
        const tomorrowString = tomorrow.getFullYear()+"-"+(tomorrow.getMonth()+1)+"-"+tomorrow.getDate()
        
        // Update state.
        let inputValues = this.state.inputValues;
        inputValues.surveyDate = tomorrowString;
        this.setState({inputValues})
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

        if (inputValues.firstName && inputValues.lastName && inputValues.propertyAddress && inputValues.propertyTown && inputValues.propertyCountry && inputValues.surveyDate && inputValues.surveyTime) {
            alert("Thank you "+inputValues.firstName+" for placing your booking!")

            console.log("Adding a survey!")

            // Send data to backend
            let response = await fetch("/addsurvey",{
                method:"POST",
                headers: { "content-type" : "application/json" },
                body: JSON.stringify({
                    newSurvey: this.state.inputValues
                })
            })
        
            let result = await response.json()
            console.log(result)

            if (result.customer_id) {
                // Update customer_id with the new value.
                this.props.changeCustomer(result.customer_id, inputValues.firstName, inputValues.lastName)

                // Redirect to CustomerList.
                this.setState({
                    redirectToCustomerList: true
                })
            }
            else {
                alert("Error in submitting booking! Please try again!")
            }
            
        }
        else {
            alert("Please fill in all values.")
        }
    }

    render() {
        if (this.state.redirectToCustomerList) {
            return (
                <Redirect to='/list' />
            )
        }
        return (
            <div id="Book">
                <h2>{ this.props.customer.first_name ? <>Thank you for choosing us again, {this.props.customer.first_name} {this.props.customer.last_name}! </> : null } Book a new survey.</h2>
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

export default Book;