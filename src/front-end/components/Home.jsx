import React, { Component } from "react";
import HomeLogin from "./authentication/login/HomeLogin";

class Home extends Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-2 mb-4">¡Bienvenido a Viade!</h1>
        <HomeLogin />
      </div>
    );
  }
}

export default Home;
