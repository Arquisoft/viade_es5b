

import React from "react";
import {useWebId} from "@inrupt/solid-react-components";
import {initialiseRoutesList} from './Scripts/storageForRoutes.js'
import{getRoutesList} from './Scripts/getNotesStorage.js'
import{addRoute} from './Scripts/addRoute.js'

var Usuario = new Object();
Usuario.iD=BackMain.inicio();
Usuario.rutasStorage=BackMain.creacionAlmacenRutas();
export default class BackMain
{
    static Inicio(){
        let WebId = useWebId();
        return WebId;
    };

    static creacionAlmacenRutas()
    {
        let rutasStorageNew= initialiseRoutesList(profile, typeIndex);
        return rutasStorageNew;
    };
    static obtenerAlmacenRutas(){
        let rutasStorage= getRoutesList(profile);
        return rutasStorage
    };

    static añadirRuta()
    {
        //addRoute(obtenerAlmacenRutas(),ruta);
        addRoute();
    };
}