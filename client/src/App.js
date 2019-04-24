import React, { Component } from 'react';
import AppBar from './components/AppBar';
import { Button } from '@material-ui/core';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    loginUrl: '',
    userToken: ''
  };
  getAuth() {
    axios.get('/login').then(res => {
      this.setState({ loginUrl: res.data });
    });
  }

  componentDidMount() {
    this.getAuth();
    axios.get(window.location).then(res => {
      this.setState({ userToken: res.data.body.access_token });
    });
  }
  render() {
    return (
      <div className="App">
        <AppBar />
        <Button href={this.state.loginUrl}> Log Into Spotify</Button>
      </div>
    );
  }
}

export default App;
