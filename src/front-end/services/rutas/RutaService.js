"use strict";
import Ruta from "../../model/Ruta"
import Hito from "../../model/Hito"
/*
 * Clase que representa el servicio de Rutas (Fachada)
 */
class RutaService {
  constructor() {
    // Simula la base de datos
    this.BDRutas = [];
    this.inicializarBD();
  }

  /*
   * Método de prueba que inicializa la lista
   * que simula la base de datos.
   */
  inicializarBD() {
    var r1 = new Ruta("Ruta-1", 10, 10);
    var r2 = new Ruta("Ruta-2", 10, 20);

   

    r1.addHito(new Hito("Hito-r1-1", 10, 50));
    r1.addHito(new Hito("Hito-r1-2", 50, 10));

    r2.addHito(new Hito("Hito-r2-1", 10.4, 0));
    r2.addHito(new Hito("Hito-r2-2", 520, -10));

    this.BDRutas=[...this.BDRutas,r1];
    this.BDRutas=[...this.BDRutas,r2];
  }

  /*
   * Devuelve TODAS las rutas almacenadas en
   * el sistema.
   */
  getRutas() {
    return this.BDRutas;
  }

  /*
   * Añade una nueva ruta al sistema.
   */
  addRuta(nombre, latitud, longitud, hitos) {
   var ruta=new Ruta(nombre, latitud, longitud, hitos);
   this.BDRutas.push(ruta);
   console.log(this.BDRutas.length);
   console.log("Número de rutas almacenadas: "+this.getRutas().length);
   for (var r of this.BDRutas){
    console.log(r);
   }

   
  }
}


export default RutaService;
