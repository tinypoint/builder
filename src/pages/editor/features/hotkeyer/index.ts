import axios from 'axios';
import hotkeys from 'hotkeys-js';
import { cloneDeep } from 'lodash-es';
import store from '../../store';
import historyer from '../historyer';
import schemaParser from '../schemaParser';

class Hotkeyer {
  Hotkeyer = Hotkeyer;

  init = () => {
    const iframe = document.getElementById('runtime')! as HTMLIFrameElement;

    const iframehotkeys = ((iframe!.contentWindow as any).hotkeys as typeof hotkeys);

    hotkeys('Backspace', this.delComp);

    iframehotkeys('Backspace', this.delComp);

    hotkeys('ctrl + d', this.duplicateComp);

    iframehotkeys('ctrl + d', this.duplicateComp);

    hotkeys('ctrl + c', this.copyComp);

    iframehotkeys('ctrl + c', this.copyComp);

    hotkeys('ctrl + x', this.cutComp);

    iframehotkeys('ctrl + x', this.cutComp);

    hotkeys('ctrl + v', this.pasteComp);

    iframehotkeys('ctrl + v', this.pasteComp);

    hotkeys('ctrl + g', this.saveTemplate);

    iframehotkeys('ctrl + g', this.saveTemplate);
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
    historyer.push(_schema);
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
    historyer.push(_schema);
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

      historyer.push(_schema);
    } else if (clipsdata.type === 'cut') {
      clipsdata.payload.forEach((item) => {
        _schema = schemaParser.appendChild(schema, select[0], item);
      });

      historyer.push(_schema);
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
    historyer.push(_schema);

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
}

export default new Hotkeyer();
