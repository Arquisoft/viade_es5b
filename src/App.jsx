import React, { Component } from "react";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import LogInComponent from "./front-end/components/authentication/login/Login";
import RegisterContainer from "./front-end/components/authentication/register/RegistroContainer";
import Home from "./front-end/components/Home";
import AddRuta from "./front-end/components/ruta/AddRuta";
import VerRutas from "./front-end/components/ruta/VerRutas/VerRutas";
import Footer from "./front-end/components/fragments/Footer";
import "leaflet/dist/leaflet.css";
import NotLoggedInLayout from "./front-end/layouts/NotLoggedInLayout/not-logged-in.layout";
import PrivateLayout from "./front-end/layouts/PrivateLayout/private.layout";
import PublicLayout from "./front-end/layouts/PublicLayout/public.layout";
//import BackMain from "./BackEnd/BackMain.js";


class App extends Component {
  render() {
    //BackMain.añadirRuta(new Ruta('ruta 2',{nombre: 'primer puntoj', latitud: 989.8, longitud: -288.6},'mi segunda ruta',[{nombre: 'primer hito', latitud: -36666, longitud: -3838},{nombre: 'segundo hito', latitud: -77777, longitud: 88888}]));
    //BackMain.añadirAmigo("https://pedro223.inrupt.net/profile/card#me");
    //BackMain.listarAmigos();
    return (
      <div data-testid="aplicacion">
        <Router>
          <div>
            <Switch>
              <PublicLayout exact path="/" component={Home} />
              <PrivateLayout
                exact
                path="/ver-rutas"
                component={VerRutas}
              ></PrivateLayout>
              <PrivateLayout exact path="/add-ruta" component={AddRuta} />
              <NotLoggedInLayout
                exact
                path="/login"
                component={LogInComponent}
              />
              <NotLoggedInLayout
                exact
                path="/signup"
                component={RegisterContainer}
              />
              <Redirect to="/holaa" />
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
