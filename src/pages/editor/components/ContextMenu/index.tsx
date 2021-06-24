import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import store, { State } from '../../store';
import './index.css';

const connnector = connect((state: State) => ({
  select: state.select,
  schema: state.schema,
  showContextMenu: state.showContextMenu,
  contextMenuPosition: state.contextMenuPosition,
  baseScale: state.baseScale,
  scale: state.scale,
}));

type IProps = ConnectedProps<typeof connnector>;

class ContextMenu extends React.Component<IProps> {
  componentDidMount() {
    (window as any).showContextMenu = this.fromFrame;
  }

  componentWillUnmount() {
    delete (window as any).showContextMenu;
  }

  click = () => {};

  handleClose = () => {
    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        {
          key: 'showContextMenu',
          value: false,
        },
        {
          key: 'contextMenuPosition',
          value: {
            x: 0,
            y: 0,
          },
        },
      ],
    });
  };

  fromFrame = (position: any) => {
    const { baseScale, scale } = this.props;
    const { x, y } = position;

    const rect = document.getElementById('runtime')!.getBoundingClientRect()!;

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        {
          key: 'showContextMenu',
          value: true,
        },
        {
          key: 'contextMenuPosition',
          value: {
            x: 10 + rect.x + x * baseScale * scale,
            y: 10 + rect.y + y * baseScale * scale,
          },
        },
      ],
    });
  };

  render() {
    const { showContextMenu, contextMenuPosition } = this.props;
    const { x, y } = contextMenuPosition;
    return (
      <Menu
        keepMounted
        open={showContextMenu}
        onClose={this.handleClose}
        BackdropProps={{
          invisible: true,
          onContextMenu: (e) => {
            e.preventDefault();
          },
        }}
        anchorReference="anchorPosition"
        anchorPosition={
          { top: y, left: x }
      }
      >
        <MenuItem onClick={this.handleClose}>Copy</MenuItem>
        <MenuItem onClick={this.handleClose}>Cut</MenuItem>
        <MenuItem onClick={this.handleClose}>Paste</MenuItem>
        <MenuItem onClick={this.handleClose}>Delete</MenuItem>
      </Menu>
    );
  }
}

export default connnector(ContextMenu);
