import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import VerRutas from "./ruta/VerRutas";
import Menu from "./fragments/Menu";
import AddRuta from "./ruta/AddRuta";
import HomeLogin from "./authentication/HomeLogin";

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
            </Switch>
          </div>
        </Router>
        <HomeLogin />
      </div>
    );
  }
}

export default App;
