import { addRoute } from './Scripts/addRoute.js'
import { deleteRoute } from './Scripts/deleteRoute.js'
import { listRoutes } from './Scripts/listRoutes.js'

export default class BackMain {
    static listarRutas() {
        return listRoutes()
    }

    static añadirRuta(Ruta) {
        addRoute(Ruta)
    };
    static borrarRuta(uuid) {
        //Aun no funciona
        deleteRoute(uuid)
    };
}