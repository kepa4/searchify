import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SearchResults from './components/SearchResults';
import ProfilePage from './components/ProfilePage';
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={LoginPage} />
            <Route path="/callback" component={LoginPage} />
            <Route exact path="/home" component={LandingPage} />
            <Route path="/search" component={SearchResults} />
            <Route exact path="/profile" component={ProfilePage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
