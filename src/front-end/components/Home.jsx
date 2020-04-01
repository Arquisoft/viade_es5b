import React, { Component } from "react";
import HomeLogin from "./authentication/login/HomeLogin";
/**
 * Componente que representa la página principal de la
 * aplicación.
 */
class Home extends Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-3">¡Bienvenido a Viade!</h1>
        <HomeLogin />
      </div>
    );
  }
}

export default Home;
