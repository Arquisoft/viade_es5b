"use strict";

import Hito from "./Hito";

class Ruta {
  constructor(nombre, latitud, longitud) {
    this.nombre = nombre; // Nombre de la ruta
    this.inicio = [latitud, longitud]; // Lugar de inicio
    this.hitos = []; // Hitos de la ruta
  }

 
  /*
   * Devuelve el nombre de la ruta
   */
  getNombre() {
    return this.nombre;
  }

  /*
   * Devuelve el lugar de inicio
   */
  getInicio() {
    return this.inicio;
  }

  /*
   * Devuelve la lista de hitos de la ruta.
   */
  getHitos() {
    return this.hitos;
  }

  /*
   * Añade un hito a la ruta.
   */
  addHito(hito) {
    this.hitos.push(hito);
  }

  setHitos(hitos){
    
    this.hitos=hitos.map(hito=>{new Hito(hito.nombre, hito.latitud, hito.longitud)});
  }

  toString(){
    console.log("Ruta: ");
    console.log("-Nombre: "+this.nombre);
    console.log("-Inicio: "+this.nombre);
    console.log("-Hitos de la ruta: ");
    //for (var h of this.getHitos() ){
     // h.toString();
    //}
  }
}
export default Ruta;