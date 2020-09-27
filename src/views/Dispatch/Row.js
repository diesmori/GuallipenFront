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

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      transportistaSelected: "Transportista"
    };
    this.toggle = this.toggle.bind(this);
    this.changeTransportista = this.changeTransportista.bind(this);
  }

  toggle() {
    const old = this.state.dropdownOpen;
    this.setState({ dropdownOpen: !old });
  }
  changeTransportista(nombre) {
    this.setState({
      transportistaSelected: nombre
    });
  }
  render() {
    const that = this;
    return (
      <tr>
        <th scope="row">{this.props.index}</th>
        <td>{this.props.myKey.id}</td>
        <td>{this.props.myKey.NombreCliente}</td>
        <td>
          <Moment unix format="HH:MM">
            {this.props.myKey.Timestamps[585]}
          </Moment>
        </td>
        <td>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              {this.state.transportistaSelected}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => that.changeTransportista("Transportista")}
              >
                --Ninguno--
              </DropdownItem>
              {this.props.transportistas ? (
                Object.values(this.props.transportistas).map(function(
                  key,
                  index
                ) {
                  return (
                    <DropdownItem
                      key={index}
                      onClick={() => that.changeTransportista(key.Nombre)}
                    >
                      {key.Nombre}
                    </DropdownItem>
                  );
                })
              ) : (
                <DropdownItem />
              )}
            </DropdownMenu>
          </Dropdown>
        </td>
      </tr>
    );
  }
}
export default Row;
