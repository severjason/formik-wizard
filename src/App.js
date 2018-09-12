import React, { Component } from 'react';
import Tab                  from './components/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import tabs                 from './components/Tabs/data';

class App extends Component {
  render() {
    return <Tab reservations={tabs.opened} />;
  }
}

export default App;
