import React, { Component } from "react";
import HomeLogin from "./authentication/login/HomeLogin";
import "../css/spacing.css";

class Home extends Component {
  render() {
    return (
      <>
        <div className="jumbotron">
          <h1 data-testid="welcome" className="display-2 mb-4">
            ¡Bienvenido a Viade!
          </h1>
          <HomeLogin />
        </div>

        <div className="jumbotron">
          <h3 data-testid="header-title" className="display-4">
            ¿Qué es Viade-Rutas?
          </h3>
          <p data-testid="p1" className="parrafo">
            Viade-Rutas es un proyecto desarrollado por un grupo de alumnos de
            la Escuela de Ingeniería Informática del Software, en Oviedo, para
            la asignatura de Arquitectura del Software.
          </p>
          <p data-testid="p2" className="parrafo">
            Se trata de una aplicación descentralizada, es decir, los datos con
            los que trabaja no se almacenan en una base de datos central, sino
            que cada usuario dispone de su propio espacio de almacenamiento, que
            recibe el nombre de POD. Es aquí donde se almacenan los datos del
            usuario junto con sus rutas, fotos, comentarios y además dispone de
            la responsabilidad total sobre esos datos.
          </p>
        </div>
      </>
    );
  }
}

export default Home;
