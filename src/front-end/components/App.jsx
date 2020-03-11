import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import LogInComponent from "./authentication/Login";
import RegisterContainer from "./authentication/RegistroContainer";
import Home from "./Home";
import AddRuta from "./ruta/AddRuta";
import VerRutas from "./ruta/VerRutas";
import BtLogout from "./authentication/Logout";
import BackMain from "../../BackEnd/BackMain.js";
import Ruta from "../model/Ruta.js";
import Hito from "../model/Hito.js";



class App extends Component {
  render() {
    //BackMain.añadirRuta(new Ruta('ruta 3',{nombre: 'primer punto', latitud: 98989.8, longitud: -2888.6},'mi tercera ruta',[{nombre: 'primer hito', latitud: -36666, longitud: -3838},{nombre: 'segundo hito', latitud: -77777, longitud: 88888}]));
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
