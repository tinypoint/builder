import store, { Schema, State } from '../../store';
import schemaParser from '../schemaParser';

interface HistoryStackItem {
  schema: Schema,
  scriptText: State['scriptText'],
  scriptUrl: State['scriptUrl']
}

class Historyer {
  Historyer = Historyer;

  _id = -1;

  get id() {
    return this._id;
  }

  set id(_id) {
    this._id = _id;
    const { select } = store.getState();
    const { schema, scriptText, scriptUrl } = this.current;

    const [selectSchema] = schemaParser.searchById(schema, select[0]);

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        { key: 'hid', value: this.id },
        { key: 'hredo', value: this._redo },
        { key: 'hundo', value: this._undo },
        { key: 'hsctack', value: this.stack },
        { key: 'schema', value: schema },
        { key: 'scriptText', value: scriptText },
        { key: 'scriptUrl', value: scriptUrl },
        { key: 'select', value: selectSchema ? [selectSchema.id] : [] },
      ],
    });
  }

  stack: any[] = [];

  get _redo() {
    return this.id < this.stack.length - 1;
  }

  get _undo() {
    return this.id > 0;
  }

  get current() {
    if (!this.stack.length) {
      return null;
    }
    return this.stack[this.id];
  }

  pushScriptText(scriptText: State['scriptText']) {
    const { scriptUrl } = store.getState();
    if (scriptUrl) {
      window.URL.revokeObjectURL(scriptUrl);
    }

    const _scriptUrl = window.URL.createObjectURL(new File([scriptText], './script.js', {
      type: 'text/javascript',
    }));

    const historyStackItem: HistoryStackItem = {
      scriptText,
      scriptUrl: _scriptUrl,
      schema: store.getState().schema,
    };

    this._push(historyStackItem);

    (document.getElementById('runtime') as HTMLIFrameElement).contentWindow?.location.reload();
  }

  pushSchema(schema: Schema) {
    const historyStackItem: HistoryStackItem = {
      scriptText: store.getState().scriptText,
      scriptUrl: store.getState().scriptUrl,
      schema,
    };

    this._push(historyStackItem);
  }

  private _push(historyStackItem: HistoryStackItem) {
    if (this.stack.length > this.id + 1) {
      this.stack = this.stack.slice(0, this.id + 1).concat(historyStackItem);
    } else {
      this.stack = [...this.stack, historyStackItem];
    }
    this.id += 1;
  }

  public push(obj: any) {
    this._push({
      ...obj,
      scriptUrl: obj.scriptText ? window.URL.createObjectURL(new File([obj.scriptText], './script.js', {
        type: 'text/javascript',
      })) : '',
    });
  }

  undo() {
    if (!this._undo) {
      return;
    }
    this.id -= 1;
  }

  redo() {
    if (!this._redo) {
      return;
    }
    this.id += 1;
  }

  getList() {
    return this.stack;
  }

  goto(id: number) {
    if (id < 0 || id > this.stack.length - 1) {
      return;
    }
    this.id = id;
  }

  clear() {
    this.stack = [];
    this.id = -1;
  }
}

export default new Historyer();
