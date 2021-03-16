import React, { Component } from "react";
import Superior from "./Superior";
import Ruta from "./Ruta";
import { getHoy, getUbicacion, parseGeocerca } from "../../Firebase/helpers";
import * as firebase from "firebase";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidos: {},
      transportistas: {},
      ubicacion: {
        markers: { marker: [{ $: { id_auto: "hola", geocerca: "" } }] }
      }
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

  async componentDidMount() {
    // firebase.database().ref("Clientes/hola").set({ text: "hola" });
    this.setState({ ubicacion: await getUbicacion() });
    this.interval = await setInterval(
      async () => this.setState({ ubicacion: await getUbicacion() }),
      1000 * 30
    );
    //this.setState({ ubicacion: await getUbicacion() });
    this.listenDailyPedidos(getHoy());
    this.listenTransportistas();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const that = this;
    if (!this.state.pedidos || !this.state.ubicacion) return <div />;
    return (
      <div>
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
        <br />
        <div className="row">
          {Object.values(this.state.transportistas).map(function(key, index) {
            try {
              return (
                <div className="col" key={index}>
                  <Ruta
                    title={key.Nombre}
                    data={key}
                    comuna={parseGeocerca(
                      that.state.ubicacion[key.idAuto].geocerca
                    )}
                  />
                </div>
              );
            } catch (error) {
              return true;
            }
          })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
