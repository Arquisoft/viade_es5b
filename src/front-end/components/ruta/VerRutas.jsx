import React, { Component } from "react";
import Map from "../map/Map";
import RutaService from "../../services/rutas/RutaService";

var ruta = new RutaService().getRutas()[0];

class VerRutas extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Mis rutas</h1>
          <p>A continuación se muestra una tabla con tus rutas.</p>
        </header>
      </div>
    );
  }
}

export default VerRutas;
