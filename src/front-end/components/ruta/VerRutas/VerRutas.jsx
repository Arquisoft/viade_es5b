import React, { Component } from "react";
import RouteList from "./RouteList";
import PacmanViewLoader from "../../util/Loaders/PacmanViewLoader";
import RutaService from "../../../services/rutas/RutaService";
import AmigoService from "../../../services/amigos/AmigoService";
import { Jumbotron } from "react-bootstrap";

/**
 * Clase VerRutas que representa la vista general para ver
 * el listado de las rutas del POD del usuario loggeado.
 * COMPONENTE PADRE - Hijos: RouteList.
 */
class VerRutas extends Component {
  constructor() {
    super();
    this.rutaService = new RutaService();
    this.amigoService = new AmigoService();
  }

  state = {
    loading: true,
  };

  render() {
    return (
      <div>
        <header>
          <Jumbotron>
            <h1 className="display-4">Mis rutas</h1>
            <p>
              Aquí se muestra un listado con todas las rutas almacenadas en tu
              POD. Puedes ver los datos básicos de cada una, agregarles
              comentarios y fotos, eliminarlas de tu POD o bien compartirlas con
              varios amigos. Además puedes utilizar la <b>tabla de hitos</b>{" "}
              para hacer click sobre un hito y visualizarlo en el mapa.
            </p>
          </Jumbotron>
        </header>
        <PacmanViewLoader // Overlay de carga para mostrar la vista de las rutas.
          text={"Espera un momento, estamos recuperando tus rutas..."}
          children={
            <RouteList
              handleLoaded={this.handleLoaded}
              permisosValidos={this.rutaService.permisosAppValidos}
              getRutas={this.rutaService.getRutas}
              deleteRuta={this.rutaService.deleteRuta}
              shareRuta={this.rutaService.shareRuta}
              obtenerFicherosRuta={this.rutaService.obtenerFicherosRuta}
              subirFicheroARuta={this.rutaService.subirFicheroARuta}
              getAmigos={this.amigoService.getAmigos}
              comentarRuta={this.rutaService.comentarRuta}
              obtenerComentariosRuta={this.rutaService.obtenerComentariosRuta}
              showMap={true}
              flyTo={this.flyTo}
            />
          }
          loading={this.state.loading}
        />
      </div>
    );
  }

  /**
   * Método invocado desde los RouteCard para llevar a cabo la
   * animación para centrar un punto en el mapa.
   */
  flyTo = (latlng, zoom, ref) => {
    let mapa = ref.current.leafletElement;
    mapa.flyTo(latlng, zoom);
  };

  /**
   * Invocado desde la lista de rutas para indicar que ya se han
   * cargado las rutas del usuario.
   */
  handleLoaded = () => {
    this.setState({ loading: false });
  };
}

export default VerRutas;
