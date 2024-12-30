import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getGenres, discoverMovies } from '../api/movieService';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import styles from '../styles/BrowseByGenre.module.css';

const MAX_PAGES = 499;

const BrowseByGenre = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData = await getGenres();
        setGenres(genreData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (!selectedGenre) {
        setMovies([]);
        return;
      }
      try {
        setLoading(true);
        const data = await discoverMovies({ page, genre: selectedGenre });
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, MAX_PAGES));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [selectedGenre, page]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
    setPage(1); 
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <Container className="py-4">
      <h1 className={styles.title}>Browse by Genre</h1>
      
      <div className={styles.genreButtons}>
        {genres.map(genre => (
          <button
            key={genre.id}
            className={`${styles.genreButton} ${selectedGenre === genre.id ? styles.selected : ''}`}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {selectedGenre && movies.length > 0 && (
            <div className={styles.movieSection}>
              <h2 className={styles.genreTitle}>
                {genres.find(g => g.id === selectedGenre)?.name} Movies
              </h2>
              <MovieGrid
                movies={movies}
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default BrowseByGenre;
