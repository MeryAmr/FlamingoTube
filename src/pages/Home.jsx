import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [featuredRes, trendingRes, recommendationsRes] = await Promise.all([
          axios.get(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`),
          axios.get(`${BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}`),
          axios.get(`${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`)
        ]);

        setFeaturedMovies(featuredRes.data.results.slice(0, 5));
        setTrendingMovies(trendingRes.data.results.slice(0, 10));
        setRecommendations(recommendationsRes.data.results.slice(0, 10));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-container">
      <section className="featured-section">
        <h2>Featured Movies</h2>
        <div className="movie-grid">
          {featuredMovies.map(movie => (
            <div key={movie.id} className="movie-card">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>{movie.vote_average.toFixed(1)} ⭐</p>
            </div>
          ))}
        </div>
      </section>

      <section className="trending-section">
        <h2>Trending Now</h2>
        <div className="movie-grid">
          {trendingMovies.map(movie => (
            <div key={movie.id} className="movie-card">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>{movie.vote_average.toFixed(1)} ⭐</p>
            </div>
          ))}
        </div>
      </section>

      <section className="recommendations-section">
        <h2>Recommended for You</h2>
        <div className="movie-grid">
          {recommendations.map(movie => (
            <div key={movie.id} className="movie-card">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>{movie.vote_average.toFixed(1)} ⭐</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
