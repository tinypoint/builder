import store from '../../store';
import schemaParser from '../schemaParser';

class Historyer {
  Historyer = Historyer;

  _id = -1;

  get id() {
    return this._id;
  }

  set id(_id) {
    this._id = _id;
    const { select } = store.getState();
    const schema = this.current;
    const [selectSchema] = schemaParser.searchById(schema, select);

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        { key: 'hid', value: this.id },
        { key: 'hredo', value: this._redo },
        { key: 'hundo', value: this._undo },
        { key: 'hsctack', value: this.stack },
        { key: 'schema', value: schema },
        { key: 'select', value: selectSchema ? select : '' },
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

  push(obj: any) {
    if (this.stack.length > this.id + 1) {
      this.stack = this.stack.slice(0, this.id + 1).concat(obj);
    } else {
      this.stack = [...this.stack, obj];
    }
    this.id += 1;
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
