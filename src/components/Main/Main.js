import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';
import nth from 'lodash/nth';
import MovieListItem from '../common/MovieListItem';
import MovieCard from '../common/MovieCard';
import { getMovies } from './selectors';
import { toggleFavorite, deleteMovie } from '../../actions/MoviesActions';
import { playMovie } from '../../actions/PlayerActions';
import './Main.css';

const MoviesList = ({ movies, MovieContainer,
  toggleFavorite, deleteMovie, playMovie }) => {
  return (
    <div className="ListContainer">
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

  toggleFavorite(movie) {
    this.props.toggleFavorite(movie.shortid);
  }

  deleteMovie(movie) {
    this.props.deleteMovie(movie.shortid);
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
};

Main.defaultProps = {
  movies: [],
};

const mapStateToProps = state => ({
  layout: state.layout.layout,
  movies: nth(chunk(getMovies(state), state.layout.perPage), state.pagination.currentPage),
});

export default connect(mapStateToProps, {
  toggleFavorite,
  deleteMovie,
  playMovie,
})(Main);
