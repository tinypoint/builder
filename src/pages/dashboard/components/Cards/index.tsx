import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './index.css';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Page {
  name: string;
  _id: string;
}

interface IStates {
  pages: Page[];
  loading: boolean;
}

class Cards extends React.Component<any, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      pages: [] as Page[],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({
      loading: true,
    });
    const {
      data: { data },
    } = await axios.get('/api/page/list');
    this.setState({
      pages: data,
      loading: false,
    });
  };

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
            <Button href="/builder/create">create</Button>
          </CardActions>
        </Card>

        {pages.map((page) => (
          <Card
            key={page._id}
            elevation={0}
            raised
            square
            className="edit-card card"
          >
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {page.name || 'Unnamed Project'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button href={`/builder/editor?id=${page._id}`}>edit</Button>
              <Button onClick={() => this.delete(page._id)}>delete</Button>
            </CardActions>
          </Card>
        ))}
        {Boolean(loading) && (
          <Card elevation={0} raised square className="loading-card card">
            <CircularProgress />
          </Card>
        )}
      </section>
    );
  }
}

export default Cards;
