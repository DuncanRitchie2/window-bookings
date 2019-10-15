import React from 'react';
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import Home from './components/Home/Home';
import Book from './components/Book/Book';
import CustomersList from './components/CustomersList/CustomersList';
import SurveyorsList from './components/SurveyorsList/SurveyorsList';
import FourOFour from './components/FourOFour/FourOFour';
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
            <header className="App-header">
                <h2>Window bookings</h2>
            </header>
            
            <Switch>
                <Route path="/book" component={Book}></Route>
                <Route path="/list" component={CustomersList}></Route>
                <Route path="/surveyor" component={SurveyorsList}></Route>
                <Route path="/" exact component={Home}></Route>
                <Route component={FourOFour}></Route>
            </Switch>

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

export default App;
