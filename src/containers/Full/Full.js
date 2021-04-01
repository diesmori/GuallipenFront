import React, { Component } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "../../components/Header/";
import Sidebar from "../../components/Sidebar/";
import * as firebase from "firebase";

import Dashboard from "../../views/Dashboard/";
import Dispatch from "../../views/Dispatch/";
import Editor from "../../views/Editor/";
import Login from "../../views/Login/";

class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user == null) {
        this.setState({ isLogged: false });
      } else {
        this.setState({ isLogged: true });
      }
    });
  }

  render() {
    if (!this.state.isLogged) {
      return <Login />;
    } else {
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
                  <Route
                    path="/dispatch"
                    name="Despacho"
                    component={Dispatch}
                  />
                  <Route path="/editor" name="Editor" component={Editor} />
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Container>
              v1.2
            </main>
          </div>
        </div>
      );
    }
  }
}

export default Full;
