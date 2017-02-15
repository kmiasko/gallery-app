import React from 'react';
import { connect } from 'react-redux';
import { sendLogin, logout, showDialog, hideDialog } from './actions/LoginActions';
import TopPanel from './components/TopPanel';
import Main from './components/Main';
import Pagination from './components/Pagination';
import Player from './components/Player';
import Feed from './components/common/Feed';
import NavBar from './components/NavBar';
import LoginDialog from './components/LoginDialog';
import './App.css';

class App extends React.Component {
  render() {
    const { isLoggedIn, hideDialog, showDialog, showLoginDialog } = this.props;
    return (
    <div className='App'>
      <NavBar
        login={this.props.sendLogin}
        logout={this.props.logout}
        logged={this.props.isLoggedIn}
        showDialog={showDialog}
      />
      { isLoggedIn && <TopPanel /> }
      <Feed />
      { isLoggedIn && <Main /> }
      { isLoggedIn && <Pagination /> }
      <Player />
      { showLoginDialog && <LoginDialog /> }
    </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.login.isLoggedIn,
  showLoginDialog: state.login.showLoginDialog,
});

const mapDispatchToProps = {
  sendLogin,
  logout,
  hideDialog,
  showDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
