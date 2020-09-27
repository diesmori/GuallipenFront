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
import { postPedidoATrans, deletePedidoATrans } from "../../Firebase/helpers";

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
  changeTransportista(pedido, transportista) {
    postPedidoATrans(pedido, transportista);
    this.setState({
      transportistaSelected: transportista.Nombre
    });
  }
  componentDidMount() {
    if ("Transportista" in this.props.myKey)
      this.setState({
        transportistaSelected: this.props.myKey.Transportista.Nombre
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
                onClick={() => {
                  that.setState({
                    transportistaSelected: "Transportista"
                  });
                  deletePedidoATrans(this.props.myKey);
                }}
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
                      onClick={() =>
                        that.changeTransportista(that.props.myKey, key)
                      }
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
