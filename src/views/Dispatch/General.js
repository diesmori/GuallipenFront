import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Moment from "react-moment";
var moment = require("moment");

class General extends Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}
export default General;
