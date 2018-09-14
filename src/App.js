import React, { Component } from 'react';
import Tab                  from './components/Tabs/Tab';
import 'bootstrap/dist/css/bootstrap.min.css';
import tabs                 from './components/Tabs/data';
import data from './data'
import RestaurantForm from './components/RestaurantForm';
/*class App extends Component {
  render() {
    return <Tab reservations={tabs.opened} />;
  }
}*/

class App extends Component {
  render() {
    return <RestaurantForm restaurant={data} />;
  }
}
export default App;
