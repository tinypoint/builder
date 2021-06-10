import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import React from "react";
import { connect } from "react-redux";
import schemaParser from "../../features/schemaParser";
import store, { State } from "../../store";
import "./index.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface Props {
  type: "select" | "hover";
}

interface Props {
  select: State["select"];
  schema: State["schema"];
}

class Toolbox extends React.Component<Props> {
  state = {
    open: false,
  };

  delComp = () => {
    const { select, schema } = this.props;
    if (!select) {
      return;
    }
    const [_target] = schemaParser.searchById(schema, select);
    if (_target.type === "page") {
      return;
    }
    const _schema = schemaParser.remove(schema, select);

    store.dispatch({
      type: "CHANGE_VALUE",
      payload: [
        { key: "schema", value: _schema },
        { key: "select", value: "" },
      ],
    });
  };

  openRichTextEditor = () => {
    this.setState(
      {
        open: true,
      },
      () => {
        this.editor = new Quill(this.ref!, {
          placeholder: "Input some text here...",
          theme: 'snow',
        });
      }
    );
  };

  ref: HTMLDivElement | null = null;

  editor: Quill | null = null;

  handleClose = () => {};

  render() {
    const { select, schema } = this.props;
    const { open } = this.state;
    const [_target] = schemaParser.searchById(schema, select);

    return (
      <>
        <div className="toolbox">
          <IconButton onClick={this.delComp} color="primary">
            <DeleteIcon />
          </IconButton>
        </div>
        {Boolean(_target && _target.type === "text") && (
          <div
            className="rich-text-editor"
            onDoubleClick={this.openRichTextEditor}
          ></div>
        )}
        <div
          className="rich-text-editor-wrapper"
          style={{ display: open ? "block" : "none" }}
        >
          <div ref={(ref) => (this.ref = ref)}></div>
        </div>
      </>
    );
  }
}

export default connect((state: State) => {
  return {
    select: state.select,
    schema: state.schema,
  };
})(Toolbox);
