import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

class Ruta extends Component {
  render() {
    return (
      <ListGroup>
        <ListGroupItem active>
          <h2>{this.props.title}</h2>
        </ListGroupItem>
        <div style={{ overflowY: "auto", height: window.innerHeight / 2.8 }}>
          <ListGroupItem>
            <div className="row">
              <div className="col">Porta ac consectetur ac</div>
              <div className="col-3">18:47</div>
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="row">
              <div className="col">Morbi leo risus</div>
              <div className="col-3">09:38</div>
            </div>
          </ListGroupItem>
          <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
          <ListGroupItem>Morbi leo risus</ListGroupItem>
          <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
          <ListGroupItem>Morbi leo risus</ListGroupItem>
        </div>
      </ListGroup>
    );
  }
}
export default Ruta;
