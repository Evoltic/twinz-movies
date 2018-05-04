import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import SearchInput from './components/SearchInput.js';
import Movie from './components/Movie.js';
import SimilarMovies from './components/SimilarMovies.js';

import getSimilarMovies from './func/index.js';
import { getRequest } from './func/index.js';


export const apiKey = '62a0ba815454735eefbcf34d34550f54';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: '',
      similarMovies: '',
      loading: false,
      loaded: false
    }
  }


  onMovieSelectClick = async (movieId) => {
    this.setState({ loading: true, loaded: false });

    const url = 'https://api.themoviedb.org/3/movie/' +
      `${movieId}?api_key=${apiKey}&append_to_response=credits`;

    // get more information about selected movie
    const movie = await getRequest(url);

    this.setState({ movie });

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
            loading={this.state.loading}
            loaded={this.state.loaded}
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
