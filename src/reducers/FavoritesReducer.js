import { FAVORITES_CHANGE } from '../actions/types';

export default (state = '0', action = {}) => {
  switch (action.type) {
    case FAVORITES_CHANGE:
      return action.value;
    default:
      return state;
  }
};

