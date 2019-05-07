import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar';
import queryString from 'query-string';
import SongCard from '../SongCard';
import BottomScrollListener from 'react-bottom-scroll-listener';

class SearchResults extends React.Component {
  state = {
    searchQuery: '',
    results: [],
    filteredSongs: [],
    offset: 0
  };
  getSearchResults = search => {
    axios
      .get('/spotify/songs', {
        params: {
          searchQuery: 'genre:' + search,
          offsetNumber: this.state.offset
        }
      })
      .then(response => {
        console.log(response.data.body.tracks.items);
        console.log(response.data.body);
        this.setState({ results: response.data.body.tracks.items });
        const filteredSongs = this.state.results.filter(
          song => song.popularity < 50
        );
        console.log(filteredSongs);
        this.setState({
          filteredSongs: this.state.filteredSongs.concat(filteredSongs)
        });
        this.setState({
          offset: response.data.body.tracks.offset
        });

        if (
          filteredSongs.length === 0 ||
          document.body.clientHeight <= window.screen.availHeight
        ) {
          this.getSearchResults(this.state.searchQuery);
        }
      });
  };

  handleOnBottom = () => {
    this.getSearchResults(this.state.searchQuery);
  };
  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    this.setState({ searchQuery: parsed.searchQuery });
    this.getSearchResults(parsed.searchQuery);
  }
  render() {
    return (
      <div style={{ marginTop: 65 }}>
        <AppBar header={'Genre - ' + this.state.searchQuery} />
        {this.state.filteredSongs.map((song, index) => {
          return <SongCard song={song} key={index} />;
        })}
        <BottomScrollListener onBottom={this.handleOnBottom} />
      </div>
    );
  }
}

export default SearchResults;
