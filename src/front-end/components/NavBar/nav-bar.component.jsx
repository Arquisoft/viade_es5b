import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">Viade-Rutas</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/login">Log In</Nav.Link>
        <Nav.Link href="/signup">Sign Up</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
