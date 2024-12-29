// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import { searchMovies } from '../api/movieService';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(query);
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Search Movies</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {movies.length > 0 && <MovieGrid movies={movies} />}
    </div>
  );
};

export default SearchPage;
