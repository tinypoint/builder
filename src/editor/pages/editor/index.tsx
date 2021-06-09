import React from "react";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Controller from "./components/Controller";
import Runtime from "./components/Runtime";
import Tracker from "./components/Tracker";
import Anchor from "./components/Anchor";
import Toolbox from "./components/Toolbox";
import store from "./store";
import "./style.css";
import Shop from "./components/Shop";
// import Configer from "./components/Configer";
import Styler from "./components/Styler";
import historyer from "./features/historyer";

historyer.onChange((schema: any) => {
  store.dispatch({
    type: "CHANGE_VALUE",
    payload: [{ key: "schema", value: schema }],
  });
});
(window as any).store = store;

export default class App extends React.Component {
  fetchData = async () => {
    const val = window.localStorage.getItem("_test_data") || "{}";
    historyer.push(JSON.parse(val));
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Provider store={store}>
        <div className="content">
          <Controller>
            <div
              className="divice"
              style={{
                position: "absolute",
                top: 32,
                left: 201,
                transform: "scale(0.75)",
                transformOrigin: "top left",
              }}
            >
              <div
                className="webview"
                style={{
                  width: 375,
                  height: 667,
                }}
              >
                <Runtime />
              </div>
              <Tracker
                selector={
                  <Anchor type="select">
                    <Toolbox type="select" />
                  </Anchor>
                }
                hoveror={<Anchor type="hover" />}
              />
            </div>
          </Controller>
          <Shop />
          {/* <Configer /> */}
          <Styler />
        </div>
        <Header />
      </Provider>
    );
  }
}
