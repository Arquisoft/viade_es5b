import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


class Menu extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Viade-Rutas</Navbar.Brand>
        {this.props.state.loggedIn && (
          <Nav>
            <Nav.Link href="/ver-rutas">Mis rutas</Nav.Link>
            <Nav.Link href="/add-ruta">Añadir ruta</Nav.Link>
          </Nav>
        )}

        <Nav className="ml-auto">
         
          {!this.props.state.loggedIn && (<Nav>
              <Nav.Link href="/login">Log In</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>)}         
        </Nav>
      </Navbar>
    );
  }
}

export default Menu;
