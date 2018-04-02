import React from 'react';

import LongText from './LongText.js'


const Movie = ({ movie, loaded }) => {
  if (!loaded) { return '' }

  let classNameRelise = `o-movie o-movie--${movie.status === 'Released'
    ? 'released' : 'unreleased'}`

  return (
    <div className={classNameRelise} >
      <div className="o-movie-info">
        <div>
          <div className="o-name-date">
            <h1 className="c-movie-name">
              {movie.title}
            </h1>

            <h3 className="c-date">
              {movie.release_date.slice(0, 4)}
            </h3>
          </div>

          <ul className="o-genres">
            {
              movie.genres.map(genre => (
                <li>
                  <p className="c-genre">
                    {genre.name}
                  </p>
                </li>
              ))
            }
          </ul>
        </div>

        <LongText
          className="c-overview"
          text={movie.overview}
          maxLength={250}
        />

        <p className="c-vote">
          Average rating: {movie.vote_average}
        </p>
      </div>
      
      <div>
        <img
          className="c-poster"
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
        />
      </div>
    </div>
  )
}



export default Movie
