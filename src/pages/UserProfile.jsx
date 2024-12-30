import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const UserProfile = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(storedWatchlist);
    setLoading(false);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <Container className="py-4">
      <div className="profile-header mb-4">
        <h1>Profile</h1>
        <p>Welcome, {user?.username || 'User'}!</p>
      </div>

      <section>
        <h2 className="mb-4">Your Watchlist</h2>
        {watchlist.length === 0 ? (
          <p>No movies in your watchlist yet.</p>
        ) : (
          <Row className="g-4">
            {watchlist.map(movie => (
              <Col key={movie.id} xs={12} sm={6} md={3}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        )}
      </section>
    </Container>
  );
};

export default UserProfile;
