import React from "react";
import { Link } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <div>
        dashboard
        <Link to="/editor/create">create</Link>
      </div>
    );
  }
}
