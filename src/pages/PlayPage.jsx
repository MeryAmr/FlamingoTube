import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieTrailer } from '../api/movieService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import styles from '../styles/PlayPage.module.css';

const PlayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        setLoading(true);
        setError(null);
        const trailerData = await getMovieTrailer(id);
        setTrailer(trailerData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [id]);

  const handleClose = () => {
    navigate(-1);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!trailer) return <div>No trailer available</div>;

  return (
    <div className={styles.playPage}>
      <button className={styles.closeButton} onClick={handleClose}>
        x
      </button>
      <div className={styles.videoContainer}>
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}?controls=1&rel=0`}
          title="Movie Trailer"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default PlayPage;
