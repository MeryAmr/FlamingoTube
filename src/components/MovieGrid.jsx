import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Pagination, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MovieCard from './MovieCard';

// Create a dark theme for the pagination
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50',
    },
  },
});

const MovieGrid = ({ movies, page, onPageChange, totalPages }) => {
  if (!movies?.length) return <p>No movies found</p>;

  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Container>
      <Row className="g-4">
        {movies.map(movie => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
      <ThemeProvider theme={darkTheme}>
        <Stack spacing={2} alignItems="center" sx={{ my: 3 }}>
          <Pagination 
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Stack>
      </ThemeProvider>
    </Container>
  );
};

export default MovieGrid;