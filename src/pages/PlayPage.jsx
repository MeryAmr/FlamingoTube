import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieTrailer } from '../api/movieService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const PlayPage = () => {
  const { id } = useParams();
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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!trailer) return <div>No trailer available</div>;

  return (
    <div className="play-page">
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default PlayPage;
