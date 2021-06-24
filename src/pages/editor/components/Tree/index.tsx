import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import store, { Schema, State } from '../../store';
import './index.css';

const connnector = connect((state: State) => ({
  select: state.select,
  schema: state.schema,
}));

type IProps = ConnectedProps<typeof connnector>;

class Tree extends React.Component<IProps> {
  onClick = (e: React.MouseEvent, node: Schema) => {
    const { select } = this.props;

    if (e.ctrlKey) {
      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [{ key: 'select', value: [node.id, ...(select || [])] }],
      });
    } else {
      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [{ key: 'select', value: [node.id] }],
      });
    }
  };

  renderTree = (node: Schema) => (
    <TreeItem
      onClick={(e) => {
        this.onClick(e, node);
      }}
      key={node.id}
      nodeId={node.id}
      label={node.type}
    >
      {Array.isArray(node.children) ? node.children.map((child) => this.renderTree(child)) : null}
    </TreeItem>
  );

  render() {
    const { schema, select } = this.props;
    return (
      <TreeView
        className="tree"
        defaultCollapseIcon={<ExpandMoreIcon fontSize="large" />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon fontSize="large" />}
        selected={select}
      >
        {this.renderTree(schema)}
      </TreeView>
    );
  }
}

export default connnector(Tree);
