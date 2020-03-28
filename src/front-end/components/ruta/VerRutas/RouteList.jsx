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
    return (
      <Accordion data-testid="acordeon" defaultActiveKey="0">
        {this.state.noRoutes && (
          <Alert data-testid="alerta" variant="warning">
            Actualmente no dispones de ninguna ruta en tu POD. Accede a
            <a href="#/add-ruta"> Añadir Ruta </a> para añadir una nueva ruta.
          </Alert>
        )}
        {!this.state.noRoutes &&
          this.state.rutas.map((r, key) => (
            <RouteCard
              role="r-card"
              handleDelete={this.handleDeleteRoute}
              ruta={r}
              key={key++}
              eventKey={key}
            />
          ))}
      </Accordion>
    );
  }

  handleDeleteRoute = uuid => {
    this.service.deleteRuta(uuid);
    //this.service.shareRuta('https://pedro223.inrupt.net/profile/card#me',uuid);
  };

  /*
  handleDeleteRoute = uuid => {
    let promise = new Promise((resolve, reject) => {
      this.deleteRoute(uuid).then(() => {
        let rutas = this.service.getRutas();
        resolve(rutas);
      });
    });

    promise.then(rutas => this.setState({ rutas: rutas }));
  };

  deleteRoute = uuid => {
    let promise = new Promise((resolve, reject) => {
      this.service.deleteRuta(uuid);
      resolve();
    });
    return promise;
  };
  */
}

export default RouteList;
