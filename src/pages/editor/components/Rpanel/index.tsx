import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../store';
import Configer from '../Configer';
import Styler from '../Styler';
import styles from './index.module.scss';

const connector = connect((state: State) => ({
  hid: state.hid,
}));

type Props = ConnectedProps<typeof connector>;

class Rpanel extends React.Component<Props> {
  goBack = () => {
    if (window.history.length >= 3) {
      window.history.back();
    } else {
      window.location.replace('/');
    }
  };

  render() {
    return (
      <div className={classNames(styles.rpanel, Classes.ELEVATION_1)}>
        <div className={classNames(styles.item)}>
          <Styler />
        </div>
        <div className={classNames(styles.item)}>
          <Configer />
        </div>
      </div>
    );
  }
}

export default connector(Rpanel);
