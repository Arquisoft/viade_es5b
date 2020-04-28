import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../../css/spacing.css";

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#/">
        <img
          alt=""
          src={process.env.PUBLIC_URL + "/img/viade2.png"}
          width="40"
          height="40"
          className="d-inline-block align-top"
        />{" "}
        <div className=" d-inline-block viade-brand">Viade-Rutas</div>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="#/login">Log In</Nav.Link>
        <Nav.Link href="#/signup">Sign Up</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
