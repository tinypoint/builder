import React from "react";
import "./index.css";

type IButtonProps = any;

class Button extends React.Component<IButtonProps> {
  static displayName = "Button";
  render() {
    return (
      <div
        id={this.props.id}
        data-builder-type="button"
        className="button"
      >
        {this.props.text}
      </div>
    );
  }
}

export default Button;
