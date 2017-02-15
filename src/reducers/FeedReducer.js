import { LOAD_FEED, ADD_FEED_ITEM } from '../actions/types';

const feedReducer = (state = [], action = {}) => {
  switch (action.type) {
    case LOAD_FEED:
      return action.payload;
    case ADD_FEED_ITEM:
      return [
        action.payload,
        ...state.slice(0, 9),
      ];
    default:
      return state;
  }
};

export default feedReducer;

