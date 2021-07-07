import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '@blueprintjs/core';
import historyer from '../../features/historyer';
import resizer from '../../features/resizer';
import schemaParser from '../../features/schemaParser';
import store, { State } from '../../store';
import MockPhone from '../MockPhone';
import Client from '../Client';
import Tracker from '../Tracker';
import ReferenceLine from '../ReferenceLine';
import styles from './index.module.scss';

const connector = connect((state: State) => ({
  scale: state.scale,
  schema: state.schema,
}));

type Props = ConnectedProps<typeof connector>;

class Controller extends React.Component<Props> {
  controllerRef: HTMLDivElement | null = null;

  componentDidMount() {
    window.addEventListener('mousedown', this.onMouseDown);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onMouseDown);
  }

  addBlankPage = () => {
    const { schema } = this.props;
    const pageSchema = schemaParser.createSchema('page');
    const _schema = schemaParser.appendChild(schema, schema.id, pageSchema);
    historyer.pushSchema(_schema);
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'select', value: [pageSchema.id] }],
    });
  };

  onMouseDown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).getAttribute('data-builder-dotdir')) {
      resizer.start(e);
    }
  };

  clearSelect = (e: React.MouseEvent) => {
    const { target } = e.nativeEvent;
    if (target === this.controllerRef) {
      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [
          { key: 'select', value: [] },
        ],
      });
    }
  };

  render() {
    const { scale, schema } = this.props;
    return (
      <div
        className={styles.controller}
        onClick={this.clearSelect}
        ref={(ref) => { this.controllerRef = ref; }}
      >
        <div
          className={styles.divice}
          style={{
            transform: `scale(${scale})`,
          }}
        >
          <div
            className={styles.webview}
            style={{
              width: 375,
              height: 812,
            }}
          >
            <Client />
            {Boolean(!schema.children || !schema.children.length) && (
              <div className="add-a-page">
                <Button onClick={this.addBlankPage}>
                  Add a Blank Page
                </Button>
              </div>
            )}
          </div>
          <MockPhone />
          <ReferenceLine />
          <Tracker />
        </div>
      </div>
    );
  }
}

export default connector(Controller);
