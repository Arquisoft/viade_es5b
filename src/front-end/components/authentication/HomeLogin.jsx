import React from "react";
import {useWebId} from "@inrupt/solid-react-components";

export const HomeMessageComponent = () =>{
    const WebId = useWebId();
    return(
        <h1>Usuario autenticado como : {(WebId)? WebId: "No autenticado"}</h1>
    );
};

export default HomeMessageComponent;


