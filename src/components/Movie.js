import React from 'react';

import LongText from './LongText.js';
import DefaultBackground from './DefaultBackground.js';

// rating and sim - flex row. Other flex column and rating with flex margin auto
const Movie = ({ movie, loaded }) => {
  if (!loaded) { return '' }

  let classNameRelise = `o-movie o-movie--${movie.status === 'Released'
    ? 'released' : 'unreleased'}`

  return (
    <div className={classNameRelise}>

      <div className="o-movie-info">
        <div>
          <div className="o-title-date">
            <h1 className="c-title">
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
          className="o-overview"
          text={movie.overview}
          maxLength={250}
        />

        <div className="o-scores">
          <p className="c-rating">
            Average rating: {movie.vote_average}
          </p>

          {
            // if movie is picked (first in movie list) then render nothing
            movie.score
              ? <p className="c-similarity">
                  Similarity: {movie.score}
                </p>
                : ''
          }
        </div>
      </div>

      <div className="o-poster">
        {
          movie.poster_path
            ? <img
                className="c-poster"
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              />

              : <DefaultBackground className='o-poster-none' />
        }
      </div>
    </div>
  )
}



export default Movie
