import React from "react";
import "./index.css";

class Runtime extends React.Component {
  iframe: HTMLIFrameElement | null = null;

  render() {
    return (
      <iframe
        className="runtime"
        width="100%"
        height="100%"
        src="http://localhost:8080/runtime"
        ref={(ref) => (this.iframe = ref)}
      ></iframe>
    );
  }
}

export default Runtime;
