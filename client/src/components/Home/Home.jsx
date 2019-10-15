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
                <h2>Welcome to the window survey bookings system!</h2>
                <Link className="book-a-survey-link" to="/book" title="Book a survey">Book a survey</Link>
            </div>
        )
    }
}

export default Home;