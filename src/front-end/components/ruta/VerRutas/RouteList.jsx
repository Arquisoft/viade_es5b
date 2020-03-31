import React, { Component } from "react";
import { Accordion, Alert } from "react-bootstrap";
import RouteCard from "./RouteCard";
import SharePanel from "../../share/SharePanel";
import RutaService from "../../../services/rutas/RutaService";

/**
 * Representa una lista que encapsula componentes
 * Card que contienen la información de cada ruta.
 */
class RouteList extends Component {
  constructor(props) {
    super(props);
    this.rutaService = new RutaService();
    this.state = {
      rutas: [],
      showSharePanel: false,
      routeToShare: null,
      emptyList: false
    };
  }

  async componentDidMount() {
    let rutas = await this.rutaService.getRutas();
    this.setState({ rutas: rutas, emptyList: rutas.length === 0 });
    this.props.handleLoaded(); // Indicamos al padre que ya se ha cargado la vista.
  }

  render() {
    return (
      <Accordion data-testid="acordeon" defaultActiveKey="0">
        {this.state.emptyList && (
          <Alert data-testid="alerta" variant="warning">
            Actualmente no dispones de ninguna ruta en tu POD. Accede a
            <a href="#/add-ruta"> Añadir Ruta </a> para añadir una nueva ruta.
          </Alert>
        )}
        {this.state.rutas.length > 0 &&
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

  handleDeleteRoute = async uuid => {
    this.setState({ rutas: await this.service.deleteRuta(uuid) });
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
