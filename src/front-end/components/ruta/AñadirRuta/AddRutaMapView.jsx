import React, { Component } from "react";
import AddRouteMap from "../../map/AddRouteMap";
import { Card, InputGroup, FormControl } from "react-bootstrap";

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
          Desde aquí podrás crear tu propia ruta personalizada, indicando sus
          datos básicos y los hitos que la conforman.
        </p>
        <Card className="mb-3" style={{ width: "70vh" }}>
          <Card.Header>Datos básicos</Card.Header>
          <Card.Body>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Nombre</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl placeholder="Ruta de Avilés" />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Descripción</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Texto descriptivo de la ruta"
                as="textarea"
              />
            </InputGroup>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Seleccionar los hitos de la ruta</Card.Header>
          <Card.Body>
            <Card.Text>
              Puedes utilizar el mapa de la parte inferior para seleccionar los
              puntos que conformarán tu ruta. También puedes hacer{" "}
              <b>doble click sobre un punto</b> para modificar sus datos.
              Utiliza los botones de la barra superior para eliminar el último
              marcador o eliminar todos los marcadores.
            </Card.Text>
            <AddRouteMap />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default AddRutaMapView;
