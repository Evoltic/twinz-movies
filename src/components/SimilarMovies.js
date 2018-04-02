import React, { Component } from 'react';

import Movie from './Movie.js'


const SimilarMovies = ({ movies }) => {
  if (typeof movies === 'string') {
    return <div></div>
  }

  return (
    <ul className="o-similar-movies">
      {
        movies.map(movie => (
          <li key={'movie' + movie.title}>
            <Movie movie={movie} loaded={true} />
          </li>
        ))
      }
    </ul>
  )
}


export default SimilarMovies;
