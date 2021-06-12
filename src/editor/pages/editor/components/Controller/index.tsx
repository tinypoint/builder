import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../../store";
import MockPhone from "../MockPhone";
import Runtime from "../Runtime";
import Tracker from "../Tracker";
import "./index.css";

const connector = connect((state: State) => {
  return ({
    scale: state.scale
  })
})

type Props = ConnectedProps<typeof connector>

class Controller extends React.Component<Props> {
  render() {
    const { scale } = this.props;
    return <div className="controller">
      <div
        className="divice"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div
          className="webview"
          style={{
            width: 375,
            height: 812,
          }}
        >
          <Runtime />
        </div>
        <MockPhone />
        <Tracker />
      </div>
    </div>;
  }
}

export default connector(Controller);
