import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const MovieCard = ({ movie }) => {
  const posterPath = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Poster';

  return (
    <Link to={`/movie/${movie.id}`} className="text-decoration-none">
      <Card className="h-100 movie-card">
        <Card.Img 
          variant="top" 
          src={posterPath} 
          alt={movie.title}
          className="movie-poster"
        />
        <Card.Body>
          <Card.Title className="text-dark">{movie.title}</Card.Title>
          <Card.Text>
            <span className="text-warning">★ {movie.vote_average.toFixed(1)}/10</span>
            <br />
            <small className="text-muted">{movie.release_date}</small>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MovieCard;