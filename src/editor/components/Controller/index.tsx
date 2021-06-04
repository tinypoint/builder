import React from "react";
import "./index.css";

class Controller extends React.Component {
  render() {
    return <div className="controller">{this.props.children}</div>;
  }
}

export default Controller;
