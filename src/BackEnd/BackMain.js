

import React from "react";
import {useWebId} from "@inrupt/solid-react-components";
import {initialiseRoutesList} from './Scripts/storageForRoutes.js'
import{getRoutesList} from './Scripts/getNotesStorage.js'
import{addRoute} from './Scripts/addRoute.js'
const auth = require('solid-auth-client')
var Usuario = new Object();
Usuario.iD=BackMain.inicio();
Usuario.rutasStorage=BackMain.creacionAlmacenRutas();
export default class BackMain
{
    static Inicio(){
    auth.trackSession(session => {
        //si no esta logueado lo redirijo al login.
     if (!session)
        window.location.href = "/login";
            //si esta logueado guardo la ruta
    else
        console.log(`The user is ${session.webId}`)
       })
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