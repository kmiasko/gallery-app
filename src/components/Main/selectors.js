import { createSelector } from 'reselect';
import moment from 'moment';

const getFavoritesFilter = state => state.favorites;
const getSortingValue = state => state.sorting;
const getMoviesState = state => state.movies;

const sortAsc = (a, b) => (moment(a.date).isSameOrBefore(b.date) ? -1 : 1);
const sortDesc = (b, a) => (moment(a.date).isSameOrBefore(b.date) ? -1 : 1);

export const getMovies = createSelector(
  [getMoviesState, getSortingValue, getFavoritesFilter],
  (movies, sorting, favorites) => {
    const m = movies.filter(movie => ((favorites === '0') ? movie : (movie.favorite === true)));
    return (sorting === '0') ? m.sort(sortDesc) : m.sort(sortAsc);
  }
);
