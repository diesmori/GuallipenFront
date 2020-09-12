import React, { Component } from "react";
import Estado from "./Estado";
import Superior from "./Superior";
import Ruta from "./Ruta";
import apiUri from "../../apiUri";
import { getHoy } from "../../Firebase/helpers";
import * as firebase from "firebase";

const urlIndicadores = valor => "https://mindicador.cl/api/" + valor;

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
        that.setState({ pedidos: value });
      }
    });
  }

  componentDidMount() {
    this.listenDailyPedidos(getHoy());
    fetch(apiUri + "ingresados")
      .then(r => r.json())
      .then(r => {
        this.setState({
          ingresados: r
        });
        console.log(this.state.ingresados);
      });

    fetch(apiUri + "liberados")
      .then(r => r.json())
      .then(r => {
        this.setState({
          liberados: r
        });
        console.log(this.state.liberados);
      });
    fetch(apiUri + "facturados")
      .then(r => r.json())
      .then(r => {
        this.setState({
          facturados: r
        });
        console.log(this.state.facturados);
      });
  }

  render() {
    if (!this.state.ingresados || !this.state.liberados || !this.state.pedidos)
      return <div />;
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
