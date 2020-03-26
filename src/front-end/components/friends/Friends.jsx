import React, { Component } from "react";
import AmigoService from "../../services/amigos/AmigoService";
import AddFriend from "./AddFriend";

class Friends extends Component {
  constructor() {
    super();
    this.service = new AmigoService();
  }

  state = { amigos: [] };

  /**
   * Se ejecutará cuando se monte el componente en el DOM.
   */
  componentDidMount() {
    this.setState({ amigos: this.service.getAmigos() });
  }

  render() {
    return (
      <div>
        <h2>Amigos</h2>
        <p>Desde aquí puedes realizar la gestión de tus amigos.</p>
        <AddFriend handleAddFriend={this.handleAddFriend} />
      </div>
    );
  }

  /**
   * Será invocado cuando se agregue un nuevo amigo en el pod
   * del usuario logueado.
   */
  handleAddFriend = webID => {
    // Agregamos el nuevo amigo
    alert(webID);
    this.service.addAmigo(webID);
    this.setState({ amigos: this.service.getAmigos() });
  };
}

export default Friends;
