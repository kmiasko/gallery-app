import config from '../config';
import VideoDownloader from '../utils/VideoDownloader';
import isEmpty from 'lodash/isEmpty';

import {
  MOVIE_TOGGLE_FAVORITE,
  DELETE_MOVIE,
  CLEAR_MOVIES,
  ADD_MOVIE,
  PLAY_MOVIE,
  STOP_MOVIE,
} from './types';

export const toggleFavorite = shortid => ({
  type: MOVIE_TOGGLE_FAVORITE,
  id: shortid,
});

export const deleteMovie = shortid => ({
  type: DELETE_MOVIE,
  id: shortid,
});

export const clearMovies = () => ({
  type: CLEAR_MOVIES,
});

export const addMovie = movie => ({
  type: ADD_MOVIE,
  movie,
});

export const downloadMovies = input => (dispatch) => {
  VideoDownloader.download(input)
    .then((data) => {
      const movies = data.filter(item => !isEmpty(item));
      movies.forEach(movie => dispatch(addMovie(movie)));
    })
    .catch(err => console.error(err));
};

export const loadMovies = () => (dispatch) => {
  dispatch(clearMovies());
  const movies = config.load;
  const interval = setInterval(() => {
    if (movies.length === 0) {
      clearInterval(interval);
    }
    const movie = movies.shift();
    dispatch(downloadMovies(movie));
  }, 300);
};

export const playMovie = shortid => ({
  type: PLAY_MOVIE,
  id: shortid,
});

export const stopMovie = () => ({
  type: STOP_MOVIE,
});
