import React, { Component } from 'react';
import SampleMap from './SampleMap';

class App extends Component {
  state = {};

  getDevicesLocation = async () => {
    try {
      const devices = await fetch('http://localhost:7000/location').then(res => {
        return res.json();
      });
      this.setState({ devices });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.getDevicesLocation();
  }

  render() {
    const { devices } = this.state;
    if (!devices) return null;
    return (
      <div className="App">
        <header className="App-header" />
        <main>
          <SampleMap devices={devices} />
        </main>
      </div>
    );
  }
}

export default App;
