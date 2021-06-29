import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import { cloneDeep } from 'lodash-es';
import schemaParser from '../../features/schemaParser';
import historyer from '../../features/historyer';
import store, { Schema, State } from '../../store';
import styles from './index.module.scss';

const connector = connect((state: State) => ({
  select: state.select,
  schema: state.schema,
  show: state.sidebar.template,
  templates: state.templates,
}));

type Props = ConnectedProps<typeof connector>;

class Template extends React.Component<Props> {
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
    const { show, templates } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div
        className={styles.template}
      >
        {templates.map((template) => (
          <Button
            className={styles.card}
            key={template._id}
            onClick={() => {
              this.addTemplate(template.template);
            }}
          >
            {template._id.slice(0, 4)}
          </Button>
        ))}
      </div>
    );
  }
}

export default connector(Template);
