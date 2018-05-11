import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Movie from './Movie.js';
import SimilarMovies from './SimilarMovies.js';
import stringToPath from '../func/stringToPath.js';

const NoMatch = () => {
  <Redirect to='/' />
}

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

  const newPath = '/' + stringToPath(props.movie.title, props.movie.id);
  const currentPath = props.location.pathname;

  return (
    <React.Fragment>
      <Switch>
        <Route
          path={newPath}
          component={() => <MovieMovies {...props} /> }
        />
        <Redirect from={currentPath} to={newPath} />
        <Route component={NoMatch} />
      </Switch>
    </React.Fragment>
  )
}

export default MoviePage;
