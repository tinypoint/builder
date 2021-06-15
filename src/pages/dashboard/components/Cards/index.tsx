import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./index.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Page {
  name: string;
  _id: string;
}

class Header extends React.Component {
  state = {
    pages: [] as Page[],
    loading: true,
  };

  fetchData = async () => {
    this.setState({
      loading: true,
    });
    const {
      data: { data },
    } = await axios.get("/api/page/list");
    this.setState({
      pages: data,
      loading: false,
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  delete = async (id: string) => {
    await axios.delete(`/api/page/${id}`);
    const { pages } = this.state;
    this.setState({
      pages: pages.filter((page) => page._id !== id),
    });
  };

  render() {
    const { loading, pages } = this.state;
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

        {pages.map((page) => {
          return (
            <Card
              key={page._id}
              elevation={0}
              raised
              square
              className="edit-card card"
            >
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {page.name || "Unnamed Project"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button href={`/editor/index.html?id=${page._id}`}>edit</Button>
                <Button onClick={() => this.delete(page._id)}>delete</Button>
              </CardActions>
            </Card>
          );
        })}
        {Boolean(loading) && (
          <Card elevation={0} raised square className="loading-card card">
            <CircularProgress />
          </Card>
        )}
      </section>
    );
  }
}

export default Header;
