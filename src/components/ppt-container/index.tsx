import React from 'react';
import './index.css';

type IContainerProps = any;

class PptContainer extends React.Component<IContainerProps> {
  static displayName = 'PptContainer';

  render() {
    return (
      <div id={this.props.id} className="ppt-container" data-builder-type="ppt-container" data-builder-block>
        {this.props.children}
      </div>
    );
  }
}

export default PptContainer;
