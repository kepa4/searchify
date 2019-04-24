import React, { Component } from 'react';
import AppBar from './components/AppBar';
import { Router } from 'react-router';
import { Button } from '@material-ui/core';
import './App.css';
import axios from 'axios';

class App extends Component {
  getUser() {
    axios.get('/login').then(function(response) {
      console.log(response);
    });
  }

  render() {
    return (
      <div className="App">
        <AppBar />
        <Button onClick={() => this.getUser()}> Login </Button>
      </div>
    );
  }
}

export default App;
