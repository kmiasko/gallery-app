import {
  PLAY_MOVIE,
  STOP_MOVIE,
} from '../actions/types.js';

const initialState = {
  playing: false,
  playingID: null,
}

export default(state = initialState, action = {}) => {
  switch (action.type) {
    case PLAY_MOVIE:
      return {
        playing: true,
        playingID: action.id,
      };
    case STOP_MOVIE:
      return {
        playing: false,
        playingID: null,
      };
    default:
      return state;
  }
};
