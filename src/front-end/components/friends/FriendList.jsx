import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class FriendList extends Component {
  render() {
    return (
      <div>
        <h3>Tus amigos</h3>
        <div className="centered-container">{this.showComponent()}</div>
      </div>
    );
  }


  /**
   * Devuelve un componente u otro en función del estado.
   */
  showComponent() {
    if (this.props.noFriends) {
      // Aún no tiene amigos
      return (
        <Alert variant="warning" data-testid="alertaNoAmigos">
          Aún no tienes ningún amigo, agrega uno introduciendo su WebID
        </Alert>
      );

    }
    return (
      <table className="table table-striped" data-testid="tablaAmigos">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">WebID</th>
          </tr>
        </thead>
        <tbody>
          {this.props.amigos.map((amigo, key) => (
            <tr key={key++}>
              <th scope="row">{key}</th>
              <td>{amigo.getNombre()}</td>
              <td>{amigo.getWebId()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default FriendList;
