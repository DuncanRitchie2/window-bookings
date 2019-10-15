import React, {Component} from 'react';

class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        const inputKeys = ["first-name", "last-name", "property-address", "property-town", "survey-date", "survey-time"]
        let inputValues = {}
        for (let i = 0; i < inputKeys.length; i++) {
            inputValues[inputKeys[i]] = ""
        }
        this.setState({inputValues})
    }

    render() {
        return (
            <div id="Book">
                <h2>Book a new survey</h2>
                <form>
                    <label htmlFor="first-name">First name</label>
                    <input id="first-name" /><br />
                    <label htmlFor="last-name">Last name</label>
                    <input id="last-name" /><br />
                    <label htmlFor="property-address">Property address first line</label>
                    <input id="property-address" /><br />
                    <label htmlFor="property-town">Property town</label>
                    <input id="property-town" /><br />
                    <label htmlFor="survey-date">Preferred date</label>
                    <input id="survey-date" type="date" /><br />
                    <label htmlFor="survey-time">Preferred time</label>
                    <input id="survey-time" type="time" /><br />
                    <button id="book-submit-button">Submit</button>
                </form>
            </div>
        )
    }
}

export default Book;