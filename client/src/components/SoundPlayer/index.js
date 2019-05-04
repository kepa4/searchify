import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default class Player extends React.Component {
  state = {
    playing: false
  };

  audio = new Audio();

  playSong = () => {
    console.log('play');
    this.setState({ playing: true });
    this.audio.src = this.props.song;
    this.audio.volume = 0.1;
    this.audio.play();
  };

  pauseSong = () => {
    console.log('pause');
    this.setState({ playing: false });
    this.audio.pause();
  };

  render() {
    return (
      <div>
        <IconButton
          onClick={this.state.playing ? this.pauseSong : this.playSong}
          aria-label="Play/pause">
          <PlayArrowIcon />
        </IconButton>
      </div>
    );
  }
}