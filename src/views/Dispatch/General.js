import React, { Component } from "react";
import {
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Moment from "react-moment";
var moment = require("moment");
import Row from "./Row";

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const old = this.state.dropdownOpen;
    this.setState({ dropdownOpen: !old });
  }
  render() {
    const that = this;
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Orden</th>
            <th>Cliente</th>
            <th>Hora Factura</th>
            <th>Transportista</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data
            ? Object.values(this.props.data).map(function(key, index) {
                return (
                  <Row
                    index={index + 1}
                    myKey={key}
                    transportistas={that.props.transportistas}
                    key={index}
                  />
                );
              })
            : null}
        </tbody>
      </Table>
    );
  }
}
export default General;
