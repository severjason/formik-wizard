import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import EditLocationForm from './components/EditLocationForm';
import store from './store';
import data from './data.json';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <EditLocationForm {...data}/>
      </Provider>
    );
  }
}

export default App;
