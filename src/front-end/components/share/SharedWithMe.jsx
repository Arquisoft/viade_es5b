import React, { Component } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import Comment from "./Comment";

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
            <h3>Ruta de Avilés</h3>
            <p>Autor: Alex Florez</p>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Comentarios
            </Accordion.Toggle>
            <Button variant="success">Ver</Button>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Comment
                  comment="Esta muy chula esta ruta"
                  author="Alex Flórez"
                />
                <Comment
                  comment="He vuelto a hacer la ruta!"
                  author="Alex Flórez"
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card.Header>
        </Accordion>
      </div>
    );
  }
}

export default SharedWithMe;
