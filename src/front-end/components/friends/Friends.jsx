import React, { Component } from "react";
import AmigoService from "../../services/amigos/AmigoService";
import AddFriend from "./AddFriend";
import FriendList from "./FriendList";

class Friends extends Component {
  constructor() {
    super();
    this.service = new AmigoService();
  }

  state = { amigos: [] };

  /**
   * Se ejecutará cuando se monte el componente en el DOM.
   */
  async componentDidMount() {
    this.setState({ amigos: await this.service.getAmigos() });
  }

  render() {
    return (
      <div>
        <h2>Amigos</h2>
        <p>Desde aquí puedes realizar la gestión de tus amigos.</p>
        <AddFriend handleAddFriend={this.handleAddFriend} />
        <FriendList amigos={this.state.amigos} />
      </div>
    );
  }

  /**
   * Será invocado cuando se agregue un nuevo amigo en el pod
   * del usuario logueado.
   */
  handleAddFriend = async webID => {
    // Agregamos el nuevo amigo
    let response = await this.service.addAmigo(webID);
    if (response) {
      console.log("---------------- Agregado amigo");
      this.setState({ amigos: await this.service.getAmigos() });
    } else {
      console.log("---------- Error al agregar amigo");
    }
  };
}

export default Friends;
