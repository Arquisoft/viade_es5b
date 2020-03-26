import React, { Component } from "react";
import { Card, Form, InputGroup, Button } from "react-bootstrap";
import "../../css/position.css";

class AddFriend extends Component {
  state = {
    disabled: true
  };

  render() {
    return (
      <div className="centered-container">
        <Card style={{ width: "30rem" }} className="text-center">
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title>Agregar nuevo amigo</Card.Title>
            <Card.Text>
              Para agregar un nuevo amigo, introduce su WebID.
            </Card.Text>
            <Form>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>WebID</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="url"
                    placeholder="https://alex123.inrupt.net"
                    onChange={this.handleKeyPress}
                  />
                </InputGroup>
                <Form.Text>
                  La URL cambiará según el provedor del usuario
                </Form.Text>
              </Form.Group>
              <Button
                disabled={this.state.disabled}
                onClick={() => this.props.handleAddFriend(this.state.valor)}
                type="submit"
                variant="success"
              >
                Agregar
              </Button>
            </Form>
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
  };
}

export default AddFriend;
