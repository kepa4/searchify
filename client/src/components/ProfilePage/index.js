import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar';
import ProfileSongCard from '../ProfileSongCard';

class ProfilePage extends React.Component {
  state = {
    songs: []
  };
  componentDidMount() {
    this.getUserSongs();
  }

  getUserSongs() {
    axios
      .get('/spotify/usersongs/' + localStorage.getItem('user-id'))
      .then(res => {
        console.log(res);
        this.setState({ songs: res.data.savedSongs });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <AppBar />
        {this.state.songs.map((song, index) => {
          return <ProfileSongCard key={index} song={song} />;
        })}
      </div>
    );
  }
}

export default ProfilePage;
