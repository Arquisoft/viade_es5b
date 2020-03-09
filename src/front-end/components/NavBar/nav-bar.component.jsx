import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {

  return (
    <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/viade_es5b/">Viade-Rutas</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/viade_es5b/login">Log In</Nav.Link>
          <Nav.Link href="/viade_es5b/signup">Sign Up</Nav.Link>
        </Nav>
    </Navbar>
  );
};

export default NavBar;
