const apiKey = process.env.REACT_APP_MOVIE_API_KEY;



const checkSameGenres = (similarMovie, mainMovieGenres) => {
  let score = 0;

  const similarMovieGenres = getGenres(similarMovie);

  if (mainMovieGenres.length > 3 || similarMovieGenres.length > 3) {

    for (let similarMovieGenre of similarMovieGenres) {
      for (let mainMovieGenre of mainMovieGenres) {
        if (similarMovieGenre === mainMovieGenre) {
          score += 10;
        }
      }
    }

    return score
  }

  for (let similarMovieGenre of similarMovieGenres) {
    for (let mainMovieGenre of mainMovieGenres) {
      if (similarMovieGenre === mainMovieGenre) {
        score += 20;
      }
    }
  }

  return score;
}

//-----

const checkSameAuthors = (similarMovie, mainMovieAuthors) => {
  let score = 0;

  const similarMovieAuthors = getAuthors(similarMovie);

  if (similarMovieAuthors.length === 1 && mainMovieAuthors.length === 1) {
    score += 70;
    return score;
  }

  for (let similarMovieAuthor of similarMovieAuthors) {
    if (mainMovieAuthors.includes(similarMovieAuthor)) {
      score += 25;
    }
  }

  return score;
}

//-----

const checkSameActors = (similarMovieActors, mainMovieActors) => {
  let score = 0;

  if (similarMovieActors.length === 0) {
    return score;
  }

  if (similarMovieActors.length === 1) {
    if (mainMovieActors.includes(similarMovieActors[0].id)) {
      score += 40;
    }

    return score
  }

  if (similarMovieActors[0].id === mainMovieActors[0]) {
    score += 40;
    if (similarMovieActors[1].id === mainMovieActors[1]) {
      score +=60;
    }

  } else if (similarMovieActors[1].id === mainMovieActors[0]) {
    score += 20;

  } else if (similarMovieActors[0].id === mainMovieActors[1]) {
    score += 20;

  } else if (similarMovieActors[1].id === mainMovieActors[1]) {
    score += 10;
  }


  return score;
}

//-----

const sortMovies = (authors, actors, genres, similarMovies) => {
  let score;

  for (let movie of similarMovies) {
    score = 0;
    score += movie.credits && checkSameActors(movie.credits.cast, actors);
    score += checkSameAuthors(movie, authors);
    score += checkSameGenres(movie, genres);
    movie.score = score;
  }

  const result = similarMovies.filter(movie => movie.score > 60);
  result.sort((prev, curr) =>  curr.score - prev.score);

  return result;
}

//-------------------------------------

const getAdditionalInfo = async (movies) => {
  let url;

  const moviesList = await Promise.all(movies.map(movie => {
    url = url = 'https://api.themoviedb.org/3/movie/' +
      `${movie.id}?api_key=${apiKey}&append_to_response=credits`;

    return getRequest(url)
  }))

  return moviesList
}

//-------------------------------------

const concatResults = (firstArray, secondArray, mainMovieId) => {
  //checking repeated movies in arrays and then concat.

  //first, checking the movie in firstArray and
  //if the movie not found in secondArray - add the movie to mainArray
  //Finally, concat mainArray with secondArray

  const mainArray = [];

  let duplicateFound = false;

  for (let i = 0; i < firstArray.length; i++) {
    for (let j = 0; j < secondArray.length; j++) {

      firstArray[i].id === secondArray[j].id
        ? duplicateFound = true
          : ''
    }

    !duplicateFound
      ? mainArray.push(firstArray[i])
        : ''

    duplicateFound = false
  }

  return [...mainArray, ...secondArray].filter(movie => (
    movie.id !== mainMovieId
  ))
}

//-------------------------------------
export const getRequest = async (url) => {
  let result;

  const response = await fetch(url);

  if (response.status === 200) {
    result = await response.json();

  } else if (response.status === 429) {
    result = await getRequest(url);
  }

  return result;
}

//-------------------------------------

const searchByActorsAndGenres = async (actors, genres) => {
  actors = actors.join('|');
  genres = genres.join('|');

  let url = 'https://api.themoviedb.org/3/discover/movie?api_key=' +
    `${apiKey}&sort_by=vote_average.desc&include_adult=false&` +
    `include_video=false&page=1&with_cast=${actors}&with_genres=${genres}`;

  const firstResponse = await getRequest(url);

  if (firstResponse.total_pages > 1) {
    url = 'https://api.themoviedb.org/3/discover/movie?api_key=' +
      `${apiKey}&sort_by=vote_average.desc&include_adult=false&` +
      `include_video=false&page=2&with_cast=${actors}&with_genres=${genres}`;

    const secondResponse = await getRequest(url);

    const firstPageResults = firstResponse.results;
    const secondPageResults = secondResponse.results;

    return [...firstPageResults, ...secondPageResults];
  }

  return firstResponse.results;
}


const searchByAuthorsAndGenres = async (authors, genres) => {
  authors = authors.join('|');
  genres = genres.join('|');

  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' +
    `${apiKey}&sort_by=vote_average.desc&include_adult=false&` +
    `include_video=false&page=1&with_crew=${authors}&with_genres=${genres}`;

  const response = await getRequest(url);
  const result = response.results;

  return result;
}

//-------------------------------------

const getGenres = movie => {
  return movie.genres.map(genre => genre.id)
}

const getActors = movie => {
  const mainActors = [];

  movie.credits.cast[0] && mainActors.push(movie.credits.cast[0].id);
  movie.credits.cast[1] && mainActors.push(movie.credits.cast[1].id);

  return mainActors;
}

const getAuthors = movie => {
  const crew = movie.credits.crew;
  const authorJobs = ['Author', 'Screenplay', 'Story', 'Writer'];

  const authors = [];

  crew.map(crewman => (
    authorJobs.includes(crewman.job)
      ? authors.push(crewman.id)
        : ''
  ))

  return authors.slice(0, 3);
}

//-------------------------------------

const getSimilarMovies = async (movie) => {
  // arrays with IDs
  const authors = getAuthors(movie);
  const mainActors = getActors(movie);
  const genres = getGenres(movie);

  // search similar movies
  const similarByAuthors = searchByAuthorsAndGenres(authors, genres);
  const similarByActors =  searchByActorsAndGenres(mainActors, genres);

  const similarMovies = concatResults(
    await similarByAuthors, await similarByActors, movie.id
  );

  // get additional info about each movie
  const similarMoviesAdditInfo = await getAdditionalInfo(similarMovies);

  // sorting similar movies by score
  // score point is given for same authors / main actors / genres
  const sortedSimilarMovies = sortMovies(
    authors, mainActors, genres, similarMoviesAdditInfo
  );

  return sortedSimilarMovies;
}


export default getSimilarMovies;
