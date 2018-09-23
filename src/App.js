import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isFull: false
    };
    // this.handleChange = this.handleChange.bind(this);
    this.load = () => {
      this.state.name = localStorage.getItem('name');
    }
    if (localStorage.length) this.load();
  }

  goFull = () => {
    this.setState({ isFull: true });
  }

  handleChange = (e) => {
    if (e.which == 13 || e.keyCode == 13) {
      let name = e.target.value;
      localStorage.setItem('name', name);
      this.setState({name});
    }
  }

  render() {
    const welcome = <h2>Welcome, {this.state.name}</h2>,
          enterName = <input autoFocus className="input-name" type="text" placeholder="Enter your name" onKeyDown={this.handleChange}/>,
          fullscreenNode = <div className="full-screenable-node">
                            {this.state.name ? welcome : enterName}
                          </div>;
    return (
      <div className="App">
        <header>
          <h1 className="App-title">Room 156</h1>
          <div className="o" onClick={this.goFull}>
            <p>enter</p>
          </div>
          <Fullscreen
            enabled={this.state.isFull}
            onChange={isFull => this.setState({isFull})}
          >
            {this.state.isFull ? fullscreenNode : null}
          </Fullscreen>
        </header>
      </div>
    );
  }
}

export default App;
