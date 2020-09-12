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
        <div style={{ overflowY: "auto", height: window.innerHeight / 2.8 }}>
          {this.props.data.map((item, i) => {
            return (
              <div key={i}>
                <ListGroupItem key={i}>
                  <div className="row">
                    <div className="col">{item.cliente}</div>
                    <div className="col-2">
                      {moment(item.updatedAt).format("HH:mm")}
                    </div>
                  </div>
                </ListGroupItem>
              </div>
            );
          })}
        </div>
      </ListGroup>
    );
  }
}
export default Superior;
