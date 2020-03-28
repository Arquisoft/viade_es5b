import React, { Component } from "react";
import { Accordion, Alert } from "react-bootstrap";
import RouteCard from "./RouteCard";
import SharePanel from "../../share/SharePanel";

/**
 * Representa una lista que encapsula componentes
 * Card que contienen la información de cada ruta.
 */
class RouteList extends Component {
  constructor(props) {
    super(props);
    this.service = this.props.service;
    this.state = {
      rutas: [],
      noRoutes: false,
      showSharePanel: false,
      routeToShare: null
    };
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
              handleShare={this.handleShare}
              ruta={r}
              key={key++}
              eventKey={key}
            />
          ))}

        {this.toggleSharePanel()}
      </Accordion>
    );
  }

  handleDeleteRoute = uuid => {
    this.service.deleteRuta(uuid);
  };

  /**
   * Manejador de eventos para compartir una ruta.
   */
  handleShare = ruta => {
    this.setState({ routeToShare: ruta, showSharePanel: true });
  };

  /**
   * Manejador de evento de click cuando se cancela
   * compartir la ruta.
   */
  cancelShare = () => {
    this.setState({ routeToShare: null, showSharePanel: false });
  };

  share = amigos => {};

  toggleSharePanel = () => {
    return (
      this.state.showSharePanel && (
        <SharePanel
          ruta={this.state.routeToShare}
          show={this.state.showSharePanel}
          cancel={this.cancelShare}
        ></SharePanel>
      )
    );
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
