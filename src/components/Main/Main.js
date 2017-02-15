import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';
import nth from 'lodash/nth';
import MovieListItem from '../common/MovieListItem';
import MovieCard from '../common/MovieCard';
import { getMovies } from './selectors';
import { toggleFavoriteOnServer, deleteMovieFromServer, getMoviesFromServer } from '../../actions/MoviesActions';
import { playMovie } from '../../actions/PlayerActions';
import './Main.css';

const MoviesList = ({ movies, MovieContainer,
  toggleFavorite, deleteMovie, playMovie }) => {
  return (
    <div className="ListContainer">
      <h2>Your movies</h2>
      { movies.map((movie, i) => (<MovieContainer
        key={i}
        toggleFavorite={toggleFavorite.bind(null, movie)}
        deleteMovie={deleteMovie.bind(null, movie)}
        playMovie={playMovie.bind(null, movie)}
        { ...movie }
      />))
      }
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  MovieContainer: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  playMovie: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

MoviesList.defaultProps = {
  movies: [],
};

class Main extends React.Component {
  constructor() {
    super();
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.playMovie = this.playMovie.bind(this);
  }

  componentDidMount() {
    this.props.getMoviesFromServer()
      .catch(err => console.error(err.response.data));
  }

  toggleFavorite(movie) {
    this.props.toggleFavoriteOnServer(movie._id, movie.shortid);
  }

  deleteMovie(movie) {
    this.props.deleteMovieFromServer(movie._id, movie.shortid);
  }

  playMovie(movie) {
    this.props.playMovie(movie.shortid);
  }

  render() {
    const element = (this.props.layout === '1') ? MovieListItem : MovieCard;
    return (
      <div className='Main'>
        <MoviesList
          movies={this.props.movies}
          MovieContainer={element}
          toggleFavorite={this.toggleFavorite}
          deleteMovie={this.deleteMovie}
          playMovie={this.playMovie}
        />
      </div>
    );
  }
}

Main.propTypes = {
  layout: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  deleteMovieFromServer: PropTypes.func.isRequired,
  toggleFavoriteOnServer: PropTypes.func.isRequired,
};

Main.defaultProps = {
  movies: [],
};

const mapStateToProps = state => ({
  layout: state.layout.layout,
  movies: nth(chunk(getMovies(state), state.layout.perPage), state.pagination.currentPage),
});

export default connect(mapStateToProps, {
  toggleFavoriteOnServer,
  deleteMovieFromServer,
  playMovie,
  getMoviesFromServer,
})(Main);
