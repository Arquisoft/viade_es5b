import React, { Component } from "react";
import { Modal, Button, ListGroup, Spinner } from "react-bootstrap";
import AmigoService from "../../services/amigos/AmigoService";

class SharePanel extends Component {
  constructor() {
    super();
    this.service = new AmigoService();
  }

  state = { amigos: [], loadingFriends: true };

  async componentDidMount() {
    this.setState({
      amigos: await this.service.getAmigos(),
      loadingFriends: false
    });
  }

  render() {
    return (
      <Modal show={this.props.show} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Compartir esta ruta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Ruta: {this.props.ruta.getNombre()}</h4>
          <p>Selecciona a los amigos con los que deseas compartir esta ruta:</p>
          {this.state.loadingFriends && (
            <>
              <Spinner
                className="mr-2"
                as="span"
                animation="border"
                role="status"
              ></Spinner>
              Cargando amigos...
            </>
          )}
          {!this.state.loadingFriends && (
            <ListGroup>
              {this.state.amigos.map((a, key) => (
                <ListGroup.Item key={key++}>{a.getNombre()}</ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.cancel}>
            Cancelar
          </Button>
          <Button variant="success">Compartir</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SharePanel;
