import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import eventer from '../../features/eventer';
import store, { State } from '../../store';
import styles from './index.module.scss';

const connector = connect((state: State) => ({
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
      scriptEditorVisible,
    } = this.props;
    return (
      <header className={styles.header}>
        <div className={styles.button} onClick={this.goBack}>Home</div>
        {/* <div className={styles.button}>File</div>
        <div className={styles.button}>Edit</div> */}
        <div className={styles.button} onClick={eventer.save}>Save</div>
        <div className={styles.button} onClick={eventer.undo}>Undo</div>
        <div className={styles.button} onClick={eventer.redo}>Redo</div>
        <div
          className={styles.button}
          onClick={() => {
            store.dispatch({
              type: 'CHANGE_VALUE',
              payload: [{ key: 'scriptEditorVisible', value: !scriptEditorVisible }],
            });
          }}
        >
          Script
        </div>

        {/* <div className={styles.button}>View</div>
        <div className={styles.button}>Preview</div>
        <div className={styles.button}>Help</div> */}
      </header>
    );
  }
}

export default connector(Header);
