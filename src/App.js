import React, { Component } from 'react';

import './App.css';

import SearchInput from './components/SearchInput.js';
import Movie from './components/Movie.js';
import SimilarMovies from './components/SimilarMovies.js';
import Footer from './components/Footer.js'

import getSimilarMovies from './func/index.js';
import { getRequest } from './func/index.js';

// use your own unique api key (get it on themoviedb)
// first create .env outside /src and add REACT_APP_MOVIE_API_KEY=123456
const apiKey = process.env.REACT_APP_MOVIE_API_KEY;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: '',
      similarMovies: '',
      // loading data
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
            A like movie
          </h1>

          <SearchInput
            loading={this.state.loading}
            loaded={this.state.loaded}
            onClick={movieId => this.onMovieSelectClick(movieId)}
          />
        </header>

        <div className='o-project-desc'>
          <h3 className='c-project-desc'>
            Search for similar movies.
            Select a movie and get a list of a related films.
          </h3>
        </div>

        <main>
          <Movie
            movie={this.state.movie}
            loading={this.state.loading}
            loaded={this.state.loaded}
          />
          <SimilarMovies
            movies={this.state.similarMovies}
            loading={this.state.loading}
            loaded={this.state.loaded}
          />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
