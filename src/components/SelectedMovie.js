import React, { Component } from 'react';


const SelectedMovie = ({ movie }) => (
  <div>
    <h1> { movie.title } </h1>
  <Movie />
    {
      typeof movie.poster_path !== 'undefined'
        ? <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
          : ''
    }


  </div>
)


export default SelectedMovie;
