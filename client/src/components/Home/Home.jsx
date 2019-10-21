import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id="Home">
                <h2>{ this.props.customer.first_name ? <>Hello {this.props.customer.first_name} {this.props.customer.last_name}! </> : null } Welcome to the window survey bookings system!</h2>
                <Link className="book-a-survey-link" to="/book" title="Book a survey">Book a survey</Link>
                <p>Booked surveys from us before? <Link to="/list" title="List of customer&rsquo;s booked surveys">See your list</Link>.</p>
            </div>
        )
    }
}

export default Home;