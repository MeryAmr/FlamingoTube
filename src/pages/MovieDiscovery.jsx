import React, { useState, useEffect } from 'react';
import { discoverMovies } from '../api/movieService';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MAX_PAGES = 499;

const MovieDiscovery = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await discoverMovies({ page });
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, MAX_PAGES));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Discover Movies</h1>
      <MovieGrid 
        movies={movies} 
        page={page}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default MovieDiscovery;