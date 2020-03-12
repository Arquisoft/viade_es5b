"use strict";
import Ruta from "../../model/Ruta"
import Hito from "../../model/Hito"
import BackMain from "../../../BackEnd/BackMain.js";

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

    console.log("------ Inicializando BDD ------");
 
    var r1 = new Ruta("Ruta-1", [43.534401, -5.909476],"Genial");
    var r2 = new Ruta("Ruta-2", [ 43.361763, -5.847995],"Bien");


    r1.addHito(new Hito("Hito-r1-1", 43.531484, -5.911818));
    r1.addHito(new Hito("Hito-r1-2", 43.528935, -5.914273));


    r2.addHito(new Hito("Hito-r2-1", 43.362182, -5.84597));
    r2.addHito(new Hito("Hito-r2-2", 43.363071, -5.846447));
    

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
   * Devuelve TODAS las rutas del usuario en sesión.
   */
  getRutasUsuarioLogeado(webId) {
    
  }

  /*
   * Añade una nueva ruta al sistema.
   */
  addRuta(ruta) {}

  /*función splice() se le pasan dos parámetros: 
  -el primero será el índice partir del cual queremos borrar elementos
  -el segundo, el número de elementos que queremos borrar a partir de la posición dada*/
  deleteRuta(uuid){
    var rutaToDelete = this.findRouteById(uuid);
    var posicion = this.BDRutas.indexOf(rutaToDelete);
    console.log(rutaToDelete);
    if(posicion > -1){
      this.BDRutas.splice(posicion, 1);
    }
  }

  findRouteById(uuid){
     //implementar mas tarde
    //rutasUsuario = this.getRutasUsuarioLogeado(webId)
    var ruta = null;
    for(var i = 0; i < this.BDRutas.length; i++){
      if(this.BDRutas[i].getUUID() === uuid)
        ruta = this.BDRutas[i];
    }
    return ruta;
  }
  
  addRuta(nombre, latitud, longitud, descripcion, hitos) {
    latitud=parseFloat(latitud);
    longitud=parseFloat(longitud);
   var ruta=new Ruta(nombre, [latitud, longitud], descripcion);
   for(var i in hitos)
   {
      hitos[i].latitud=parseFloat(hitos[i].latitud);
      hitos[i].longitud=parseFloat(hitos[i].longitud);
      ruta.addHito(new Hito(hitos[i].nombre,hitos[i].latitud,hitos[i].longitud));
   }
   BackMain.añadirRuta(ruta);
  }

}



export default RutaService;
