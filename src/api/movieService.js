import { tmdbApi } from './tmdb';

export const discoverMovies = async ({ page = 1 } = {}) => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        page,
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        language: 'en-US'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.status_message || 'Failed to fetch movies');
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