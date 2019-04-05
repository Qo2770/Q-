import React, { Component } from 'react';
import './App.css';

import Toolbar from './components/Toolbar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Graph from './components/Graph';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <Dashboard />
      </div>
    );
  }
}

export default App;
