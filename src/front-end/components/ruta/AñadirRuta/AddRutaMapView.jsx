import React, { Component } from "react";
import AddRouteMap from "../../map/AddRouteMap";

/**
 * Componente que representa la vista para añadir una ruta a través
 * de un mapa, en donde el usuario puede ir hacieno click para ir
 * dibujando la ruta.
 */
class AddRutaMapView extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Añadir una ruta a través de un mapa</h1>
        <p>
          Desde aquí podrás crear tu propia ruta indicando sus datos básicos.
          Puedes utilizar esta herramienta para ir seleccionando en el mapa los
          puntos que conformarán la ruta.
        </p>
        <AddRouteMap></AddRouteMap>
      </div>
    );
  }
}

export default AddRutaMapView;
