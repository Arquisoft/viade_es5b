import React, { Component } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import AmigoService from "../../services/amigos/AmigoService";
import GroupSelect from "./GroupSelect";

class SharePanel extends Component {
  constructor() {
    super();
    this.service = new AmigoService();
    this.selectedItems = [];
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
            <GroupSelect
              amigos={this.state.amigos}
              add={this.addFriend}
              delete={this.deleteFriend}
            ></GroupSelect>
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

  /**
   * Invocado cuando se marca el checkbox de un amigo.
   */
  addFriend = webID => {
    this.selectedItems.push(webID);
    console.log(this.selectedItems);
  };

  /**
   * Invocado cuando se desmarca el checkbox de un amigo.
   */
  deleteFriend = webID => {
    let index = this.selectedItems.indexOf(webID);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
    console.log(this.selectedItems);
  };
}

export default SharePanel;
