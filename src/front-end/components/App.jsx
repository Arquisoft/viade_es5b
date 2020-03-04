import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import VerRutas from "./ruta/VerRutas";
import Menu from "./fragments/Menu";
import AddRuta from "./ruta/AddRuta";
import Login from "./authentication/Login";

class App extends Component {
  render() {
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
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
