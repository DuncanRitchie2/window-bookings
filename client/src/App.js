import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Book from './components/Book/Book';
import CustomersList from './components/CustomersList/CustomersList';
import SurveyorsList from './components/SurveyorsList/SurveyorsList';
import FourOFour from './components/FourOFour/FourOFour';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Window bookings</h2>
      </header>
      <Router>
        <Switch>
          <Route path="/book" component={Book}></Route>
          <Route path="/view" component={CustomersList}></Route>
          <Route path="/surveyor" component={SurveyorsList}></Route>
          <Route path="/" exact component={Home}></Route>
          <Route component={FourOFour}></Route>
        </Switch>
      </Router>
      <footer>
        <ul>
            <li>
                Made by Duncan Ritchie
            </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
