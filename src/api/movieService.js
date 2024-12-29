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

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
        page,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.status_message || 'Failed to fetch search results');
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