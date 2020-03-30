import React, { Component } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import MapRuta from "../../map/MapRuta";
import "../../../css/map-style.css";
import CommentBox from "../../share/CommentBox";
import PhotoGallery from "../../share/PhotoGallery";

/**
 * Representa un elemento Card con la
 * información de la ruta que encapsula.
 */
class RouteCard extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this.eventKey = this.props.eventKey;
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <h3 data-testid="r-title">{this.props.ruta.getNombre()}</h3>
          <Button
            
            variant="success"
            className="mr-2"
            onClick={this.handleViewInMap}
            data-testid="rb-ver"
          >
            Ver en el mapa
          </Button>
          <Button
            data-testid="rb-eliminar"
            variant="danger"
            className="mr-2"
            onClick={() => this.props.handleDelete(this.props.ruta.getUUID())}
          >
            Eliminar
          </Button>
          <Button
            data-testid="rb-compartir"
            variant="info"
            onClick={() => this.props.handleShare(this.props.ruta)}
          >
            Compartir
          </Button>
        </Card.Header>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col md="auto">
                <Card.Title>Descripción</Card.Title>
                <Card.Text data-testid="r-description">
                  {this.props.ruta.getDescripcion()}
                </Card.Text>
                <Card.Title>Hitos</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Latitud</th>
                      <th>Longitud</th>
                    </tr>
                  </thead>
                  <tbody data-testid="r-hitos">
                    <tr>
                      <td>
                        <b>Inicio</b>
                      </td>
                      <td>{this.props.ruta.getInicio()[0]}</td>
                      <td>{this.props.ruta.getInicio()[1]}</td>
                    </tr>
                    {this.props.ruta.getHitos().map((h, key) => (
                      <tr key={key++}>
                        <td>{h.getNombre()}</td>
                        <td>{h.getLat()}</td>
                        <td>{h.getLong()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col>
                {this.state.loaded && (
                  <div
                    
                    id={`mapa-${this.props.ruta.getNombre()}`}
                    className="ml-3 mb-3"
                  >
                    <MapRuta className="map" ruta={this.props.ruta} data-testid="mapa"/>
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <CommentBox
                  author={null}
                  ruta={this.props.ruta}
                  onlyRead={false}
                ></CommentBox>
              </Col>
              <Col>
                <PhotoGallery></PhotoGallery>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }

  /**
   * Se ejecuta cada vez que se actualiza el componente
   * para mover el scroll al mapa recién mostrado.
   */
  componentDidUpdate() {
    if (this.state.loaded) {
      document
        .getElementById(`mapa-${this.props.ruta.getNombre()}`)
        .scrollIntoView(false);
    }
  }

  /**
   * Función flecha invocada cuando se hace click
   * sobre el link para ver la ruta en el mapa.
   */
  handleViewInMap = () => {
    this.setState({ loaded: !this.state.loaded });
  };
}

export default RouteCard;
