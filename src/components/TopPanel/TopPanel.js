import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import {grey400} from 'material-ui/styles/colors';

import Select from '../common/Select';
import { changeLayout, changePerPage } from '../../actions/LayoutActions';
import { changeSorting } from '../../actions/SortActions';
import { changeFavorites } from '../../actions/FavoritesActions';
import { clearMovies, downloadMovies, loadMovies } from '../../actions/MoviesActions';
import './TopPanel.css';

class TopPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      inputUrl: '',
      error: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.download = this.download.bind(this);
    this.layoutOptions = { '0': 'Tiles', '1': 'List' };
    this.perPageValueOptions = { '5': '5', '10': '10', '20': '20', '50': '50', '100': '100' };
    this.sortValueOptions = { '0': 'Desc', '1': 'Asc' };
    this.favoritesValueOptions = { '0': 'No', '1': 'Yes' };
  }

  handleInputChange(event, value) {
    this.setState({ inputUrl: value });
  }

  download() {
    if (!this.state.inputUrl) {
      return null;
    }
    this.props.downloadMovies(this.state.inputUrl);
    this.setState({
      inputUrl: '',
    });
  };

  handleSelectChange(name, event, index, value) {
    switch (name) {
      case 'layoutValue':
        this.props.changeLayout(value);
        break;
      case 'perPageValue':
        this.props.changePerPage(value);
        break;
      case 'sortValue':
        this.props.changeSorting(value);
        break;
      case 'favoritesValue':
        this.props.changeFavorites(value);
        break;
      default:
        return null;
    };
  }

  render() {
    const buttonStyle = { margin: '0 0.5em' };
    const selectStyle = { margin: '0 0.5em', maxWidth: '7em' };
    const inputStyle = { minWidth: '5em' };
    const errorText = this.state.error || null;
    const iconButtonElement = (
      <IconButton touch={true} >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );
    return (
      <div className='TopPanel'>
        <TextField
          style={inputStyle}
          hintText="Movie url or id"
          fullWidth={true}
          onChange={this.handleInputChange}
          value={this.state.inputUrl}
          errorText={errorText}
        />
        <RaisedButton
          label="ADD"
          primary={true}
          style={buttonStyle}
          onClick={this.download}
        />
        <Select
          name='layoutValue'
          style={selectStyle}
          options={this.layoutOptions}
          label='Layout'
          selected={this.props.layout}
          onChange={this.handleSelectChange}
        />
        <Select
          name='perPageValue'
          style={selectStyle}
          options={this.perPageValueOptions}
          label='Per page'
          selected={this.props.perPage}
          onChange={this.handleSelectChange}
        />
        <Select
          name='sortValue'
          style={selectStyle}
          options={this.sortValueOptions}
          label='Sorting'
          selected={this.props.sorting}
          onChange={this.handleSelectChange}
        />
        <Select
          name='favoritesValue'
          style={selectStyle}
          options={this.favoritesValueOptions}
          label='Fav only'
          selected={this.props.favorites}
          onChange={this.handleSelectChange}
        />
      </div>
    );
  }
}

TopPanel.propTypes = {
  layout: PropTypes.string.isRequired,
  perPage: PropTypes.string.isRequired,
  sorting: PropTypes.string.isRequired,
  favorites: PropTypes.string.isRequired,
  downloadMovies: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  layout: state.layout.layout,
  perPage: state.layout.perPage,
  sorting: state.sorting,
  favorites: state.favorites,
});

export default connect(mapStateToProps, {
  changeLayout,
  changePerPage,
  changeSorting,
  changeFavorites,
  downloadMovies,
})(TopPanel);
