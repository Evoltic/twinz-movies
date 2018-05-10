import React from 'react';

import Movie from './Movie.js'


const SimilarMovies = ({ movies, loading, loaded }) => {
  if (movies.length === 0) {
    return (
      <h1 className='c-nothing-found'>
        Nothing found... <span role='img' aria-label='hmm'>🤔</span>
      </h1>
    )
  }

  return (
    <ul className='o-similar-movies'>
      <hr className='c-hr' />

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
