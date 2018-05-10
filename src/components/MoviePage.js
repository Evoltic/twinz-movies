import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Movie from './Movie.js';
import SimilarMovies from './SimilarMovies.js';
import stringToPath from '../func/stringToPath.js';


const MovieMovies = ({ movie, similarMovies, loading, loaded }) => (
  <React.Fragment>
    <Movie
      movie={movie}
      loading={loading}
      loaded={loaded}
    />
    <SimilarMovies
      movies={similarMovies}
      loading={loading}
      loaded={loaded}
    />
  </React.Fragment>
)


const MoviePage = (props) => {
  if (!props.loaded) return <div />;

  const newPath = stringToPath(props.movie.title, props.movie.id);
  const currentlyPath = 'id' + props.location.pathname.split('/id')[1];

  return (
    <React.Fragment>
      <Route
        exact path={process.env.PUBLIC_URL + '/' + newPath}
        component={() => <MovieMovies {...props} /> }
      />
      {
        props.loaded && currentlyPath !== newPath &&
          <Redirect to={ process.env.PUBLIC_URL + '/' + newPath} />
      }
    </React.Fragment>
  )
}

export default MoviePage;
