import React, { Component } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";

import RutaService from "../../services/rutas/RutaService";
import MapRuta from "../map/MapRuta";
import CommentBox from "./CommentBox";

/**
 * Componente que representa la vista de 'Compartido
 * conmigo' que contiene las rutas compartidas por los
 * amigos del usuario.
 */
class SharedWithMe extends Component {
  constructor() {
    super();
    this.rutaService = new RutaService();
  }

  state = { rutasCompartidas: [] };

  async componentDidMount() {
    this.setState({
      rutasCompartidas: await this.rutaService.getRutasCompartidasConmigo()
    });
  }

  render() {
    return (
      <div>
        <h2 data-testid="title">Compartido conmigo</h2>
        <Accordion>
          {this.state.rutasCompartidas.map((sharedRoute, key) => {
            return (
              <Row data-testid="rowComp">
                <Col data-testid="colComp">
                  <Card data-testid="cardComp" key={key++}>
                    <Card.Header>
                      <h3>{sharedRoute.getRuta().getNombre()}</h3>
                      <p>Autor: {sharedRoute.getAmigo().getNombre()}</p>
                      <Accordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey={key}
                        data-testid="commentbt"
                      >
                        Comentarios
                      </Accordion.Toggle>
                    </Card.Header>
                    <CommentBox
                      author={sharedRoute.getAmigo()}
                      ruta={sharedRoute.getRuta()}
                      onlyRead={true}
                    ></CommentBox>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <MapRuta
                      data-testid="map"
                      ruta={sharedRoute.getRuta()}
                    ></MapRuta>
                  </Card>
                </Col>
              </Row>
            );
          })}
        </Accordion>
      </div>
    );
  }
}

export default SharedWithMe;
