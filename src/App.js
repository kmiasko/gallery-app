import React from 'react';
import './App.css';
import TopPanel from './components/TopPanel';
import Main from './components/Main';
import Pagination from './components/Pagination';
import Player from './components/Player';

class App extends React.Component {
  render() {
    return (
    <div className="App">
      <TopPanel />
      <Main />
      <Pagination />
      <Player />
    </div>
    );
  }
}

export default App;
