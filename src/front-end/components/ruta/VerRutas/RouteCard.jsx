import React, { Component } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Spinner,
  Overlay,
  Tooltip,
} from "react-bootstrap";
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
    this.refMapa = React.createRef(); // Referencia al mapa donde se representa la ruta
    this.refTablaHitos = React.createRef(); // Referencia a la tabla de hitos.
  }

  state = {
    isDeleting: false, // Indica si la ruta está  siendo eliminada del POD.
    clickOnPointTooltip: true, // Indica true si hay que mostrar el tooltip de ayuda para clickar sobre los hitos.
  };

  componentDidMount() {
    this.props.flyTo(
      {
        lat: this.props.ruta.getInicio()[0],
        lng: this.props.ruta.getInicio()[1],
      },
      13,
      this.refMapa
    );
    /*
    this.refMapa.current.leafletElement.flyTo(
      {
        lat: this.props.ruta.getInicio()[0],
        lng: this.props.ruta.getInicio()[1],
      },
      13
    );
    */
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <h3 data-testid="r-title">{this.props.ruta.getNombre()}</h3>
          {this.props.permisosValidos && (
            <Button
              data-testid="rb-compartir"
              variant="success"
              className="mr-2"
              onClick={() => this.props.handleShare(this.props.ruta)}
            >
              Compartir
            </Button>
          )}
          {!this.props.permisosValidos && (
            <Button
              data-testid="rb-compartir"
              variant="warning"
              className="mr-2"
              disabled
            >
              Compartir
            </Button>
          )}

          <Button
            data-testid="rb-eliminar"
            variant="danger"
            onClick={() => this.delete()}
          >
            {this.handleIsDeleting()}
          </Button>
        </Card.Header>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col md={8}>
                <Row>
                  <Col md="auto">
                    <Card.Title>Descripción</Card.Title>
                    <Card.Text data-testid="r-description">
                      {this.props.ruta.getDescripcion()}
                    </Card.Text>
                    <Card.Title>Hitos</Card.Title>
                    {this.showClickOnPointTooltip()}
                    <Table striped bordered hover ref={this.refTablaHitos}>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Latitud</th>
                          <th>Longitud</th>
                        </tr>
                      </thead>
                      <tbody data-testid="r-hitos">
                        <tr
                          onClick={() =>
                            this.flyToPoint({
                              lat: this.props.ruta.getInicio()[0],
                              lng: this.props.ruta.getInicio()[1],
                            })
                          }
                        >
                          <td>
                            <b>Inicio</b>
                          </td>
                          <td>{this.props.ruta.getInicio()[0]}</td>
                          <td>{this.props.ruta.getInicio()[1]}</td>
                        </tr>
                        {this.props.ruta.getHitos().map((h, key) => (
                          <tr
                            key={key++}
                            onClick={() =>
                              this.flyToPoint({
                                lat: h.getLat(),
                                lng: h.getLong(),
                              })
                            }
                          >
                            <td>{h.getNombre()}</td>
                            <td>{h.getLat()}</td>
                            <td>{h.getLong()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <CommentBox
                      author={null}
                      ruta={this.props.ruta}
                      onlyRead={false}
                      comentarRuta={this.props.comentarRuta}
                      obtenerComentariosRuta={this.props.obtenerComentariosRuta}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <PhotoGallery
                      author={null}
                      ruta={this.props.ruta}
                      onlyRead={false}
                      subirFicheroARuta={this.props.subirFicheroARuta}
                      obtenerFicherosRuta={this.props.obtenerFicherosRuta}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col>
                    <div
                      id={`mapa-${this.props.ruta.getNombre()}`}
                      className="ml-3 mb-3"
                    >
                      {this.props.showMap && (
                        <MapRuta
                          className="map"
                          ruta={this.props.ruta}
                          data-testid="mapa"
                          refMapa={this.refMapa}
                        />
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }

  /**
   * Método que se encarga de renderizar un componente
   * u otro en función de si se está eliminando la ruta actual.
   */
  handleIsDeleting = () => {
    if (this.state.isDeleting) {
      return (
        <div>
          <Spinner
            className="mr-2"
            as="span"
            size="sm"
            animation="border"
            role="status"
          />
          Eliminando...
        </div>
      );
    }
    return "Eliminar";
  };

  /**
   * Manejador para el evento de eliminar una ruta del POD.
   */
  delete = async () => {
    this.setState({ isDeleting: true });
    await this.props.handleDelete(
      this.props.ruta.getUUID(),
      this.props.ruta.getNombre()
    );
    this.setState({ isDeleting: false });
  };

  /**
   * Método encargado de 'volar' hasta las coordenadas
   * que se le pasan como parámetro. Hace uso de referencias para
   * acceder al mapa.
   */
  flyToPoint = (latlng) => {
    this.setState({ clickOnPointTooltip: false }); // Se oculta el tooltip de ayuda
    this.props.flyTo(latlng, 14, this.refMapa);
    // let mapa = this.refMapa.current.leafletElement;
    //  mapa.flyTo(latlng, 14);
  };

  /**
   * Muestra en función del estado, un tooltip de ayuda para indicar
   * que se puede hacer click sobre los hitos de la tabla.
   */
  showClickOnPointTooltip = () => {
    return (
      <Overlay
        target={this.refTablaHitos}
        show={this.state.clickOnPointTooltip}
        placement="top"
      >
        {(props) => (
          <Tooltip {...props}>
            Puedes hacer click sobre un hito para centrarlo en el mapa.
          </Tooltip>
        )}
      </Overlay>
    );
  };
}

export default RouteCard;
