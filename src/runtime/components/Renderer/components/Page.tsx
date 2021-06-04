import React from "react";

type IContainerProps = any;

class Page extends React.Component<IContainerProps> {
  static displayName = "Page";

  render() {
    return (
      <div id={this.props.id} data-builder-type="page">
        {this.props.children}
      </div>
    );
  }
}

export default Page;
