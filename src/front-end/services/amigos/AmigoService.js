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
    console.log("------ Inicializando BDD ------");

    var amigo1 = new Amigo("Pedro","Fernandez","Peter","https://pedro223.inrupt.net/profile/card#me");
    var amigo2 = new Amigo("Alex","","","https://hamalawindows.solid.community/profile/card#me");

    this.BDAmigos = [...this.BDAmigos, amigo1];
    this.BDAmigos = [...this.BDAmigos, amigo2];
  }

  /*
   * Devuelve los amigos que tengo
   */
  getAmigos() {
    //return BackMain.listarAmigos();
    return this.BDAmigos;
  }

}

export default AmigoService;
