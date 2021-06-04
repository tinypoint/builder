import React from "react";
import "./index.css";

type IScrollerProps = any;

class Scroller extends React.Component<IScrollerProps> {
  static displayName = "Scroller";
  render() {
    return (
      <div id={this.props.id} data-builder-type="scroller" className="scroller">
        <div data-builder-block style={{ height: "100%", width: 1000 }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Scroller;
