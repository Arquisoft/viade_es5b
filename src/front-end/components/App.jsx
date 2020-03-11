import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./authentication/Login";
import RegisterContainer from "./authentication/RegistroContainer";
import Menu from "./fragments/Menu";
import Home from "./Home";
import AddRuta from "./ruta/AddRuta";
import VerRutas from "./ruta/VerRutas";
import BtLogout from "./authentication/Logout";
import BackMain from "../../BackEnd/BackMain.js";
import Ruta from "../model/Ruta.js";
import Hito from "../model/Hito.js";



class App extends Component {
  render() {
    //BackMain.añadirRuta(new Ruta('ruta 2',{nombre: 'primer puntoj', latitud: 989.8, longitud: -288.6},'mi segunda ruta',[{nombre: 'primer hito', latitud: -36666, longitud: -3838},{nombre: 'segundo hito', latitud: -77777, longitud: 88888}]));
    //BackMain.listarRutas();
    return (
      <div>
        <Menu />
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/ver-rutas" component={VerRutas} />
              <Route path="/add-ruta" component={AddRuta} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={RegisterContainer} />
            </Switch>
          </div>
        </Router>
        <BtLogout/>
      </div>
    );
  }
}

export default App;
