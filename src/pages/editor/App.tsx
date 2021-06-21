import React from 'react';
import { Provider } from 'react-redux';
import queryString from 'query-string';
import axios from 'axios';
import Header from './components/Header';
import Controller from './components/Controller';
import store, { Schema, State } from './store';
import './App.css';
import Shop from './components/Shop';
import Styler from './components/Styler';
import historyer from './features/historyer';
// import Configer from './components/Configer';
import Loading from './components/Loading';
import SettingsPanel from './components/SettingsPanel';

(window as any).store = store;
(window as any).changePosition = (_schema: Schema) => {
  historyer.push(_schema);
};

interface PagesRecord {
  status: string;
  page: string;
  schema: State['schema'];
}

class Editor extends React.Component {
  componentDidMount() {
    this.fetchComponents();
    this.fetchTemplates();
    if (store.getState().create) {
      this.createData();
    } else {
      this.fetchData();
    }
  }

  fetchComponents = async () => {
    const {
      data: { data: components },
    } = await axios.get('/api/component/list');
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'components', value: components }],
    });
  };

  fetchTemplates = async () => {
    const {
      data: { data: templates },
    } = await axios.get('/api/template/list');
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'templates', value: templates }],
    });
  };

  createData = () => {
    historyer.push({
      type: 'container',
      id: 'container0001',
      children: [],
    });
  };

  fetchData = async () => {
    const { id } = queryString.parse(window.location.search);

    if (!id || !/^[0-9a-zA-Z]{24}$/.exec(id as string)) {
      return;
    }

    const {
      data: { data: meta },
    } = await axios.get(`/api/page/info/${id}`);

    const { records } = meta;

    const editing = records.filter(
      (record: PagesRecord) => record.status === 'editing',
    )[0];

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'meta', value: meta }],
    });

    historyer.push(editing.schema);
  };

  render() {
    return (
      <Provider store={store}>
        <div className="content">
          <Shop />
          <Controller />
          {/* <Configer /> */}
          <Styler />
        </div>
        <Header />
        <SettingsPanel />
        <Loading />
      </Provider>
    );
  }
}

export default Editor;
