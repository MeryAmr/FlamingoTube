import { tmdbApi } from './tmdb';

export const discoverMovies = async ({ page = 1, genre = '' } = {}) => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        page,
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        language: 'en-US',
        with_genres: genre // Add genre filter
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.status_message || 'Failed to fetch movies');
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.status_message || 'Failed to fetch search results');
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        language: 'en-US',
        append_to_response: 'videos,credits'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.status_message || 'Failed to fetch movie details');
  }
};

export const getMovieTrailer = async (movieId) => {
  try {
    const response = await fetch(
      `${tmdbApi.defaults.baseURL}/movie/${movieId}/videos?api_key=${tmdbApi.defaults.params.api_key}&language=en-US`
    );
    if (!response.ok) throw new Error('Failed to fetch trailer');
    const data = await response.json();
    const trailer = data.results.find(
      video => video.type === "Trailer" && video.site === "YouTube"
    ) || data.results[0];
    return trailer;
  } catch (error) {
    throw new Error('Failed to fetch trailer: ' + error.message);
  }
};

export const getGenres = async () => {
  try {
    const response = await tmdbApi.get('/genre/movie/list', {
      params: {
        language: 'en-US'
      }
    });
    return response.data.genres;
  } catch (error) {
    throw new Error(error.response?.data?.status_message || 'Failed to fetch genres');
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get('/trending/movie/day', {
      params: {
        language: 'en-US'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.status_message || 'Failed to fetch trending movies');
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await tmdbApi.get('/movie/top_rated', {
      params: {
        language: 'en-US',
        page: 1
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.status_message || 'Failed to fetch top rated movies');

  }
};