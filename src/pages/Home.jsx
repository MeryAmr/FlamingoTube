import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getTrendingMovies, getTopRatedMovies } from '../api/movieService';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [trendingData, topRatedData] = await Promise.all([
          getTrendingMovies(),
          getTopRatedMovies()
        ]);
        setTrendingMovies(trendingData.results.slice(0, 4));
        setTopRatedMovies(topRatedData.results.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container className="py-4">
      <section className="mb-5">
        <h2 className="mb-4">Trending Today</h2>
        <Row className="g-4">
          {trendingMovies.map(movie => (
            <Col key={movie.id} xs={12} sm={6} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </section>

      <section>
        <h2 className="mb-4">Top Rated</h2>
        <Row className="g-4">
          {topRatedMovies.map(movie => (
            <Col key={movie.id} xs={12} sm={6} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default Home;
