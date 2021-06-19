import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect, ConnectedProps } from 'react-redux';
import store, { State } from '../../../store';
import historyer from '../../../features/historyer';

const connector = connect((state: State) => ({
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

type Prop = ConnectedProps<typeof connector> & {
  undo: () => void;
  redo: () => void;
  save: () => void;
};

function EditorButton(props: Prop) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const openSettings = () => {
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'settingsPanelVisible', value: true }],
    });
    setOpen(false);
  };

  const handleClose = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };

  const handleClose1 = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        Editor
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose1}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem disabled={!props.hundo} onClick={props.undo}>
                    <ListItemIcon>
                      <UndoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Undo" />
                  </MenuItem>
                  <MenuItem disabled={!props.hredo} onClick={props.redo}>
                    <ListItemIcon>
                      <RedoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Redo" />
                  </MenuItem>
                  <MenuItem
                    disabled={props.sid === props.hid}
                    onClick={props.save}
                  >
                    <ListItemIcon>
                      <SaveIcon />
                    </ListItemIcon>
                    <ListItemText primary="Save" />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>save as ...</MenuItem>
                  <MenuItem onClick={openSettings}>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default connector(EditorButton);
