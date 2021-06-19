import Button from '@material-ui/core/Button';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import historyer from '../../features/historyer';
import resizer from '../../features/resizer';
import schemaParser from '../../features/schemaParser';
import store, { State } from '../../store';
import MockPhone from '../MockPhone';
import Client from '../Client';
import Tracker from '../Tracker';
import ReferenceLine from '../ReferenceLine';
import './index.css';

const connector = connect((state: State) => ({
  scale: state.scale,
  schema: state.schema,
}));

type Props = ConnectedProps<typeof connector>;

class Controller extends React.Component<Props> {
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
    historyer.push(_schema);
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'select', value: pageSchema.id }],
    });
  };

  onMouseDown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).getAttribute('data-builder-dotdir')) {
      resizer.start(e);
    }
  };

  render() {
    const { scale, schema } = this.props;
    return (
      <div className="controller">
        <div
          className="divice"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <div
            className="webview"
            style={{
              width: 375,
              height: 812,
            }}
          >
            <Client />
            {Boolean(!schema.children || !schema.children.length) && (
              <div className="add-a-page">
                <Button color="primary" onClick={this.addBlankPage}>
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
