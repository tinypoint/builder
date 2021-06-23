import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './index.css';
import Button from '@material-ui/core/Button';
import { cloneDeep } from 'lodash-es';
import schemaParser from '../../features/schemaParser';
import historyer from '../../features/historyer';
import store, { Schema, State } from '../../store';

const connector = connect((state: State) => ({
  select: state.select,
  schema: state.schema,
  shopShow: state.shopShow,
  components: state.components,
  templates: state.templates,
}));

type Props = ConnectedProps<typeof connector>;

class Shop extends React.Component<Props> {
  addComponent = (type: string) => {
    const { select, schema } = this.props;
    const newScheam = schemaParser.createSchema(type);

    if (type === 'ppt') {
      const children = [
        schemaParser.createSchema('ppt-container'),
        schemaParser.createSchema('ppt-container'),
        schemaParser.createSchema('ppt-container'),
      ];
      newScheam.children = children;
    }

    if (!select || !select.length) {
      const [page] = schemaParser.search(schema, 'type', 'page');
      const _schema = schemaParser.appendChild(schema, page.id, newScheam);
      historyer.pushSchema(_schema);
      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [{ key: 'select', value: [newScheam.id] }],
      });
      return;
    }
    const hasBlock = (window as any)._hasBlock && (window as any)._hasBlock(select);

    if (hasBlock) {
      const _schema = schemaParser.appendChild(schema, select[0], newScheam);
      historyer.pushSchema(_schema);
      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [{ key: 'select', value: [newScheam.id] }],
      });
    } else {
      const _schema = schemaParser.insertAfter(schema, select[0], newScheam);
      historyer.pushSchema(_schema);
      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [{ key: 'select', value: [newScheam.id] }],
      });
    }
  };

  addTemplate = (template: Schema[]) => {
    const { select, schema } = this.props;
    const _template = template.map(schemaParser.copySchema);

    if (!select || !select.length) {
      const [page] = schemaParser.search(schema, 'type', 'page');
      let _schema = cloneDeep(schema);
      _template.forEach((item) => {
        _schema = schemaParser.appendChild(_schema, page.id, item);
      });
      historyer.pushSchema(_schema);
      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [{ key: 'select', value: _template.map((item) => item.id) }],
      });
      return;
    }
    const hasBlock = (window as any)._hasBlock && (window as any)._hasBlock(select);

    if (hasBlock) {
      let _schema = cloneDeep(schema);
      _template.forEach((item) => {
        _schema = schemaParser.appendChild(_schema, select[0], item);
      });

      historyer.pushSchema(_schema);
      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [{ key: 'select', value: _template.map((item) => item.id) }],
      });
    } else {
      let _schema = cloneDeep(schema);
      let prev = select[0];
      _template.forEach((item) => {
        _schema = schemaParser.appendChild(_schema, prev, item);
        prev = item.id;
      });
      historyer.pushSchema(_schema);
      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [{ key: 'select', value: _template.map((item) => item.id) }],
      });
    }
  };

  render() {
    const { shopShow, components, templates } = this.props;
    return (
      <div
        className="shop"
        style={{
          transform: shopShow ? '' : 'translateX(-100%)',
          transition: shopShow ? 'transform .3s' : '',
        }}
      >
        <h1>COMPONENTS</h1>
        {components.map((component) => (
          <Button
            className="component-card"
            key={component.name}
            onClick={() => {
              this.addComponent(component.name);
            }}
          >
            {component.name.toUpperCase()}
          </Button>
        ))}
        <h1>TEMPLATES</h1>
        {templates.map((template) => (
          <Button
            className="component-card"
            key={template._id}
            onClick={() => {
              this.addTemplate(template.template);
            }}
          >
            {template._id}
          </Button>
        ))}
      </div>
    );
  }
}

export default connector(Shop);
