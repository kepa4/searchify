import React from 'react';
import AppBar from '../AppBar';
import Genres from '../Genres';
import axios from 'axios';

class LandingPage extends React.Component {
  componentDidMount() {
    axios.get('/spotify/user').then(res => {
      console.log(res);
      axios({
        method: 'post',
        url: '/api/checkUser',
        data: {
          userID: res.data.body.id
        }
      }).then(data => {
        console.log(data);
      });
    });
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