import React, { Component } from 'react';
import './App.css';
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
