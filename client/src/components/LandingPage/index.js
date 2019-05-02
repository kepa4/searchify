import React from 'react';
import AppBar from '../AppBar';
import Genres from '../Genres';
import axios from 'axios';

class LandingPage extends React.Component {
  state = {
    userID: ''
  };
  componentDidMount() {
    axios.get('/spotify/user');
  }
  render() {
    return (
      <div>
        <AppBar />
        <Genres />
      </div>
    );
  }
}

export default LandingPage;