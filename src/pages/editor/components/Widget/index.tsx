import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Card, H5 } from '@blueprintjs/core';
import schemaParser from '../../features/schemaParser';
import historyer from '../../features/historyer';
import store, { Schema, State } from '../../store';
import styles from './index.module.scss';
import iframeManager from '../../features/iframeManager';

const connector = connect((state: State) => ({
  select: state.select,
  schema: state.schema,
  show: state.sidebar.widget,
  components: state.components,
  loading: state.loading,
}));

type Props = ConnectedProps<typeof connector>;

class Widget extends React.Component<Props> {
  addComponent = (type: string) => {
    const { select, schema, loading } = this.props;
    const newScheam = schemaParser.createSchema(type);

    if (type === 'ppt') {
      const children = [
        schemaParser.createSchema('ppt-container'),
        schemaParser.createSchema('ppt-container'),
        schemaParser.createSchema('ppt-container'),
      ];
      newScheam.children = children;
    }

    let _schema: Schema;

    if (!select || !select.length) {
      const [page] = schemaParser.search(schema, 'type', 'page');
      _schema = schemaParser.appendChild(schema, page.id, newScheam);
    } else {
      const hasBlock = (window as any)._hasBlock && (window as any)._hasBlock(select);

      if (hasBlock) {
        _schema = schemaParser.appendChild(schema, select[0], newScheam);
      } else {
        _schema = schemaParser.insertAfter(schema, select[0], newScheam);
      }
    }

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        { key: 'loading', value: { ...loading, addComponent: true } },
        { key: 'schema', value: _schema },
      ],
    });

    setTimeout(async () => {
      const iframeDocument = await iframeManager.getDocument();
      const elem = iframeDocument.getElementById(newScheam.id);
      const bound = elem?.getBoundingClientRect()!;

      newScheam.layout = {
        x: bound.x,
        y: bound.y,
        width: bound.width,
        height: bound.height,
      };

      historyer.pushSchema(_schema);
      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [
          { key: 'loading', value: { ...loading, addComponent: false } },
          { key: 'select', value: [newScheam.id] },
        ],
      });
    }, 1000);
  };

  render() {
    const { show, components } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div
        className={styles.widget}
      >
        {components.map((component) => (
          <Card
            elevation={0}
            interactive
            key={component.name}
            className={styles.card}
            onClick={() => {
              this.addComponent(component.name);
            }}
          >
            <H5>
              {component.name}
            </H5>
          </Card>
        ))}
      </div>
    );
  }
}

export default connector(Widget);
