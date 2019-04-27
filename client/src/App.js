import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SearchResults from './components/SearchResults';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginPage} />
          <Route path="/callback" component={LoginPage} />
          <Route exact path="/landingpage" component={LandingPage} />
          <Route path="/search" component={SearchResults} />
        </div>
      </Router>
    );
  }
}

export default App;
