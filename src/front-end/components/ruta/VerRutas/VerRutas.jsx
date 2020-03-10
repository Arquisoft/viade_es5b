import React, { Component } from "react";
import RutaService from "../../../services/rutas/RutaService";
import RouteList from "./RouteList";

var service = new RutaService();

class VerRutas extends Component {
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
            <RouteList rutas={service.getRutas()} />
          </div>
        </header>
      </div>
    );
  }
}

export default VerRutas;
