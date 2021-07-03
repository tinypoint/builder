import axios from 'axios';
import { cloneDeep } from 'lodash-es';
import store from '../../store';
import historyer from '../historyer';
import schemaParser from '../schemaParser';

class Eventer {
  Eventer = Eventer;

  goBack = () => {
    if (window.history.length >= 3) {
      window.history.back();
    } else {
      window.location.replace('/');
    }
  };

  delComp = () => {
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

  duplicateComp = (e: KeyboardEvent) => {
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
      payload: [{ key: 'select', value: _fock.id }],
    });
    e.preventDefault();
  };

  copyComp = (e: KeyboardEvent) => {
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

  pasteComp = (e: KeyboardEvent) => {
    const { select, schema, clipsdata } = store.getState();

    if (!select || !select.length || !clipsdata) {
      return;
    }

    let _schema = cloneDeep(schema);

    if (clipsdata.type === 'copy') {
      clipsdata.payload.forEach((item) => {
        const _fock = schemaParser.copySchema(item);

        _schema = schemaParser.appendChild(schema, select[0], _fock);
      });

      historyer.pushSchema(_schema);
    } else if (clipsdata.type === 'cut') {
      clipsdata.payload.forEach((item) => {
        _schema = schemaParser.appendChild(schema, select[0], item);
      });

      historyer.pushSchema(_schema);
      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [{ key: 'clipsdata', value: null }],
      });
    }

    e.preventDefault();
  };

  cutComp = (e: KeyboardEvent) => {
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
    const editing = meta.records.filter(
      (record) => record.status === 'editing',
    )[0];
    await axios.post('/api/page/save', {
      schema,
      scriptText,
      _id: editing._id,
    });
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
}
export default new Eventer();
