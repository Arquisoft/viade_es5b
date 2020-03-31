import React, { Component } from "react";
import RouteList from "./RouteList";
import LoadingOverlay from "react-loading-overlay";
import "../../../css/loading.css";
import PacmanLoader from "react-spinners/PacmanLoader";

class VerRutas extends Component {
  state = {
    loading: true
  };

  render() {
    return (
      <div>
        <header>
          <h1>Mis rutas</h1>
          <p>
            En este apartado puedes echar un vistazo a tus rutas, visualizarlas
            en un mapa, ver sus detalles o bien eliminarlas.
          </p>
        </header>

        <LoadingOverlay
          active={this.state.loading}
          spinner={
            <PacmanLoader
              size={25}
              color={"#50E3C2"}
              css={{ display: "block", margin: "0 20vh 5vh" }}
            />
          }
          text="Espera un momento, estamos recuperando tus rutas..."
          styles={{
            wrapper: {
              width: "100%",
              height: "100vh",
              overflow: this.state.loading ? "hidden" : "scroll"
            }
          }}
        >
          <RouteList handleLoaded={this.handleLoaded} />
        </LoadingOverlay>
      </div>
    );
  }

  /**
   * Invocado desde la lista de rutas para indicar que ya se han
   * cargado las rutas del usuario.
   */
  handleLoaded = () => {
    this.setState({ loading: false });
  };
}

export default VerRutas;
