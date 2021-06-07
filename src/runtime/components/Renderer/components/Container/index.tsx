import React from "react";

type IContainerProps = any;

class Container extends React.Component<IContainerProps> {
  static displayName = "Container";

  render() {
    return (
      <div id={this.props.id} className="container" data-builder-type="container" data-builder-block>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
