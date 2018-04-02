import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import SearchInput from './components/SearchInput.js';
import Movie from './components/Movie.js';
import SimilarMovies from './components/SimilarMovies.js';

import getSimilarMovies from './func/index.js'


export const apiKey = '62a0ba815454735eefbcf34d34550f54';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loaded: false,
      movie: '',
      error: false,
      similarMovies: ''
    }
  }


  onMovieSelectClick = async (movieId) => {
    this.setState({ loading: true, loaded: false });

    const url = 'https://api.themoviedb.org/3/movie/' +
      `${movieId}?api_key=${apiKey}&append_to_response=credits`;

    let error;

    // get more information about selected movie

    await fetch(url)
      .then(response => {
        response.status === 200
          ? error = false
            : error = true
        return response.json();
      })
      .then(movie => {
        !error
          ? this.setState({ movie, error: false })
            : this.setState({ error : true })
      })

    const movies = await getSimilarMovies(this.state.movie);

    this.setState({ similarMovies: movies, loading: false, loaded: true });
  }

  render() {
    return (
      <div>
        <header>
          <h1 className='c-project-name'>
            Twinz movie
          </h1>

          <SearchInput
            apiKey={apiKey}
            onClick={movieId => this.onMovieSelectClick(movieId)}
          />
        </header>

        <main>
          <Movie movie={this.state.movie} loaded={this.state.loaded} />
          <SimilarMovies movies={this.state.similarMovies} />
        </main>
      </div>
    );
  }
}

export default App;
