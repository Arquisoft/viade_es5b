import React from "react";
import {useWebId} from "@inrupt/solid-react-components";
import {initialiseRoutesList} from './Scripts/storageForRoutes.js'
import{getRoutesList} from './Scripts/getNotesStorage.js'
var Usuario = new Object();
Usuario.iD=inicio();
Usuario.rutasStorage=creacionAlmacenRutas();
inicio = () =>{
    let WebId = useWebId();
    return WebId;
};

creacionAlmacenRutas = () =>{
    let rutasStorageNew= initialiseRoutesList(profile, typeIndex);
    return rutasStorageNew;
};

obtenerAlmacenRutas = () =>{
    let rutasStorage= getRoutesList(profile);
    return rutasStorage
};
