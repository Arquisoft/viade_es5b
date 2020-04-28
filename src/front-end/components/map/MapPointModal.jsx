import React, { Component } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import L from "leaflet";
import "../../../front-end/css/errors.css";

/**
 * Componente que representa un panel modal que permite
 * modificar el hito sobre el que se ha hecho click en la vista
 * para añadir una ruta a través de un mapa.
 */
class MapPointModal extends Component {
  state = {
    nameValue: "",
    latValue: "",
    lngValue: "",
  };

  render() {
    return (
      <Modal show={this.props.showModal} centered>
        <Modal.Header>
          <Modal.Title>Modificar este hito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Deja en blanco aquellos campos que no quieras modificar.</p>
          {this.props.point != null && (
            <div>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>Nombre</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  disabled={this.props.point.index === 0}
                  onChange={this.onChangeName}
                  placeholder={this.props.point.name}
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>Latitud</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  onChange={this.onChangeLat}
                  placeholder={this.props.point.latlng.lat}
                  type="number"
                  step="any"
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>Longitud</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  onChange={this.onChangeLng}
                  placeholder={this.props.point.latlng.lng}
                  type="number"
                  step="any"
                />
              </InputGroup>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancelar
          </Button>
          <Button onClick={this.modificar}>Modificar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  // Métodos para manejar los eventos de cambio de los campos
  onChangeName = (e) => {
    this.setState({
      nameValue: e.target.value,
    });
  };

  onChangeLat = (e) => {
    this.setState({ latValue: parseFloat(e.target.value) });
  };

  onChangeLng = (e) => {
    this.setState({ lngValue: parseFloat(e.target.value) });
  };

  /**
   * Manejador para recolectar los valores de los campos modificados o bien
   * dejar el valor que tenía antes el punto en aquellos en los que se deje vacío.
   */
  modificar = () => {
    let result = this.parseData(this.state);
    this.props.handleModifyPoint(result); // Modificamos la lista de puntos del padre
    this.props.handleClose(); // Cerramos el dialogo modal.
  };

  /**
   * Método encargado de parsear los datos del objeto recibido
   * como parámetro para transformarlo en un objeto adecuado para ser
   * representado como un punto en el mapa.
   */
  parseData(data) {
    let result = {
      index: this.props.point.index,
      name: "",
      latlng: null,
    };
    result.name =
      data.nameValue.length === 0 ? this.props.point.name : data.nameValue;
    let lat =
      data.latValue.length === 0 || isNaN(data.latValue)
        ? this.props.point.latlng.lat
        : data.latValue;
    let lng =
      data.lngValue.length === 0 || isNaN(data.lngValue)
        ? this.props.point.latlng.lng
        : data.lngValue;

    result.latlng = L.latLng(lat, lng);
    return result;
  }
}

export default MapPointModal;
