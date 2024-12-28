import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '96520f12c2a04d0b1ff048d6fd838394';
export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY
  }
});

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,reviews'
      }
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.status_message || 'Failed to fetch movie details';
    throw new Error(errorMessage);
  }
};