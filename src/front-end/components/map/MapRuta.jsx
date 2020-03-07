import React, { Component } from "react";
import "../../css/map-style.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

// Sin esto no se muestran los Markers
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

class MapRuta extends Component {
  constructor(props) {
    super(props);
    this.ruta = this.props.ruta; // Ruta a representar en el mapa
    this.mapID = `mapa-${this.props.ruta.getNombre()}`; // ID del mapa
    this.coords = this.getCoords(this.props.ruta); // obtenemos la lista de coordenadas de los hitos
    this.zoom = 12;
    this.center = [this.coords[0].lat, this.coords[0].long];
  }

  render() {
    return (
      <Map center={this.center} zoom={this.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {this.setMarker(
          this.center,
          `Inicio de la ruta: ${this.ruta.getNombre()}`
        )}
      </Map>
    );
  }

  /*
   * Método que dada una posición [lat, long] devuelve
   * un elemento Marker con un popup con el texto que le
   * pasamos como parámetro.
   */
  setMarker(position, popupText) {
    return (
      <Marker position={position}>
        <Popup>{popupText}</Popup>
      </Marker>
    );
  }

  /*
   * Se encarga de dibujar la ruta con sus marcadores
   * y una polylinea que los une.
   */
  drawRoute() {
    return (
      <div>
        {this.setMarker(
          this.center,
          `Inicio de la ruta: ${this.ruta.getNombre()}`
        )}
      </div>
    );
  }

  /*
   * Dada una ruta, devuelve una lista con los puntos
   * de cada uno de los hitos de la ruta.
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
