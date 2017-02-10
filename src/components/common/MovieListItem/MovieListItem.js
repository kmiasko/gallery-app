import React, { PropTypes } from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import {grey400} from 'material-ui/styles/colors';
import classnames from 'classnames';
import './MovieListItem.css';


const MovieListItem = (props) => {
  const { title, date, likes = 0, views = 0, thumbnail,
    description, favorite, toggleFavorite, deleteMovie,
    playMovie } = props;
  const subtitle = `Likes: ${likes} Views: ${views} Added: ${date}`;
  const avatarStyle = {
    borderRadius: 0,
    top: 0,
    left: 0,
    marginRight: '12px',
  };
  const listItemStyle = { paddingLeft: '100px' };
  const iconButtonElement = (
    <IconButton touch={true} >
      <MoreVertIcon color={grey400} />
    </IconButton>
  );

  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem onClick={playMovie}>Play</MenuItem>
      <MenuItem onClick={deleteMovie}>Delete</MenuItem>
      <MenuItem onClick={toggleFavorite}>{ (favorite) ? 'Un-Favorite' : 'Favorite' } </MenuItem>
    </IconMenu>
  );
  return (
    <div className={classnames('MovieListItem', { 'MovieListItem--Favorite': favorite })}>
      <ListItem innerDivStyle={listItemStyle} onClick={playMovie}
        leftAvatar={<Avatar style={avatarStyle} size={88} src={thumbnail} />}
        primaryText={title}
        secondaryTextLines={2}
        secondaryText={
          <p>
            { subtitle }<br/><span>{description}</span>
          </p>

        }
        rightIconButton={rightIconMenu}
      />
    </div>
  );
};

MovieListItem.defaultProps = {
  views: 0,
  likes: 0,
};

MovieListItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  likes: PropTypes.number,
  views: PropTypes.number,
  thumbnail: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  description: PropTypes.string,
  toggleFavorite: PropTypes.func.isRequired,
  playMovie: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

export default MovieListItem;
