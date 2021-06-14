import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./index.css";

class Header extends React.Component {
  render() {
    return (
      <section className="cards">
        <Card elevation={0} raised square className="create-card card">
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
            <Button href="/create">create</Button>
          </CardActions>
        </Card>
        <Card elevation={0} raised square className="edit-card card">
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Unnamed Project
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="/editor">edit</Button>
          </CardActions>
        </Card>
        <Card elevation={0} raised square className="edit-card card">
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Unnamed Project
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="/editor">edit</Button>
          </CardActions>
        </Card>
        <Card elevation={0} raised square className="edit-card card">
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Unnamed Project
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="/editor">edit</Button>
          </CardActions>
        </Card>
        <Card elevation={0} raised square className="edit-card card">
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Unnamed Project
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="/editor">edit</Button>
          </CardActions>
        </Card>
      </section>
    );
  }
}

export default Header;
