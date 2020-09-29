import React, { Component } from "react";
import Superior from "./Superior";
import Ruta from "./Ruta";
import { getHoy } from "../../Firebase/helpers";
import * as firebase from "firebase";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidos: {},
      transportistas: {}
    };
    this.listenDailyPedidos = this.listenDailyPedidos.bind(this);
    this.listenTransportistas = this.listenTransportistas.bind(this);
  }

  listenDailyPedidos(fecha) {
    const that = this;
    var ref = firebase.database().ref("Ordenes/" + fecha);
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

  componentDidMount() {
    this.listenDailyPedidos(getHoy());
    this.listenTransportistas();
  }

  render() {
    if (!this.state.pedidos) return <div />;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Superior
              title="Ingresadas"
              data={Object.values(this.state.pedidos).filter(
                ({ Estado }) => Estado === 520
              )}
            />
          </div>
          <div className="col">
            <Superior
              title="Liberadas"
              data={Object.values(this.state.pedidos).filter(
                ({ Estado }) => Estado === 540
              )}
            />
          </div>
          <div className="col">
            <Superior
              title="Facturadas"
              data={Object.values(this.state.pedidos).filter(
                ({ Estado }) => Estado === 585
              )}
            />
          </div>
        </div>
        <div className="row">
          {Object.values(this.state.transportistas).map(function(key, index) {
            return (
              <div className="col" key={index}>
                <Ruta title={key.Nombre} data={key} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
