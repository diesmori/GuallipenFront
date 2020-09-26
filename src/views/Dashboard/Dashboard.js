import React, { Component } from "react";
import Superior from "./Superior";
import Ruta from "./Ruta";
import { getHoy } from "../../Firebase/helpers";
import * as firebase from "firebase";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidos: {}
    };
    this.listenDailyPedidos = this.listenDailyPedidos.bind(this);
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

  componentDidMount() {
    this.listenDailyPedidos(getHoy());
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
          <div className="col">
            <Ruta title="Ruta 1" />
          </div>
          <div className="col">
            <Ruta title="Ruta 2" />
          </div>
          <div className="col">
            <Ruta title="Ruta 3" />
          </div>
          <div className="col">
            <Ruta title="Ruta 4" />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
