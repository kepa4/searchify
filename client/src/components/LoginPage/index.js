import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import backgroundImage from '../../assets/pictures/loginBackground3.jpg';

const LOCALSTORAGE_ACCESS_TOKEN_KEY = 'spotify-token';
const LOCALSTORAGE_ACCESS_TOKEN_EXPIRY_KEY = 'spotify-token-expires-in';

const styles = {
  loginBackground: {
    backgroundImage: `url(${backgroundImage})`,
    position: 'absolute',
    backgoundRepeat: 'no-repeat',
    display: 'flex',
    top: 0,
    bottom: 0,
    right: 0,
    backgroundPosition: '50%',
    flexWrap: 'wrap',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh'
  },
  loginButton: {
    display: 'block',
    padding: '1em 3em .98em',
    textAlign: 'center',
    margin: '0 auto',
    width: 'auto'
  },
  loginContent: {
    maxWidth: '1025px',
    margin: '0 auto',
    position: 'relative'
  },
  loginTitle: {
    color: 'white',
    margin: '0 auto',
    marginTop: 100,
    textAlign: 'center',
    fontSize: 64
  },
  loginDescription: {
    fontSize: 36,
    color: 'white',
    margin: '5vh 0 40vh',
    textAlign: 'center'
  }
};

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
    if (
      localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY) &&
      parseInt(
        parseInt(localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_EXPIRY_KEY))
      ) > Date.now()
    ) {
      window.location = '/home';
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
          window.location = '/home';
        }
      }
    }
  }
  render() {
    return (
      <div>
        <div style={styles.loginBackground} />
        <div style={styles.loginContent}>
          <h1 style={styles.loginTitle}> Searchify </h1>
          <h3 style={styles.loginDescription}>
            An App for finding less popular songs by genre using the Spotify Web
            API
          </h3>
          <Button
            style={styles.loginButton}
            variant="contained"
            onClick={this.getRedirectUri}
            size="large">
            Login to Spotify
          </Button>
        </div>
      </div>
    );
  }
}

export default LoginPage;