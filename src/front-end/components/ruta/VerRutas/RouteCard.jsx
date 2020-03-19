import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import MapRuta from "../../map/MapRuta";
import "../../../css/map-style.css";

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
          <h3>{this.props.ruta.getNombre()}</h3>
        </Card.Header>
        <Card.Body>
          <Card.Title>Descripción</Card.Title>
          <Card.Text>{this.props.ruta.getDescripcion()}</Card.Text>
          <Button className="mr-2" onClick={this.handleViewInMap}>
            Ver en el mapa
          </Button>
          <Button
            className="mr-2"
            onClick={() => this.props.handleDelete(this.props.ruta.getUUID())}
          >
            Eliminar
          </Button>
          <Button>Editar</Button>
        </Card.Body>
        {this.state.loaded && (
          <div id={`mapa-${this.props.ruta.getNombre()}`} className="ml-3 mb-3">
            <MapRuta ruta={this.props.ruta} />
          </div>
        )}
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
