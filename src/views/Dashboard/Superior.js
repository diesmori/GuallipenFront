import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

class Superior extends Component {
  render() {
    return (
      <ListGroup>
        <ListGroupItem active>
          <h2>{this.props.title}</h2>
        </ListGroupItem>
        <ListGroupItem>
          <div class="row">
            <div class="col">Porta ac consectetur ac</div>
            <div class="col-2">18:47</div>
          </div>
        </ListGroupItem>
        <ListGroupItem>
          <div class="row">
            <div class="col">Morbi leo risus</div>
            <div class="col-2">09:38</div>
          </div>
        </ListGroupItem>
        <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
        <ListGroupItem>Morbi leo risus</ListGroupItem>
      </ListGroup>
    );
  }
}
export default Superior;
