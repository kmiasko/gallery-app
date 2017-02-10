import {
  PLAY_MOVIE,
  STOP_MOVIE,
} from './types';

export const playMovie = shortid => ({
  type: PLAY_MOVIE,
  id: shortid,
});

export const stopMovie = () => ({
  type: STOP_MOVIE,
});


