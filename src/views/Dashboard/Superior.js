import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
var moment = require("moment");

class Superior extends Component {
  render() {
    return (
      <ListGroup>
        <ListGroupItem active>
          <h2>{this.props.title}</h2>
        </ListGroupItem>
        {this.props.data.map((item, i) => {
          return (
            <ListGroupItem>
              <div class="row">
                <div class="col">{item.cliente}</div>
                <div class="col-2">
                  {moment(item.updatedAt).format("HH:mm")}
                </div>
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }
}
export default Superior;
