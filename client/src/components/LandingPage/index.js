import React from 'react';
import AppBar from '../AppBar';
import Genres from '../Genres';

class LandingPage extends React.Component {
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