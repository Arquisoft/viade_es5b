import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import RouteCard from "./RouteCard";
/**
 * Representa una lista que encapsula componentes
 * Card que contienen la información de cada ruta.
 */
class RouteList extends Component {
  constructor(props) {
    super(props);
    this.rutas = this.props.rutas;
  }

  render() {
    return (
      <Accordion defaultActiveKey="0">
        {this.rutas.map((r, key) => (
          <RouteCard ruta={r} key={key++} eventKey={key} />
        ))}
      </Accordion>
    );
  }
}

export default RouteList;
