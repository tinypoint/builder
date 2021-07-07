import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Alignment, Button,
  Classes, Menu, MenuItem, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Popover,
} from '@blueprintjs/core';
import eventer from '../../features/eventer';
import store, { State } from '../../store';

const connector = connect((state: State) => ({
  scriptEditorVisible: state.scriptEditorVisible,
  hundo: state.hundo,
  hredo: state.hredo,
  sid: state.sid,
  hid: state.hid,
  theme: state.theme,
  select: state.select || [],
}));

type Props = ConnectedProps<typeof connector>;

class Header extends React.Component<Props> {
  onScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [{ key: 'scale', value: +(Number(value) / 100).toFixed(2) }],
    });
  };

  renderHeadingMenu = () => (
    <Menu>
      <MenuItem icon="home" text="Back to Home" onClick={eventer.goBack} />
    </Menu>
  );

  renderFilesMenu = () => {
    const {
      hundo, hredo, sid, hid,
    } = this.props;
    return (
      <Menu>
        <MenuItem icon="undo" text="Undo" label="⌘Z" shouldDismissPopover={false} disabled={!hundo} onClick={eventer.undo} />
        <MenuItem icon="redo" text="Redo" label="⌘⇧Z" shouldDismissPopover={false} disabled={!hredo} onClick={eventer.redo} />
        <MenuItem icon="saved" text="Save" label="⌘S" shouldDismissPopover={false} disabled={sid === hid} onClick={eventer.save} />
      </Menu>
    );
  };

  renderEditMenu = () => {
    const { select } = this.props;
    return (
      <Menu>
        <MenuItem
          icon="cut"
          text="Cut"
          label="⌘X"
          disabled={!select.length}
          onClick={(e) => {
            eventer.cutComp(e.nativeEvent);
          }}
        />
        <MenuItem
          icon="duplicate"
          text="Copy"
          label="⌘C"
          disabled={!select.length}
          onClick={(e) => {
            eventer.copyComp(e.nativeEvent);
          }}
        />
        <MenuItem
          icon="clipboard"
          text="Paste"
          label="⌘V"
          disabled={!select.length}
          onClick={(e) => {
            eventer.pasteComp(e.nativeEvent);
          }}
        />
        <MenuItem
          icon="delete"
          text="Delete"
          label="DEL"
          disabled={!select.length}
          onClick={(e) => {
            eventer.delComp(e.nativeEvent);
          }}
        />
      </Menu>
    );
  };

  renderScriptMenu = () => {
    const {
      scriptEditorVisible,
    } = this.props;
    return (
      <Menu>
        <MenuItem icon="code" text={`${scriptEditorVisible ? 'Close' : 'Open'} IDE`} onClick={eventer.toggleIde} />
        <MenuItem icon="play" text="Run" onClick={eventer.runScript} />
      </Menu>
    );
  };

  render() {
    const { theme } = this.props;

    return (

      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <Popover content={this.renderHeadingMenu()}>
            <NavbarHeading><Button className={Classes.MINIMAL} text="G-Editor" /></NavbarHeading>
          </Popover>
          <NavbarDivider />
          <Popover content={this.renderFilesMenu()}>
            <Button className={Classes.MINIMAL} icon="document" text="Files" />
          </Popover>
          <Popover content={this.renderEditMenu()}>
            <Button className={Classes.MINIMAL} icon="edit" text="Edit" />
          </Popover>
          <Popover content={this.renderScriptMenu()}>
            <Button className={Classes.MINIMAL} icon="code-block" text="Script" />
          </Popover>
        </NavbarGroup>

        <NavbarGroup align={Alignment.RIGHT}>
          <Button className={Classes.MINIMAL} icon={theme === 'dark' ? 'flash' : 'moon'} onClick={eventer.toggleTheme} />
          <Button className={Classes.MINIMAL} icon="user" />
          <Button className={Classes.MINIMAL} icon="notifications" />
          <Button className={Classes.MINIMAL} icon="cog" />
        </NavbarGroup>
      </Navbar>
    );
  }
}

export default connector(Header);
