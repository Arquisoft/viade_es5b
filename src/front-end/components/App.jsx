import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./authentication/Login";
import RegisterContainer from "./authentication/RegistroContainer";
import Menu from "./fragments/Menu";
import Home from "./Home";
import AddRuta from "./ruta/AddRuta";
import VerRutas from "./ruta/VerRutas";
import BtLogout from "./authentication/Logout";

import auth from "solid-auth-client";
import Footer from "./fragments/Footer";
import "leaflet/dist/leaflet.css";

class App extends Component {
  state = {
    loggedIn: true
  };

  render() {
    return (
      <div>
        <Menu state={this.state} handleLogOut={this.handleLogOut}/>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/ver-rutas" component={VerRutas} />
              <Route path="/add-ruta" component={AddRuta} />
              <Route path="/login" component={Login} handleLogIn={this.handleLogIn}/>
              <Route path="/signup" component={RegisterContainer}/>
              <Route path="/login" component={BtLogout} handleLogOut={this.handleLogOut}/>
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }


 handleLogIn = () => {
    this.setState({loggedIn: true});
 }

 handleLogOut = () => {
  auth.logout();
  this.setState({loggedIn:false});
 }

}

export default App;
