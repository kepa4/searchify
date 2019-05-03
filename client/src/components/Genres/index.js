import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GenreCard from '../GenreCard';
import Grid from '@material-ui/core/Grid';

const LOCALSTORAGE_ACCESS_TOKEN_KEY = 'spotify-token';
const LOCALSTORAGE_ACCESS_TOKEN_EXPIRY_KEY = 'spotify-token-expires-in';
const accessToken = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);

const styles = {
  grid: {}
};

class Genres extends React.Component {
  state = {
    genres: []
  };
  componentDidMount() {
    if (
      !accessToken ||
      parseInt(localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_EXPIRY_KEY)) <
        Date.now()
    ) {
      window.location = '/';
    }
    this.getGenres();
  }

  getGenres() {
    axios
      .get('/spotify/genres', {
        params: {
          accessToken: localStorage.getItem('spotify-token')
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          genres: res.data.genres.filter(
            function(genre) {
              return this.indexOf(genre) < 0;
            },
            [
              'bossanova',
              'brazil',
              'children',
              'goth',
              'holidays',
              'malay',
              'metal-misc',
              'movies',
              'new-release',
              'philippines-opm',
              'pop-film',
              'post-dubstep',
              'r-n-b',
              'rainy-day',
              'road-trip',
              'rock-n-roll',
              'romance',
              'sad',
              'soundtracks',
              'study',
              'summer',
              'work-out'
            ]
          )
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={16} className={classes.grid}>
          {this.state.genres.map((genre, index) => {
            return <GenreCard genre={genre} key={genre} />;
          })}
        </Grid>
      </div>
    );
  }
}

Genres.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Genres);