import { FAVORITES_CHANGE } from './types';

export const changeFavorites = value => ({
  type: FAVORITES_CHANGE,
  value: value,
});
