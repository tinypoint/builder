import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Tree, TreeNodeInfo } from '@blueprintjs/core';
import eventer from '../../features/eventer';
import store, { Schema, State } from '../../store';
import './index.css';

const connnector = connect((state: State) => ({
  select: state.select,
  schema: state.schema,
  nodeExpandMaps: state.nodeExpandMaps,
  show: state.sidebar.layers,
}));

type IProps = ConnectedProps<typeof connnector>;

class Layers extends React.Component<IProps> {
  onClick = (node: TreeNodeInfo, nodePath: number[], e: React.MouseEvent) => {
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

  renderNode = (node: Schema) => {
    const { nodeExpandMaps, select } = this.props;

    const childNodes: TreeNodeInfo[] = Array.isArray(node.children)
      ? node.children.map((child) => this.renderNode(child)) : [];

    return {
      id: node.id,
      label: node.type,
      childNodes,
      isExpanded: nodeExpandMaps[node.id],
      hasCaret: childNodes.length > 0,
      isSelected: select.indexOf(node.id) > -1,
      nodeData: node,
    } as TreeNodeInfo;
  };

  onNodeExpand = (node: TreeNodeInfo) => {
    eventer.toggleNodeExpand(node.id as string);
  };

  onNodeCollapse = (node: TreeNodeInfo) => {
    eventer.toggleNodeExpand(node.id as string);
  };

  render() {
    const { schema, show } = this.props;

    if (!show) {
      return null;
    }

    return (
      <Tree
        contents={[this.renderNode(schema)]}
        onNodeExpand={this.onNodeExpand}
        onNodeCollapse={this.onNodeCollapse}
        onNodeClick={this.onClick}
      />
    );
  }
}

export default connnector(Layers);
