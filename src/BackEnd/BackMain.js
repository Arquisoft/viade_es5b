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

export default class BackMain {
    static listarRutas() {
        return listRoutes()
    }
    static añadirRuta(Ruta) {
        addRoute(Ruta)
    };
    static borrarRuta(uuid) {
        deleteRoute(uuid)
    };
    static listarAmigos() {
        return listFriends()
    };
    static añadirAmigo(friendWebId){
        return addFriend(friendWebId);
    };
    static compartirRuta(friendWebId,rutaUUID){
        shareRoute(friendWebId,rutaUUID);
    };
    static procesarRutasCompartidas(){
        return processSharedRoutes();
    };
    static listarRutasCompartidasConmigo(){
        return listSharedRoutes();
    };
    static comentarMiRuta(comentario,rutaUUID){
        addCommentToMyRoute(comentario,rutaUUID);
    };
    static obtenerComentariosRuta(rutaUUID)
    {
        return listCommentsOfRoute(rutaUUID);
    }
}