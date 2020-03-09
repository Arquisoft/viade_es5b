import Ruta from "../../model/Ruta";
import Hito from "../../model/Hito";
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
    var r1 = new Ruta("Ruta-1 Avilés", "La ruta de Avilés", [
      43.534401,
      -5.909476
    ]);
    var r2 = new Ruta("Ruta-2 Oviedo", "La ruta de Oviede", [
      43.361763,
      -5.847995
    ]);

    r1.addHito(new Hito("Hito-r1-1", 43.531484, -5.911818));
    r1.addHito(new Hito("Hito-r1-2", 43.528935, -5.914273));

    r2.addHito(new Hito("Hito-r2-1", 43.362182, -5.84597));
    r2.addHito(new Hito("Hito-r2-2", 43.363071, -5.846447));

    this.BDRutas.push(r1);
    this.BDRutas.push(r2);
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
  addRuta(ruta) {}
}

export default RutaService;
