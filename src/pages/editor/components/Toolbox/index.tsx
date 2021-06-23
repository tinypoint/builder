import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './index.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Paper from '@material-ui/core/Paper';
import store, { State } from '../../store';
import schemaParser from '../../features/schemaParser';
import historyer from '../../features/historyer';

const connecter = connect((state: State) => ({
  select: state.select,
  schema: state.schema,
}));

type Props = ConnectedProps<typeof connecter>;

class Toolbox extends React.Component<Props> {
  ref: HTMLDivElement | null = null;

  editor: Quill | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      // open: false,
    };
  }

  delComp = () => {
    const { select, schema } = this.props;
    if (!select || !select.length) {
      return;
    }
    const [_target] = schemaParser.searchById(schema, select[0]);
    if (_target.type === 'page') {
      return;
    }
    const _schema = schemaParser.remove(schema, select[0]);
    historyer.pushSchema(_schema);
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'select', value: [] }],
    });
  };

  openRichTextEditor = () => {
    this.setState(
      {
        // open: true,
      },
      () => {
        this.editor = new Quill(this.ref!, {
          placeholder: 'Input some text here...',
          theme: 'snow',
        });
      },
    );
  };

  handleClose = () => {};

  render() {
    return (
      <Paper>
        {/* <ButtonGroup variant="contained" color="primary"> */}
        <IconButton onClick={this.delComp} color="primary">
          <DeleteIcon />
        </IconButton>
        <Button onClick={this.openRichTextEditor}>Edit</Button>
        <Button>Three</Button>
        {/* </ButtonGroup> */}
      </Paper>
    );
  }
}

export default connecter(Toolbox);
