import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar';
import queryString from 'query-string';
import SongCard from '../SongCard';

class SearchResults extends React.Component {
  state = {
    searchQuery: '',
    results: []
  };
  getSearchResults = search => {
    axios
      .get('/spotify/songs', {
        params: { searchQuery: 'genre:' + search }
      })
      .then(response => {
        console.log(response.data.body.tracks.items);
        this.setState({ results: response.data.body.tracks.items });
      });
  };
  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    this.setState({ searchQuery: parsed.searchQuery });
    this.getSearchResults(parsed.searchQuery);
  }
  render() {
    return (
      <div>
        <AppBar />
        {this.state.results.map((song, index) => {
          return <SongCard song={song} key={index} />;
        })}
      </div>
    );
  }
}

export default SearchResults;
