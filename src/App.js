import React, { Component } from 'react';
import Tab from './components/Tabs/Tab';
import 'bootstrap/dist/css/bootstrap.min.css';
import tabs from './components/Tabs/data';

class App extends Component {
  render() {
    return <Tab reservations={tabs.opened} type="opened"/>;
  }
}

export default App;
