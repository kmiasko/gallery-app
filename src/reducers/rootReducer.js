import { combineReducers } from 'redux';
import pagination from './PaginationReducer';
import sorting from './SortReducer';
import layout from './LayoutReducer';
import movies from './MoviesReducer';
import favorites from './FavoritesReducer';
import player from './PlayerReducer';

export default combineReducers({
  pagination,
  sorting,
  layout,
  favorites,
  movies,
  player,
});
