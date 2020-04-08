import React, { Component } from "react";
import HashViewLoader from "../util/Loaders/HashViewLoader";
import SharedWithMe from "./SharedWithMe";
import RutaService from "../../services/rutas/RutaService";

/**
 * Clase ShareView que representa la vista de Rutas Compartidas Conmigo.
 * COMPONENTE PADRE - Hijos: SharedWithMe
 */
class ShareView extends Component {
  constructor(props) {
    super(props);
    this.rutaService = new RutaService();
  }

  state = { loading: true };
  render() {
    return (
      <HashViewLoader
        text="Recuperando rutas de tus colegas..."
        children={
          <SharedWithMe
            handleLoaded={this.handleLoaded}
            getRutasCompartidasConmigo={
              this.rutaService.getRutasCompartidasConmigo
            }
            subirFicheroARuta={this.rutaService.subirFicheroARuta}
            obtenerFicherosRuta={this.rutaService.obtenerFicherosRuta}
            comentarRuta={this.rutaService.comentarRuta}
            obtenerComentariosRuta={this.rutaService.obtenerComentariosRuta}
            showMap={true}
          />
        }
        loading={this.state.loading}
      />
    );
  }

  handleLoaded = () => {
    this.setState({ loading: false });
  };
}

export default ShareView;
