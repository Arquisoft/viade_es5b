import React, { Component } from "react";
import RouteList from "./RouteList";

class VerRutas extends Component {
  state = {
    loaded: false
  };

  render() {
    return (
      <div>
        <header>
          <h1>Mis rutas</h1>
          <p>
            En este apartado puedes echar un vistazo a tus rutas, visualizarlas
            en un mapa, ver sus detalles o bien eliminarlas.
          </p>
          <div>
            <RouteList />
          </div>
        </header>
      </div>
    );
  }

  /**
   * Invocado desde la lista de rutas para indicar que ya se han
   * cargado las rutas del usuario.
   */
  handleLoaded = () => {
    this.setState({ loaded: true });
  };
}

export default VerRutas;
