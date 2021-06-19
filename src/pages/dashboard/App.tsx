import React from 'react';
import Header from './components/Header';
import Cards from './components/Cards';
import Ripple from './components/Ripple';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Cards />
        <Ripple />
      </>
    );
  }
}
