import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, page, onPageChange, totalPages }) => {
  if (!movies?.length) return <p>No movies found</p>;

  return (
    <Container>
      <Row className="g-4">
        {movies.map(movie => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center align-items-center gap-3 my-4">
        <Button 
          variant="primary"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="fw-bold">Page {page}</span>
        <Button 
          variant="primary"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default MovieGrid;