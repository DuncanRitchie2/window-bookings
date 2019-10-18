import React, {Component} from 'react';

class SurveyorsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: 4,
            surveys: [{
                dateToHappen: "2000-01-01",
                street: "Example House",
                firstName: "Kamala",
                lastName: "Harris"
            },{
                dateToHappen: "2001-02-03",
                street: "Birmingham New Street",
                firstName: "Bernie",
                lastName: "Sanders"
            }]
        }
    }

    async readSurveys() {
        console.log("Fetching data!")
        const response = await fetch('http://localhost:3019/readsurveyorssurveys?id='+this.state.user_id);
        const responseJson = await response.json();
        console.table(responseJson);
        this.setState({surveys: responseJson});
    }

    async componentDidMount() {
        this.readSurveys();
    }

    render() {
        let surveys = this.state.surveys.map((survey, i)=>{
            return (
                <tr key={i}>
                    <td>{survey.dateToHappen.substring(0,10)} {survey.dateToHappen.substring(11,16)}</td>
                    <td>{survey.houseName || survey.houseNumber} {survey.street || ""}<br />{survey.town}, {survey.country}, {survey.postCode}</td>
                    <td><a href={`https://www.google.co.uk/maps/search/${survey.latitude}+${survey.longitude}`} title={`View ${survey.houseName} ${survey.houseNumber} ${survey.street} on Google Maps`} target="_blank" rel="noreferrer noopener">{survey.latitude}&deg; {survey.longitude}&deg;</a></td>
                    <td>{survey.firstName} {survey.lastName}</td>
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
                            <td><h3>Date Due</h3></td>
                            <td><h3>Property Address</h3></td>
                            <td><h3>Latitude &amp; Longitude</h3></td>
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