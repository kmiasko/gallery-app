import config from '../config';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';
import VideoDownloader from '../utils/VideoDownloader';

import {
  MOVIE_TOGGLE_FAVORITE,
  DELETE_MOVIE,
  ADD_MOVIE,
  PLAY_MOVIE,
  STOP_MOVIE,
  LOAD_MOVIES,
} from './types';

export const toggleFavoriteOnServer = (id, shortid) => (dispatch) => {
  axios.put(`/videos/${id}`)
    .then(video => dispatch(toggleFavorite(shortid)));
};

export const toggleFavorite = shortid => ({
  type: MOVIE_TOGGLE_FAVORITE,
  id: shortid,
});

export const deleteMovieFromServer = (id, shortid) => (dispatch) =>
  axios.delete(`/videos/${id}`)
    .then(resp => dispatch(deleteMovie(shortid)));

export const deleteMovie = shortid => ({
  type: DELETE_MOVIE,
  id: shortid,
});

export const addMovie = movie => ({
  type: ADD_MOVIE,
  movie,
});

export const postMovieToDB = movie => (dispatch) =>
  axios.post('/videos', {
    ...movie
  })
  .then(resp => dispatch(addMovie(resp.data.video)));

export const downloadMovies = input => (dispatch) => {
  VideoDownloader.download(input)
    .then((data) => {
      const movies = data.filter(item => !isEmpty(item));
      movies.forEach(movie => dispatch(postMovieToDB(movie)));
    })
    .catch(err => console.error(err));
};

export const getMoviesFromServer = () => (dispatch) =>
  axios.get('/videos')
    .then(resp => dispatch(loadMovies(resp.data.videos)));

export const loadMovies = movies => ({
  type: LOAD_MOVIES,
  movies,
});

export const playMovie = shortid => ({
  type: PLAY_MOVIE,
  id: shortid,
});

export const stopMovie = () => ({
  type: STOP_MOVIE,
});
