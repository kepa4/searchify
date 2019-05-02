import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

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
  },
  playIcon: {
    height: 38,
    width: 38
  },
  addIcon: {
    height: 38,
    width: 38
  }
});

class SongCard extends React.Component {
  handleAddToPlaylist = song => {
    const userID = localStorage.getItem('user-id');
    console.log(userID);
    console.log(song);
    axios
      .post('/spotify/usersongs/' + userID, {
        artists: song.artists,
        explicit: song.explicit,
        name: song.name,
        id: song.id,
        img: song.album.images[0].url
      })
      .then(res => {
        console.log(res);
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
            <IconButton aria-label="Play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton
              onClick={() => this.handleAddToPlaylist(this.props.song)}
              aria-label="Add To Playlist">
              <AddIcon className={classes.addIcon} />
            </IconButton>
          </div>
        </div>
      </Card>
    );
  }
}

SongCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SongCard);
