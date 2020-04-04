import React, { Component } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

/**
 * Componente que representa un panel modal que permite
 * modificar el hito sobre el que se ha hecho click en la vista
 * para añadir una ruta a través de un mapa.
 */
class MapPointModal extends Component {
  state = {
    nameValue: "",
    latValue: "",
    lngValue: ""
  };

  render() {
    return (
      <Modal show={this.props.showModal} centered>
        <Modal.Header>
          <Modal.Title>Modificar Hito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.point != null && (
            <div>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>Nombre</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  onChange={this.onChangeName}
                  placeholder={this.props.point.name}
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>Latitud</InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  onChange={this.onChangeLat}
                  placeholder={this.props.point.latlng.lat}
                  type="number"
                  step="any"
                  className="pl-2"
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>Longitud</InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  onChange={this.onChangeLng}
                  placeholder={this.props.point.latlng.lng}
                  type="number"
                  step="any"
                  className="pl-2"
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

  onChangeName = e => {
    this.setState({ nameValue: e.target.value });
  };

  onChangeLat = e => {
    this.setState({ latValue: parseFloat(e.target.value) });
  };

  onChangeLng = e => {
    this.setState({ lngValue: parseFloat(e.target.value) });
  };

  modificar = () => {
    console.log("Modificando");
    console.log(this.state);
  };
}

export default MapPointModal;
