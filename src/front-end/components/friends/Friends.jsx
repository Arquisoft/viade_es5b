import React, { Component } from "react";
import AmigoService from "../../services/amigos/AmigoService";
import AddFriend from "./AddFriend";
import FriendList from "./FriendList";
import MessageDialog from "../util/MessageDialog";

class Friends extends Component {
  constructor() {
    super();
    this.service = new AmigoService();
  }

  state = {
    amigos: [],
    noFriends: false,
    showDialog: false,
    dialogMessage: ""
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
      <div>
        <h2>Amigos</h2>
        <p>Desde aquí puedes realizar la gestión de tus amigos.</p>
        <AddFriend handleAddFriend={webID => this.handleAddFriend(webID)} />
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
    console.log("---- Intentando agregar amigo " + webID);
    let response = await this.service.addAmigo(webID);
    if (response) {
      // Se ha agregado correctamente
      this.setState({
        showDialog: true,
        dialogMessage: "El usuario ha sido agregado a tu lista de amigos.",
        amigos: await this.service.getAmigos()
      });
    } else {
      this.setState({
        showDialog: true,
        dialogMessage:
          "El usuario que has introducido no existe, o ya está en tu lista de amigos."
      });
    }
    this.setState({ noFriends: this.state.amigos.length === 0 });
  };
}

export default Friends;
