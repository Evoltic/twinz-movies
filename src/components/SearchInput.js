import React, { Component } from 'react';

import { apiKey } from '../App.js'

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: ''
    }
  }


  onClick = movie => {
    this.props.onClick(movie.id);

    // hide movies list
    this.setState({ movieList: '' });
    this.input.value = movie.title
  }


  handleChange = () => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' +
      `${apiKey}&query=${this.input.value}'&page=1`;

    let error = false;

    fetch(url)
      .then(response => {
        response.status === 200
          ? error = false
            : error = true
        return response.json();
      })
      .then(movies => {
        !error
          ? this.setState({ movieList : movies.results })
            : this.setState({ movieList : '' })
      })
  }


  render() {
    return (
      <form className="o-search">
        <input
          onChange={this.handleChange}
          ref={input => this.input = input}
        />

        <div className="o-selection-list">
          {
            this.state.movieList !== ''

              ? this.state.movieList.map((movie, index) => (
                  <p
                    className="c-selection"
                    key={movie.title + index}
                    onClick={() => this.onClick(movie)}
                  >
                    {movie.title}
                  </p>
                ))
                : ''
          }
        </div>
      </form>
    )
  }
}


export default SearchInput;
