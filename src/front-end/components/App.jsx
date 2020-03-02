import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import VerRutas from "./ruta/VerRutas";
import Menu from "./fragments/Menu";
import AddRuta from "./ruta/AddRuta";

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
      </div>
    );
  }
}

export default App;
