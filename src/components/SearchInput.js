import React, { Component } from 'react';

import LoadingLine from './LoadingLine.js';
import SelectionList from './SelectionList.js';

import { getRequest } from '../func/index.js';


const apiKey = process.env.REACT_APP_MOVIE_API_KEY;


class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: '',
      className: 'div--display'
    }
  }

  onClick = movie => {
    this.props.onClick(movie.id);
    this.setState({ movieList: '' });
    this.input.value = movie.title;
  }

  onBlur = () => {
    setTimeout(() => this.setState({ className: 'div--hide' }), 350);
  }

  onFocus = () => {
    this.setState({ className: 'div--display' })
  }


  handleChange = async () => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' +
      `${apiKey}&query=${this.input.value}'&page=1`;

    const movies = await getRequest(url);
    this.setState({ movieList : movies.results });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onClick(this.state.movieList[0].id);
    this.setState({ movieList: '' });
    this.input.value = this.state.movieList[0].title;
  }

  componentDidMount() {
    // simulate onClick when user enter a movie page and load similar movies
    const path = this.props.location.pathname;
    const isItMoviePath = /\/id[0-9]*/g.exec(path) !== null;

    console.log(isItMoviePath);

    if (isItMoviePath) {
      const movie = path.split('/id')[1].split('-');
      const movieId = movie[0];
      const movieTitle = movie.slice(1).join(' ');

      this.props.onClick(movieId);
      this.input.value = movieTitle;
    }
  }

  render() {
    return (

      // selection list is showing, if the focus on the input field and any text is typed
      // if the focus is gone - hide the selection list

      <div onBlur={this.onBlur} onFocus={this.onFocus}>

        <form className='o-search' onSubmit={this.handleSubmit}>
          <input
            className='c-search-input'
            onChange={this.handleChange}
            ref={input => this.input = input}
            placeholder='Type a movie title here'
            autoComplete="off"
          />

          <LoadingLine
            loading={this.props.loading}
            loaded={this.props.loaded}
          />

          <SelectionList
            // display or hide className
            className={this.state.className}
            list={this.state.movieList}
            onClick={item => this.onClick(item)}
          />
        </form>
      </div>
    )
  }
}


export default SearchInput;
