import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import RouteConfig from './routeConfig'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <RouteConfig />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
