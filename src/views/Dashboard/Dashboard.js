import React, { Component } from "react";
import Estado from "./Estado";
import Superior from "./Superior";
import Ruta from "./Ruta";
import apiUri from "../../apiUri";
import { getDailyPedidos } from "../../Firebase/helpers";

const urlIndicadores = valor => "https://mindicador.cl/api/" + valor;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getDailyPedidos("2020,09,11");
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
    if (
      !this.state.ingresados ||
      !this.state.liberados ||
      !this.state.facturados
    )
      return <div />;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Superior title="Ingresadas" data={this.state.ingresados} />
          </div>
          <div className="col">
            <Superior title="Liberadas" data={this.state.liberados} />
          </div>
          <div className="col">
            <Superior title="Facturadas" data={this.state.facturados} />
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
