import React, { Component } from "react";
import HashViewLoader from "../util/Loaders/HashViewLoader";
import SharedWithMe from "./SharedWithMe";
import RutaService from "../../services/rutas/RutaService";

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
            subirFicheroAMiRuta={this.rutaService.subirFicheroAMiRuta}
            obtenerFicherosRuta={this.rutaService.obtenerFicherosRuta}
            comentarMiRuta={this.rutaService.comentarMiRuta}
            obtenerComentariosRuta={this.rutaService.obtenerComentariosRuta}
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
