import { addRoute } from './Scripts/addRoute.js'
import { deleteRoute } from './Scripts/deleteRoute.js'
import { listRoutes } from './Scripts/listRoutes.js'
import { listFriends } from './Scripts/listFriends.js'
import {addFriend} from './Scripts/addFriend.js'
import {shareRoute} from './Scripts/shareRoute.js'
import {processSharedRoutes} from './Scripts/processSharedRoutes.js'
import {listSharedRoutes} from './Scripts/listSharedRoutes.js'
import {addCommentToMyRoute} from './Scripts/addCommentToMyRoute.js'
import {listCommentsOfRoute} from './Scripts/listCommentsOfRoute.js'
import {addMediaToMyRoute} from './Scripts/addMediaToMyRoute.js'
import { getPersonaByWebId } from "./Scripts/helpers/personHelper";
import { listMediaOfRoute } from "./Scripts/listMediaOfRoute";
export default class BackMain {
  static listarRutas() {
    return listRoutes();
  }
  static añadirRuta(Ruta) {
    addRoute(Ruta);
  }
  static borrarRuta(uuid) {
    return deleteRoute(uuid);
  }
  static listarAmigos() {
    return listFriends();
  }
  static añadirAmigo(friendWebId) {
    return addFriend(friendWebId);
  }
  static compartirRuta(friendWebId, rutaUUID) {
    shareRoute(friendWebId, rutaUUID);
  }
  static procesarRutasCompartidas() {
    return processSharedRoutes();
  }
  static listarRutasCompartidasConmigo() {
    return listSharedRoutes();
  }
  static comentarMiRuta(comentario, rutaUUID) {
    return addCommentToMyRoute(comentario, rutaUUID);
  }
  static obtenerComentariosRuta(rutaUUID, webId) {
    return listCommentsOfRoute(rutaUUID, webId);
  }
  static getPersonByWebID(webID) {
    return getPersonaByWebId(webID);
  }
  static subirFicheroAMiRuta(fichero,rutaUUID){
      return addMediaToMyRoute(fichero,rutaUUID);
  };
  static obtenerFicherosRuta(rutaUUID, webId) {
    return listMediaOfRoute(rutaUUID, webId);
  }
}
