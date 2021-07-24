import React from 'react';
import { Provider } from 'react-redux';
import queryString from 'query-string';
import axios from 'axios';
import store, { Schema, State } from './store';
import historyer from './features/historyer';
import Header from './components/Header';
import ActivityBar from './components/ActivityBar';
import SideBar from './components/SideBar';
import Controller from './components/Controller';
import Rpanel from './components/Rpanel';
import ScriptEditor from './components/ScriptEditor';
import ContextMenu from './components/ContextMenu';
import SettingsPanel from './components/SettingsPanel';
import Loading from './components/Loading';
import './App.css';
import iframeManager from './features/iframeManager';
import schemaParser from './features/schemaParser';

(window as any).store = store;
(window as any).changePosition = (_schema: Schema, targetId: string) => {
  // historyer.pushSchema(_schema);

  const { loading } = store.getState();

  store.dispatch({
    type: 'CHANGE_VALUE',
    payload: [
      { key: 'loading', value: { ...loading, addComponent: true } },
      { key: 'schema', value: _schema },
    ],
  });

  setTimeout(async () => {
    const iframeDocument = await iframeManager.getDocument();
    const elem = iframeDocument.getElementById(targetId);
    const bound = elem?.getBoundingClientRect()!;

    _schema = schemaParser.update(_schema, targetId, 'layout', {
      x: bound.x,
      y: bound.y,
      width: bound.width,
      height: bound.height,
    });

    historyer.pushSchema(_schema);
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        { key: 'loading', value: { ...loading, addComponent: false } },
        { key: 'select', value: [targetId] },
      ],
    });
  }, 200);
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
    } = await axios.get('/builder/api/component/list');
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'components', value: components }],
    });
  };

  fetchTemplates = async () => {
    const {
      data: { data: templates },
    } = await axios.get('/builder/api/template/list');
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'templates', value: templates }],
    });
  };

  createData = () => {
    historyer.push({
      scriptText: '' as State['scriptText'],
      schema: {
        type: 'container',
        id: 'container0001',
        children: [],
        props: {},
        styles: {},
      },
    });
  };

  fetchData = async () => {
    const { id } = queryString.parse(window.location.search);

    if (!id || !/^[0-9]*$/.exec(id as string)) {
      return;
    }

    const {
      data: { data: meta },
    } = await axios.get(`/builder/api/page/info/${id}`);

    const { pagesrecords } = meta;

    const editing = pagesrecords.filter(
      (record: PagesRecord) => record.status === 'editing',
    )[0];

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'meta', value: meta }],
    });
    historyer.push({
      scriptText: editing.scriptText as State['scriptText'],
      schema: editing.schema as Schema,
    });
  };

  render() {
    return (
      <Provider store={store}>
        <Header />
        <div className="main">
          <Controller />
          <ActivityBar />
          <SideBar />
          <Rpanel />
        </div>
        <ScriptEditor />
        <ContextMenu />
        <SettingsPanel />
        <Loading />
      </Provider>
    );
  }
}

export default Editor;
