import React, { Component } from "react";
import Map from "../map/Map";
import RutaService from "../../services/rutas/RutaService";

var r = new RutaService().getRutas()[0];

class VerRutas extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Mis rutas</h1>
          <p>
            En este apartado puedes echar un vistazo a tus rutas, visualizarlas
            en un mapa, ver sus detalles o bien eliminarla.
          </p>
          <Map ruta={r} />
        </header>
      </div>
    );
  }
}

export default VerRutas;
