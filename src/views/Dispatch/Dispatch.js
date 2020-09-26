import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import General from "./General";
import * as firebase from "firebase";

class Dispatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      transportistas: {}
    };
    this.toggle = this.toggle.bind(this);
    this.listenTransportistas = this.listenTransportistas.bind(this);
  }

  listenTransportistas() {
    const that = this;
    var ref = firebase.database().ref("Transportistas");
    const transportistas = ref.on("value", function(snapshot) {
      const value = snapshot.val();
      if (value) {
        console.log(value);
        that.setState({ transportistas: value });
      }
    });
  }

  toggle(tab) {
    if (this.state.activeTab != tab) this.setState({ activeTab: tab });
  }

  componentDidMount() {
    this.listenTransportistas();
  }

  render() {
    const that = this;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle(1);
              }}
            >
              Tab1
            </NavLink>
          </NavItem>
          {Object.values(this.state.transportistas).map(function(key, index) {
            return (
              <NavItem>
                <NavLink
                  className={classnames({
                    active: that.state.activeTab === index + 2
                  })}
                  onClick={() => {
                    that.toggle(index + 2);
                  }}
                >
                  {key.Nombre}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={1}>
            <General name="General" />
          </TabPane>
          {Object.values(this.state.transportistas).map(function(key, index) {
            return (
              <TabPane tabId={index + 2}>
                <General name={key.Nombre} />
              </TabPane>
            );
          })}
        </TabContent>
      </div>
    );
  }
}
export default Dispatch;
