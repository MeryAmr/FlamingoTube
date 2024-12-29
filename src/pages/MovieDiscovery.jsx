import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { discoverMovies, getTrendingMovies, getTopRatedMovies } from '../api/movieService';
import { useAuth } from '../context/AuthContext';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MovieDiscovery = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [discoverData, trendingData, recommendedData] = await Promise.all([
          discoverMovies({ page: 1 }),
          getTrendingMovies(),
          getTopRatedMovies()
        ]);

        setFeaturedMovies(discoverData.results.slice(0, 5));
        setTrendingMovies(trendingData.results.slice(0, 10));
        setRecommendations(recommendedData.results.slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="home-container">
      <div className="header">
        <h1>Welcome, {user.username}!</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <section className="featured-section">
        <h2>Featured Movies</h2>
        <MovieGrid movies={featuredMovies} />
      </section>

      <section className="trending-section">
        <h2>Trending Now</h2>
        <MovieGrid movies={trendingMovies} />
      </section>

      <section className="recommendations-section">
        <h2>Recommended for You</h2>
        <MovieGrid movies={recommendations} />
      </section>
    </div>
  );
};

export default MovieDiscovery;