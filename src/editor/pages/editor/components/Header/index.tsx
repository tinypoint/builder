import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import SaveIcon from "@material-ui/icons/Save";
import LocalSeeIcon from "@material-ui/icons/LocalSee";
import PublishIcon from "@material-ui/icons/Publish";

interface Props {
  schema: State["schema"];
}

class Header extends React.Component<Props> {
  save = async () => {
    const { schema } = this.props;
    window.localStorage.setItem("_test_data", JSON.stringify(schema));
  };

  render() {
    return (
      <Grid container justify="space-between" className="header">
        <Grid item>
          <Button>editor</Button>
          <Button>view</Button>
          <Button>shortcut</Button>
          <Button>help</Button>
        </Grid>
        <Grid item>
          <Select defaultValue="iPhone XR">
            <MenuItem value="iPhone12 Pro Max">iPhone12 Pro Max</MenuItem>
            <MenuItem value="iPhone XR">iPhone XR</MenuItem>
            <MenuItem value="iPhone 6">iPhone 6</MenuItem>
          </Select>
          <Input defaultValue="375px" style={{ width: 60 }} />
          <Input defaultValue="75%" style={{ width: 60 }} />
        </Grid>
        <Grid item>
          <IconButton aria-label="undo" color="primary">
            <UndoIcon />
          </IconButton>
          <IconButton aria-label="redo" color="primary">
            <RedoIcon />
          </IconButton>
          <IconButton aria-label="save" color="primary" onClick={this.save}>
            <SaveIcon />
          </IconButton>
          <IconButton aria-label="publish" color="primary">
            <LocalSeeIcon />
          </IconButton>
          <IconButton aria-label="publish" color="primary">
            <PublishIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default connect((state: State) => {
  return {
    schema: state.schema,
  };
})(Header);
