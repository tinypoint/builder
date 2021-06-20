import { cloneDeep, get, set } from 'lodash-es';
import { Schema } from '../../store';

class SchemaPaser {
  SchemaPaser = SchemaPaser;

  createId = (type: string) => type + (`${Math.random()}`).slice(2, 6);

  createSchema = (type: string): Schema => {
    const newScheam = {
      type,
      id: this.createId(type),
      props: {},
      styles: {},
      children: [],
    };
    return newScheam;
  };

  copySchema = (schema: Schema):Schema => {
    const newScheam = cloneDeep(schema);

    this.traverse(newScheam, (_schema: Schema) => {
      const _id = this.createId(_schema.type);

      const _styles: Schema['styles'] = {};
      Object.keys(_schema.styles || {}).forEach((selector: string) => {
        const _selector = selector.replace(new RegExp(_schema.id, 'g'), _id);

        _styles[_selector] = (_schema.styles || {})[selector];
      });

      _schema.id = _id;

      _schema.styles = _styles;
      return true;
    });

    return newScheam;
  };

  _traverse = (
    schema: Schema,
    callback: (schema: Schema, layerId: number) => boolean,
    option = { deep: true },
    layerId = 0,
  ) => {
    // 深度优先
    callback(schema, layerId);

    const { children = [] } = schema;
    for (let i = 0, len = children.length; i < len; i += 1) {
      this._traverse(children[i], callback, option, layerId + 1);
    }
  };

  _search(
    schema: Schema,
    prop: string,
    value: any,
    queen: Schema[] = [],
  ): Schema[] {
    const _queen = queen || [];
    if (get(schema, prop) === value) {
      _queen.push(schema);
      return _queen;
    }
    const { children = [] } = schema;

    if (
      children.some((child) => this._search(child, prop, value, _queen).length)
    ) {
      _queen.push(schema);
      return _queen;
    }

    return [];
  }

  search(schema: Schema, prop: string, value: any) {
    const queen = this._search(schema, prop, value);

    return queen;
  }

  searchById(schema: Schema, id: string) {
    return this._search(schema, 'id', id);
  }

  traverse(
    schema: Schema,
    callback: (schema: Schema, layerId: number) => boolean,
    option = { deep: true },
  ) {
    this._traverse(schema, callback, option);
  }

  appendChild(schema: Schema, id: string, newScheam: Schema) {
    const _schema = cloneDeep(schema);
    const [_target] = this.searchById(_schema, id);
    _target.children?.push(newScheam);
    return _schema;
  }

  insertAfter(schema: Schema, id: string, newScheam: Schema) {
    const _schema = cloneDeep(schema);
    const _parent = this.searchById(_schema, id)[1];
    const _index = _parent.children?.findIndex((child) => child.id === id);
    if (_index !== undefined) {
      _parent.children?.splice(_index + 1, 0, newScheam);
    }
    return _schema;
  }

  remove(schema: Schema, id: string) {
    const _schema = cloneDeep(schema);
    const _parent = this.searchById(_schema, id)[1];
    _parent.children = _parent.children?.filter((child) => child.id !== id);
    return _schema;
  }

  update(schema: Schema, id: string, prop: string, value: any) {
    const _schema = cloneDeep(schema);
    const [_target] = this.searchById(_schema, id);
    set(_target, prop, value);
    return _schema;
  }
}

export default new SchemaPaser();
