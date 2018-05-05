import React from 'react';

import LongText from './LongText.js';
import DefaultBackground from './DefaultBackground.js';
import GreenRedIndicator from './GreenRedIndicator.js'


const Movie = ({ movie, loading, loaded }) => {
  if (!loaded) { return '' }

  let movieRelise = movie.status === 'Released' ? 'released' : 'unreleased';

  return (
    <div
      key={movie.title}
      className={`o-movie o-movie--${movieRelise}`}
    >

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
          maxLength={293}
        />

        <div className="o-scores">
          <h3 className="c-rating">
            Average rating: {movie.vote_average}
          </h3>

          <div className="o-similarity">
            <GreenRedIndicator
              className='c-color-indicator'
              value={movie.score}
              maxValue={160}
              minValue={40}
            />
            <h4 className='c-similarity'>
              {movie.score ? `Similarity: ${movie.score} / 210` : ''}
            </h4>
          </div>
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
