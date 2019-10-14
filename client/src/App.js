import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Window bookings</h2>
      </header>
      <Router>
        <Switch>
          <Route path="/book">
          {/* Component for a new survey */}
          </Route>
          <Route path="/view">
          {/* Component for listing all surveys */}
          </Route>
          <Route path="/surveyor">
          {/* Component for the surveyor's schedule */}
          </Route>
          <Route path="/">
            <button className="book-a-survey-button">Book a survey</button>
          {/* Home component */}
          </Route>
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
