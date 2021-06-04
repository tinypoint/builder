import React from "react";

type IScrollerProps = any;

class Scroller extends React.Component<IScrollerProps> {
  static displayName = "Scroller";
  render() {
    return (
      <div id={this.props.id} data-builder-type="scroller" style={{ height: 100, overflow: "auto hidden" }}>
        <div style={{ height: 100, width: 1000 }}>{this.props.children}</div>
      </div>
    );
  }
}

export default Scroller;
