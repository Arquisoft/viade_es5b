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


class App extends Component {
  render() {
    //BackMain.añadirRuta(new Ruta('ruta 3','mi tercera ruta'));
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
