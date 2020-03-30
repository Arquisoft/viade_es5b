import React, { Component } from "react";
import { Card, Form, InputGroup, Button, Spinner } from "react-bootstrap";
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
        <Card className="first">
          <Card.Header className="bold" data-testid="titleAgregarAmigo">Agregar nuevo amigo</Card.Header>
          <Card.Body>
            <Card.Text data-testid="nuevoAmigo">
              Para agregar un nuevo amigo, introduce su WebID. El WebID puede
              cambiar según el provedor del POD del usuario.
            </Card.Text>

            <InputGroup className="input">
              <InputGroup.Prepend>
                <InputGroup.Text data-testid="webID">WebID</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="https://alex123.solid.community"
                onChange={this.handleKeyPress}
                data-testid="formAddFriend"
              />
            </InputGroup>

            <Button
              data-testid="buttonAdd"
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
              {this.loading()}
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

  /**
   * Se encarga de rendedirzar el contenido del botón
   * según esté llevándose a cabo la operación de agregar un amigo o no.
   */
  loading() {
    if (this.props.isLoading) {
      return (
        <div>
          <Spinner
            data-testid="spinner"
            className="mr-2"
            as="span"
            size="sm"
            animation="border"
            role="status"
          />
          Cargando...
        </div>
      );
    }
    return "Agregar";
  }
}

export default AddFriend;
