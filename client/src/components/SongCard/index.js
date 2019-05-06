import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Player from '../SoundPlayer';
import SnackbarNotification from '../SnackbarNotification';

const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

class SongCard extends React.Component {
  state = {
    playing: false,
    open: false
  };

  handleAddToPlaylist = song => {
    const userID = localStorage.getItem('user-id');
    console.log(song);
    axios
      .post('/spotify/usersongs/' + userID, {
        artists: song.artists,
        explicit: song.explicit,
        name: song.name,
        id: song.id,
        img: song.album.images[0].url,
        previewUrl: song.preview_url
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ open: true });
        }
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={this.props.song.album.images[0].url}
          title=""
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {this.props.song.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {this.props.song.artists.map(artist => {
                return artist.name + ' ';
              })}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton
              onClick={() => this.handleAddToPlaylist(this.props.song)}
              aria-label="Add To Playlist">
              <AddIcon />
            </IconButton>
            <Player song={this.props.song.preview_url} />
          </div>
        </div>
        {this.state.open ? <SnackbarNotification open={this.state.open} /> : ''}
      </Card>
    );
  }
}

SongCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SongCard);
