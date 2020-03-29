import React, { Component } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import AmigoService from "../../services/amigos/AmigoService";
import GroupSelect from "./GroupSelect";
import RutaService from "../../services/rutas/RutaService";

/**
 * Componente que modela un panel para compartir la ruta seleccionada
 * con un grupo de amigos.
 */
class SharePanel extends Component {
  constructor(props) {
    super(props);
    this.ruta = props.ruta;
    this.amigoService = new AmigoService();
    this.rutaService = new RutaService();
    this.selectedFriends = []; // lista de amigos seleccionados.
  }

  state = { amigos: [], loadingFriends: true };

  async componentDidMount() {
    this.setState({
      amigos: await this.amigoService.getAmigos(),
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
          <Button variant="success" onClick={this.share}>
            Compartir
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  /**
   * Invocado cuando se marca el checkbox de un amigo.
   */
  addFriend = webID => {
    this.selectedFriends.push(webID);
  };

  /**
   * Invocado cuando se desmarca el checkbox de un amigo.
   */
  deleteFriend = webID => {
    let index = this.selectedFriends.indexOf(webID);
    if (index !== -1) {
      this.selectedFriends.splice(index, 1);
    }
  };

  /**
   * Método que comparte la ruta con los amigos seleccionados.
   */
  share = async () => {
    console.log("---- SHARING ----");
    for (let i = 0; i < this.selectedFriends.length; i++) {
      await this.rutaService.shareRuta(
        this.selectedFriends[i].getWebId(),
        this.ruta.getUUID()
      );
    }
    this.props.cancel();
  };
}

export default SharePanel;
