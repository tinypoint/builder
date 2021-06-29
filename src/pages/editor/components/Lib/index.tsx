import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import schemaParser from '../../features/schemaParser';
import historyer from '../../features/historyer';
import store, { State } from '../../store';
import styles from './index.module.scss';

const connector = connect((state: State) => ({
  select: state.select,
  schema: state.schema,
  show: state.sidebar.lib,
  components: state.components,
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

  render() {
    const { show, components } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div
        className={styles.lib}
      >
        {components.map((component) => (
          <Button
            className={styles.card}
            key={component.name}
            onClick={() => {
              this.addComponent(component.name);
            }}
          >
            {component.name.toUpperCase()}
          </Button>
        ))}
      </div>
    );
  }
}

export default connector(Shop);
