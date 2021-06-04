import React, { Component } from "react";
import Controller from "./components/Controller";
import Renderer from "./components/Renderer";
import { Provider } from "react-redux";
import "./style.css";

export default class App extends Component {
  render() {
    return (
      <Provider store={(window as any).store}>
        <Controller />
        <Renderer />
      </Provider>
    );
  }
}
