import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';
import GetQuote from './components/GetQuote';
import quotes from './data/quotes';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isStart: true,
      isFull: false,
      isQuote: false,
      // isMenu: true,
      isQuoteButton: true,
      isWriteButton: true,
      text: '',
      author: ''
    };
    this.load = () => {
      this.state.name = localStorage.getItem('name');
    }
    if (localStorage.length) this.load();
  }

  goFull = () => {
    this.setState({ isFull: true });
  }

  handleChange = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      let name = e.target.value;
      localStorage.setItem('name', name);
      this.setState({name});
    }
  }

  handleQuoteButton = () => {
    let ind = Math.floor(Math.random() * quotes.length);

    this.setState({
      isQuote: true,
      isStart: false,
      isQuoteButton: false,
      text: quotes[ind].text,
      author: quotes[ind].author
    });
  }

  render() {
    const welcome = <h2>Welcome, {this.state.name}</h2>,
          enterName = <input autoFocus className="input-name" type="text" placeholder="Enter your name" onKeyDown={this.handleChange}/>,
          quoteButton = <button onClick={this.handleQuoteButton}>Get quote</button>,
          writeButton = <button>Start writing</button>,
          fullscreenNode = <div className="full-screenable-node">
                            <div className="center">
                              {this.state.isStart ? (this.state.name ? welcome : enterName) : null}
                              {this.state.isQuote ? <GetQuote text={this.state.text} author={this.state.author} /> : null}
                              {this.state.isQuoteButton ? quoteButton : null}
                              {this.state.isWriteButton ? writeButton : null}
                            </div>
                          </div>;
    return (
      <div className="App">
        <header>
          <h1 className="App-title">Room 156</h1>
          <div className="arrow" onClick={this.goFull}>
            <p>enter</p>
          </div>
          <Fullscreen
            enabled={this.state.isFull}
            onChange={isFull => this.setState({isFull})}
          >
            {this.state.isFull ? fullscreenNode : <div></div>}
          </Fullscreen>
        </header>
      </div>
    );
  }
}

export default App;
