import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import RouteCard from "./RouteCard";

/**
 * Representa una lista que encapsula componentes
 * Card que contienen la información de cada ruta.
 */
class RouteList extends Component {
  constructor(props) {
    super(props);
    this.service = this.props.service;
    this.state = { rutas: []}
  }
  async componentDidMount() {
    const response = await this.props.rutas;
    this.setState({ rutas: response });
  }
 
  render() {
    console.log(this.state.rutas);
    return (
      <Accordion defaultActiveKey="0">
       {this.state.rutas.map((r,key) => 
       <RouteCard handleDelete={this.handleDeleteRoute} ruta={r} key={key++} eventKey={key} />)}
      </Accordion>
    );
  }

  handleDeleteRoute = (uuid) => {
    this.service.deleteRuta(uuid);
    this.setState({rutas: this.service.getRutas()});
  }      
    


}

export default RouteList;
