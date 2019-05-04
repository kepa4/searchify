import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Player from '../SoundPlayer';
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
  closeIcon: {
    height: 38,
    width: 38
  }
});

class ProfileSongCard extends React.Component {
  handleDelete = () => {
    axios
      .put('/spotify/usersongs/' + localStorage.getItem('user-id'), {
        _id: this.props.song._id
      })
      .then(res => {
        console.log(res);
        if ((res.data = 'success')) {
          window.location.reload();
        }
      });
  };

  render() {
    const { classes } = this.props;
    console.log(this.props);

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={this.props.song.img}
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
            <Player song={this.props.song.previewUrl} />
            <IconButton onClick={this.handleDelete} aria-label="Remove Song">
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </div>
        </div>
      </Card>
    );
  }
}

ProfileSongCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ProfileSongCard);
