import { Classes } from '@blueprintjs/core';
import axios from 'axios';
import { cloneDeep } from 'lodash-es';
import store, { Schema } from '../../store';
import historyer from '../historyer';
import LayoutManager from '../layoutManager';
import schemaParser from '../schemaParser';

class Eventer {
  Eventer = Eventer;

  goBack = () => {
    if (window.history.length >= 3) {
      window.history.back();
    } else {
      window.location.replace('/builder/dashboard');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delComp = (e: Event) => {
    const { select, schema } = store.getState();
    if (!select || !select.length) {
      return;
    }
    const [_target] = schemaParser.searchById(schema, select[0]);
    if (_target.type === 'page') {
      return;
    }
    const _schema = schemaParser.remove(schema, select[0]);
    historyer.pushSchema(_schema);
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'select', value: [] }],
    });
  };

  duplicateComp = (e: Event) => {
    const { select, schema } = store.getState();
    if (!select || !select.length) {
      return;
    }
    const [_target] = schemaParser.searchById(schema, select[0]);
    const _fock = schemaParser.copySchema(_target);

    const _schema = schemaParser.insertAfter(schema, select[0], _fock);
    historyer.pushSchema(_schema);
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'select', value: [_fock.id] }],
    });
    e.preventDefault();
  };

  copyComp = (e: Event) => {
    const { select, schema } = store.getState();
    if (!select || !select.length) {
      return;
    }
    const [_target] = schemaParser.searchById(schema, select[0]);

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'clipsdata', value: { type: 'copy', payload: [cloneDeep(_target)] } }],
    });
    e.preventDefault();
  };

  pasteComp = (e: Event) => {
    const { select, schema, clipsdata } = store.getState();

    if (!select || !select.length || !clipsdata) {
      return;
    }

    let _schema = cloneDeep(schema);

    if (clipsdata.type === 'copy') {
      const targets: Schema[] = [];
      clipsdata.payload.forEach((item) => {
        const _fock = schemaParser.copySchema(item);
        targets.push(_fock);

        _schema = schemaParser.appendChild(schema, select[0], _fock);
      });

      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [
          { key: 'select', value: targets.map((_target) => _target.id) },
        ],
      });

      historyer.pushSchema(_schema);
    } else if (clipsdata.type === 'cut') {
      clipsdata.payload.forEach((item) => {
        _schema = schemaParser.appendChild(schema, select[0], item);
      });

      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [
          { key: 'clipsdata', value: null },
          { key: 'select', value: clipsdata.payload.map((_target) => _target.id) },
        ],
      });

      historyer.pushSchema(_schema);
    }

    e.preventDefault();
  };

  cutComp = (e: Event) => {
    const { select, schema } = store.getState();
    if (!select || !select.length) {
      return;
    }

    const [_target] = schemaParser.searchById(schema, select[0]);
    if (_target.type === 'page') {
      return;
    }
    const _schema = schemaParser.remove(schema, select[0]);
    historyer.pushSchema(_schema);

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        { key: 'select', value: [] },
        { key: 'clipsdata', value: { type: 'cut', payload: [cloneDeep(_target)] } },
      ],
    });
    e.preventDefault();
  };

  saveTemplate = (e: KeyboardEvent) => {
    const { select, schema } = store.getState();
    if (!select || !select.length || select.length < 2) {
      return;
    }

    const template = select.map((id) => {
      const [_target] = schemaParser.searchById(schema, id);
      return _target;
    });

    axios.put('/api/template', {
      template,
    }).then((response) => {
      console.log(response);
    });

    e.preventDefault();
  };

  undo = () => {
    historyer.undo();
  };

  redo = () => {
    historyer.redo();
  };

  _create = async () => {
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'loading', value: { creating: true } }],
    });
    const { schema, scriptText = '' } = store.getState();
    const {
      data: {
        data: { pageid },
      },
    } = await axios.post('/api/page/create', {
      schema,
      scriptText,
    });

    window.location.replace(`/editor/index.html?id=${pageid}`);
  };

  _save = async () => {
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'loading', value: { saving: true } }],
    });
    const { schema, meta, scriptText } = store.getState();
    let layoutManager: LayoutManager | null = new LayoutManager(schema);
    const editing = meta.records.filter(
      (record) => record.status === 'editing',
    )[0];
    await axios.post('/api/page/save', {
      schema,
      layoutCss: layoutManager.getLayoutCss(),
      scriptText,
      _id: editing._id,
    });
    layoutManager = null;
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        { key: 'loading', value: { saving: false } },
        { key: 'sid', value: historyer.id },
      ],
    });
  };

  save = async () => {
    const { create } = store.getState();
    if (create) {
      this._create();
    } else {
      this._save();
    }
  };

  toggleIde = () => {
    const { scriptEditorVisible } = store.getState();
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'scriptEditorVisible', value: !scriptEditorVisible }],
    });
  };

  runScript = () => {

  };

  toggleNodeExpand = (id: string) => {
    const { nodeExpandMaps } = store.getState();

    if (!nodeExpandMaps[id]) {
      nodeExpandMaps[id] = true;
    } else {
      delete nodeExpandMaps[id];
    }
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'nodeExpandMaps', value: { ...nodeExpandMaps } }],
    });
  };

  toggleTheme = () => {
    const { theme } = store.getState();

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'theme', value: theme === 'light' ? 'dark' : 'light' }],
    });

    if (theme === 'light') {
      document.documentElement.classList.add(Classes.DARK);
    } else {
      document.documentElement.classList.remove(Classes.DARK);
    }
  };
}
export default new Eventer();
