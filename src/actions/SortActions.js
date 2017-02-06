import { SORT_CHANGE } from './types';

export const changeSorting = value => ({
  type: SORT_CHANGE,
  value
});
