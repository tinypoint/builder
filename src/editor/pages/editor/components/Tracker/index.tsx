import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";
import "./index.css";

interface Props {
  select: State["select"];
  hover: State["hover"];
  selector: React.ReactNode;
  hoveror: React.ReactNode;
}

const initState = {
  visible: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const scale = 0.5

class Tracker extends React.Component<Props> {
  state = {
    select: initState,
    hover: initState,
  };

  _working = false;

  listen = (state: { select: typeof initState; hover: typeof initState }) => {
    if (!this._working) {
      return;
    }

    this.setState(state);
  };

  componentDidMount() {
    this._working = true;

    Object.defineProperty(window, "_track", {
      configurable: true,
      get: () => {
        return this.listen;
      },
    });
  }

  componentDidUpdate(prevProps: Props) {}

  componentWillUnmount() {
    this._working = false;

    delete (window as any)._track;
  }

  render() {
    const { selector, hoveror } = this.props;
    const { select, hover } = this.state;
    return (
      <div className="tracker-layer" data-builder-tracker>
        <div
          className="tracker-box hover"
          style={{
            display: hover.visible ? "block" : "none",
            transform: `translate3d(${hover.x * scale}px,${hover.y * scale}px,0px)`,
            width: hover.width * scale,
            height: hover.height * scale,
          }}
        >
          {hoveror}
        </div>
        <div
          className="tracker-box select"
          style={{
            display: select.visible ? "block" : "none",
            transform: `translate3d(${select.x * scale}px,${select.y * scale}px,0px)`,
            width: select.width * scale,
            height: select.height * scale,
          }}
        >
          {selector}
        </div>
      </div>
    );
  }
}

export default connect((state: State) => {
  return {
    select: state.select,
    hover: state.hover,
  };
})(Tracker);
