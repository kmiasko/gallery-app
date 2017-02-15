import { combineReducers } from 'redux';
import pagination from './PaginationReducer';
import sorting from './SortReducer';
import layout from './LayoutReducer';
import movies from './MoviesReducer';
import favorites from './FavoritesReducer';
import player from './PlayerReducer';
import feed from './FeedReducer';
import login from './LoginReducer';

export default combineReducers({
  pagination,
  sorting,
  layout,
  favorites,
  movies,
  player,
  feed,
  login,
});
