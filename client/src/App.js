import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginPage} />
          <Route path="/callback" component={LoginPage} />
          <Route exact path="/landingpage" component={LandingPage} />
        </div>
      </Router>
    );
  }
}

export default App;
