import axios from 'axios';
import { LOGIN, LOGOUT, SHOW_DIALOG, HIDE_DIALOG } from './types';

export const sendLogin = (username, password) => (dispatch) =>
  axios.post('/users/login', {
    username,
    password,
  })
  .then(resp => {
    axios.defaults.headers['x-auth'] = resp.data.token;
    dispatch(login(resp.data.token));
    return resp;
  });

export const login = token => ({
  type: LOGIN,
  payload: token,
});

export const logout = () => ({
  type: LOGOUT,
});

export const showDialog = () => ({
  type: SHOW_DIALOG,
});

export const hideDialog = () => ({
  type: HIDE_DIALOG,
});

