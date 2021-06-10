import React from "react";
import Quill from "quill";
import "./index.css";
import "quill/dist/quill.core.css";

type ITextProps = any;

export default class Text extends React.Component<ITextProps> {
  static displayName = "Text";

  ref: HTMLDivElement | null = null;

  editor: Quill | null = null;

  componentDidMount() {
    this.editor = new Quill(this.ref!, {
      placeholder: "Input some text here...",
      readOnly: true,
    });
  }

  render() {
    return (
      <div id={this.props.id} data-builder-type="text" className="text">
        <div ref={(ref) => (this.ref = ref)}></div>
      </div>
    );
  }
}
