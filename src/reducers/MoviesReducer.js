import {
  MOVIE_TOGGLE_FAVORITE,
  DELETE_MOVIE,
  CLEAR_MOVIES,
  ADD_MOVIE,
} from '../actions/types';

export default(state = [], action = {}) => {
  switch (action.type) {
    case MOVIE_TOGGLE_FAVORITE:
      const idxToggle = state.findIndex(movie => movie.shortid === action.id);
      const movie = state[idxToggle];
      movie.favorite = !movie.favorite;
      return [
        ...state.slice(0, idxToggle),
        movie,
        ...state.slice(idxToggle + 1, state.length),
      ];
    case DELETE_MOVIE:
      const idxDelete = state.findIndex(movie => movie.shortid === action.id);
      return [
        ...state.slice(0, idxDelete),
        ...state.slice(idxDelete + 1, state.length),
      ];
    case ADD_MOVIE:
      return [
        ...state,
        action.movie,
      ];
    case CLEAR_MOVIES:
      return [];
    default:
      return state;
  }
};

