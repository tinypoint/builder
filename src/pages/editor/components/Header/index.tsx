import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './index.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import SaveIcon from '@material-ui/icons/Save';
import LocalSeeIcon from '@material-ui/icons/LocalSee';
import PublishIcon from '@material-ui/icons/Publish';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import historyer from '../../features/historyer';
import EditorButton from './EditorButton';
import store, { State } from '../../store';

const connector = connect((state: State) => ({
  shopShow: state.shopShow,
  sid: state.sid,
  hid: state.hid,
  hredo: state.hredo,
  hundo: state.hundo,
  schema: state.schema,
  scale: state.scale,
  create: state.create,
  editing: state.meta.records.filter(
    (record) => record.status === 'editing',
  )[0],
}));

type Props = ConnectedProps<typeof connector>;

class Header extends React.Component<Props> {
  goBack = () => {
    if (window.history.length >= 3) {
      window.history.back();
    } else {
      window.location.replace('/');
    }
  };

  _create = async () => {
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'loading', value: { creating: true } }],
    });
    const { schema } = this.props;
    const {
      data: {
        data: { pageid },
      },
    } = await axios.post('/api/page/create', {
      schema,
    });

    window.location.replace(`/editor/index.html?id=${pageid}`);
  };

  _save = async () => {
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'loading', value: { saving: true } }],
    });
    const { schema, editing } = this.props;
    await axios.post('/api/page/save', {
      schema,
      _id: editing._id,
    });
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        { key: 'loading', value: { saving: false } },
        { key: 'sid', value: historyer.id },
      ],
    });
  };

  save = async () => {
    const { create } = this.props;
    if (create) {
      this._create();
    } else {
      this._save();
    }
  };

  undo = async () => {
    historyer.undo();
  };

  redo = async () => {
    historyer.redo();
  };

  onScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'scale', value: +(Number(value) / 100).toFixed(2) }],
    });
  };

  render() {
    const {
      shopShow, scale, hundo, hredo, sid, hid,
    } = this.props;

    return (
      <Grid container justify="space-between" className="header">
        <Grid item>
          <IconButton aria-label="back" onClick={this.goBack}>
            <ArrowBackIcon />
          </IconButton>
          <Divider orientation="vertical" />
          {/* <Button>editor</Button> */}
          <EditorButton undo={this.undo} redo={this.redo} save={this.save} />
          <Button
            color={shopShow ? 'primary' : 'default'}
            variant={shopShow ? 'contained' : 'text'}
            disableElevation
            onClick={() => {
              store.dispatch({
                type: 'CHANGE_VALUE',
                payload: [{ key: 'shopShow', value: !shopShow }],
              });
            }}
          >
            add
          </Button>
          <Button>shortcut</Button>
          <Button>help</Button>
        </Grid>
        <Grid item>
          <Select defaultValue="iPhone XR">
            <MenuItem value="iPhone12 Pro Max">iPhone12 Pro Max</MenuItem>
            <MenuItem value="iPhone XR">iPhone XR</MenuItem>
            <MenuItem value="iPhone 6">iPhone 6</MenuItem>
          </Select>
          {/* <Input defaultValue="375px" style={{ width: 60 }} /> */}
          <Input
            value={+(Number(scale) * 100).toFixed(0)}
            inputMode="numeric"
            onChange={this.onScaleChange}
            style={{ width: 60 }}
          />
        </Grid>
        <Grid item>
          <IconButton disabled={!hundo} aria-label="undo" onClick={this.undo}>
            <UndoIcon />
          </IconButton>
          <IconButton disabled={!hredo} aria-label="redo" onClick={this.redo}>
            <RedoIcon />
          </IconButton>
          <IconButton
            disabled={sid === hid}
            aria-label="save"
            onClick={this.save}
          >
            <SaveIcon />
          </IconButton>
          <IconButton aria-label="publish">
            <LocalSeeIcon />
          </IconButton>
          <IconButton aria-label="publish">
            <PublishIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default connector(Header);
