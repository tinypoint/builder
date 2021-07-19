import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';
import { Classes } from '@blueprintjs/core';
import Layers from '../Layers';
import Widget from '../Widget';
import Template from '../Template';
import { State } from '../../store';
import styles from './index.module.scss';

const connector = connect((state: State) => ({
  hid: state.hid,
  sidebar: state.sidebar,
}));

type Props = ConnectedProps<typeof connector>;

class ActivityBar extends React.Component<Props> {
  goBack = () => {
    if (window.history.length >= 3) {
      window.history.back();
    } else {
      window.location.replace('/');
    }
  };

  render() {
    const { sidebar } = this.props;
    const hide = !Object.values(sidebar).some((show) => show);

    return (
      <nav
        className={classnames(styles.sideBar, Classes.ELEVATION_1)}
        style={{
          width: hide ? 0 : undefined,
          display: hide ? 'none' : undefined,
        }}
      >
        <Widget />
        <Layers />
        <Template />
      </nav>
    );
  }
}

export default connector(ActivityBar);
