import React, {Component} from 'react';

class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValues: {
                firstName: "",
                lastName: "",
                propertyAddress: "",
                propertyTown: "",
                surveyDate: "", // Date is set to tomorrow in componentDidMount().
                surveyTime: "" || "09:00" // Default time is 9am.
            }
        }
        this.updateInputValue = this.updateInputValue.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        const tomorrow = new Date(new Date().valueOf()+1000*60*60*24);
        console.log(tomorrow)
        const tomorrowString = tomorrow.getFullYear()+"-"+(tomorrow.getMonth()+1)+"-"+tomorrow.getDate()
        console.log(tomorrowString);
        
        let inputValues = this.state.inputValues;
        inputValues.surveyDate = tomorrowString;
        this.setState({inputValues})
    }

    updateInputValue(e) {
        let inputValues = this.state.inputValues;
        inputValues[e.target.id] = e.target.value;
        this.setState({inputValues})
    }

    submit(e) {
        e.preventDefault();

        let inputValues = this.state.inputValues;

        if (inputValues.firstName && inputValues.lastName && inputValues.propertyAddress && inputValues.propertyTown && inputValues.surveyDate && inputValues.surveyTime) {
            alert("Thank you for placing your booking!")
            // Insert code here for sending data to backend.

            this.setState({
                inputValues: {
                    firstName: "",
                    lastName: "",
                    propertyAddress: "",
                    propertyTown: "",
                    surveyDate: "",
                    surveyTime: ""
                }
            })

            window.location.pathname = "/list"
        }
        else {
            alert("Please fill in all values.")
        }
    }

    render() {
        return (
            <div id="Book">
                <h2>Book a new survey</h2>
                <form>
                    <label htmlFor="firstName">Your first name</label>
                    <input id="firstName" value={this.state.inputValues.firstName} onChange={this.updateInputValue}/><br />
                    <label htmlFor="lastName">Your last name</label>
                    <input id="lastName" value={this.state.inputValues.lastName} onChange={this.updateInputValue} /><br />
                    <label htmlFor="propertyAddress">Property address first line</label>
                    <input id="propertyAddress" value={this.state.inputValues.propertyAddress} onChange={this.updateInputValue} /><br />
                    <label htmlFor="propertyTown">Property town</label>
                    <input id="propertyTown" value={this.state.inputValues.propertyTown} onChange={this.updateInputValue} /><br />
                    <label htmlFor="surveyDate">Preferred date</label>
                    <input id="surveyDate" type="date" value={this.state.inputValues.surveyDate} onChange={this.updateInputValue} /><br />
                    <label htmlFor="surveyTime">Preferred time</label>
                    <input id="surveyTime" type="time" value={this.state.inputValues.surveyTime} onChange={this.updateInputValue} default="12:00" /><br />
                    <button id="book-submit-button" onClick={this.submit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Book;