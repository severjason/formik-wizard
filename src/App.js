import React, { Component } from 'react';
import EditLocationForm from './components/EditLocationForm';
import data from './data.json';

class App extends Component {
  render() {
    return (
        <EditLocationForm {...data}/>
    );
  }
}

export default App;
