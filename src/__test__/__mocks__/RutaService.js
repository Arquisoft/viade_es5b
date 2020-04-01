import Ruta from "../../front-end/model/Ruta";
import Hito from "../../front-end/model/Hito";
import Comentario from "../../front-end/model/Comentario";
import Persona from "../../front-end/model/Persona";
import RutaAmigo from "../../front-end/model/RutaAmigo";

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
    let r1 = new Ruta("Ruta-1", [43.534401, -5.909476], "Genial");
    let r2 = new Ruta("Ruta-2", [43.361763, -5.847995], "Bien");

    r1.addHito(new Hito("Hito-r1-1", 43.531484, -5.911818));
    r1.addHito(new Hito("Hito-r1-2", 43.528935, -5.914273));

    r2.addHito(new Hito("Hito-r2-1", 43.362182, -5.84597));
    r2.addHito(new Hito("Hito-r2-2", 43.363071, -5.846447));

    let c1=new Comentario("Publicado: 31/3/2020 22:41:26","Muy bien");
    c1.setAutor("Lucía", "123", "imagen");
    let c2=new Comentario("Publicado: 01/4/2020 22:41:26","Genial");

    r1.addComentario(c1);
    r1.addComentario(c2);
    

    this.BDRutas = [...this.BDRutas, r1];
    this.BDRutas = [...this.BDRutas, r2];
  }

  /*
   * Devuelve TODAS las rutas almacenadas en
   * el sistema.
   */
  getRutas() {
    //return BackMain.listarRutas();
    let r1 = new Ruta("Ruta-1", [43.534401, -5.909476], "Genial");
    let r2 = new Ruta("Ruta-2", [43.361763, -5.847995], "Bien");

    r1.addHito(new Hito("Hito-r1-1", 43.531484, -5.911818));
    r1.addHito(new Hito("Hito-r1-2", 43.528935, -5.914273));

    r2.addHito(new Hito("Hito-r2-1", 43.362182, -5.84597));
    r2.addHito(new Hito("Hito-r2-2", 43.363071, -5.846447));

    let c1=new Comentario("Publicado: 31/3/2020 22:41:26","Muy bien");
    c1.setAutor("Lucía", "123", "imagen");
    let c2=new Comentario("Publicado: 01/4/2020 22:41:26","Genial");

    r1.addComentario(c1);
    r1.addComentario(c2);
    
    var BDRutas2=[];
    BDRutas2 = [...BDRutas2, r1];
    BDRutas2 = [...BDRutas2, r2];
    return BDRutas2;
  }
  /*
   * Devuelve TODAS las rutas que alguien haya compartido conmigo
   */
  getRutasCompartidasConmigo() {
    //return BackMain.listarRutasCompartidasConmigo();
    let r1 = new Ruta("Ruta-1", [43.534401, -5.909476], "Genial");
    let r2 = new Ruta("Ruta-2", [43.361763, -5.847995], "Bien");
    let f1 = new Persona("Diego", "123", "imagen");

    r1.addHito(new Hito("Hito-r1-1", 43.531484, -5.911818));
    r1.addHito(new Hito("Hito-r1-2", 43.528935, -5.914273));

    r2.addHito(new Hito("Hito-r2-1", 43.362182, -5.84597));
    r2.addHito(new Hito("Hito-r2-2", 43.363071, -5.846447));

    let c1=new Comentario("Publicado: 31/3/2020 22:41:26","Muy bien");
    c1.setAutor("Lucía", "123", "imagen");
    let c2=new Comentario("Publicado: 01/4/2020 22:41:26","Genial");
    c2.setAutor("Adnane", "123", "imagen2");

    r1.addComentario(c1);
    r1.addComentario(c2);

    let fr1 = new RutaAmigo(r1,f1);
    let fr2 = new RutaAmigo(r2,f1);
    
    var BDRutas3=[];
    BDRutas3 = [...BDRutas3, fr1];
    BDRutas3 = [...BDRutas3, fr2];
    return BDRutas3;
  }

  deleteRuta(uuid) {
    //return BackMain.borrarRuta(uuid);
  }

  findRouteById(uuid) {
    //implementar mas tarde
    //rutasUsuario = this.getRutasUsuarioLogeado(webId)
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
    //BackMain.añadirRuta(ruta);
  }
  shareRuta(friendWebId, rutaUUID) {
    //return BackMain.compartirRuta(friendWebId, rutaUUID);
  }
  procesarRutasCompartidas() {
    //return BackMain.procesarRutasCompartidas();
  }
  comentarMiRuta(comentario, rutaUUID) {
    //return BackMain.comentarMiRuta(comentario, rutaUUID);
  }
  obtenerComentariosRuta(rutaUUID, webId) {
    return [new Comentario("Publicado: 31/3/2020 22:41:26","Muy bien").setAutor(new Persona("Lucía", "123", "imagen1")), new Comentario("Publicado: 01/4/2020 22:41:26","Genial").setAutor(new Persona("Diego", "245", "imagen2"))];
    
    //return BackMain.obtenerComentariosRuta(rutaUUID, webId);
  }
  subirFicheroAMiRuta(fichero, rutaUUID) {
    //return ["url1","url2"];
  }
  obtenerFicherosRuta(rutaUUID, webId) {
    return ["url1","url2"];
    //return BackMain.obtenerFicherosRuta(rutaUUID, webId);
  }

  handleLoaded(){
  }

  getNoRutas(){
    return [];
  }
}

export default RutaService;
