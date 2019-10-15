import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
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
                <Route path="/view" component={CustomersList}></Route>
                <Route path="/surveyor" component={SurveyorsList}></Route>
                <Route path="/" exact component={Home}></Route>
                <Route component={FourOFour}></Route>
            </Switch>

            <nav>
                <ul>
                    <li>
                        <Link to="/" title="Home">Home</Link>
                    </li>
                    <li>
                        <Link to="/book" title="Book a survey">Book a survey</Link>
                    </li>
                    <li>
                        <Link to="/view" title="List surveys you&rsquo;ve booked">List surveys you&rsquo;ve booked</Link>
                    </li>
                    <li>
                        <Link to="/surveyor" title="Surveyor&rsquo;s view">Surveyor view</Link>
                    </li>
                </ul>
            </nav>
        
        </Router>
    </div>
  );
}

export default App;
