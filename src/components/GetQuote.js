import React from 'react';
import './GetQuote.css';

class GetQuote extends React.Component {
  render() {
    return (
      <div className="quote">
        <p>{this.props.text}</p>
        <p>{this.props.author}</p>
      </div>
    );
  }
}

export default GetQuote;