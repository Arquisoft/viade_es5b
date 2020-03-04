import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {PrivateRoute} from "@inrupt/solid-react-components";
import Login from "./authentication/Login";
import RegisterContainer from "./authentication/RegistroContainer";
import Menu from "./fragments/Menu";
import Home from "./Home";
import AddRuta from "./ruta/AddRuta";
import VerRutas from "./ruta/VerRutas";

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/ver-rutas" component={VerRutas} redirect = "/login" />
              <PrivateRoute path="/add-ruta" component={AddRuta} redirect="/login" />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={RegisterContainer} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
