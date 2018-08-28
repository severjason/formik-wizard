import React, { Component } from 'react';
import RestaurantForm from './components/RestaurantForm';
import data from './data.json';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
        <RestaurantForm restaurant={data} />
    );
  }
}

export default App;
