import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import "./index.css";

class Header extends React.Component {
  render() {
    return (
      <Grid container justify="space-between" className="dashboard-header">
        <Grid item>
          <div className="logo">Builder</div>
          <Divider orientation="vertical" />
          <Button>Dashboard</Button>
        </Grid>
        <Grid item>
          <Button>
            <Avatar>z</Avatar>
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default Header;
