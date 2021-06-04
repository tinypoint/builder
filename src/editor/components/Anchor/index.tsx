import React from "react";
import "./index.css";

interface Props {
  type: "select" | "hover";
}

interface DotProps {
  dir: "tl" | "tc" | "tr" | "cl" | "cr" | "bl" | "bc" | "br";
}

const Dot = (props: DotProps) => {
  return (
    <div className={`dot ${props.dir}`}>
      <div data-builder-dotdir={props.dir} className="dot-hander">
        <div className="dot-hander-inner"></div>
      </div>
    </div>
  );
};

const dots = (
  <>
    <Dot dir="tl" />
    <Dot dir="tc" />
    <Dot dir="tr" />
    <Dot dir="cl" />
    <Dot dir="cr" />
    <Dot dir="bl" />
    <Dot dir="bc" />
    <Dot dir="br" />
  </>
);

class Anchor extends React.Component<Props> {
  render() {
    const { type, children } = this.props;
    return (
      <div data-builder-anchor={type} className="anchor">
        {dots}
        {children}
      </div>
    );
  }
}

export default Anchor;
