"use strict";
class Hito {
  constructor(nombre, longitud, latitud) {
    this.nombre = nombre; // Nombre del hito.
    // Coordenadas del hito
    this.longitud = longitud;
    this.latitud = latitud;
  }

  /*
   * Devuelve el nombre del hito.
   */
  getNombre() {
    return this.nombre;
  }

  /*
   * Devuelve la componente longitud de las coordenadas
   * del hito.
   */
  getLong() {
    return this.longitud;
  }

  /*
   * Devuelve la componente latitud de las coords.
   * del hito.
   */
  getLat() {
    return this.latitud;
  }
}
