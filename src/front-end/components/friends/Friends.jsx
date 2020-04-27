import React, { Component } from "react";
import AmigoService from "../../services/amigos/AmigoService";
import AddFriend from "./AddFriend";
import FriendList from "./FriendList";
import MessageDialog from "../util/MessageDialog";
import { Alert, Jumbotron } from "react-bootstrap";

class Friends extends Component {
  constructor() {
    super();
    this.service = new AmigoService();
  }

  state = {
    amigos: [],
    noFriends: false,
    showDialog: false,
    dialogMessage: "",
    showError: false,
    loading: false
  };

  /**
   * Se ejecutará cuando se monte el componente en el DOM.
   */
  async componentDidMount() {
    this.setState({ amigos: await this.service.getAmigos() });
    if (this.state.amigos.length === 0) this.setState({ noFriends: true });
  }

  render() {
    return (
      <div data-testid="componeteJUmbotron">
        <Jumbotron>
          <h2 className="display-4" data-testid="titleAmigos">
            Amigos
          </h2>
          <p data-testid="gestionAmigos">
            Desde aquí puedes realizar la gestión de tus amigos.
          </p>
        </Jumbotron>

        <AddFriend
          handleAddFriend={webID => this.handleAddFriend(webID)}
          isLoading={this.state.loading}
          data-testid="componenteAddFriend"
        />
        {this.showError()}
        <FriendList
          amigos={this.state.amigos}
          noFriends={this.state.noFriends}
        />

        <MessageDialog
          show={this.state.showDialog}
          title="Agregar un amigo"
          message={this.state.dialogMessage}
          handleAceptar={() => this.setState({ showDialog: false })}
        ></MessageDialog>
      </div>
    );
  }

  /**
   * Será invocado cuando se agregue un nuevo amigo en el pod
   * del usuario logueado.
   */
  handleAddFriend = async webID => {
    // Agregamos el nuevo amigo
    this.setState({ loading: true });
    console.log("---- Intentando agregar amigo " + webID);
    let response = await this.service.addAmigo(webID);
    if (response) {
      // Se ha agregado correctamente
      this.setState({
        showDialog: true,
        showError: false,
        dialogMessage: "El usuario ha sido agregado a tu lista de amigos.",
        amigos: await this.service.getAmigos()
      });
    } else {
      this.setState({
        showError: true
      });
    }
    this.setState({
      noFriends: this.state.amigos.length === 0,
      loading: false
    });
  };

  // Handlers de errores
  showError = () => {
    return (
      this.state.showError && (
        <Alert variant="danger" data-testid="alertNoExisteUsuario">
          No existe el usuario o ya está presente en tu lista de amigos.
        </Alert>
      )
    );
  };
}

export default Friends;
