import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class Menu extends Component {
  state = {
    loggedIn: true
  };

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Viade-Rutas</Navbar.Brand>
        {this.state.loggedIn && (
          <Nav>
            <Nav.Link href="/ver-rutas">Mis rutas</Nav.Link>
            <Nav.Link href="/add-ruta">Añadir ruta</Nav.Link>
          </Nav>
        )}

        <Nav className="ml-auto">
         
          {!this.state.loggedIn && (<Nav>
              <Nav.Link href="/login">Log In</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>)}

          {this.state.loggedIn && <Nav.Link onClick={this.handleLogOut} href="">Logout</Nav.Link>}
        </Nav>
      </Navbar>
    );
  }

  handleLogOut = () => {
    alert("Falta por hacer");
  }

  /*
   * Método que será invocado cuando
   * el usuario se loguea con éxito.
   */
  loggedIn() {
    this.setState({ loggedIn: true });
  }

  /*
   * Método invocado en el momento de desconexión
   * del usuario.
   */
  loggedOut() {
    this.setState({ loggedIn: false });
  }
}

export default Menu;
