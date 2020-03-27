import React, { Component } from "react";
import { Card, Form, InputGroup, Button, Alert } from "react-bootstrap";
import "../../css/position.css";
import "../../css/font-style.css";

class AddFriend extends Component {
  state = {
    value: "",
    disabled: true
  };

  render() {
    return (
      <div>
        <Card>
          <Card.Header className="bold">Agregar nuevo amigo</Card.Header>
          <Card.Body>
            <Card.Text>
              Para agregar un nuevo amigo, introduce su WebID. El WebID puede
              cambiar según el provedor del POD del usuario.
            </Card.Text>

            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>WebID</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="https://alex123.solid.community"
                onChange={this.handleKeyPress}
              />
            </InputGroup>

            <Button
              className="mt-2"
              disabled={this.state.disabled}
              onClick={() =>
                this.props.handleAddFriend(
                  this.state.value + "/profile/card#me"
                )
              }
              type="submit"
              variant="success"
            >
              Agregar
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  /**
   * Manejador del evento de tecla presionada en el input
   * del WebID, que deshabilita el botón si no hay texto introducido.
   */
  handleKeyPress = event => {
    let string = event.target.value;
    if (string.length > 0) this.setState({ disabled: false });
    else this.setState({ disabled: true });
    // Guardamos el valor en el estado
    this.setState({ value: string });
  };
}

export default AddFriend;
