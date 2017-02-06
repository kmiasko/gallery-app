import { LAYOUT_CHANGE, PERPAGE_CHANGE } from '../actions/types';

const initialState = {
  layout: '0',
  perPage: '5',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LAYOUT_CHANGE:
      return {
        ...state,
        layout: action.value,
      };
    case PERPAGE_CHANGE:
      return {
        ...state,
        perPage: action.value,
      };
    default:
      return state
  }
};
