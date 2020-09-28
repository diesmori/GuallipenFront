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
import { getHoy } from "../../Firebase/helpers";
import * as firebase from "firebase";

class Dispatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      transportistas: {},
      pedidos: {}
    };
    this.toggle = this.toggle.bind(this);
    this.listenDailyPedidos = this.listenDailyPedidos.bind(this);
    this.listenTransportistas = this.listenTransportistas.bind(this);
  }

  listenDailyPedidos(fecha) {
    const that = this;
    var ref = firebase
      .database()
      .ref("Ordenes/" + fecha)
      .orderByChild("Estado")
      .equalTo(585);
    const ordenes = ref.on("value", function(snapshot) {
      const value = snapshot.val();
      if (value) {
        Object.keys(value).map(function(key, index) {
          value[key].id = key;
        });
        that.setState({ pedidos: value });
      }
    });
  }

  listenTransportistas() {
    const that = this;
    var ref = firebase.database().ref("Transportistas");
    const transportistas = ref.on("value", function(snapshot) {
      const value = snapshot.val();
      if (value) {
        Object.keys(value).map(function(key, index) {
          value[key].id = key;
        });
        that.setState({ transportistas: value });
      }
    });
  }

  toggle(tab) {
    if (this.state.activeTab != tab) this.setState({ activeTab: tab });
  }

  componentDidMount() {
    this.listenTransportistas();
    this.listenDailyPedidos(getHoy());
  }

  render() {
    const that = this;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 1 })}
              onClick={() => {
                this.toggle(1);
              }}
            >
              Todos los pedidos
            </NavLink>
          </NavItem>
          {Object.values(this.state.transportistas).map(function(key, index) {
            return (
              <NavItem key={index}>
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
            <General
              data={this.state.pedidos}
              transportistas={this.state.transportistas}
              currentTransportista={null}
            />
          </TabPane>
          {Object.values(this.state.transportistas).map(function(key, index) {
            return (
              <TabPane tabId={index + 2} key={index}>
                <General
                  data={Object.values(that.state.pedidos).filter(
                    ({ Transportista }) => {
                      if (Transportista !== undefined) {
                        if (Transportista.id === key.id) return true;
                        else return false;
                      } else return false;
                    }
                  )}
                  transportistas={that.state.transportistas}
                  currentTransportista={key}
                />
              </TabPane>
            );
          })}
        </TabContent>
      </div>
    );
  }
}
export default Dispatch;
