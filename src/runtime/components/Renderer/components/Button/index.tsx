import React from "react";

type IButtonProps = any;

class Button extends React.Component<IButtonProps> {
  static displayName = "Button";
  render() {
    return (
      <div
        id={this.props.id}
        data-builder-type="button"
        className="button"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {this.props.text}
      </div>
    );
  }
}

export default Button;
