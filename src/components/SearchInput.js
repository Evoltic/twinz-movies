import React, { Component } from 'react';

import { getRequest } from '../func/index.js';
import { apiKey } from '../App.js';

import LoadingLine from './LoadingLine.js';


class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: '',
      className: 'c-movie'
    }
  }

  onClick = movie => {
    this.props.onClick(movie.id);
    // hide the selection list of movies
    this.setState({ movieList: '' });
    this.input.value = movie.title
  }

  onBlur = () => {
    // hide the selection list of movies when the focus is gone
    setTimeout(() => this.setState({ movieList: '' }), 350);
  }


  handleChange = async () => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' +
      `${apiKey}&query=${this.input.value}'&page=1`;

    const movies = await getRequest(url);
    this.setState({ movieList : movies.results });
  }


  render() {
    return (
      <div onBlur={this.onBlur}>
        <form className="o-search">

          <input
            className="c-search-input"
            onChange={this.handleChange}
            ref={input => this.input = input}
          />

          <LoadingLine
            loading={this.props.loading}
            loaded={this.props.loaded}
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
      </div>
    )
  }
}


export default SearchInput;
