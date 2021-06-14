import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import Ripple from "./components/Ripple";
import './index.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
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
        <div className="card-wrapper">
          <Card elevation={0} raised square className="create-card">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Click 'create'
              </Typography>
              <Typography variant="h5" component="h2">
                for a new project
              </Typography>
              <Typography color="textSecondary">
                Enrich it with components and forms.
              </Typography>
              <Typography variant="body2" component="p">
                It's easy and chill.
              </Typography>
            </CardContent>
            <CardActions>
              <Button><Link to="/editor/create">create</Link></Button>
            </CardActions>
          </Card>
          <Card elevation={0} raised square className="edit-card">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Unnamed Project
              </Typography>
            </CardContent>
            <CardActions>
              <Button><Link to="/editor/edit">edit</Link></Button>
            </CardActions>
          </Card>
        </div>
        <Ripple />
      </div>
    );
  }
}
