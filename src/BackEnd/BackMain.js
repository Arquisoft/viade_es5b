import { addRoute } from './Scripts/addRoute.js'
import { deleteRoute } from './Scripts/deleteRoute.js'
import { listRoutes } from './Scripts/listRoutes.js'

export default class BackMain {
    static listarRutas() {
        listRoutes()
    }

    static añadirRuta(Ruta) {
        addRoute(Ruta)
    };
    static borrarRuta(uuid) {
        deleteRoute(uuid)
    };
}