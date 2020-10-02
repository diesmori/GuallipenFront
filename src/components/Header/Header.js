import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import * as firebase from "firebase";
var moment = require("moment");
const urlIndicadores = valor => "https://mindicador.cl/api/" + valor;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: moment(),
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const old = this.state.dropdownOpen;
    this.setState({ dropdownOpen: !old });
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        now: moment()
      });
    }, 1000);

    fetch(urlIndicadores("dolar"))
      .then(r => r.json())
      .then(r => {
        this.setState({
          dolar: r
        });
      });

    fetch(urlIndicadores("euro"))
      .then(r => r.json())
      .then(r => {
        this.setState({
          euro: r
        });
      });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-hidden");
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-minimized");
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-mobile-show");
  }

  render() {
    if (!this.state.dolar || !this.state.euro) return <div />;
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarBrand href="#" />
        <h2>{this.state.now.format("DD/MM/YYYY")}</h2>
        <h2>{this.state.now.format("HH:mm:ss")}</h2>
        <h2>$: {this.state.dolar.serie[0].valor} </h2>
        <h2>€: {this.state.euro.serie[0].valor} </h2>
        <a href="http://davis.graphics/" target="_blank">
          <img src="./img/logo.png" height={40} />
        </a>
        <ButtonDropdown
          style={{ marginRight: 15 }}
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle caret>Salir</DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Desea salir?</DropdownItem>
            <DropdownItem
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              SALIR
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </header>
    );
  }
}

export default Header;
