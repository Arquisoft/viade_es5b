import Amigo from "../../model/Amigo";
import BackMain from "../../../BackEnd/BackMain.js";

/*
 * Clase que representa el servicio de Amigos (Fachada)
 */
class AmigoService {
  constructor() {
    // Simula la base de datos
    this.BDAmigos = [];
    this.inicializarBD();
  }

  /*
   * Método de prueba que inicializa la lista
   * que simula la base de datos.
   */
  inicializarBD() {

    var amigo1 = new Amigo(
      "Pedro",
      "https://pedro223.inrupt.net/profile/card#me"
    );
    var amigo2 = new Amigo(
      "Alex",
      "https://hamalawindows.solid.community/profile/card#me"
    );

    var amigo3 = new Amigo(
      "Lucía",
      "https://uo265060.solid.community/profile/card#me"
    );

    this.BDAmigos = [...this.BDAmigos, amigo1];
    this.BDAmigos = [...this.BDAmigos, amigo2];
    this.BDAmigos = [...this.BDAmigos, amigo3];
  }

  /*
   * Devuelve los amigos que tengo
   */
  getAmigos() {
    return BackMain.listarAmigos();
    //return this.BDAmigos;
  }
  /*
   * Añade un amigo al mi perfil (alias es un nombre que le doy yo al amigo, no tiene porque ser el suyo)
   * si logro añadirlo devuelve true, sino false;
   */
  addAmigo(webId) {
    return BackMain.añadirAmigo(webId);
  }
}

export default AmigoService;
