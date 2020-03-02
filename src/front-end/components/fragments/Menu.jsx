import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class Menu extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Viade-Rutas</Navbar.Brand>
        <Nav>
          <Nav.Link href="/ver-rutas">Mis rutas</Nav.Link>
          <Nav.Link href="/add-ruta">Añadir ruta</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Menu;
