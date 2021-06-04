import React from "react";

type IContainerProps = any;

class Container extends React.Component<IContainerProps> {
  static displayName = "Container";

  render() {
    return (
      <div id={this.props.id}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
