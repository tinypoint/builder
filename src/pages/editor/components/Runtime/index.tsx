import React from "react";
import "./index.css";

class Runtime extends React.Component {
  iframe: HTMLIFrameElement | null = null;

  render() {
    return (
      <iframe
        className="runtime"
        style={{
          width: 750,
          height: 1552,
          transform: 'scale(0.5)'
        }}
        src="http://localhost:8080/client"
        ref={(ref) => (this.iframe = ref)}
        id="runtime"
      ></iframe>
    );
  }
}

export default Runtime;
