import { PAGE_CHANGE, PERPAGE_CHANGE } from '../actions/types';

export default (state = { currentPage: 0 }, action = {}) => {
  switch (action.type) {
    case PAGE_CHANGE:
      return {
        ...state,
        currentPage: action.value,
      };
    case PERPAGE_CHANGE:
      return {
        ...state,
        currentPage: 0,
      };
    default:
      return state;
  }
}

