import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

import { signIn } from "../../Firebase/helpers";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-6">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">
                      Plataforma de gestión Davis Graphics
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Email"
                        name="user"
                        value={this.state.user}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        name="pass"
                        value={this.state.pass}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          color="primary"
                          className="px-4"
                          onClick={() =>
                            signIn(this.state.user, this.state.pass)
                          }
                        >
                          Ingresar
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">
                          Olvidó su contraseña?
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
