import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar';

class ProfilePage extends React.Component {
  componentDidMount() {
    this.getUserSongs();
  }

  getUserSongs() {
    axios
      .get('/spotify/usersongs/' + localStorage.getItem('user-id'))
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <AppBar />
      </div>
    );
  }
}

export default ProfilePage;
