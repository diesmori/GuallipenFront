import React, { Component } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "../../components/Header/";
import Sidebar from "../../components/Sidebar/";

import Dashboard from "../../views/Dashboard/";
import Dispatch from "../../views/Dispatch/";
import Editor from "../../views/Editor/";

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Container fluid>
              <Switch>
                <Route
                  path="/dashboard"
                  name="Dashboard"
                  component={Dashboard}
                />
                <Route path="/dispatch" name="Despacho" component={Dispatch} />
                <Route path="/editor" name="Editor" component={Editor} />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default Full;
