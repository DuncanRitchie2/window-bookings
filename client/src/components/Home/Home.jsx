import React, {Component} from 'react';

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
            <div>
                <h2>Home</h2>
                <button className="book-a-survey-button">Book a survey</button>
            </div>
        )
    }
}

export default Home;