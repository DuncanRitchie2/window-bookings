import React, {Component} from 'react';

class CustomersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surveys: [{
                date: "2000-01-01",
                property: "Example House",
                surveyor: "Beyonce Knowles"
            }]
        }
    }

    componentDidMount() {
        const hello = fetch('http://localhost:3019/readcustomerssurveys?id=4');
        console.table(hello);
    }

    render() {
        let surveys = this.state.surveys.map((survey, i)=>{
            return (
                <tr key={i}>
                    <td>{survey.date}</td>
                    <td>{survey.property}</td>
                    <td>{survey.surveyor}</td>
                    <td><button className="edit-button">Edit</button></td>
                </tr>
            )
        })
        return (
            <div id="CustomersList">
                <h2>You&rsquo;re a customer. Thank you for trusting us with your windows. Here are your surveys.</h2>
                <table>
                    <thead>
                        <tr>
                            <td><h3>Date</h3></td>
                            <td><h3>Property</h3></td>
                            <td><h3>Surveyor</h3></td>
                            <td><h3>Edit</h3></td>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CustomersList;