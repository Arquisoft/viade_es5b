import React from "react";
import {useWebId} from "@inrupt/solid-react-components";
import {initialiseRoutesList} from './Scripts/storageForRoutes.js'
inicio = () =>{
    const WebId = useWebId();
};

creacionAlmacenRutas = () =>{
    let rutasStorage= initialiseRoutesList(profile, typeIndex);
};