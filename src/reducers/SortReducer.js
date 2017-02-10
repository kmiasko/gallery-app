import { SORT_CHANGE } from '../actions/types';

export default (state = '0', action = {}) => {
  switch (action.type) {
    case SORT_CHANGE:
      return action.value;
    default:
      return state;
  }
};

