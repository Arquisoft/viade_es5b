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
    this.state = {
      rutas: [],
      showSharePanel: false,
      routeToShare: null,
      emptyList: false
    };
  }

  async componentDidMount() {
    let rutas = await this.props.getRutas();
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
              subirFicheroAMiRuta={this.props.subirFicheroAMiRuta}
              obtenerFicherosRuta={this.props.obtenerFicherosRuta}
            />
          ))}

        {this.toggleSharePanel()}
      </Accordion>
    );
  }

  /**
   * Manejador para el borrado de una ruta.
   */
  handleDeleteRoute = async uuid => {
    let rutas = await this.props.deleteRuta(uuid);
    this.setState({
      rutas: rutas,
      emptyList: rutas.length === 0
    });
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

  /**
   * Muestra el panel Modal para compartir rutas, solo cuando
   * se pulsa sobre el botón de Compartir.
   */
  toggleSharePanel = () => {
    return (
      this.state.showSharePanel && (
        <SharePanel
          ruta={this.state.routeToShare}
          show={this.state.showSharePanel}
          cancel={this.cancelShare}
          getAmigos={this.props.getAmigos}
          shareRuta={this.props.shareRuta}
        ></SharePanel>
      )
    );
  };
}

export default RouteList;
