import { addRoute } from './Scripts/addRoute.js'
import { deleteRoute } from './Scripts/deleteRoute.js'
import { listRoutes } from './Scripts/listRoutes.js'
import { listFriends } from './Scripts/listFriends.js'
import {addFriend} from './Scripts/addFriend.js'
import {shareRoute} from './Scripts/shareRoute.js'

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
    static compartirRuta(friendWebId,Ruta){
        shareRoute(friendWebId,Ruta);
    };
    
}