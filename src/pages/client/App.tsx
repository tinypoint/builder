import React from 'react';
import { Provider } from 'react-redux';
import Controller from './components/Controller';
import Renderer from './components/Renderer';
import styleSyncer from './components/Renderer/features/styleSyncer';
import './style.css';

styleSyncer.start();

const App = () => (
  <Provider store={(window as any).store}>
    <Controller />
    <Renderer />
  </Provider>
);

export default App;
