import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import Home from './components/Home/Home';
import Book from './components/Book/Book';
import CustomersList from './components/CustomersList/CustomersList';
import SurveyorsList from './components/SurveyorsList/SurveyorsList';
import CustomerLogin from './components/CustomerLogin/CustomerLogin';
import SurveyorLogin from './components/SurveyorLogin/SurveyorLogin';
import SurveyForm from './components/SurveyForm/SurveyForm';
import FourOFour from './components/FourOFour/FourOFour';
import './App.css';


class App extends Component {
    constructor() {
        super()
        this.state = {
            customer: {
                id: null,
                first_name: "",
                last_name: ""
            },
            surveyor: {
                id: null,
                first_name: "",
                last_name: ""
            }
            // ,
            // surveyor: {
            //     id: 4,
            //     first_name: "Camila",
            //     last_name: "Cabello"
            // }
        }
        this.changeCustomer = this.changeCustomer.bind(this)
        this.changeSurveyor = this.changeSurveyor.bind(this)
    }

    changeCustomer(newId, newFirstName, newLastName) {
        const newCustomer = {
            "id": newId, "first_name": newFirstName, "last_name": newLastName
        }
        this.setState({"customer": newCustomer})
    }

    changeSurveyor(newId, newFirstName, newLastName) {
        const newSurveyor = {
            "id": newId, "first_name": newFirstName, "last_name": newLastName
        }
        this.setState({"surveyor": newSurveyor})
    }
    
    render() {
        return (
            <div className="App">
                <Router>
                    <header className="App-header">
                        <h1>Window surveys</h1>
                    </header>
                    
                    <main>
                        <Switch>
                            <Route path="/book">
                                <Book customer={this.state.customer} changeCustomer={this.changeCustomer} />
                            </Route>

                            <Route path="/list">
                                {this.state.customer.id ? <CustomersList customer={this.state.customer} /> : <CustomerLogin changeCustomer={this.changeCustomer} customer={this.state.customer} />}
                            </Route>

                            <Route path="/surveyor">
                                {this.state.surveyor.id ? <SurveyorsList surveyor={this.state.surveyor} /> : <SurveyorLogin changeSurveyor={this.changeSurveyor} surveyor={this.state.surveyor} />}
                            </Route>

                            <Route path="/survey/:id">
                                <SurveyForm surveyor={this.state.surveyor} />
                            </Route>

                            <Route path="/" exact>
                                <Home customer={this.state.customer} />
                            </Route>

                            <Route component={FourOFour}></Route>
                        </Switch>
                    </main>

                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/" exact activeClassName="nav-link-current" title="Home">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/book" exact activeClassName="nav-link-current" title="Book a survey">Book a survey</NavLink>
                            </li>
                            <li>
                                <NavLink to="/list" exact activeClassName="nav-link-current" title="List surveys you&rsquo;ve booked">List surveys you&rsquo;ve booked</NavLink>
                            </li>
                            <li>
                                <NavLink to="/surveyor" exact activeClassName="nav-link-current" title="Surveyor&rsquo;s view">Surveyor view</NavLink>
                            </li>
                        </ul>
                    </nav>
                
                </Router>
            </div>
        );
    }
}
  

export default App;
