import { LOGIN, LOGOUT, SHOW_DIALOG, HIDE_DIALOG } from '../actions/types';

const initialState = {
  isLoggedIn: false,
  token: false,
  showLoginDialog: false,
};

const loginReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return {
        isLoggedIn: true,
        token: action.payload,
        showLoginDialog: false,
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
        token: false,
        showLoginDialog: false,
      };
    case SHOW_DIALOG:
      return {
        ...state,
        showLoginDialog: true,
      };
    case HIDE_DIALOG:
      return {
        ...state,
        showLoginDialog: false,
      };
    default:
      return state;
  }
};

export default loginReducer;

