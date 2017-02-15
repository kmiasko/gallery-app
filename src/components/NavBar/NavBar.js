import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey50 } from 'material-ui/styles/colors';
import './NavBar.css';

const Login = props => (
  <FlatButton
    label="Login"
    labelStyle={{ color: grey50 }}
    onTouchTap={props.showDialog}
  />
);

Login.muiName = 'FlatButton';

const Logged = props => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon color={grey50} /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Logout" onTouchTap={props.logout} />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='NavBar'>
        <AppBar
          title="Gallery"
          style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
          }}
          iconStyleRight={{ margin: 0 }}
          iconStyleLeft={{ display: 'none' }}
          iconElementRight={
            this.props.logged
            ? <Logged logout={this.props.logout} />
            : <Login showDialog={this.props.showDialog} />}
        />
      </div>
    );
  }
}

export default NavBar;
