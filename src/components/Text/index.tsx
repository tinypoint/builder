import React from 'react';
import Quill from 'quill';
import './index.css';
import 'quill/dist/quill.core.css';

type ITextProps = any;

export default class Text extends React.Component<ITextProps> {
  ref: HTMLDivElement | null = null;

  editor: Quill | null = null;

  componentDidMount() {
    const { text } = this.props;
    this.editor = new Quill(this.ref!, {
      placeholder: 'Input some text here...',
      readOnly: true,
    });

    if (text) {
      this.editor.setContents(text);
    }
  }

  componentDidUpdate(props: ITextProps) {
    const { text } = this.props;
    if (text !== props.text) {
      this.editor!.setContents(text);
    }
  }

  render() {
    const { id } = this.props;
    return (
      <div id={id} data-builder-type="text" className="text">
        <div ref={(ref) => {
          this.ref = ref;
        }}
        />
      </div>
    );
  }
}
