import React from "react";

type ITextProps = any;

export default class Text extends React.Component<ITextProps> {
  static displayName = "Text";
  render() {
    return (
      <span id={this.props.id} data-builder-type="text">
        文字
      </span>
    );
  }
}
