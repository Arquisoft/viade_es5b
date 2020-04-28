import React from "react";
import { Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import auth from "solid-auth-client";
import "../../css/spacing.css";

const AuthNavBar = (props) => {
  const logout = () => {
    auth.logout();
    window.location = "#/login";
  };
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
      <Nav>
        <Nav.Link href="#/ver-rutas">Mis rutas</Nav.Link>
        <Nav.Link href="#/add-menu">Crear rutas</Nav.Link>
        <Nav.Link href="#/friends">Amigos</Nav.Link>
        <Nav.Link href="#/shared">Compartido conmigo</Nav.Link>
      </Nav>

      <Nav className="ml-auto">
        <Nav.Link className="logout" onClick={logout}>
          Log Out
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AuthNavBar;
