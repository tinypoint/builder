import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Dashboard from './pages/dashboard'
import Editor from './pages/editor';

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/editor/edit">
            <Editor />
          </Route>
          <Route path="/editor/create">
            <Editor create />
          </Route>
          <Route>
            <Dashboard />
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}
