import { createSelector } from 'reselect';
import moment from 'moment';

const getFavoritesFilter = state => state.favorites;
const getSortingValue = state => state.sorting;
const getMoviesState = state => state.movies;

const DESC = -1;
const ASC = 1;

const sortAsc = (a, b) => (moment(a.creationDate).isSameOrBefore(b.creationDate) ? DESC : ASC);
const sortDesc = (b, a) => (moment(a.creationDate).isSameOrBefore(b.creationDate) ? DESC : ASC);

export const getMovies = createSelector(
  [getMoviesState, getSortingValue, getFavoritesFilter],
  (movies, sorting, favorites) => {
    const m = movies.filter(movie => ((favorites === '0') ? movie : (movie.favorite === true)));
    return (sorting === '0') ? m.sort(sortDesc) : m.sort(sortAsc);
  }
);
