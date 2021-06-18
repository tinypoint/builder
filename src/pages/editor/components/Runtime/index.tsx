import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../../store";
import "./index.css";

const connecter = connect((state: State) => {
  return {
    baseScale: state.baseScale,
  };
});

type Props = ConnectedProps<typeof connecter>;

class Runtime extends React.Component<Props> {
  iframe: HTMLIFrameElement | null = null;

  render() {
    const { baseScale } = this.props;
    return (
      <iframe
        className="runtime"
        style={{
          width: 750,
          height: 1552,
          transform: `scale(${baseScale})`,
        }}
        src="http://localhost:8080/client"
        ref={(ref) => (this.iframe = ref)}
        id="runtime"
      ></iframe>
    );
  }
}

export default connecter(Runtime);
