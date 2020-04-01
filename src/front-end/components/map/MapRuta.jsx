import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import { Map, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";
import * as icons from "./MarkerIcons";

import "leaflet/dist/leaflet.css";

// Sin esto no se muestran los Markers
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

/**
 * Componente MapRuta que contiene toda la lógica necesaria
 * para cargar una ruta en un mapa, del módulo leaflet.
 */
class MapRuta extends Component {
  constructor(props) {
    super(props);
    this.ruta = this.props.ruta; // Ruta a representar en el mapa
    this.mapID = `mapa-${this.props.ruta.getNombre()}`; // ID del mapa
    this.hitos = this.getCoords(this.props.ruta); // obtenemos la lista de coordenadas de los hitos
    this.zoom = 10;
    this.inicio = this.props.ruta.getInicio(); // Coordenadas de inicio de la ruta
  }

  render() {
    console.log(this.inicio);
    return (
      <Map center={this.inicio} zoom={this.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.drawRoute()}
      </Map>
    );
  }

  /*
   * Método que dada una posición [lat, long] devuelve
   * un elemento Marker con un popup con el texto que le
   * pasamos como parámetro.
   */
  getMarker(position, popupText, key) {
    return (
      <Marker key={key} position={position}>
        <Popup>{popupText}</Popup>
      </Marker>
    );
  }

  /**
   * Devuelve un elemento Marker que señala
   * el inicio de la ruta, de color verde.
   */
  getStartMarker() {
    return (
      <Marker key={0} position={this.inicio} icon={icons.greenIcon}>
        <Popup>{`Inicio: ${this.ruta.getNombre()}`}</Popup>
      </Marker>
    );
  }

  /**
   * Se encarga de generar un array con los pares
   * de coordenadas del inicio de la ruta y de sus hitos.
   */
  getPolyLine() {
    var points = [];
    points.push(this.inicio, ...this.hitos.map(h => [h.lat, h.long]));
    console.log(points);
    return <Polyline color="red" positions={points} />;
  }

  /*
   * Se encarga de dibujar la ruta con sus marcadores
   * y una polylinea que los une.
   */
  drawRoute() {
    return (
      <div>
        {this.getStartMarker()}
        {this.hitos.map((c, i) => this.getMarker([c.lat, c.long], c.hito, i++))}
        {this.getPolyLine()}
      </div>
    );
  }

  /*
   * Dada una ruta, devuelve una lista con los puntos
   * de cada uno de los hitos de la ruta, incluyendo el inicio.
   */
  getCoords(ruta) {
    var hitos = ruta.getHitos();
    var coords = [];

    for (var i in ruta.getHitos()) {
      let name = hitos[i].getNombre();
      let lat = hitos[i].getLat();
      let long = hitos[i].getLong();
      coords.push({
        hito: name,
        lat: lat,
        long: long
      });
    }
    return coords;
  }
}

export default MapRuta;
