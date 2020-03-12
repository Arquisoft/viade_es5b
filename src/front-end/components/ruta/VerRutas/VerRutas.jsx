import React, { Component } from "react";
import RouteList from "./RouteList";



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
            <RouteList service={this.props.service} rutas={this.props.service.getRutas()} />
          </div>
        </header>
      </div>
    );
  }
}

export default VerRutas;
