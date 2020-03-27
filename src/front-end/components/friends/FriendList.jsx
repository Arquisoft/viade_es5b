import React, { Component } from "react";

class FriendList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Tus amigos:</h3>
        <div className="centered-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {this.props.amigos.map((amigo, key) => (
                <tr key={key++}>
                  <th scope="row">{key}</th>
                  <td>{amigo.getNombre()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FriendList;
