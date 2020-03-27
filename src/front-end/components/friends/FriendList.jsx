import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class FriendList extends Component {
  render() {
    return (
      <div>
        <h3>Tus amigos</h3>
        <div className="centered-container">
          {this.props.noFriends && (
            <Alert variant="warning">
              Aún no tienes ningún amigo, agrega uno introduciendo su WebID
            </Alert>
          )}
          {!this.props.noFriends && (
            <table className="table table-striped">
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
          )}
        </div>
      </div>
    );
  }
}

export default FriendList;
