import hotkeys from 'hotkeys-js';
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

    hotkeys('ctrl + d', this.copyComp);

    iframehotkeys('ctrl + d', this.copyComp);
  };

  delComp = () => {
    const { select, schema } = store.getState();
    if (!select) {
      return;
    }
    const [_target] = schemaParser.searchById(schema, select);
    if (_target.type === 'page') {
      return;
    }
    const _schema = schemaParser.remove(schema, select);
    historyer.push(_schema);
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'select', value: '' }],
    });
  };

  copyComp = (e: KeyboardEvent) => {
    const { select, schema } = store.getState();
    if (!select) {
      return;
    }
    const [_target] = schemaParser.searchById(schema, select);

    const _schema = schemaParser.insertAfter(schema, select, schemaParser.copySchema(_target));
    historyer.push(_schema);
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'select', value: '' }],
    });
    e.preventDefault();
  };
}

export default new Hotkeyer();
