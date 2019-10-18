import React, {Component} from 'react';

class CustomersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: 4,
            surveys: [{
                dateToHappen: "2000-01-01",
                property: "Example House",
                surveyor: "Beyoncé Knowles"
            },{
                dateToHappen: "2004-02-12",
                property: "1 Average Street",
                surveyor: "Sam Smith"
            }]
        }
    }


    async readSurveys() {
        console.log("Fetching data!")
        const response = await fetch('http://localhost:3019/readcustomerssurveys?id='+this.state.user_id);
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
                    <td>{survey.houseName} {survey.houseNumber} {survey.street}<br />{survey.town}, {survey.country}, {survey.postCode}</td>
                    <td><a href={`https://www.google.co.uk/maps/search/${survey.latitude}+${survey.longitude}`} title={`View ${survey.houseName} ${survey.houseNumber} ${survey.street} on Google Maps`} target="_blank" rel="noreferrer noopener">{survey.latitude} {survey.longitude}</a></td>
                    <td>{survey.firstName} {survey.lastName}</td>
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
                            <td><h3>Date Due</h3></td>
                            <td><h3>Property Address</h3></td>
                            <td><h3>Latitude &amp; Longitude</h3></td>
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