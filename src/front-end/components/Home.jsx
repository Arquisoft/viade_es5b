import React, { Component } from "react";
import AmigoService from "../services/amigos/AmigoService";
const auth = require("solid-auth-client");

/**
 * Componente que representa la página principal de la
 * aplicación.
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.amigosService = new AmigoService();
  }

  state = { loggedUser: null };

  componentDidMount() {
    this.getLoggedUser();
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-3 text-center">Bienvenido a Viade!</h1>

        {this.state.loggedUser != null ? (
          <p>Usuario autenticado como: {this.state.loggedUser.getNombre()}</p>
        ) : (
          <p>Usuario no loggeado</p>
        )}
      </div>
    );
  }

  async getLoggedUser() {
    let session = await auth.currentSession();
    if (session != null) {
      let webID = session.webId;
      this.setState({
        loggedUser: await this.amigosService.getPersonByWebID(webID)
      });
    } else {
      this.setState({ loggedUser: null });
    }
  }
}

export default Home;
