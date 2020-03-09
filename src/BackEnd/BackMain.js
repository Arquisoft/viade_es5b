

import React from "react";

import {initialiseRoutesList} from './Scripts/storageForRoutes.js'
import{addRoute} from './Scripts/addRoute.js'
import{getRoutesList} from './Scripts/getRoutes.js'
import{Ruta}from '/src/front-end/model/Ruta.js'
const auth = require('solid-auth-client')
var Usuario = new Object();
Usuario.iD=BackMain.inicio();
Usuario.rutasStorage=BackMain.creacionAlmacenRutas();
export default class BackMain
{
    
    static Inicio(){
        this.loggeado();
    };
    static loggeado(){
        auth.trackSession(session => {
            //si no esta logueado lo redirijo al login.
         if (!session)
            window.location.href = "/login";
                //si esta logueado guardo la ruta
        else
            console.log(`The user is ${session.webId}`)
           })
    }

    static creacionAlmacenRutas()
    { 
        this.BDRutas = [];
        let rutasStorageNew= initialiseRoutesList(auth, this.BDRutas);
        return rutasStorageNew;
    };
    static obtenerAlmacenRutas(){
        let rutasStorage= getRoutesList(auth);
        return rutasStorage
    };

    static añadirRuta()
    {
        addRoute();
    };
}