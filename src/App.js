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
      author: '',
      isInput: false,
      isSubmitButton: false,
      inputValue: ''
    };
    this.load = () => {
      this.state.name = localStorage.getItem('name');
    }
    if (localStorage.length) this.load();
  }

  goFull = () => {
    this.setState({ isFull: true });
  }

  handleChangeName = (e) => {
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

  handleWriteButton = () => {
    this.setState({
      isStart: false,
      isQuoteButton: false,
      isInput: true,
      isSubmitButton: true
    });
  }

  handleChangeNote = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSubmit = () => {
    this.props.submitNote(this.state.inputValue);
    this.setState({
      inputValue: ''
    });
  }

  render() {
    const welcome = <h2>Welcome, {this.state.name}</h2>,
          enterName = <input autoFocus className="input-name" type="text" placeholder="Enter your name" onKeyDown={this.handleChangeName}/>,
          quoteButton = <button onClick={this.handleQuoteButton}>Get quote</button>,
          writeButton = <button onClick={this.handleWriteButton}>Start writing</button>,
          submitButton = <button onClick={this.handleSubmit}>Submit</button>,
          writeInput = <input autoFocus type="text" maxLength="156" onChange={this.handleChangeNote} value={this.state.inputValue}/>,
          list = this.props.notes.map((el, i) => <li key={i}>{el}</li>),
          fullscreenNode = <div className="full-screenable-node">
                            <div className="center">
                              {this.state.isStart ? (this.state.name ? welcome : enterName) : null}
                              {this.state.isQuote && <GetQuote text={this.state.text} author={this.state.author} />}
                              {this.state.isQuoteButton && quoteButton}
                              {this.state.isWriteButton && writeButton}
                              {this.state.isInput && writeInput}
                              {this.state.isSubmitButton && submitButton}
                              {list}
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
