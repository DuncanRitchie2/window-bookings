import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';

class CustomerLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValues: {
                firstName: "",
                lastName: ""
            },
            redirectToCustomersList: false
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
            let response = await fetch("/signincustomer?first="+inputValues.firstName+"&last="+inputValues.lastName)
        
            let result = await response.json()
            console.log(result)

            if (await result.id) {
                // Update customer object with the new values.
                this.props.changeCustomer(result.id, inputValues.firstName, inputValues.lastName)

                // Because there is now a customer.id, the view changes to CustomersList.
            }

            else {
                alert("No customer found with the name "+inputValues.firstName+" "+inputValues.lastName+"!")
            }
        }
        else {
            alert("Please fill in both values.")
        }
    }

    render() {
        if (this.state.redirectToCustomersList) {
            return (
                <Redirect to='/list' />
            )
        }
        return (
            <div id="CustomerLogin">
                <h2>{ this.props.customer.first_name ? <>You are signed in as {this.props.customer.first_name} {this.props.customer.last_name}! Switch user?</> : <>Log in as a customer!</>}</h2>
                <form>
                    <h3>What&rsquo;s your name?</h3>
                    <label htmlFor="firstName">Your first name</label>
                    <input id="firstName" value={this.state.inputValues.firstName} onChange={this.updateInputValue}/><br />
                    <label htmlFor="lastName">Your last name</label>
                    <input id="lastName" value={this.state.inputValues.lastName} onChange={this.updateInputValue} />
                    <button id="book-submit-button" onClick={this.submit}>Log in</button>
                </form>
                <p>
                    If you&rsquo;ve not booked a survey from us before, please go to &ldquo;<Link to="/book" title="Book a survey">Book a survey</Link>&rdquo;.
                </p>
            </div>
        )
    }
}

export default CustomerLogin;