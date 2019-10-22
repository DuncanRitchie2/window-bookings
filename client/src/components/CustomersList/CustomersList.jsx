import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';

class CustomersList extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            surveys: [{  // These are fake placeholder data that will be replaced on mount.
                dateToHappen: "2000-01-01",
                property: "Example House",
                firstName: "Beyoncé",
                lastName: "Knowles"
            },{
                dateToHappen: "2004-02-12",
                property: "1 Average Street",
                firstName: "Sam",
                lastName: "Smith"
            }],
            surveyToOpen: null
        }
    }


    async readSurveys() {
        const customer_id = this.props.customer.id;
        if (customer_id) {
            console.log("Fetching data for customer_id "+customer_id+"!")
            const response = await fetch('http://localhost:3019/readcustomerssurveys?id='+customer_id);
            const responseJson = await response.json();
            console.table(responseJson);
            this.setState({surveys: responseJson});
        }
        else {
            console.log("You're not signed in as a customer!")
        }
    }

    async componentDidMount() {
        this.readSurveys();
    }

    async componentDidUpdate(pastProps) {
        if (pastProps.customerId !== this.props.customerId) {
            this.readSurveys();
        }
    }

    render() {
        if (this.state.surveyToOpen) {
            return (
                <Redirect to={"/edit/"+this.state.surveyToOpen} />
            )
        }
        else {
            let surveys;
            console.table(this.props)
            console.log(this.props.customer.id)
            if (this.props.customer.id) {
                surveys = this.state.surveys.map((survey, i)=>{
                    return (
                            <tr key={i}>
                                <td className="cell-date">{survey.dateToHappen.substring(0,10)} {survey.dateToHappen.substring(11,16)}</td>
                                <td className="cell-address">{survey.houseName || survey.houseNumber} {survey.street || ""}<br />{survey.town}, {survey.country}, {survey.postCode}</td>
                                <td className="cell-latlong"><a href={`https://www.google.co.uk/maps/search/${survey.latitude}+${survey.longitude}`} title={`View ${survey.houseName} ${survey.houseNumber} ${survey.street} on Google Maps`} target="_blank" rel="noreferrer noopener">{survey.latitude} {survey.longitude}</a></td>
                                <td className="cell-name">{survey.firstName} {survey.lastName}</td>
                                <td className="cell-edit"><button className="edit-button" onClick={()=>{this.setState({surveyToOpen: this.state.surveys[i].id})}}>Edit</button></td>
                            </tr>
                        
                    )
                })
                console.log(surveys)
                if (!surveys[0]) {
                    surveys = (
                        <tr><td colSpan="5">
                            You have no surveys! Please <Link to="/book" title="Book a survey">book a survey</Link>!
                        </td></tr>
                    )
                }

                return (
                    <div id="CustomersList">
                        <h2>Hello, {this.props.customer.first_name} {this.props.customer.last_name}! Here are the surveys you have booked as a customer.</h2>
                        <table>
                            <thead>
                                <tr>
                                    <td className="cell-date-due"><h3>Date Due</h3></td>
                                    <td className="cell-address"><h3>Property Address</h3></td>
                                    <td className="cell-latlong"><h3>Latitude &amp; Longitude</h3></td>
                                    <td className="cell-name"><h3>Surveyor</h3></td>
                                    <td className="cell-edit"><h3>Edit</h3></td>
                                </tr>
                            </thead>
                            <tbody>
                                {surveys}
                            </tbody>
                        </table>
                    </div>
                )
            }
            else {
                return (
                    <div id="CustomersList">
                        <h2>Go to &ldquo;<Link to="/book" title="Book a survey">Book a survey</Link>&rdquo; to sign in!</h2>
                    </div>
                )
            }
        }
    }
}

export default CustomersList;