import React from "react";
import {ProviderLogin} from "@inrupt/solid-react-components";

export const LogInComponent = () =>{
    return(
        <div>
            <h1>Login en Viade</h1>
            <ProviderLogin
            callbackUri = "/"
            selectPlaceHolder = "Seleccione su proveedor"
            inputPlaceholder = "Introduza su webId"
            formButtonText = "Login"
            btnTxtWebId = "Login con el WebId"
            btnTxtProvider = "Login con el proveedor"
            errorsText = {{
                unknown: "Algo no va bien, prueba de nuevo...",
                webIdNotValid: "WebID no es válido",
                emptyProvider: "Proveedor Solid es necesario",
                emptyWebId: "WebId es necesario"
            }}
            />
        </div>
    );
};

export default LogInComponent;