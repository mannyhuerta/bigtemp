import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const env = require('./env.json')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { temperature: 71.2 }
  }

  componentDidMount() {
    console.log(env.WUNDERGROUND_API_KEY)
    fetch(`http://api.wunderground.com/api/${env.WUNDERGROUND_API_KEY}/conditions/q/CA/San_Francisco.json`)
    .then((resp) => resp.json())
    .then((resp) => {
      this.setState(Object.assign({}, this.state, {current: resp.current_observation}))
    })
  }

  getCurrent() {
    return <div>The current conditions in San Francisco are: {this.state.current.feelslike_f} F</div>
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        {this.state.current ? this.getCurrent() : <div>Retrieving temperature data...</div>}
        </p>
      </div>
    );
  }
}

export default App;
