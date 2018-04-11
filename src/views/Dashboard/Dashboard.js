import React, { Component } from "react";
import Estado from "./Estado";
import Superior from "./Superior";
import Ruta from "./Ruta";
import apiUri from "../../apiUri";

const urlIndicadores = valor => "https://mindicador.cl/api/" + valor;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(apiUri + "ingresados");
    fetch(apiUri + "ingresados")
      .then(r => r.json())
      .then(r => {
        this.setState({
          ingresados: r
        });
        console.log(this.state.ingresados);
      });
  }

  render() {
    if (!this.state.ingresados) return <div />;
    return (
      <div class="container">
        <div class="row">
          <div class="col">
            <Superior title="Ingresadas" data={this.state.ingresados} />
          </div>
          <div class="col">
            <Superior title="Liberadas" data={[]} />
          </div>
          <div class="col">
            <Superior title="Facturadas" data={[]} />
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
