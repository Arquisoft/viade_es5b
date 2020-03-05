import React from "react";
import {ProviderLogin} from "@inrupt/solid-react-components";
import  Provider  from '../../services/authentication/Proveedor';

export const LogInComponent = (props) =>{
    return(
        <div>
            <h1>Login en Viade</h1>
            <ProviderLogin
            className="provider-login-component"
            callback={() => alert("Holaa")}
            callbackUri={`${window.location.origin}`}
            selectPlaceHolder = "Seleccione su proveedor"
            inputPlaceholder = "Introduza la url de su webId"
            formButtonText = "Login"
            btnTxtWebId = "Login con el WebId"
            btnTxtProvider = "Login con el proveedor"
            errorsText = {{
                unknown: "Algo no va bien, prueba de nuevo...",
                webIdNotValid: "WebID no es válido",
                emptyProvider: "Proveedor Solid es necesario",
                emptyWebId: "WebId es necesario"
            }}
            providers={Provider.getIdentityProviders()}
            />
        </div>
    );
};

export default LogInComponent;