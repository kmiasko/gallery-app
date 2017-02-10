import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { stopMovie } from '../../actions/PlayerActions';
import './Player.css';

const Player = props => {
  const movieIdx = props.movies.findIndex(movie => movie.shortid === props.movieid);
  const movie = props.movies[movieIdx];
  const getHTML = () => ({ __html: movie.embed });
  const buttonStyle = {
    position: 'absolute',
    bottom: '5px',
    right: '20px',
  };
  const innerStyle = {
    textAlign: 'center',
  };

  return(
    <div className='Player'>
      <Dialog
        contentStyle={innerStyle}
        title={movie && movie.title}
        modal={true}
        open={props.player}
      >
        <div dangerouslySetInnerHTML={movie && getHTML()}></div>
        <FlatButton
          style={buttonStyle}
          label="Close"
          primary={true}
          onTouchTap={props.stopMovie}
        />,
      </Dialog>
    </div>
  );
};

Player.defaultProps = {
  movies: [],
};

Player.propTypes = {
  stopMovie: PropTypes.func.isRequired,
  player: PropTypes.bool.isRequired,
  movieid: PropTypes.string,
  movies: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  player: state.player.playing,
  movieid: state.player.playingID,
  movies: state.movies,
});

export default connect(mapStateToProps, {
  stopMovie,
})(Player);
