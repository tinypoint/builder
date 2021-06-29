import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Tree from '../Tree';
import Lib from '../Lib';
import Template from '../Template';
import { State } from '../../store';
import styles from './index.module.scss';

const connector = connect((state: State) => ({
  hid: state.hid,
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
    return (
      <nav className={styles.avtivityBar}>
        <Tree />
        <Lib />
        <Template />
      </nav>
    );
  }
}

export default connector(ActivityBar);
