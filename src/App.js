import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.load = () => {
      this.state.name = localStorage.getItem('name');
    }
    if (localStorage.length) this.load();
  }

  handleChange(e) {
    if (e.which == 13 || e.keyCode == 13) {
      let name = e.target.value;
      localStorage.setItem('name', name);
      this.setState({name});
    }
  }

  render() {
    const welcome = <h2>Welcome, {this.state.name}</h2>,
          enterName = <input type="text" placeholder="Enter your name" onKeyDown={this.handleChange}/>;
    return (
      <div className="App">
        <header>
          <h1 className="App-title">Room 156</h1>
          <div class="o">
            <p>enter</p>
          </div>
          {/* {this.state.name ? welcome : enterName} */}
        </header>
      </div>
    );
  }
}

export default App;
