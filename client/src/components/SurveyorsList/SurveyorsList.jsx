import React, {Component} from 'react';

class SurveyorsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surveys: [{
                date: "2000-01-01",
                property: "Example House",
                customer: "Kamala Harris"
            },{
                date: "2001-02-03",
                property: "Sample Apartment",
                customer: "Bernie Sanders"
            }]
        }
    }

    async componentDidMount() {
        console.log("Fetching data!")
        const hello = await fetch('http://localhost:3019/readsurveyorssurveys?id=4');
        console.table(hello);
    }

    render() {
        let surveys = this.state.surveys.map((survey, i)=>{
            return (
                <tr key={i}>
                    <td>{survey.date}</td>
                    <td>{survey.property}</td>
                    <td>{survey.customer}</td>
                    <td><button className="edit-button">Edit</button></td>
                </tr>
            )
        })
        return (
            <div id="SurveyorsList">
                <h2>You&rsquo;re a surveyor. Here are the surveys you&rsquo;re going on.</h2>
                <table>
                    <thead>
                        <tr>
                            <td><h3>Date</h3></td>
                            <td><h3>Property</h3></td>
                            <td><h3>Customer</h3></td>
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

export default SurveyorsList;