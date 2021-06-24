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
import EditorButton from './EditorButton';
import store, { State } from '../../store';
import eventer from '../../features/eventer';

const connector = connect((state: State) => ({
  shopShow: state.shopShow,
  sid: state.sid,
  hid: state.hid,
  hredo: state.hredo,
  hundo: state.hundo,
  scale: state.scale,
  scriptEditorVisible: state.scriptEditorVisible,
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

  onScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'scale', value: +(Number(value) / 100).toFixed(2) }],
    });
  };

  render() {
    const {
      shopShow, scale, hundo, hredo, sid, hid, scriptEditorVisible,
    } = this.props;

    return (
      <Grid container justify="space-between" className="header">
        <Grid item>
          <IconButton aria-label="back" onClick={this.goBack}>
            <ArrowBackIcon />
          </IconButton>
          <Divider orientation="vertical" />
          {/* <Button>editor</Button> */}
          <EditorButton save={eventer.save} />
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
          <Button
            color={scriptEditorVisible ? 'primary' : 'default'}
            variant={scriptEditorVisible ? 'contained' : 'text'}
            disableElevation
            onClick={() => {
              store.dispatch({
                type: 'CHANGE_VALUE',
                payload: [{ key: 'scriptEditorVisible', value: !scriptEditorVisible }],
              });
            }}
          >
            script
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
          <IconButton disabled={!hundo} aria-label="undo" onClick={eventer.undo}>
            <UndoIcon />
          </IconButton>
          <IconButton disabled={!hredo} aria-label="redo" onClick={eventer.redo}>
            <RedoIcon />
          </IconButton>
          <IconButton
            disabled={sid === hid}
            aria-label="save"
            onClick={eventer.save}
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
