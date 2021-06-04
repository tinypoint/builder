import React from "react";
import { Provider } from "react-redux";
import Controller from "./components/Controller";
import Runtime from "./components/Runtime";
import Tracker from "./components/Tracker";
import Anchor from "./components/Anchor";
import Toolbox from "./components/Toolbox";
import store from "./store";
import "./style.css";

(window as any).store = store;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="content">
          <Controller>
            <div className="divice">
              <div className="webview">
                <Runtime />
              </div>
              <Tracker
                selector={
                  <Anchor type="select">
                    <Toolbox />
                  </Anchor>
                }
                hoveror={<Anchor type="hover" />}
              />
            </div>
          </Controller>
        </div>
        <div className="header"></div>
      </Provider>
    );
  }
}
