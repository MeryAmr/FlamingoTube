import React from 'react';

const MovieInfo = ({ title, releaseDate, rating, overview }) => {
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  
  return (
    <div>
      <h1>{title}</h1>
      <p>Release Year: {releaseYear}</p>
      <p>Rating: {rating}/10</p>
      <h2>Synopsis</h2>
      <p>{overview}</p>
    </div>
  );
};

export default MovieInfo;