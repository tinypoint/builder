import React from "react";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Controller from "./components/Controller";
import store from "./store";
import "./App.css";
import Shop from "./components/Shop";
import Styler from "./components/Styler";
import historyer from "./features/historyer";
import Configer from "./components/Configer";
import Loading from "./components/Loading";

(window as any).store = store;

interface Props {
  create?: boolean;
}
class Editor extends React.Component<Props> {

  createData = () => {
    store.dispatch({
      type: "CHANGE_VALUE",
      payload: [{
        key: "schema", value: {
          type: 'container',
          id: 'container0001',
          children: []
        }
      }],
    });
  }

  fetchData = async () => {
    const val = window.localStorage.getItem("_test_data") || `{ "type": "container", "children": [ { "type": "page", "id": "page1234",  "children": [] } ] }`;

    store.dispatch({
      type: "CHANGE_VALUE",
      payload: [{ key: "schema", value: JSON.parse(val) }],
    });
  };

  componentDidMount() {
    const { create } = this.props;
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        { key: 'create', value: create }
      ]
    });
    if (create) {
      this.createData();
    } else {
      this.fetchData();
    }
  }

  componentDidUpdate() {
    const { create } = this.props;
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        { key: 'create', value: this.props.create }
      ]
    })
    if (create) {
      this.createData();
    } else {
      this.fetchData();
    }
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
        <Loading />
      </Provider>
    );
  }
}

export default Editor;
