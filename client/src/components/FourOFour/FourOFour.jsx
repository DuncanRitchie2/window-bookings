import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class FourOFour extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id="FourOFour">
                <h2>This page does not exist. <Link to="/" title="Home">Go back to the homepage.</Link></h2>
            </div>
        )
    }
}

export default FourOFour;