import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

const ADD = 'ADD';

const addNote = (note) => {
  return {
    type: ADD,
    note
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD: return [...state, action.note];
    default: return state;
  } 
}

const store = createStore(reducer);
const mapStateToProps = (state) => {
  return {notes: state};
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitNote: (note) => {
      dispatch(addNote(note));
    }
  }
};
const Container = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
