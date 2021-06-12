import React from "react";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Controller from "./components/Controller";
import store from "./store";
import "./style.css";
import Shop from "./components/Shop";
import Styler from "./components/Styler";
import historyer from "./features/historyer";
import Configer from "./components/Configer";

historyer.onChange((schema: any) => {
  store.dispatch({
    type: "CHANGE_VALUE",
    payload: [{ key: "schema", value: schema }],
  });
});
(window as any).store = store;

export default class App extends React.Component {
  fetchData = async () => {
    const val = window.localStorage.getItem("_test_data") || `{ "type": "container", "children": [ { "type": "page", "id": "page1234",  "children": [] } ] }`;
    historyer.push(JSON.parse(val));
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Provider store={store}>
        <div className="content">
          <Shop />
          <Controller />
          <Configer />
          <Styler />
        </div>
        <Header />
      </Provider>
    );
  }
}
