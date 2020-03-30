import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import imageFile from '../../static/defaultProfile.png';


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
          <tr class="d-flex">
            <th class="col-1" scope="col"></th>
            <th class="col-5" scope="col">Nombre</th>
            <th class="col-6" scope="col">WebID</th>
          </tr>
        </thead>
        <tbody>
          {this.props.amigos.map((amigo, key) => (
            <tr class="d-flex" key={key++}>
              <th class="col-1" scope="row">
                <img src={amigo.getFoto()!==null?amigo.getFoto():imageFile} 
                  className="rounded-circle img-fluid"/></th>
              <td class="col-5">{amigo.getNombre()}</td>
              <td class="col-6">{amigo.getWebId()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default FriendList;
