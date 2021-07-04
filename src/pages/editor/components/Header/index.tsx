import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Alignment, Button,
  Classes, Menu, MenuDivider, MenuItem, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Popover,
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
    <Menu className={Classes.ELEVATION_1}>
      <MenuItem icon="home" text="Back to Home" onClick={eventer.goBack} />
    </Menu>
  );

  renderFilesMenu = () => {
    const {
      hundo, hredo, sid, hid,
    } = this.props;
    return (
      <Menu className={Classes.ELEVATION_1}>
        <MenuItem icon="undo" text="Undo" label="⌘Z" disabled={!hundo} onClick={eventer.undo} />
        <MenuItem icon="redo" text="Redo" label="⌘⇧Z" disabled={!hredo} onClick={eventer.redo} />
        <MenuItem icon="saved" text="Save" label="⌘S" disabled={sid === hid} onClick={eventer.save} />
      </Menu>
    );
  };

  renderEditMenu = () => (
    <Menu className={Classes.ELEVATION_1}>
      <MenuItem icon="cut" text="Cut" label="⌘X" />
      <MenuItem icon="duplicate" text="Copy" label="⌘C" />
      <MenuItem icon="clipboard" text="Paste" label="⌘V" disabled />
      <MenuDivider title="Text" />
      <MenuItem disabled icon="align-left" text="Alignment">
        <MenuItem icon="align-left" text="Left" />
        <MenuItem icon="align-center" text="Center" />
        <MenuItem icon="align-right" text="Right" />
        <MenuItem icon="align-justify" text="Justify" />
      </MenuItem>
      <MenuItem icon="style" text="Style">
        <MenuItem icon="bold" text="Bold" />
        <MenuItem icon="italic" text="Italic" />
        <MenuItem icon="underline" text="Underline" />
      </MenuItem>
      <MenuItem icon="asterisk" text="Miscellaneous">
        <MenuItem icon="badge" text="Badge" />
        <MenuItem icon="book" text="Long items will truncate when they reach max-width" />
        <MenuItem icon="more" text="Look in here for even more items">
          <MenuItem icon="briefcase" text="Briefcase" />
          <MenuItem icon="calculator" text="Calculator" />
          <MenuItem icon="dollar" text="Dollar" />
          <MenuItem icon="dot" text="Shapes">
            <MenuItem icon="full-circle" text="Full circle" />
            <MenuItem icon="heart" text="Heart" />
            <MenuItem icon="ring" text="Ring" />
            <MenuItem icon="square" text="Square" />
          </MenuItem>
        </MenuItem>
      </MenuItem>
    </Menu>
  );

  renderScriptMenu = () => {
    const {
      scriptEditorVisible,
    } = this.props;
    return (
      <Menu className={Classes.ELEVATION_1}>
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
