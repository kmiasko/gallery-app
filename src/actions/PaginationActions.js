import { PAGE_CHANGE } from './types';

export const changePage = pageNum => ({
  type: PAGE_CHANGE,
  value: pageNum.selected,
});
