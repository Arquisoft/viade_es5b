import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";

/**
 * Componente que representa la vista de 'Compartido
 * conmigo' que contiene las rutas compartidas por los
 * amigos del usuario.
 */
class SharedWithMe extends Component {
  state = {};
  render() {
    return (
      <div>
        <h2>Compartido conmigo</h2>
        <Accordion>
          <Card.Header>
            <Accordion.Toggle as={Button} eventKey="0">
              Comentarios
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body></Card.Body>
            </Accordion.Collapse>
          </Card.Header>
        </Accordion>
      </div>
    );
  }
}

export default SharedWithMe;
