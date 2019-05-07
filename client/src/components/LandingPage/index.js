import React from 'react';
import AppBar from '../AppBar';
import Genres from '../Genres';
import axios from 'axios';

const LOCALSTORAGE_USER_ID = 'user-id';
class LandingPage extends React.Component {
  componentDidMount() {
    axios.get('/spotify/user').then(res => {
      localStorage.setItem(LOCALSTORAGE_USER_ID, res.data.body.id);
    });
  }
  render() {
    return (
      <div>
        <AppBar header={'Genres'} />
        <Genres />
      </div>
    );
  }
}

export default LandingPage;