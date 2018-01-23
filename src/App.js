import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const env = require('./env.json')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    console.log(env.WUNDERGROUND_API_KEY)
    fetch(`http://api.wunderground.com/api/${env.WUNDERGROUND_API_KEY}/conditions/q/VA/Herndon.json`)
    .then((resp) => resp.json())
    .then((resp) => {
      this.setState(Object.assign({}, this.state, {current: resp.current_observation}))
    })
  }

  getCurrent() {
    return <div className='temp centered'><div> {this.state.current.feelslike_f} F</div><div>Herndon</div></div>
  }
  render() {
    return (
    <div>
        {this.state.current ? this.getCurrent() : <div>Retrieving temperature data...</div>}
      </div>
    );
  }
}

export default App;
