import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getHoy } from "../../Firebase/helpers";
import * as firebase from "firebase";
import Moment from "react-moment";
var moment = require("moment");

class Ruta extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.listenRuta = this.listenRuta.bind(this);
  }

  listenRuta() {
    const that = this;
    var ref = firebase
      .database()
      .ref("Transportistas/" + this.props.data.id + "/Ruta");

    ref.on("value", function(snapshot) {
      const value = snapshot.val();
      if (value) {
        that.setState({ ruta: value });
      }
    });
  }

  componentDidMount() {
    this.listenRuta();
  }

  render() {
    const that = this;
    return (
      <ListGroup>
        <ListGroupItem active>
          <h2>{this.props.title}</h2>
          <h3>{this.props.comuna}</h3>
          {this.state.ruta !== undefined ? (
            <h6>
              {" "}
              Ruta del día{" "}
              {moment
                .unix(this.state.ruta.Timestamp / 1000)
                .format("DD/MM/YYYY")}
            </h6>
          ) : null}
        </ListGroupItem>
        <div style={{ overflowY: "auto", height: window.innerHeight / 2.8 }}>
          {this.state.ruta !== undefined
            ? Object.values(this.state.ruta.Pedidos).map(function(key, index) {
                return (
                  <ListGroupItem key={index}>
                    <div className="row">
                      <div className="col">
                        {key.NombreCliente.replace(/,/g, ".")}
                      </div>
                      <div className="col-3">
                        <Moment unix format="HH:MM">
                          {key.Timestamps[585]}
                        </Moment>
                      </div>
                    </div>
                  </ListGroupItem>
                );
              })
            : null}
        </div>
      </ListGroup>
    );
  }
}
export default Ruta;
