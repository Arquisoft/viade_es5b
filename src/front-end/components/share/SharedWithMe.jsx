import React, { Component } from "react";
import { Alert, Container, Card, Col, Row } from "react-bootstrap";

import RutaService from "../../services/rutas/RutaService";
import MapRuta from "../map/MapRuta";
import CommentBox from "./CommentBox";
import PhotoGallery from "./PhotoGallery";

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

  state = { rutasCompartidas: [], emptyList: false };

  async componentDidMount() {
    let sharedRoutes = await this.rutaService.getRutasCompartidasConmigo();
    this.setState({
      rutasCompartidas: sharedRoutes,
      emptyList: sharedRoutes.length === 0
    });
    this.props.handleLoaded(); // Indicar al padre que ya se han cargado las rutas.
  }

  render() {
    return (
      <div>
        <h2 data-testid="title">Compartido conmigo</h2>
        {this.state.emptyList && (
          <Alert variant="warning">
            Aún no te han compartido ninguna ruta.
          </Alert>
        )}
        {this.state.rutasCompartidas.map((sharedRoute, key) => {
          return (
            <Card>
              <Card.Header>
                <h4>{sharedRoute.getRuta().getNombre()}</h4>
                <p>
                  Autor: <b>{sharedRoute.getAmigo().getNombre()}</b>
                </p>
              </Card.Header>
              <Card.Body>
                <Container fluid>
                  <Row>
                    <Col>
                      <Row className="mb-2">
                        <Col>
                          <Card.Title>Descripción</Card.Title>
                          <Card.Text>
                            {sharedRoute.getRuta().getDescripcion()}
                          </Card.Text>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <CommentBox
                            author={sharedRoute.getAmigo()}
                            ruta={sharedRoute.getRuta()}
                            onlyRead={true}
                          ></CommentBox>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <PhotoGallery
                            author={sharedRoute.getAmigo()}
                            ruta={sharedRoute.getRuta()}
                            onlyRead={true}
                          ></PhotoGallery>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <MapRuta
                        data-testid="map"
                        ruta={sharedRoute.getRuta()}
                      ></MapRuta>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default SharedWithMe;
