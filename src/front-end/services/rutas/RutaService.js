import Ruta from "../../model/Ruta";
import Hito from "../../model/Hito";
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
    var r1 = new Ruta("Ruta-1", [43.534401, -5.909476], "Genial");
    var r2 = new Ruta("Ruta-2", [43.361763, -5.847995], "Bien");

    r1.addHito(new Hito("Hito-r1-1", 43.531484, -5.911818));
    r1.addHito(new Hito("Hito-r1-2", 43.528935, -5.914273));

    r2.addHito(new Hito("Hito-r2-1", 43.362182, -5.84597));
    r2.addHito(new Hito("Hito-r2-2", 43.363071, -5.846447));

    this.BDRutas = [...this.BDRutas, r1];
    this.BDRutas = [...this.BDRutas, r2];
  }

  /*
   * Devuelve TODAS las rutas almacenadas en
   * el sistema.
   */
  getRutas() {
    return BackMain.listarRutas();
  }

  /*
   * Devuelve TODAS las rutas que alguien haya compartido conmigo
   */
  getRutasCompartidasConmigo() {
    return BackMain.listarRutasCompartidasConmigo();
  }

  deleteRuta(uuid, rutaNombre) {
    return BackMain.borrarRuta(uuid, rutaNombre);
  }

  findRouteById(uuid) {
    // implementar mas tarde
    // rutasUsuario = this.getRutasUsuarioLogeado(webId)
    var ruta = null;
    for (var i = 0; i < this.BDRutas.length; i++) {
      if (this.BDRutas[i].getUUID() === uuid) ruta = this.BDRutas[i];
    }
    return ruta;
  }

  addRuta(nombre, latitud, longitud, descripcion, hitos) {
    latitud = parseFloat(latitud.replace(/\s+/g, ""));
    longitud = parseFloat(longitud.replace(/\s+/g, ""));
    var ruta = new Ruta(nombre, [latitud, longitud], descripcion);
    for (var i in hitos) {
      hitos[i].latitud = parseFloat(hitos[i].latitud.replace(/\s+/g, ""));
      hitos[i].longitud = parseFloat(hitos[i].longitud.replace(/\s+/g, ""));
      ruta.addHito(
        new Hito(hitos[i].nombre, hitos[i].latitud, hitos[i].longitud)
      );
    }
    return BackMain.añadirRuta(ruta);
  }

  addRutaObject(ruta) {
    BackMain.añadirRuta(ruta);
  }

  shareRuta(friendWebId, rutaUUID) {
    return BackMain.compartirRuta(friendWebId, rutaUUID);
  }

  procesarRutasCompartidas() {
    return BackMain.procesarRutasCompartidas();
  }

  comentarRuta(comment, routeUUID,routeOwnerWebID) {
    return BackMain.comentarRuta(comment, routeUUID,routeOwnerWebID);
  }

  obtenerComentariosRuta(rutaUUID, webId) {
    return BackMain.obtenerComentariosRuta(rutaUUID, webId);
  }

  subirFicheroAMiRuta(fichero, rutaUUID) {
    return BackMain.subirFicheroAMiRuta(fichero, rutaUUID);
  }

  obtenerFicherosRuta(rutaUUID, webId) {
    return BackMain.obtenerFicherosRuta(rutaUUID, webId);
  }
  permisosAppValidos() {
    return BackMain.permisosAppValidos();
  }
}

export default RutaService;
