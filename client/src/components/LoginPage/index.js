import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';

const LOCALSTORAGE_ACCESS_TOKEN_KEY = 'spotify-token';
const LOCALSTORAGE_ACCESS_TOKEN_EXPIRY_KEY = 'spotify-token-expires-in';

class LoginPage extends Component {
  state = {
    loginUrl: ''
  };

  getRedirectUri() {
    axios
      .get('/login')
      .then(res => {
        window.location = res.data;
      })
      .catch(error => {
        alert('Failed to prepare for Spotify Authentication');
      });
  }

  componentDidMount() {
    function parseHash(hash) {
      return hash
        .substring(1)
        .split('&')
        .reduce(function(initial, item) {
          if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});
    }
    console.log('hello');
    if (
      localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY) &&
      parseInt(
        parseInt(localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_EXPIRY_KEY))
      ) > Date.now()
    ) {
      window.location = '/landingpage';
    } else {
      if (window.location.hash) {
        const hash = parseHash(window.location.hash);
        if (hash['access_token'] && hash['expires_in']) {
          localStorage.setItem(
            LOCALSTORAGE_ACCESS_TOKEN_KEY,
            hash['access_token']
          );
          localStorage.setItem(
            LOCALSTORAGE_ACCESS_TOKEN_EXPIRY_KEY,
            Date.now() + 990 * parseInt(hash['expires_in'])
          );
          window.location = '/landingpage';
        }
      }
    }
  }
  render() {
    return (
      <div>
        <Button onClick={this.getRedirectUri}> Log Into Spotify </Button>
      </div>
    );
  }
}

export default LoginPage;