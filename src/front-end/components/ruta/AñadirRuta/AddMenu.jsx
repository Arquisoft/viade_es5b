import React, { Component } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import "../../../css/card-menu.css";

/**
 * Componente que representa un menú para añadir rutas
 * de diferentes maneras.
 */
class AddMenu extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Añadir una nueva ruta</h1>
        <p>Selecciona el modo en el que deseas añadir una nueva ruta.</p>
        <Container>
          <Row>
            <Col>
              <Card className="card-item">
                <Card.Body>
                  <Card.Title>Forma 1</Card.Title>
                  <Card.Text>Esto es una prueba</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="card-item">
                <Card.Body>
                  <Card.Title>Forma 2</Card.Title>
                  <Card.Text>Esto es una prueba</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="card-item">
                <Card.Body>
                  <Card.Title>Forma 2</Card.Title>
                  <Card.Text>Esto es una prueba</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AddMenu;
