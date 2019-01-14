import React, { Component } from 'react';
import logo from './logo.svg';
import CustomerRoutes from './router/customerRouter'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CustomerRoutes/>
      </div>
    );
  }
}

export default App;
