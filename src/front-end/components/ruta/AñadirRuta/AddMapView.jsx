import React, { Component } from "react";
import AddRutaMap from "./AddRutaMap";
import RutaService from "../../../services/rutas/RutaService";
import { Jumbotron } from "react-bootstrap";

/**
 * Componente padre que representa la vista para añadir
 * una ruta mediante un mapa.
 */
class AddMapView extends Component {
  constructor(props) {
    super(props);
    this.rutaService = new RutaService();
  }

  state = {};
  render() {
    return (
      <div>
        <header>
          <Jumbotron>
            <h1 className="display-4">Añadir una ruta a través de un mapa</h1>
            <p>
              Desde aquí podrás crear tu propia ruta personalizada, indicando
              sus datos básicos y los hitos que la conforman.
            </p>
          </Jumbotron>
        </header>
        <AddRutaMap addRutaObject={this.rutaService.addRutaObject} />
      </div>
    );
  }
}

export default AddMapView;
