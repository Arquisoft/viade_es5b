import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import { Map, Marker, TileLayer, Popup, Polyline } from "react-leaflet";
import { Alert, ButtonGroup, Button, ButtonToolbar } from "react-bootstrap";
import L from "leaflet";
import * as icons from "./MarkerIcons";

// Sin esto no se muestran los Markers
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

/**
 * Componente que modela un mapa sobre el que se puede hacer click
 * para dibujar una ruta en el mapa, para luego añadirla como una
 * ruta nueva.
 */
class AddRouteMap extends Component {
  state = {
    zoom: 13,
    center: [],
    points: [], // array de objetos LatLng que conforman la ruta.
    error: false
  };

  componentDidMount() {
    this.getUserPosition();
  }

  render() {
    return (
      <div>
        {this.state.center != null && this.state.center.length > 0 && (
          <div>
            <ButtonToolbar
              className="ml-2 mb-2 justify-content-center"
              aria-label="Controles del mapa"
            >
              <ButtonGroup className="mr-2">
                <Button onClick={this.deleteLastPoint} variant="info">
                  Borrar último punto
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button onClick={this.deleteAllPoints} variant="info">
                  Borrar todos los puntos
                </Button>
              </ButtonGroup>
            </ButtonToolbar>

            <Map
              onclick={this.handleClickOnMap}
              center={this.state.center}
              zoom={this.state.zoom}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {this.state.points.map((latlng, key) => {
                return (
                  <Marker
                    position={latlng}
                    key={key++}
                    icon={key === 1 ? icons.greenIcon : icons.defaultIcon}
                  >
                    <Popup>Punto {key}</Popup>
                  </Marker>
                );
              })}
              {this.getPolyline("red")}
            </Map>
          </div>
        )}

        {this.state.error ? (
          <Alert variant="warning">Ha habido un error al cargar el mapa.</Alert>
        ) : null}
      </div>
    );
  }

  /**
   * Obtiene, si es posible, las coordenadas del usuario y establece el centro
   * del mapa en esas coordenadas, o establece una variable de error en caso de que
   * no sea posible obtener las coordenadas.
   */
  getUserPosition = () => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        let center = [];
        center.push(position.coords.latitude);
        center.push(position.coords.longitude);
        this.setState({ center: center });
      },
      err => {
        this.setState({ error: true });
      }
    );
  };

  /**
   * Manejador para el evento de click sobre el mapa, que añade
   * un nuevo objeto Marker a la lista de puntos del estado.
   */
  handleClickOnMap = e => {
    let points = this.state.points;
    points.push(e.latlng);
    this.setState({ points: points });
    console.log(this.state.points);
  };

  /**
   * Se encarga de borrar el útimo punto de la ruta sobre
   * el que se hizo click.
   */
  deleteLastPoint = () => {
    let points = this.state.points;
    let lastIndex = points.length - 1;
    points.splice(lastIndex, 1);
    this.setState({ points: points });
  };

  /**
   * Elimina todos los puntos actuales sobre los que se ha hecho click.
   */
  deleteAllPoints = () => {
    this.setState({ points: [] });
  };

  /**
   * Dada la lista de puntos, construye una linea
   * que une dichos puntos, mediante el elemento <Polyline>
   */
  getPolyline = color => {
    return (
      <Polyline
        color={color}
        positions={this.state.points.map(p => {
          return [p.lat, p.lng];
        })}
      />
    );
  };
}

export default AddRouteMap;
