import React, { PropTypes } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {red500} from 'material-ui/styles/colors';
import './MovieCard.css';

const MovieCard = (props) => {
  const { title, date, likes = 0, views = 0, thumbnail,
    description, favorite, toggleFavorite, deleteMovie,
    playMovie } = props;
  const subtitle = `Likes: ${likes} Views: ${views} Added: ${date}`;
  const cursorPointer = { cursor: 'pointer' };
  const cardActionsStyle = {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <div className='MovieCard'>
      <Card>
        <CardMedia style={cursorPointer}>
          <img src={thumbnail} onClick={playMovie} alt={title} />
        </CardMedia>
        <CardTitle title={title} subtitle={subtitle} style={cursorPointer} onClick={() => console.log('Title clicked')}/>
        <CardText>{description}</CardText>
        <CardActions style={cardActionsStyle}>
          <FlatButton onClick={playMovie} label="Play" primary={true} />
          <FlatButton onClick={deleteMovie} label="Delete" secondary={true} />
          <IconButton onClick={toggleFavorite}>
            { (favorite) ? <Favorite color={red500} /> : <FavoriteBorder color={red500} /> }
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

MovieCard.muiName = 'Card';

MovieCard.defaultProps = {
  views: 0,
  likes: 0,
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  likes: PropTypes.number,
  views: PropTypes.number,
  thumbnail: PropTypes.string.isRequired,
  description: PropTypes.string,
  favorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  playMovie: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

export default MovieCard;
