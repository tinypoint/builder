import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Classes, Icon, MaybeElement, Menu, MenuItem, IconName,
} from '@blueprintjs/core';
import classnames from 'classnames';
import store, { State } from '../../store';
import styles from './index.module.scss';

const connector = connect((state: State) => ({
  sidebar: state.sidebar,
}));

type Props = ConnectedProps<typeof connector>;

interface Item {
  title: string;
  value: string;
  icon: IconName | MaybeElement;
}

const list: Item[] = [
  {
    title: 'widget',
    value: 'widget',
    icon: 'widget',
  },
  {
    title: 'layers',
    value: 'layers',
    icon: 'layers',
  },
  {
    title: 'template',
    value: 'template',
    icon: <Icon icon="cube" htmlTitle="template" />,
  },
  {
    title: 'search',
    value: 'search',
    icon: 'search',
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
      <Menu className={classnames(styles.avtivityBar)}>
        {
          list.map((item) => (
            <MenuItem
              className={sidebar[item.value] ? Classes.ACTIVE : ''}
              key={item.value}
              icon={item.icon}
              htmlTitle={item.title}
              onClick={() => {
                this.toggle(item);
              }}
            />
          ))
        }
      </Menu>
    );
  }
}

export default connector(ActivityBar);
