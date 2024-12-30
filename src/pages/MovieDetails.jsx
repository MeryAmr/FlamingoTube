import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { getMovieDetails } from '../api/tmdb';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(id);
        setMovie(data);
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setIsInWatchlist(watchlist.some(m => m.id === data.id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const handlePlayClick = () => {
    navigate(`/play/${id}`);
  };

  const toggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    if (isInWatchlist) {
      const newWatchlist = watchlist.filter(m => m.id !== movie.id);
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      setIsInWatchlist(false);
    } else {
      const newWatchlist = [...watchlist, {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average
      }];
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      setIsInWatchlist(true);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="Movie not found" />;

  const posterPath = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col md={4}>
          <img 
            src={posterPath} 
            alt={movie.title} 
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={8}>
          <h1 className="mb-3">{movie.title}</h1>
          <div className="mb-3">
            <Badge bg="warning" text="dark" className="me-2">
              ★ {movie.vote_average.toFixed(1)}/10
            </Badge>
            <Badge bg="secondary" className="me-2">
              {new Date(movie.release_date).getFullYear()}
            </Badge>
            {movie.genres && movie.genres.map(genre => (
              <Badge 
                key={genre.id} 
                style={{ 
                  backgroundColor: '#6ac045',
                  cursor: 'pointer'
                }}
                className="me-2"
                onClick={() => navigate(`/browse-genres?genre=${genre.id}`)}
              >
                {genre.name}
              </Badge>
            ))}
          </div>
          <p className="lead">{movie.overview}</p>
          <button className="play-now-btn" onClick={handlePlayClick}>
            PLAY NOW
          </button>
          <button 
            className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`} 
            onClick={toggleWatchlist}
          >
            {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Cast cast={movie.credits?.cast} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Reviews reviews={movie.reviews} />
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;