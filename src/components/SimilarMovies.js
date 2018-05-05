import React, { Component } from 'react';

import Movie from './Movie.js'


const SimilarMovies = ({ movies, loading, loaded }) => {
  if (movies === '') {
    return <ul />
  }

  if (loaded && movies.length === 0) {
    return (
      <h1 className='c-nothing-found'>
        Nothing found... 🤔
      </h1>
    )
  }

  return (
    <ul className='o-similar-movies'>
      <hr class='c-hr' />

      {
        movies.map((movie, index) => (
          <li key={movie.title + index}>
            <Movie movie={movie} loaded={loaded} loading={loading} />
          </li>
        ))
      }
    </ul>
  )
}


export default SimilarMovies;
