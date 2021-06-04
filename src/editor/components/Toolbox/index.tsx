import React from "react";
import "./index.css";

interface Props {
  type: "select" | "hover";
}

class Toolbox extends React.Component<Props> {
  render() {
    return (
      <div className="toolbox">
        <div className="toolbox-item">X</div>
        <div className="toolbox-item">Y</div>
        <div className="toolbox-item">Z</div>
      </div>
    );
  }
}

export default Toolbox;
