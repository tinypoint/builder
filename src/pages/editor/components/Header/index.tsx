import React from "react";
import { connect, ConnectedProps } from "react-redux";
import store, { State } from "../../store";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import SaveIcon from "@material-ui/icons/Save";
import LocalSeeIcon from "@material-ui/icons/LocalSee";
import PublishIcon from "@material-ui/icons/Publish";
import Divider from "@material-ui/core/Divider";
import historyer from "../../features/historyer";
import EditorButton from "./EditorButton";

const connector = connect((state: State) => {
  return {
    schema: state.schema,
    scale: state.scale,
    create: state.create,
  };
});

type Props = ConnectedProps<typeof connector>;

class Header extends React.Component<Props> {
  goBack = () => {
    if (window.history.length >= 3) {
      window.history.back();
    } else {
      window.location.replace("/");
    }
  };

  create = async () => {
    store.dispatch({
      type: "CHANGE_VALUE",
      payload: [{ key: "loading", value: { creating: true } }],
    });

    setTimeout(() => {
      window.location.replace("/editor.html");
      window.location.reload();

      store.dispatch({
        type: "CHANGE_VALUE",
        payload: [{ key: "loading", value: { creating: false } }],
      });
    }, 2000);
  };

  save = async () => {
    if (this.props.create) {
      this.create();
    } else {
      const { schema } = this.props;
      window.localStorage.setItem("_test_data", JSON.stringify(schema));
    }
  };

  undo = async () => {
    historyer.undo();
  };

  onScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(+(Number(value) / 100).toFixed(2));
    store.dispatch({
      type: "CHANGE_VALUE",
      payload: [{ key: "scale", value: +(Number(value) / 100).toFixed(2) }],
    });
  };

  render() {
    const { scale } = this.props;

    return (
      <Grid container justify="space-between" className="header">
        <Grid item>
          <IconButton aria-label="back" onClick={this.goBack}>
            <ArrowBackIcon />
          </IconButton>
          <Divider orientation="vertical" />
          {/* <Button>editor</Button> */}
          <EditorButton />
          <Button>add</Button>
          <Button>shortcut</Button>
          <Button>help</Button>
        </Grid>
        <Grid item>
          <Select defaultValue="iPhone XR">
            <MenuItem value="iPhone12 Pro Max">iPhone12 Pro Max</MenuItem>
            <MenuItem value="iPhone XR">iPhone XR</MenuItem>
            <MenuItem value="iPhone 6">iPhone 6</MenuItem>
          </Select>
          {/* <Input defaultValue="375px" style={{ width: 60 }} /> */}
          <Input
            value={+(Number(scale) * 100).toFixed(0)}
            inputMode="numeric"
            onChange={this.onScaleChange}
            style={{ width: 60 }}
          />
        </Grid>
        <Grid item>
          <IconButton aria-label="undo" onClick={this.undo}>
            <UndoIcon />
          </IconButton>
          <IconButton aria-label="redo">
            <RedoIcon />
          </IconButton>
          <IconButton aria-label="save" onClick={this.save}>
            <SaveIcon />
          </IconButton>
          <IconButton aria-label="publish">
            <LocalSeeIcon />
          </IconButton>
          <IconButton aria-label="publish">
            <PublishIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default connector(Header);
