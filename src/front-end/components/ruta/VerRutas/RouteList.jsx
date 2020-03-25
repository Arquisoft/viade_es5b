import React, { Component } from "react";
import { Accordion, Alert } from "react-bootstrap";
import RouteCard from "./RouteCard";

/**
 * Representa una lista que encapsula componentes
 * Card que contienen la información de cada ruta.
 */
class RouteList extends Component {
  constructor(props) {
    super(props);
    this.service = this.props.service;
    this.state = { rutas: [], noRoutes: false };
  }

  async componentDidMount() {
    const response = await this.props.rutas;
    this.setState({ rutas: response });
    if (this.state.rutas.length === 0) this.setState({ noRoutes: true });
  }

  render() {
    console.log(this.state.rutas);
    return (
      <Accordion defaultActiveKey="0">
        {this.state.noRoutes && (
          <Alert variant="warning">
            Actualmente no dispones de ninguna ruta en tu POD. Accede a
            <a href="/viade_es5b/add-ruta"> Añadir Ruta </a> para añadir una
            nueva ruta.
          </Alert>
        )}
        {!this.state.noRoutes &&
          this.state.rutas.map((r, key) => (
            <RouteCard
              handleDelete={this.handleDeleteRoute}
              ruta={r}
              key={key++}
              eventKey={key}
            />
          ))}
      </Accordion>
    );
  }

  handleDeleteRoute = async uuid => {
    await this.service.deleteRuta(uuid);
    const rutas = await this.service.getRutas();
    this.setState({ rutas: rutas });
  };
}

export default RouteList;