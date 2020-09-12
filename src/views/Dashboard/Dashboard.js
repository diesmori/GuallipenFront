import React, { Component } from "react";
import Estado from "./Estado";
import Superior from "./Superior";
import Ruta from "./Ruta";

const urlIndicadores = valor => "https://mindicador.cl/api/" + valor;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch(urlIndicadores("dolar"))
      .then(r => r.json())
      .then(r => {
        this.setState({
          dolar: r
        });
      });
  }

  render() {
    if (!this.state.dolar) return <div />;
    return (
      <div class="container">
        <div class="row">
          <div class="col">
            <Superior title="Ingresadas" />
          </div>
          <div class="col">
            <Superior title="Liberadas" />
          </div>
          <div class="col">
            <Superior title="Facturadas" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <Ruta title="Ruta 1" />
          </div>
          <div class="col">
            <Ruta title="Ruta 2" />
          </div>
          <div class="col">
            <Ruta title="Ruta 3" />
          </div>
          <div class="col">
            <Ruta title="Ruta 4" />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
