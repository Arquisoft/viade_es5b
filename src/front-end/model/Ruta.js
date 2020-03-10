"use strict";

import Hito from "./Hito";

class Ruta {
  constructor(nombre, latitud, longitud, hitosAdd) {
    this.nombre = nombre; // Nombre de la ruta
    this.inicio = [latitud, longitud]; // Lugar de inicio
    this.hitos = []; // Hitos de la ruta
    this.setHitos(hitosAdd);
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

  setHitos(hitosAdd){
    for (var h in hitosAdd){
      this.hitos.push(new Hito(hitosAdd[h].nombre, hitosAdd[h].latitud, hitosAdd[h].longitud));
    }

    
  }

  toString(){
    for (var h of this.hitos){
      console.log(h);
    }
  }
}
export default Ruta;