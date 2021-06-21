import React from 'react';
import ReactDOM from 'react-dom';
import { AnyAction, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

const initState = {
  schema: (window as any).$$$schema$$$,
};

const store = createStore((state = initState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
});

ReactDOM.render(
  React.createElement(Provider, { store }, React.createElement(App)),
  document.getElementById('root'),
);
