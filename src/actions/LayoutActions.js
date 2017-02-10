import { LAYOUT_CHANGE } from './types';
import { PERPAGE_CHANGE } from './types';

export const changeLayout = layout => ({
  type: LAYOUT_CHANGE,
  value: layout,
});

export const changePerPage = count => ({
  type: PERPAGE_CHANGE,
  value: count,
});
