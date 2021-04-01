import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Moment from "react-moment";
var moment = require("moment");

class Superior extends Component {
  render() {
    return (
      <ListGroup>
        <ListGroupItem active>
          <h2>{this.props.title + " (" + this.props.data.length + ")"}</h2>
        </ListGroupItem>
        <div style={{ overflowY: "auto", height: window.innerHeight / 2.8 }}>
          {this.props.data.map((item, i) => {
            return (
              <div key={i}>
                <ListGroupItem key={i}>
                  <div className="row">
                    <div className="col-2">{item.id}</div>
                    <div className="col">
                      {item.NombreCliente.replace(/,/g, ".")}
                    </div>
                    <div className="col-2">
                      <Moment unix format="HH:MM">
                        {item.Timestamps[item.Estado]}
                      </Moment>
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
