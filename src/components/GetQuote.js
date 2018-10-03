import React from 'react';
import './GetQuote.css';

const GetQuote = (props) => {
  return (
    <div className="quote">
      <p>{props.text}</p>
      <p>{props.author}</p>
    </div>
  );
}

export default GetQuote;