import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { sendLogin, hideDialog } from '../../actions/LoginActions';
import './LoginDialog.css';

class LoginDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {
        username: '',
        password: '',
      },
      formError: '',
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login() {
    const { username, password } = this.state;

    this.setState({
      formError: '',
    });

    this.props.sendLogin(username, password)
      .catch(error => {
        if (error.response.data.errors) {
          this.setState({
            errors: error.response.data.errors,
          });
        }
        if (error.response.data.error) {
          this.setState({
            formError: error.response.data.error,
          });
        }
      });
  };

  handleChange(e) {
    const { id, value } = e.target;

    this.setState({
      [id]: value,
      errors: {
        [id]: '',
      },
    });
  }

  render() {
    const textFieldStyle = {
      margin: '0.1em 0',
    };

    const buttonStyle = {
      margin: '1em 0',
    };

    return (
      <Dialog
        title='Login'
        modal={true}
        open={this.props.show}
      >
        <div className='LoginDialog__Form'>
          { this.state.formError && <p className='LoginDialog__Form--error'>{ this.state.formError }</p> }
          <TextField
            hintText='Username'
            id='username'
            value={this.state.username}
            onChange={this.handleChange}
            errorText={this.state.errors.username}
            style={textFieldStyle}
          />
          <TextField
            hintText='Password'
            type='password'
            id='password'
            value={this.state.password}
            onChange={this.handleChange}
            errorText={this.state.errors.password}
            style={textFieldStyle}
          />
          <div className='LoginDialog__Form__Buttons'>
            <FlatButton
              label='Login'
              primary={true}
              onTouchTap={this.login}
              style={buttonStyle}
            />
            <FlatButton
              label='Cancel'
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.props.hideDialog}
              style={buttonStyle}
            />
          </div>
        </div>
      </Dialog>
    );
  }
};

const mapStateToProps = state => ({
  show: state.login.showLoginDialog,
});

const mapDispatchToProps = {
  sendLogin,
  hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
