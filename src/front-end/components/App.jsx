import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import LogInComponent from "./authentication/Login";
import RegisterContainer from "./authentication/RegistroContainer";
import Home from "./Home";
import AddRuta from "./ruta/AddRuta";
import VerRutas from "./ruta/VerRutas/VerRutas";
import Footer from "./fragments/Footer";
import "leaflet/dist/leaflet.css";
import * as i from "./InstanciaRutas";
import NotLoggedInLayout from "../layouts/NotLoggedInLayout/not-logged-in.layout";
import PrivateLayout from "../layouts/PrivateLayout/private.layout";
import PublicLayout from "../layouts/PublicLayout/public.layout";


class App extends Component{
  render(){
    //BackMain.añadirRuta(new Ruta('ruta 2',{nombre: 'primer puntoj', latitud: 989.8, longitud: -288.6},'mi segunda ruta',[{nombre: 'primer hito', latitud: -36666, longitud: -3838},{nombre: 'segundo hito', latitud: -77777, longitud: 88888}]));
    //BackMain.listarRutas();
    return (
      <div> 
        <Router>
          <div>
            <Switch>
              <PublicLayout exact path="/viade_es5b/" component={Home} />
              <PrivateLayout path="/viade_es5b/ver-rutas">
                <VerRutas service={i.service}/>
              </PrivateLayout>
              <PrivateLayout path="/viade_es5b/add-ruta" component={AddRuta} />
              <NotLoggedInLayout path="/viade_es5b/login" component={LogInComponent}/>
              <NotLoggedInLayout path="/viade_es5b/signup" component={RegisterContainer}/>
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }

}

export default App;