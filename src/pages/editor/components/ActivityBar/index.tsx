import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import store, { State } from '../../store';
import styles from './index.module.scss';

const connector = connect((state: State) => ({
  sidebar: state.sidebar,
}));

type Props = ConnectedProps<typeof connector>;

interface Item {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const list: Item[] = [
  {
    title: 'Lib',
    value: 'lib',
    icon: <ArrowBackIcon />,
  },
  {
    title: 'Tree',
    value: 'tree',
    icon: <ArrowBackIcon />,
  },
  {
    title: 'Temp',
    value: 'template',
    icon: <ArrowBackIcon />,
  },
  {
    title: 'Search',
    value: 'search',
    icon: <ArrowBackIcon />,
  },
];

class ActivityBar extends React.Component<Props> {
  toggle = (item: Item) => {
    const { sidebar } = store.getState();

    store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        { key: 'sidebar', value: { [item.value]: !sidebar[item.value] } },
      ],
    });
  };

  render() {
    const {
      sidebar,
    } = this.props;

    return (
      <nav className={styles.avtivityBar}>
        {
          list.map((item) => (
            <div
              className={styles.button}
              style={{
                backgroundColor: sidebar[item.value] ? 'var(--secondary-dark-color)' : '',
                color: sidebar[item.value] ? 'var(--secondary-text-color)' : '',
              }}
              key={item.value}
              onClick={() => {
                this.toggle(item);
              }}
            >
              <ArrowBackIcon />
              <span className={styles.text}>{item.title}</span>
            </div>
          ))
        }
      </nav>
    );
  }
}

export default connector(ActivityBar);
