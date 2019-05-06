import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

export default class Player extends React.Component {
  state = {
    playing: false,
    songPlaying: ''
  };

  audio = new Audio();

  playSong = () => {
    console.log('play');
    this.setState({ playing: true });
    this.setState({ songPlaying: this.props.song });
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
          {this.state.playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </div>
    );
  }
}