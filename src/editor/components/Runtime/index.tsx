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
          height: 1334,
          transform: 'scale(0.5)'
        }}
        src="http://localhost:8080/runtime"
        ref={(ref) => (this.iframe = ref)}
      ></iframe>
    );
  }
}

export default Runtime;
